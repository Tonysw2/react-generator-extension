import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'manifest.json',
          dest: '.',
        },
        {
          src: 'src/assets/icons/*',
          dest: 'images',
        },
      ],
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, 'index.html'),
      },

      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name]-chunk.js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
})
