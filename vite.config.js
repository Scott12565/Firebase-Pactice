import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsxInject: `import React from 'react';`,
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist' 
  }
});
