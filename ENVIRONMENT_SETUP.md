# Multi-Environment Setup Guide

## Overview

This application now supports three distinct environments:
- **Development** - Local development environment
- **Stage** - Staging/testing environment
- **Production** - Production environment

Each environment has its own configuration file, database, and upload directory, ensuring complete isolation between environments.

---

## 🚀 Quick Start

### Development Mode
```bash
npm run dev
```
- Uses `.env.development`
- Runs on `http://localhost:3000`
- Database: `server/db/dev.db`
- Uploads: `server/uploads/dev`

### Staging Mode
```bash
npm run dev:stage
```
- Uses `.env.stage`
- Runs on configured staging URL
- Database: `server/db/stage.db`
- Uploads: `server/uploads/stage`

### Production Mode
```bash
npm run dev:prod
```
- Uses `.env.production`
- Runs with production configuration
- Database: `server/db/prod.db`
- Uploads: `server/uploads/prod`

---

## 📦 Build Commands

### Build for Development
```bash
npm run build:dev
```
Output: `dist/` folder with development configuration

### Build for Staging
```bash
npm run build:stage
```
Output: `dist/` folder with staging configuration (base path: `/`)

### Build for Production
```bash
npm run build:prod
```
Output: `dist/` folder with production configuration (base path: `/`)

---

## 🔧 Environment File Priority

The server loads environment variables in the following order (highest priority first):

1. `.env.[environment].local` - Local overrides for specific environment (not in git)
2. `.env.[environment]` - Environment-specific configuration
3. `.env.local` - Local overrides for all environments (not in git)
4. `.env` - Default fallback (legacy)

**Example:** In development mode, if both `.env.development.local` and `.env.development` exist, the `.local` file takes precedence.

---

## 🔐 Security Best Practices

### Different Secrets for Each Environment
Each environment MUST have different values for:
- `JWT_SECRET`
- `ADMIN_PASSWORD_HASH`
- SMTP credentials

### Generating Secrets

**JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Admin Password Hash:**
```bash
node server/generate-password-hash.cjs yourpassword
```

---

## 📁 Directory Structure

```
ionet-web/
├── .env.development      # Development environment config
├── .env.stage           # Staging environment config
├── .env.production      # Production environment config
├── .env.example         # Template with all variables
├── .env.local           # Your local overrides (git ignored)
├── server/
│   ├── db/
│   │   ├── dev.db       # Development database
│   │   ├── stage.db     # Staging database
│   │   └── prod.db      # Production database
│   └── uploads/
│       ├── dev/         # Development uploads
│       ├── stage/       # Staging uploads
│       └── prod/        # Production uploads
```

---

## 🌍 Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment identifier | `development`, `staging`, `production` |
| `PORT` | Server port | `3001` |
| `JWT_SECRET` | JWT signing secret | `64-char-hex-string` |
| `ADMIN_PASSWORD_HASH` | Bcrypt admin password | `$2b$10$...` |
| `DB_PATH` | Database file path | `server/db/dev.db` |
| `VITE_BASE_PATH` | App base URL path | `/` or `/` |
| `VITE_API_URL` | Backend API URL | `http://localhost:3001` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ALLOWED_ORIGINS` | CORS allowed origins | `http://localhost:3000,...` |
| `UPLOAD_DIR` | Upload directory | `server/uploads/dev` |
| `MAX_FILE_SIZE` | Max upload size (bytes) | `52428800` (50MB) |
| `VITE_APP_ENV` | Environment display name | Same as `NODE_ENV` |

---

## 🚀 Deployment

### Deploying to Staging

1. **Configure `.env.stage`** with staging credentials and URLs
2. **Build the application:**
   ```bash
   npm run build:stage
   ```
3. **Copy files to staging server:**
   - `dist/` folder → web server document root
   - `.env.stage` → production server (rename to `.env`)
   - `server/` folder → production server
4. **On staging server:**
   ```bash
   export NODE_ENV=staging
   npm install --production
   pm2 start server/index.cjs --name ionet-stage
   ```

### Deploying to Production

1. **Configure `.env.production`** with production credentials and URLs
2. **Build the application:**
   ```bash
   npm run build:prod
   ```
3. **Copy files to production server:**
   - `dist/` folder → web server document root
   - `.env.production` → production server (rename to `.env`)
   - `server/` folder → production server
4. **On production server:**
   ```bash
   export NODE_ENV=production
   npm install --production
   pm2 start server/index.cjs --name ionet-prod
   ```

---

## 🔍 Troubleshooting

### Database Not Found
The database directories are created automatically. If you see errors:
```bash
mkdir -p server/db server/uploads/dev server/uploads/stage server/uploads/prod
```

### Wrong Environment Loaded
Check which .env file was loaded by looking at server startup logs:
```
🚀 Starting I/ONET Server
============================================================
📦 Environment: development
✓ Loaded environment from: .env.development
```

### CORS Errors
Ensure `ALLOWED_ORIGINS` in your environment file includes the frontend URL.

Development:
```env
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

Production:
```env
ALLOWED_ORIGINS=https://www.ionet.com.tr
```

---

## 💡 Tips

### Local Development Overrides
Create `.env.local` to override specific values without modifying environment files:
```env
# .env.local (not committed to git)
PORT=3002
JWT_SECRET=my-local-dev-secret
```

### Testing Production Build Locally
```bash
npm run build:prod
npm run preview
```

### Environment Indicator
The application logs which environment it's running in. In the future, you can add a visual indicator in the UI:
- Development: Badge showing "DEV"
- Staging: Badge showing "STAGE"
- Production: No badge

---

## 📝 Migration Checklist

If upgrading from the old single-.env setup:

- [x] Environment files created (`.env.development`, `.env.stage`, `.env.production`)
- [x] Vite config updated to support multiple environments
- [x] Server updated to load environment-specific .env files
- [x] Database paths configured per environment
- [x] Upload directories configured per environment
- [x] Package.json scripts updated
- [x] .gitignore updated
- [ ] Update stage/prod environment files with real credentials
- [ ] Test each environment locally
- [ ] Deploy to staging
- [ ] Deploy to production

---

## 📚 Additional Resources

- [Vite Environment Variables Documentation](https://vitejs.dev/guide/env-and-mode.html)
- [Node.js dotenv Documentation](https://github.com/motdotla/dotenv)
- Environment files are loaded at server startup
- Changes to .env files require server restart
