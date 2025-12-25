import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables based on mode
  // mode will be 'development', 'stage', or 'production'
  const env = loadEnv(mode, '.', '');

  // Determine API URL for proxy (only used in dev server)
  const apiUrl = env.VITE_API_URL || 'http://localhost:3001';

  // Normalize base path (ensure trailing slash for consistency)
  const basePath = env.VITE_BASE_PATH || '/';
  const normalizedBase = basePath.endsWith('/') ? basePath : basePath + '/';

  console.log(`[Vite] Running in ${mode} mode`);
  console.log(`[Vite] Base Path: ${normalizedBase}`);
  console.log(`[Vite] API URL: ${apiUrl}`);

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      proxy: {
        '/v1': {
          target: apiUrl,
          changeOrigin: true,
          secure: false,
        },
        '/sitemap.xml': {
          target: apiUrl,
          changeOrigin: true,
        },
        '/robots.txt': {
          target: apiUrl,
          changeOrigin: true,
        }
      }
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      // Make environment info available to the app
      'import.meta.env.VITE_APP_ENV': JSON.stringify(env.VITE_APP_ENV || mode),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    base: normalizedBase,
  };
});
