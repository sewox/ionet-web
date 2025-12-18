const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');
const cors = require('cors');
const getDb = require('./db.cjs');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware to attach DB to request
app.use(async (req, res, next) => {
    try {
        req.db = await getDb();
        next();
    } catch (err) {
        console.error("DB Connection Error:", err);
        res.status(500).json({ error: "Database connection failed" });
    }
});

// Middleware for Auth (Global)
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        // Simple mock token check for now. In production use JWT or DB session.
        if (token === 'ionet-secret-token-123') {
            return next();
        }
    }
    return res.status(401).json({ error: 'Unauthorized' });
};

// --- Generic CRUD Helper ---
const createCrud = (table, fields, excludeMethods = []) => {
    const router = express.Router();

    // GET All
    router.get('/', async (req, res) => {
        try {
            const rows = await req.db.all(`SELECT * FROM ${table}`);
            res.json(rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // GET One
    router.get('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const row = await req.db.get(`SELECT * FROM ${table} WHERE id = ?`, id);
            if (!row) return res.status(404).json({ error: "Not found" });
            res.json(row);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // POST (Create)
    if (!excludeMethods.includes('POST')) {
        // Public exceptions
        const isPublic = table === 'messages';

        router.post('/', isPublic ? (req, res, next) => next() : authenticate, async (req, res) => {
            try {
                const data = req.body;
                const placeholders = fields.map(() => '?').join(',');
                const values = fields.map(f => data[f]);

                if (!data.id) {
                    data.id = Date.now().toString();
                    values[0] = data.id;
                }

                // 1. Custom Logic: Messages (Send Email)
                if (table === 'messages') {
                    const { name, surname, email, phone, message } = data;

                    // Save to DB
                    await req.db.run(
                        `INSERT INTO messages (id, name, surname, email, phone, message, date) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                        data.id, name, surname, email, phone, message, data.date
                    );

                    // Send Email
                    try {
                        const settingsRows = await req.db.all("SELECT ckey, value FROM site_settings WHERE group_name = 'mail'");
                        const settings = settingsRows.reduce((acc, row) => ({ ...acc, [row.ckey]: row.value }), {});

                        const host = settings.smtp_host;
                        const user = settings.smtp_user;
                        const pass = settings.smtp_pass;
                        const to = settings.mail_to || 'admin@ionet.com.tr';
                        let transporter;

                        if (host && user && pass) {
                            const port = parseInt(settings.smtp_port) || 587;
                            const secure = settings.smtp_secure === 'true';
                            transporter = nodemailer.createTransport({
                                host, port, secure, auth: { user, pass },
                            });
                        } else {
                            transporter = nodemailer.createTransport({
                                host: "smtp.ethereal.email",
                                port: 587,
                                secure: false,
                                auth: { user: "maddison53@ethereal.email", pass: "jn7jnAPss4f63QBp6D" },
                            });
                        }

                        let subject = settings.mail_subject_template || `Yeni İletişim Mesajı: {{name}} {{surname}}`;
                        let html = settings.mail_body_template || `
                            <h3>Yeni bir mesaj alındı</h3>
                            <p><strong>Ad Soyad:</strong> {{name}} {{surname}}</p>
                            <p><strong>E-posta:</strong> {{email}}</p>
                            <p><strong>Telefon:</strong> {{phone}}</p>
                            <p><strong>Mesaj:</strong></p>
                            <p>{{message}}</p>
                        `;

                        const replacer = (tpl) => {
                            return tpl
                                .replace(/{{name}}/g, name || '')
                                .replace(/{{surname}}/g, surname || '')
                                .replace(/{{email}}/g, email || '')
                                .replace(/{{phone}}/g, phone || '')
                                .replace(/{{message}}/g, message || '');
                        };

                        await transporter.sendMail({
                            from: `"I/ONET Website" <${user || 'contact@ionet.com.tr'}>`,
                            to: to,
                            subject: replacer(subject),
                            html: replacer(html),
                        });
                        console.log("Email sent successfully");

                    } catch (emailErr) {
                        console.error("Email sending failed:", emailErr);
                    }

                    res.json(data);
                    return;
                }

                // 2. Standard Logic
                await req.db.run(
                    `INSERT INTO ${table} (${fields.join(',')}) VALUES (${placeholders})`,
                    ...values
                );
                res.json(data);

            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    }

    // PUT (Update) - Protected
    if (!excludeMethods.includes('PUT')) {
        router.put('/:id', authenticate, async (req, res) => {
            try {
                const { id } = req.params;
                const data = req.body;
                const validFields = fields.filter(f => f !== 'id' && data[f] !== undefined);

                if (validFields.length === 0) {
                    return res.status(400).json({ error: "No valid fields provided for update" });
                }

                const setClause = validFields.map(f => `${f} = ?`).join(', ');
                const values = validFields.map(f => data[f]);
                values.push(id);

                await req.db.run(
                    `UPDATE ${table} SET ${setClause} WHERE id = ?`,
                    ...values
                );
                res.json({ success: true, id, ...data });
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    }

    // DELETE - Protected
    if (!excludeMethods.includes('DELETE')) {
        router.delete('/:id', authenticate, async (req, res) => {
            try {
                const { id } = req.params;
                await req.db.run(`DELETE FROM ${table} WHERE id = ?`, id);
                res.json({ message: 'Deleted' });
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    }

    return router;
};

// Login Endpoint
app.post('/api/auth/login', (req, res) => {
    const { password } = req.body;
    if (password === 'admin123') {
        res.json({ success: true, token: 'ionet-secret-token-123' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// --- Routes ---
app.use('/api/blog_posts', createCrud('blog_posts', ['id', 'title', 'category', 'date', 'summary', 'image', 'content']));
app.use('/api/jobs', createCrud('jobs', ['id', 'title', 'type', 'location', 'time', 'exp', 'department']));
app.use('/api/projects', createCrud('projects', ['id', 'title', 'category', 'description', 'image']));

// Pages Route
const pagesRouter = createCrud('pages', ['id', 'slug', 'title', 'content', 'created_at']);
pagesRouter.get('/slug/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const row = await req.db.get(`SELECT * FROM pages WHERE slug = ?`, slug);
        if (!row) return res.status(404).json({ error: "Page not found" });
        res.json(row);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.use('/api/pages', pagesRouter);

app.use('/api/messages', createCrud('messages', ['id', 'name', 'surname', 'email', 'phone', 'message', 'date']));

// --- Settings Route ---
const settingsRouter = express.Router();

settingsRouter.get('/', async (req, res) => {
    try {
        const rows = await req.db.all(`SELECT * FROM site_settings`);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

settingsRouter.post('/', authenticate, async (req, res) => {
    try {
        const { ckey, value, group_name, type } = req.body;
        const existing = await req.db.get("SELECT id FROM site_settings WHERE ckey = ?", ckey);

        if (existing) {
            await req.db.run(
                `UPDATE site_settings SET value = ?, group_name = ?, type = ? WHERE ckey = ?`,
                value, group_name, type, ckey
            );
        } else {
            const id = Date.now().toString() + Math.random().toString(36).substring(2, 7);
            await req.db.run(
                `INSERT INTO site_settings (id, ckey, value, group_name, type) VALUES (?, ?, ?, ?, ?)`,
                id, ckey, value, group_name, type
            );
        }
        res.json({ success: true, ckey, value });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

settingsRouter.delete('/:ckey', authenticate, async (req, res) => {
    try {
        const { ckey } = req.params;
        const result = await req.db.run("DELETE FROM site_settings WHERE ckey = ?", ckey);
        res.json({ success: true, message: 'Deleted', changes: result.changes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.use('/api/settings', settingsRouter);

app.use('/api/menu_items', createCrud('menu_items', ['id', 'label', 'url', 'order_index']));
app.use('/api/home_features', createCrud('home_features', ['id', 'title', 'description', 'icon', 'order_index']));
app.use('/api/home_services', createCrud('home_services', ['id', 'title', 'description', 'icon', 'link', 'order_index']));
app.use('/api/infrastructure_features', createCrud('infrastructure_features', ['id', 'title', 'description', 'icon', 'points', 'order_index']));
app.use('/api/tech_partners', createCrud('tech_partners', ['id', 'name', 'icon', 'order_index']));
app.use('/api/testimonials', createCrud('testimonials', ['id', 'name', 'title', 'quote', 'image', 'order_index']));
app.use('/api/career_values', createCrud('career_values', ['id', 'title', 'description', 'icon', 'order_index']));
app.use('/api/career_tech_stack', createCrud('career_tech_stack', ['id', 'name', 'icon', 'order_index']));
app.use('/api/legal_sections', createCrud('legal_sections', ['id', 'title', 'content', 'anchor', 'order_index']));

// --- File Upload ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'server/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

app.post('/api/upload', authenticate, upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

// --- SEO Routes ---
app.get('/sitemap.xml', async (req, res) => {
    try {
        const settings = await req.db.all("SELECT ckey, value FROM site_settings");
        const getSetting = (key, def) => {
            const row = settings.find(s => s.ckey === key);
            return row ? row.value : def;
        };
        let baseUrl = getSetting('site_url', 'https://www.ionet.com.tr');
        if (baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0, -1);

        const pages = await req.db.all("SELECT slug FROM pages");
        const blogs = await req.db.all("SELECT id FROM blog_posts");

        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${baseUrl}/contact</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>${baseUrl}/infrastructure</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/references</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${baseUrl}/careers</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>${baseUrl}/blog</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`;

        pages.forEach(page => {
            const slug = page.slug.startsWith('/') ? page.slug.substring(1) : page.slug;
            xml += `
  <url><loc>${baseUrl}/${slug}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`;
        });

        blogs.forEach(blog => {
            xml += `
  <url><loc>${baseUrl}/article/${blog.id}</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>`;
        });

        xml += `
</urlset>`;
        res.set('Content-Type', 'application/xml');
        res.send(xml);
    } catch (err) {
        console.error("Sitemap error:", err);
        res.status(500).send("Error");
    }
});

app.get('/robots.txt', async (req, res) => {
    try {
        const row = await req.db.get("SELECT value FROM site_settings WHERE ckey = 'site_url'");
        let baseUrl = row ? row.value : 'https://www.ionet.com.tr';
        if (baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0, -1);
        res.set('Content-Type', 'text/plain');
        res.send(`User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml`);
    } catch (err) {
        res.status(500).send("Error");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
