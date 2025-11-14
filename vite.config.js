import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': 'http://localhost:3000',
      '/api/me': 'http://localhost:3000',
      '/get_login': 'http://localhost:3000',
      '/update_info': 'http://localhost:3000',
      '/setup_account': 'http://localhost:3000',
    },
    watch: {
      usePolling: true,
    },
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, '/src'),
    },
  },
});
