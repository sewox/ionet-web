# Coolify Build Troubleshooting

## ❌ Problem
Vite build failing with "Could not resolve entry module 'index.html'"

## 🔍 Root Cause
You're trying to run `npm run build` INSIDE the running container, but:
1. ✅ Dockerfile already builds frontend in **builder stage** (line 35-39)
2. ✅ Built files are copied to `/app/dist` in production stage (line 63)
3. ❌ Running build manually in container is wrong - build happens during **Docker build**, not runtime

## ✅ Solution

### The Correct Flow:
```
Coolify Build Process:
1. docker build (with VITE_* args) → Vite builds → dist/ created
2. docker run → Server starts → Serves /app/dist
```

### What You Should Do:

1. **Check Coolify Build Logs**
   - Go to Coolify → Your App → **Deployments** tab
   - Click latest deployment → **Build Logs**
   - Look for:
     ```
     npm run build:stage
     ✓ built in XXXms
     ```

2. **Verify Environment Variables in Coolify UI**
   ```
   BUILD_ENV=stage
   VITE_BASE_PATH=/
   VITE_API_URL=https://stage.ionetteknoloji.com.tr
   VITE_APP_ENV=staging
   ```

3. **If Build Failed in Coolify**
   - Ensure all VITE_* variables are set BEFORE deploy
   - Redeploy (rebuild, not restart)

4. **Inside Running Container (for testing only)**
   ```bash
   # Check if dist exists
   ls -la /app/dist
   
   # If dist exists, your build was successful!
   # Just start the server:
   node server/index.cjs
   ```

## 🚨 Common Mistakes

❌ **Don't** run `npm run build` inside container
✅ **Do** let Coolify build during `docker build`

❌ **Don't** expect `/app/index.html` to exist (it's only in builder stage)
✅ **Do** check `/app/dist/index.html` (final location)

## 📋 Quick Debug Checklist

Inside container:
```bash
# 1. Check dist folder
ls -la /app/dist/

# 2. Check if index.html is there
cat /app/dist/index.html | head -20

# 3. Check server can find it
node -e "const path = require('path'); const fs = require('fs'); console.log(fs.existsSync(path.join(__dirname, 'dist', 'index.html')))"
```

If `/app/dist/` is empty or missing → **Coolify build failed**
If `/app/dist/index.html` exists → **Build OK, check server routing**
