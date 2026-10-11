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
      // The chat's matcher runs its model on the CPU only. ONNX Runtime's
      // WASM-only build fetches its engine at runtime (from the URL set in
      // matcher.worker.js) instead of bundling a 27 MB WebGPU engine into dist/.
      'onnxruntime-web/webgpu': path.resolve(
        __dirname,
        './node_modules/onnxruntime-web/dist/ort.wasm.min.mjs'
      ),
    },
  },
  plugins: [react()],
  // The chat's matcher worker loads the ONNX runtime with dynamic import().
  worker: { format: 'es' },
});
