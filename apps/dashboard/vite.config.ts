import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Force single instances to prevent "No QueryClient set" errors in monorepos
    dedupe: ['react', 'react-dom', '@tanstack/react-query'],
    alias: {
      '@': path.resolve(__dirname, '../../packages/shared/src'),
      '@shared': path.resolve(__dirname, '../../packages/shared/src'),
      '@shared/components': path.resolve(__dirname, '../../packages/shared/src/components'),
      '@restaurant': path.resolve(__dirname, '../../packages/types/src'),
      '@restaurant/types': path.resolve(__dirname, '../../packages/types/src'),
      '@api-client': path.resolve(__dirname, '../../packages/api-client/src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
  },
  base: process.env.NODE_ENV === 'production' ? '/restaurant/' : '/',
});
