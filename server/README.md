# Server Security Setup

## Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

### Required Variables

1. **JWT_SECRET**: A strong random string for JWT token signing
   ```bash
   # Generate a secure random secret:
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

2. **ADMIN_PASSWORD_HASH**: Bcrypt hash of the admin password
   ```bash
   # Generate password hash (prompts for password interactively):
   node server/generate-password-hash.cjs
   ```
   Copy the output and add it to `.env` as `ADMIN_PASSWORD_HASH=<hash>`.

   > **Security Note:** The script prompts for the password interactively to avoid
   > storing it in shell history or exposing it in process listings.

3. **ALLOWED_ORIGINS**: Comma-separated list of allowed CORS origins
   ```
   # Frontend runs on port 3000, backend on 3001
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:3001,https://yourdomain.com
   ```

### Optional Variables

- **PORT**: Server port (default: 3001, frontend typically uses 3000)
- **UPLOAD_DIR**: Upload directory path (default: server/uploads/)
- **MAX_FILE_SIZE**: Maximum file upload size in bytes (default: 52428800 = 50MB)
- **SMTP_*** variables for email configuration (fallback if not configured in admin panel)

### Email Configuration

Email settings can be managed in two ways:
1. **Admin Panel** (Recommended): Configure SMTP settings through the Site Settings interface
2. **Environment Variables** (Fallback): Set SMTP_* variables in `.env` file

The system checks the database first for email configuration. If not found, it falls back to environment variables.

## First Time Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Generate a JWT secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))" >> .env
   ```
   Then edit `.env` and set it as `JWT_SECRET=<generated-value>`

3. Generate an admin password hash:
   ```bash
   node server/generate-password-hash.cjs
   ```
   Enter your password when prompted (input will be hidden for security).
   Copy the output and add it to `.env` as `ADMIN_PASSWORD_HASH=<hash>`

4. Update ALLOWED_ORIGINS with your frontend URL

5. Start the server:
   ```bash
   npm run dev
   ```

## Security Features

- ✅ JWT-based authentication with token expiry
- ✅ Bcrypt password hashing
- ✅ CORS restricted to allowed origins
- ✅ SQL injection protection via parameterized queries and table/field validation
- ✅ Input validation and sanitization
- ✅ File upload validation (type, size)
- ✅ Sensitive settings filtered from unauthenticated requests
- ✅ UUID-based ID generation
- ✅ Sanitized error messages (no database details exposed)
- ✅ Environment-based configuration
