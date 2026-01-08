import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/postcss'

/**
 * React向けビルド設定
 * @lit/reactでラップされたReactコンポーネントとしてエクスポート
 */
export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
      exclude: ['src/**/*.stories.ts']
    })
  ],
  build: {
    outDir: 'dist/react',
    lib: {
      entry: {
        index: resolve(__dirname, 'src/indexToReact.ts'),
        button: resolve(__dirname, 'src/button/for-react.ts'),
        dropdown: resolve(__dirname, 'src/dropdown/for-react.ts')
      },
      formats: ['es']
    },
    rollupOptions: {
      external: ['lit', '@zag-js/menu', '@zag-js/core', 'react', '@lit/react'],
      output: {
        preserveModules: false,
        entryFileNames: '[name].js'
      }
    }
  },
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  }
})
