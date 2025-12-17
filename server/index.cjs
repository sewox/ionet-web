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
        router.post('/', async (req, res) => {
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

                    // First: Save to DB
                    await req.db.run(
                        `INSERT INTO messages (id, name, surname, email, phone, message, date) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                        data.id, name, surname, email, phone, message, data.date
                    );

                    // Second: Attempt to send email
                    try {
                        // Fetch settings from DB
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
                            console.log("Using Dynamic SMTP Settings");
                        } else {
                            // Fallback Ethereal
                            transporter = nodemailer.createTransport({
                                host: "smtp.ethereal.email",
                                port: 587,
                                secure: false,
                                auth: { user: "maddison53@ethereal.email", pass: "jn7jnAPss4f63QBp6D" },
                            });
                            console.log("Using Fallback Ethereal SMTP");
                        }

                        // Prepare Content
                        let subject = settings.mail_subject_template || `Yeni İletişim Mesajı: {{name}} {{surname}}`;
                        let html = settings.mail_body_template || `
                        <h3>Yeni bir mesaj alındı</h3>
                        <p><strong>Ad Soyad:</strong> {{name}} {{surname}}</p>
                        <p><strong>E-posta:</strong> {{email}}</p>
                        <p><strong>Telefon:</strong> {{phone}}</p>
                        <p><strong>Mesaj:</strong></p>
                        <p>{{message}}</p>
                    `;

                        // Simple Template Engine
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
                        console.log("Email sent successfully to:", to);

                    } catch (emailErr) {
                        console.error("Email sending failed:", emailErr);
                        // Do NOT fail the request if email fails, DB save is successful
                    }

                    res.json(data);
                    return; // End request here for messages
                }

                // 2. Standard Logic: Other Tables
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

    // DELETE
    if (!excludeMethods.includes('DELETE')) {
        router.delete('/:id', async (req, res) => {
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

// Messages route is handled via createCrud now with custom logic inside
app.use('/api/messages', createCrud('messages', ['id', 'name', 'surname', 'email', 'phone', 'message', 'date']));

// --- Settings Route (Custom Logic) ---
const settingsRouter = express.Router();

// GET All Settings
settingsRouter.get('/', async (req, res) => {
    try {
        const rows = await req.db.all(`SELECT * FROM site_settings`);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CREATE / UPDATE Setting
settingsRouter.post('/', async (req, res) => {
    try {
        const { ckey, value, group_name, type } = req.body;

        const existing = await req.db.get("SELECT id FROM site_settings WHERE ckey = ?", ckey);

        if (existing) {
            await req.db.run(
                `UPDATE site_settings SET value = ?, group_name = ?, type = ? WHERE ckey = ?`,
                value, group_name, type, ckey
            );
        } else {
            const id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
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

app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
