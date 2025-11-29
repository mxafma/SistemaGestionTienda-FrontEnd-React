import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { configDefaults } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
  },
  test: {
    ...configDefaults,
    environment: 'jsdom',        // 👉 necesario para simular el navegador
    globals: true,               // 👉 describe/it/expect globales
    setupFiles: './src/setupTests.ts',  // 👉 jest-dom
  }
});
