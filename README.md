<div align="center">
<img width="1200" height="475" alt="I/ONET Web Application" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# I/ONET Web Application

A professional corporate website built with React, TypeScript, and Express, featuring a comprehensive admin panel and multi-environment support.

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)

---

## 🌟 Features

- ✅ **Multi-Environment Support** - Development, Staging, and Production configurations
- ✅ **Admin Panel** - Comprehensive content management system
- ✅ **Dynamic Content** - Manage pages, blog posts, services, and more
- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
- ✅ **SEO Optimized** - Automatic sitemap and robots.txt generation
- ✅ **Security** - JWT authentication, rate limiting, input validation
- ✅ **File Upload** - Secure image and document upload system
- ✅ **Email Integration** - Contact form with SMTP support

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ionet-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   # Copy example environment file
   cp .env.example .env.development
   
   # Generate JWT secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   
   # Generate admin password hash
   node server/generate-password-hash.cjs yourpassword
   ```

4. **Update `.env.development`** with your settings

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001
   - Admin Panel: http://localhost:3000/admin

---

## 🎯 Environment Setup

This application supports three environments with complete isolation:

| Environment | Config File | Base Path | Database | Purpose |
|------------|-------------|-----------|----------|---------|
| **Development** | `.env.development` | `/` | `server/db/dev.db` | Local development |
| **Staging** | `.env.stage` | `/ionet-web` | `server/db/stage.db` | Testing/QA |
| **Production** | `.env.production` | `/ionet-web` | `server/db/prod.db` | Live deployment |

### Available Commands

```bash
# Development
npm run dev              # Start dev server
npm run build:dev        # Build for development

# Staging
npm run dev:stage        # Start staging server (local)
npm run build:stage      # Build for staging

# Production
npm run build:prod       # Build for production
npm run preview          # Preview production build
```

### Deployment

```bash
# Automated setup (creates environment, builds, and starts PM2)
sudo ./setup.sh

# Quick deployment
./deploy.sh [environment]

# Examples:
./deploy.sh development
./deploy.sh staging
./deploy.sh production
```

📖 **Detailed Setup Guide**: See [ENVIRONMENT_SETUP.md](ENVIRONMENT_SETUP.md) for comprehensive documentation.

---

## 📂 Project Structure

```
ionet-web/
├── components/          # Reusable React components
├── context/            # React context providers (Auth, Data)
├── hooks/              # Custom React hooks
├── pages/              # Page components
│   ├── admin/         # Admin panel pages
│   └── ...            # Public pages
├── server/            # Backend Express server
│   ├── db.cjs        # Database configuration
│   ├── index.cjs     # Main server file
│   └── db/           # SQLite databases (per environment)
├── .env.development   # Development environment config
├── .env.stage         # Staging environment config
├── .env.production    # Production environment config
├── vite.config.ts     # Vite build configuration
├── setup.sh           # Automated setup script
└── deploy.sh          # Deployment script
```

---

## 🔐 Security Features

- **JWT Authentication** - Secure admin panel access
- **Password Hashing** - Bcrypt with salt rounds
- **Rate Limiting** - Protection against brute force
- **Input Validation** - XSS and injection prevention
- **CORS Configuration** - Environment-specific origins
- **File Type Validation** - Magic byte verification
- **Environment Isolation** - Separate credentials per environment

---

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **React Quill** - Rich text editor

### Backend
- **Express** - Node.js web framework
- **SQLite** - Lightweight database
- **JWT** - Authentication
- **Multer** - File uploads
- **Nodemailer** - Email sending
- **PM2** - Process management

---

## 📊 Admin Panel Features

Access the admin panel at `/admin/login` (default password: `admin123`)

- 📝 **Content Management**
  - Pages (dynamic routes)
  - Blog posts
  - Job listings
  - Projects/References
  
- 🎨 **Customization**
  - Site settings
  - Menu items
  - Home page sections
  - Footer content
  
- 📧 **Communication**
  - Contact form submissions
  - Email configuration
  
- 📤 **Media Management**
  - Image upload
  - File management

---

## 🌐 API Endpoints

### Public Endpoints
- `GET /api/settings` - Site settings (filtered)
- `GET /api/pages` - Dynamic pages
- `GET /api/blog_posts` - Blog articles
- `POST /api/messages` - Contact form submission
- `GET /sitemap.xml` - SEO sitemap
- `GET /robots.txt` - Search engine directives
- `GET /api/health` - Health check & environment info

### Protected Endpoints (Require Authentication)
- `POST /api/auth/login` - Admin login
- `POST /api/upload` - File upload
- `PUT /api/*` - Update content
- `DELETE /api/*` - Delete content

---

## 🔧 Configuration

### Environment Variables

See [`.env.example`](.env.example) for all available configuration options.

**Essential Variables:**
- `NODE_ENV` - Environment (development/staging/production)
- `PORT` - Server port
- `DB_PATH` - Database file path
- `JWT_SECRET` - JWT signing secret
- `ADMIN_PASSWORD_HASH` - Admin password hash
- `VITE_BASE_PATH` - Application base path
- `VITE_API_URL` - API endpoint URL

---

## 🧪 Health Check

Check application status:

```bash
curl http://localhost:3001/api/health
```

Response:
```json
{
  "status": "healthy",
  "environment": "development",
  "uptime": 3600,
  "uptimeFormatted": "1h 0m",
  "database": "connected",
  "databasePath": "server/db/dev.db",
  "timestamp": "2025-12-22T10:00:00.000Z",
  "version": "1.0.0"
}
```

---

## 📝 License

This project is proprietary software owned by I/ONET Teknoloji A.Ş.

---

## 🤝 Support

For support and questions:
- 📧 Email: info@ionet.com.tr
- 📞 Phone: +90 (212) 555 00 00
- 🌐 Website: https://www.ionet.com.tr

---

## 🎓 Additional Resources

- [ENVIRONMENT_SETUP.md](ENVIRONMENT_SETUP.md) - Detailed environment configuration guide
- [.env.example](.env.example) - Environment variables template
- Server logs: `pm2 logs ionet-[environment]`

---

<div align="center">
Made with ❤️ by I/ONET Teknoloji A.Ş.
</div>
