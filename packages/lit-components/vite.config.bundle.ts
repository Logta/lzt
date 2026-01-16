import { defineConfig } from 'vite'
import { resolve } from 'path'

/**
 * Golang (SSR)向けバンドルビルド設定
 * 全依存関係を含む単一のバンドルファイルを生成
 * html/templateなどのSSRから利用可能
 */
export default defineConfig({
  build: {
    outDir: 'dist/bundle',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LZTComponents',
      fileName: 'lzt-components',
      formats: ['iife', 'es']
    },
    rollupOptions: {
      output: {
        // IIFEフォーマット用のグローバル変数名
        name: 'LZTComponents',
        // すべての依存関係をバンドル
        inlineDynamicImports: true,
        // 単一ファイルとして出力
        manualChunks: undefined
      }
    },
    // SSR環境で使用するため、minifyは有効化
    minify: 'esbuild'
  }
})
