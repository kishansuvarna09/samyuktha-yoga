import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@data': path.resolve(__dirname, './src/data'),
      '@lib': path.resolve(__dirname, './lib'),
      '@lotties': path.resolve(__dirname, './src/lotties'),
    },
  },
  plugins: [react()],
});
