const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const getDb = require('./db.cjs');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const validator = require('validator');
const xss = require('xss');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Validate required environment variables on startup
const requiredEnvVars = ['JWT_SECRET', 'ADMIN_PASSWORD_HASH'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`ERROR: Required environment variable ${envVar} is not set.`);
        console.error('Please check server/README.md for setup instructions.');
        process.exit(1);
    }
}

const app = express();
const PORT = process.env.PORT || 3001;

// CORS Configuration - restrict to allowed origins
const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
    : ['http://localhost:5173', 'http://localhost:3001'];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOAD_DIR || 'uploads')));

// Rate limiting
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per windowMs
    message: 'Too many login attempts, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

const uploadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit file uploads
    message: 'Too many upload requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Apply general rate limiter to all routes
app.use(generalLimiter);

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

// Middleware for Auth - JWT based
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    let authFailed = false;
    let errorReason = 'Unauthorized'; // Generic error for all cases
    
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (token) {
            try {
                const jwtSecret = process.env.JWT_SECRET;
                if (!jwtSecret) {
                    throw new Error('JWT_SECRET not configured');
                }
                const decoded = jwt.verify(token, jwtSecret);
                req.user = decoded;
                return next();
            } catch (err) {
                // Log internally but don't expose error details to client
                console.error("JWT verification failed");
                authFailed = true;
            }
        } else {
            authFailed = true;
        }
    } else {
        authFailed = true;
    }
    
    // Consistent response for all authentication failures
    return res.status(401).json({ error: errorReason });
};

// Whitelist of allowed tables for CRUD operations
const ALLOWED_TABLES = [
    'blog_posts', 'jobs', 'projects', 'pages', 'messages', 
    'menu_items', 'home_features', 'home_services', 
    'infrastructure_features', 'tech_partners', 'testimonials',
    'career_values', 'career_tech_stack', 'legal_sections'
];

// Validate table name
const validateTable = (table) => {
    if (!ALLOWED_TABLES.includes(table)) {
        throw new Error('Invalid table name');
    }
};

// Validate field names (alphanumeric and underscores only)
const validateFieldName = (field) => {
    if (!/^[a-zA-Z0-9_]+$/.test(field)) {
        throw new Error('Invalid field name');
    }
};

