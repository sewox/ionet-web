# Dokploy Deployment Guide

## 📋 Ön Hazırlık

### 1. Environment Variables
Dokploy'da aşağıdaki environment variables'ları ayarlayın:

#### Build-Time Variables (Build sırasında gerekli)
```bash
VITE_BASE_PATH=/
VITE_API_URL=https://stage.ionetteknoloji.com.tr
VITE_APP_ENV=staging
```

#### Runtime Variables
```bash
NODE_ENV=staging
PORT=3001
DB_PATH=server/db/stage.db
UPLOAD_DIR=server/uploads/stage

# Security
JWT_SECRET=<güvenli-random-string>
ADMIN_PASSWORD_HASH=<bcrypt-hash>

# CORS & Domain
ALLOWED_ORIGINS=https://stage.ionetteknoloji.com.tr
SITE_URL=https://stage.ionetteknoloji.com.tr

# Email (optional)
MAIL_TO=admin@ionetteknoloji.com.tr
MAIL_FROM=noreply@ionetteknoloji.com.tr
```

## 🚀 Deployment

### Dokploy'da Yeni Proje

1. **Create New Project**
   - Name: `ionet-web-staging`
   - Type: Docker Compose

2. **Repository**
   - Git URL: `https://github.com/sewox/ionet-web`
   - Branch: `main`

3. **Build Configuration**
   - Docker Compose File: `docker-compose.yml`
   - Environment: Yukarıdaki variables'ları ekleyin

4. **Domain**
   - Add Domain: `stage.ionetteknoloji.com.tr`
   - SSL: Auto (Let's Encrypt)

5. **Deploy**
   - Click "Deploy"
   - Build logs'u izleyin:
     - `npm ci`
     - `npm run build:stage`
     - `✓ built in XXXms`

## ✅ Deployment Sonrası

### Health Check
```bash
curl https://stage.ionetteknoloji.com.tr/v1/health
```

Beklenen response:
```json
{
  "status": "healthy",
  "environment": "staging",
  ...
}
```

### Frontend Test
```bash
curl -I https://stage.ionetteknoloji.com.tr/
```

Beklenen: `200 OK` + `text/html`

## 🔧 Troubleshooting

### Build Fails
- Environment variables build-time'da set mi?
- `VITE_*` variables eksik olabilir

### 401 Unauthorized
- `ALLOWED_ORIGINS` doğru mu?
- Domain SSL sertifikası aktif mi?

### Database/Upload Issues
- Volumes doğru mount edildi mi?
- `DB_PATH` ve `UPLOAD_DIR` path'leri doğru mu?

## 📚 Dokploy Özellikleri

- ✅ Auto SSL (Let's Encrypt)
- ✅ Zero-downtime deployments
- ✅ Automatic health checks
- ✅ Volume persistence
- ✅ Environment variable management
- ✅ Build logs ve monitoring

## 🔄 Update Deployment

Yeni kod push ettiğinizde:
```bash
git push origin main
```

Dokploy otomatik deploy yapacak (webhook varsa).
Manuel: Dokploy UI → "Redeploy"
