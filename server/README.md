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
   # Generate password hash:
   node server/generate-password-hash.cjs your-secure-password
   ```

3. **ALLOWED_ORIGINS**: Comma-separated list of allowed CORS origins
   ```
   ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3001,https://yourdomain.com
   ```

### Optional Variables

- **PORT**: Server port (default: 3001)
- **UPLOAD_DIR**: Upload directory path (default: server/uploads/)
- **MAX_FILE_SIZE**: Maximum file upload size in bytes (default: 52428800 = 50MB)
- **SMTP_*** variables for email configuration

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
   node server/generate-password-hash.cjs YourSecurePassword123!
   ```
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
