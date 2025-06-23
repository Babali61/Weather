import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/WealthHealth/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './app')
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      format: {
        comments: false
      }
    },
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].min.js',
        chunkFileNames: 'assets/[name].min.js',
        assetFileNames: 'assets/[name].[ext]',
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router', 'react-router-dom']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
