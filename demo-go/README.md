# LZT UI - Golang Demo

GolangのウェブサーバーでLZT UIのWeb Componentsを使用するデモアプリケーションです。

## 概要

このデモは以下を実装しています：

- Golangの標準ライブラリ（`net/http`と`html/template`）を使用したウェブサーバー
- バンドルされたWeb Components（IIFE形式）の配信
- インタラクティブなUI要素（Button、Dropdown）
- イベントハンドリングとJavaScript統合

## セットアップ

### 1. バンドルのビルド

まだビルドしていない場合は、プロジェクトルートでバンドルをビルドします：

```bash
cd ..
pnpm build:bundle
```

これにより `packages/lit-components/dist/bundle/lzt-components.iife.js` が生成されます。

### 2. バンドルのコピー

バンドルファイルを静的ディレクトリにコピーします（既にコピー済みの場合はスキップ）：

```bash
cp ../packages/lit-components/dist/bundle/lzt-components.iife.js static/
```

## 実行方法

### Goサーバーの起動

```bash
cd demo-go
go run main.go
```

サーバーが起動したら、ブラウザで以下のURLにアクセスします：

```
http://localhost:8080
```

## ファイル構成

```
demo-go/
├── main.go                  # Goウェブサーバー
├── templates/
│   └── index.html          # HTMLテンプレート
├── static/
│   └── lzt-components.iife.js  # バンドルされたWeb Components
└── README.md               # このファイル
```

## 技術スタック

- **Backend**: Go (net/http + html/template)
- **Frontend**: LZT UI Web Components
  - Lit (Web Components)
  - Zag.js (State Machine)
  - CSS Custom Properties (Styling)
- **Bundle Format**: IIFE (Immediately Invoked Function Expression)

## デモの内容

### 1. Button Component

様々なバリエーションのボタン：
- Variants: default, primary, secondary, success, danger
- Sizes: small, medium, large
- Disabled state

```html
<lzt-button variant="primary">Primary</lzt-button>
```

### 2. Dropdown Component

Zag.jsのメニューステートマシンを使用したアクセシブルなドロップダウン：

```html
<lzt-dropdown label="Select an option">
  <lzt-dropdown-item value="1">Option 1</lzt-dropdown-item>
  <lzt-dropdown-item value="2">Option 2</lzt-dropdown-item>
</lzt-dropdown>
```

### 3. Combined Example

複数のコンポーネントを組み合わせた実用的な例：
- テーマ選択
- 言語選択
- 保存とリセット機能

## イベントハンドリング

Web Componentsは標準のCustomEventを使用してイベントを発火します：

```javascript
// Button click event
button.addEventListener('button-click', (e) => {
  console.log('Button clicked!');
});

// Dropdown change event
dropdown.addEventListener('change', (e) => {
  console.log('Selected:', e.detail.value, e.detail.label);
});
```

## SSR（サーバーサイドレンダリング）について

このデモはGoの`html/template`を使用してHTMLをサーバーサイドでレンダリングしています：

```go
data := struct {
    Title   string
    Message string
}{
    Title:   "LZT UI - Golang Demo",
    Message: "Golang + Web Components Demo",
}

tmpl.Execute(w, data)
```

Web Componentsは以下のように使用できます：

1. **静的なコンポーネント**: HTMLテンプレートに直接記述
2. **動的なコンポーネント**: Goのテンプレート構文で動的に生成

```html
<!-- 静的 -->
<lzt-button variant="primary">Click me</lzt-button>

<!-- 動的（Goテンプレート） -->
{{range .Items}}
  <lzt-dropdown-item value="{{.Value}}">{{.Label}}</lzt-dropdown-item>
{{end}}
```

## 本番環境への展開

本番環境で使用する場合の推奨事項：

1. **バンドルの最適化**: 圧縮されたバンドルを使用
2. **キャッシュ**: 静的ファイルに適切なCache-Controlヘッダーを設定
3. **CDN**: 静的ファイルをCDNから配信
4. **HTTPS**: セキュアな接続を使用

例：

```go
// キャッシュヘッダーの追加
func staticHandler(h http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Cache-Control", "public, max-age=31536000")
        h.ServeHTTP(w, r)
    })
}

http.Handle("/static/", staticHandler(http.StripPrefix("/static/", fs)))
```

## トラブルシューティング

### コンポーネントが表示されない

1. ブラウザのコンソールでエラーを確認
2. バンドルファイルが正しく配信されているか確認：`http://localhost:8080/static/lzt-components.iife.js`
3. バンドルが最新版かどうか確認（必要に応じて再ビルド）

### イベントが発火しない

1. コンポーネントが完全にロードされた後にイベントリスナーを追加しているか確認
2. カスタムイベント名が正しいか確認（`button-click`, `change`など）

## 参考情報

- [Lit Documentation](https://lit.dev/)
- [Zag.js Documentation](https://zagjs.com/)
- [Web Components MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Go html/template](https://pkg.go.dev/html/template)
