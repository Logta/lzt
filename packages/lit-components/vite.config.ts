import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/postcss'

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true
    })
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        button: resolve(__dirname, 'src/button.ts'),
        dropdown: resolve(__dirname, 'src/dropdown.ts')
      },
      formats: ['es']
    },
    rollupOptions: {
      external: ['lit'],
      output: {
        preserveModules: false
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
