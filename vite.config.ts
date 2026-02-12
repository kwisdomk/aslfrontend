import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Polyfill process.env.API_KEY for local development compatibility
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY || process.env.API_KEY)
    }
  };
});