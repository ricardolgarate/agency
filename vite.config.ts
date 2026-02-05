import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    define: {
      'import.meta.env.FIREBASE_API_KEY': JSON.stringify(env.FIREBASE_API_KEY ?? ''),
      'import.meta.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(env.FIREBASE_AUTH_DOMAIN ?? ''),
      'import.meta.env.FIREBASE_PROJECT_ID': JSON.stringify(env.FIREBASE_PROJECT_ID ?? ''),
      'import.meta.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(env.FIREBASE_STORAGE_BUCKET ?? ''),
      'import.meta.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(
        env.FIREBASE_MESSAGING_SENDER_ID ?? ''
      ),
      'import.meta.env.FIREBASE_APP_ID': JSON.stringify(env.FIREBASE_APP_ID ?? ''),
      'import.meta.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(env.FIREBASE_MEASUREMENT_ID ?? '')
    }
  };
});