// --- Generic CRUD Helper ---
const createCrud = (table, fields, excludeMethods = []) => {
    const router = express.Router();

    // Validate table and fields at router creation
    validateTable(table);
    fields.forEach(validateFieldName);

    // GET All
    router.get('/', async (req, res) => {
        try {
            const rows = await req.db.all(`SELECT * FROM ${table}`);
            res.json(rows);
        } catch (err) {
            console.error(`Error fetching from ${table}:`, err);
            res.status(500).json({ error: "Failed to fetch data" });
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
            console.error(`Error fetching from ${table}:`, err);
            res.status(500).json({ error: "Failed to fetch data" });
        }
    });

    // POST (Create)
    if (!excludeMethods.includes('POST')) {
        // Public exceptions
        const isPublic = table === 'messages';

        router.post('/', isPublic ? (req, res, next) => next() : authenticate, async (req, res) => {
            try {
                const data = req.body;
                
                // Input validation for contact form
                if (table === 'messages') {
                    const { name, surname, email, phone, message } = data;
                    
                    // Email validation using validator library
                    if (email && !validator.isEmail(email)) {
                        return res.status(400).json({ error: "Invalid email format" });
                    }
                    
                    // Sanitize inputs to prevent XSS
                    if (name && name.length > 100) return res.status(400).json({ error: "Name too long" });
                    if (surname && surname.length > 100) return res.status(400).json({ error: "Surname too long" });
                    if (phone && phone.length > 50) return res.status(400).json({ error: "Phone too long" });
                    if (message && message.length > 5000) return res.status(400).json({ error: "Message too long" });
                    
                    // Sanitize HTML content
                    data.name = name ? xss(name) : '';
                    data.surname = surname ? xss(surname) : '';
                    data.phone = phone ? xss(phone) : '';
                    data.message = message ? xss(message) : '';
                }
                
                const placeholders = fields.map(() => '?').join(',');
                const values = fields.map(f => data[f]);

                if (!data.id) {
                    data.id = uuidv4();
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
                        const to = settings.mail_to || process.env.MAIL_TO || 'admin@ionet.com.tr';
                        let transporter;

                        if (host && user && pass) {
                            const port = parseInt(settings.smtp_port) || 587;
                            const secure = settings.smtp_secure === 'true';
                            transporter = nodemailer.createTransport({
                                host, port, secure, auth: { user, pass },
                            });
                        } else {
                            // Use environment variables for fallback SMTP
                            transporter = nodemailer.createTransport({
                                host: process.env.SMTP_HOST || "smtp.ethereal.email",
                                port: parseInt(process.env.SMTP_PORT, 10) || 587,
                                secure: process.env.SMTP_SECURE === 'true',
                                auth: { 
                                    user: process.env.SMTP_USER || "test@ethereal.email", 
                                    pass: process.env.SMTP_PASS || "test-password" 
                                },
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
                            from: `"I/ONET Website" <${user || process.env.MAIL_FROM || 'contact@ionet.com.tr'}>`,
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
                console.error(`Error creating in ${table}:`, err);
                res.status(500).json({ error: "Failed to create data" });
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
                console.error(`Error updating in ${table}:`, err);
                res.status(500).json({ error: "Failed to update data" });
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
                console.error(`Error deleting from ${table}:`, err);
                res.status(500).json({ error: "Failed to delete data" });
            }
        });
    }

    return router;
};

// Login Endpoint - JWT based authentication with rate limiting
app.post('/api/auth/login', authLimiter, async (req, res) => {
    const { password } = req.body;
    
    // Validate password is provided
    if (!password) {
        return res.status(400).json({ success: false, message: 'Password required' });
    }
    
    try {
        // Get hashed password from environment
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
        const jwtSecret = process.env.JWT_SECRET;
        
        if (!adminPasswordHash || !jwtSecret) {
            console.error('Server configuration error: missing required environment variables');
            return res.status(500).json({ success: false, message: 'Server configuration error' });
        }
        
        const isValid = await bcrypt.compare(password, adminPasswordHash);
        
        if (isValid) {
            const token = jwt.sign(
                { role: 'admin' }, 
                jwtSecret,
                { expiresIn: '24h' }
            );
            res.json({ success: true, token });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ success: false, message: 'Authentication failed' });
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
        console.error('Error fetching page by slug:', err);
        res.status(500).json({ error: "Failed to fetch page" });
    }
});
app.use('/api/pages', pagesRouter);

app.use('/api/messages', createCrud('messages', ['id', 'name', 'surname', 'email', 'phone', 'message', 'date']));

// --- Settings Route ---
const settingsRouter = express.Router();

// Sensitive keys that should never be exposed to non-authenticated users
const SENSITIVE_KEYS = ['smtp_pass', 'smtp_user', 'gemini_api', 'api_key', 'secret', 'password', 'token'];

settingsRouter.get('/', async (req, res) => {
    try {
        const rows = await req.db.all(`SELECT * FROM site_settings`);
        
        // Check if request is authenticated
        const authHeader = req.headers.authorization;
        let isAuthenticated = false;
        
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            try {
                const jwtSecret = process.env.JWT_SECRET;
                if (jwtSecret) {
                    jwt.verify(token, jwtSecret);
                    isAuthenticated = true;
                }
            } catch (err) {
                // Not authenticated
            }
        }
        
        // Filter out sensitive keys for non-authenticated users
        const filteredRows = isAuthenticated 
            ? rows 
            : rows.filter(row => {
                // Check if the key contains any sensitive keyword (case-insensitive)
                const keyLower = row.ckey.toLowerCase();
                return !SENSITIVE_KEYS.some(sensitive => {
                    const sensitiveLower = String(sensitive).toLowerCase();
                    return keyLower === sensitiveLower || 
                           keyLower.endsWith('_' + sensitiveLower) ||
                           keyLower.startsWith(sensitiveLower + '_');
                });
            });
        
        res.json(filteredRows);
    } catch (err) {
        console.error('Error fetching settings:', err);
        res.status(500).json({ error: "Failed to fetch settings" });
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
            const id = uuidv4();
            await req.db.run(
                `INSERT INTO site_settings (id, ckey, value, group_name, type) VALUES (?, ?, ?, ?, ?)`,
                id, ckey, value, group_name, type
            );
        }
        res.json({ success: true, ckey, value });
    } catch (err) {
        console.error('Error saving setting:', err);
        res.status(500).json({ error: "Failed to save setting" });
    }
});

settingsRouter.delete('/:ckey', authenticate, async (req, res) => {
    try {
        const { ckey } = req.params;
        const result = await req.db.run("DELETE FROM site_settings WHERE ckey = ?", ckey);
        res.json({ success: true, message: 'Deleted', changes: result.changes });
    } catch (err) {
        console.error('Error deleting setting:', err);
        res.status(500).json({ error: "Failed to delete setting" });
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
const fs = require('fs');
const uploadDir = process.env.UPLOAD_DIR || 'server/uploads/';

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Allowed file types for upload (SVG removed due to XSS risk)
const ALLOWED_FILE_TYPES = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
    'application/pdf'
];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = uuidv4();
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images and PDFs are allowed.'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 52428800 // 50MB default
    }
});

app.post('/api/upload', uploadLimiter, authenticate, upload.single('file'), (req, res) => {
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
