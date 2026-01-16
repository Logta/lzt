import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

/**
 * Vanilla JS / Web Components向けビルド設定
 * Shadow DOMで動作する標準的なWeb Components
 */
export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
      exclude: ['src/**/*.stories.ts', 'src/**/for-react.ts']
    })
  ],
  build: {
    outDir: 'dist/wc',
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
        preserveModules: false,
        entryFileNames: '[name].js'
      }
    }
  }
})
