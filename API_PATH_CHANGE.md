# API Path Change Summary

## Problem
Coolify'nin kendi management API'si `/api` path'ini kullan yordu. Bizim uygulamamızın API endpoint'leri ile çakışıyordu.

## Solution
Tüm API endpoint'leri `/api` → `/v1` olarak değiştirildi.

## Changes Made

### Backend (server/index.cjs)
- ✅ All routes changed: `/api/auth/login` → `/v1/auth/login`
- ✅ All CRUD routes: `/api/blog_posts` → `/v1/blog_posts`
- ✅ Health check: `/api/health` → `/v1/health`  
- ✅ Upload endpoint: `/api/upload` → `/v1/upload`

### Frontend
- ✅ All `.tsx` and `.ts` files updated via sed command
- ✅ DataContext.tsx - all API calls
- ✅ AuthContext.tsx - login endpoint
- ✅ Pages - all fetch calls
- ✅ Hooks - all API references

### Configuration
- ✅ vite.config.ts - proxy `/api` → `/v1`
- ✅ Dockerfile - healthcheck path
- ✅ docker-compose.yaml - healthcheck path

## Testing

Local development:
```bash
# All API calls now use /v1
curl http://localhost:3001/v1/health
curl http://localhost:3001/v1/blog_posts
```

## Deployment

1. **Push kod değişikliklerini**:
```bash
git add .
git commit -m "Change API prefix from /api to /v1 to avoid Coolify conflict"
git push
```

2. **Coolify'da rebuild** (restart değil!)

3. **Test endpoints**:
- `https://stage.ionetteknoloji.com.tr/v1/health`
- Frontend artık `/v1/*` endpointlerini çağırıyor

## Notes

- Coolify API'sine müdahale etmedik
- `/api` artık Coolify'nin kendi API'si için rezerve
- `/v1` bizim uygulama API'miz
- Ilerde `/v2` için hazır architecture
