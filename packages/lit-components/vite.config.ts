import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

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
        button: resolve(__dirname, 'src/button/button.ts'),
        dropdown: resolve(__dirname, 'src/dropdown/dropdown.ts')
      },
      formats: ['es']
    },
    rollupOptions: {
      external: ['lit', '@zag-js/menu', '@zag-js/core'],
      output: {
        preserveModules: false
      }
    }
  }
})
