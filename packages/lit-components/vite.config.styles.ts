import { defineConfig } from 'vite'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/postcss'

export default defineConfig({
  build: {
    outDir: 'dist/styles',
    rollupOptions: {
      input: {
        styles: resolve(__dirname, 'src/styles.css')
      },
      output: {
        assetFileNames: 'index.css'
      }
    }
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss()
      ]
    }
  }
})
