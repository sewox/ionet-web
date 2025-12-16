const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const getDb = require('./db.cjs');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

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
const createCrud = (table, fields) => {
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
    router.post('/', async (req, res) => {
        try {
            const data = req.body;
            const placeholders = fields.map(() => '?').join(',');
            const values = fields.map(f => data[f]);

            if (!data.id) {
                data.id = Date.now().toString();
                values[0] = data.id;
            }

            await req.db.run(
                `INSERT INTO ${table} (${fields.join(',')}) VALUES (${placeholders})`,
                ...values
            );
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // DELETE
    router.delete('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            await req.db.run(`DELETE FROM ${table} WHERE id = ?`, id);
            res.json({ message: 'Deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

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
app.use('/api/messages', createCrud('messages', ['id', 'name', 'surname', 'email', 'phone', 'message', 'date']));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
