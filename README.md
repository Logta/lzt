# LZT UI

Lit + Zag.js + Tailwind CSS v4で構築されたUIコンポーネントライブラリ

Zag.jsのステートマシンを活用し、WAI-ARIA準拠のアクセシブルなWeb Componentsを提供します。

## プロジェクト構成

このプロジェクトはpnpm workspaceを使用したモノレポ構成になっています：

- `packages/lit-components`: Litで開発されたWeb Componentsライブラリ
- `packages/react-demo`: ReactでLitコンポーネントを使用するデモアプリケーション

## セットアップ

```bash
# 依存関係のインストール
pnpm install
```

## 開発

### Litコンポーネントの開発

```bash
# Litコンポーネントの開発サーバーを起動
pnpm dev

# または
cd packages/lit-components
pnpm dev
```

http://localhost:5173 でLitコンポーネントのデモページが表示されます。

### Storybookでコンポーネントを確認

```bash
# Storybookを起動
pnpm storybook

# または
cd packages/lit-components
pnpm storybook
```

http://localhost:6006 でStorybookが表示されます。

Storybookでは以下が確認できます：
- 各コンポーネントの様々なバリエーション
- インタラクティブなプロパティ制御
- コンポーネントのドキュメント
- 使用例とサンプルコード

### React環境でのテスト

```bash
# React demoアプリケーションを起動
pnpm dev:react

# または
cd packages/react-demo
pnpm dev
```

http://localhost:5173 でReactアプリケーションが表示されます。

## ビルド

このプロジェクトは3つの異なるビルドターゲットをサポートしています：

### 1. Vanilla JS / Web Components向けビルド

標準的なWeb Componentsとして使用できる形式です。

```bash
pnpm build:wc
```

出力: `packages/lit-components/dist/wc/`

### 2. React向けビルド

`@lit/react`でラップされたReactコンポーネントとして使用できる形式です。

```bash
pnpm build:react
```

出力: `packages/lit-components/dist/react/`

### 3. Golang (SSR)向けバンドルビルド

全ての依存関係を含む単一ファイルとして出力され、SSR環境で使用できます。

```bash
pnpm build:bundle
```

出力: `packages/lit-components/dist/bundle/`
- `lzt-components.iife.js` - ブラウザでグローバル変数として使用可能
- `lzt-components.js` - ESモジュール形式

### すべてビルド

```bash
pnpm build
```

上記3つすべてをビルドします。

### Storybookのビルド

```bash
pnpm build-storybook
```

出力: `packages/lit-components/storybook-static`

## 使用方法

### 1. Vanilla JavaScript / HTML (Web Components)

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="module">
      import '@lzt/lit-components/wc';
    </script>
  </head>
  <body>
    <lzt-button variant="primary">Click me</lzt-button>

    <lzt-dropdown label="Select an option">
      <lzt-dropdown-item value="1">Option 1</lzt-dropdown-item>
      <lzt-dropdown-item value="2">Option 2</lzt-dropdown-item>
    </lzt-dropdown>
  </body>
</html>
```

### 2. React (Reactラッパーを使用)

```tsx
import { TailwindButton, TailwindDropdown, TailwindDropdownItem } from '@lzt/lit-components/react';

function App() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  const handleChange = (e: CustomEvent) => {
    console.log('Selected:', e.detail.value);
  };

  return (
    <div>
      <TailwindButton
        variant="primary"
        size="medium"
        onButtonClick={handleClick}
      >
        Click me
      </TailwindButton>

      <TailwindDropdown
        label="Select an option"
        onChange={handleChange}
      >
        <TailwindDropdownItem value="1">Option 1</TailwindDropdownItem>
        <TailwindDropdownItem value="2">Option 2</TailwindDropdownItem>
      </TailwindDropdown>
    </div>
  );
}
```

### 3. React (Web Componentsを直接使用)

```tsx
import '@lzt/lit-components/wc';

function App() {
  return (
    <div>
      <lzt-button variant="primary">Click me</lzt-button>

      <lzt-dropdown label="Select an option">
        <lzt-dropdown-item value="1">Option 1</lzt-dropdown-item>
        <lzt-dropdown-item value="2">Option 2</lzt-dropdown-item>
      </lzt-dropdown>
    </div>
  );
}
```

### 4. Golang (SSR) / html/template

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- IIFEバンドルを使用 -->
    <script src="/static/lzt-components.iife.js"></script>
  </head>
  <body>
    <lzt-button variant="primary">Click me</lzt-button>

    <lzt-dropdown label="Select an option">
      <lzt-dropdown-item value="1">Option 1</lzt-dropdown-item>
      <lzt-dropdown-item value="2">Option 2</lzt-dropdown-item>
    </lzt-dropdown>
  </body>
</html>
```

## コンポーネント

### Button

様々なバリエーションのボタンコンポーネント

**使用例:**

```html
<lzt-button>Default</lzt-button>
<lzt-button variant="primary">Primary</lzt-button>
<lzt-button variant="secondary">Secondary</lzt-button>
<lzt-button variant="danger">Danger</lzt-button>
<lzt-button disabled>Disabled</lzt-button>
```

**プロパティ:**

- `label`: `string` - ボタンのラベル (デフォルト: `'Button'`)
- `variant`: `'default' | 'primary' | 'secondary' | 'success' | 'danger'` (デフォルト: `'default'`)
- `size`: `'small' | 'medium' | 'large'` (デフォルト: `'medium'`)
- `disabled`: `boolean` (デフォルト: `false`)
- `type`: `'button' | 'submit' | 'reset'` (デフォルト: `'button'`)

**イベント:**

- `button-click`: ボタンがクリックされたときに発火

### Dropdown

Zag.jsのメニューステートマシンを使用した、WAI-ARIA準拠のドロップダウンメニューコンポーネント

**使用例:**

```html
<lzt-dropdown label="Select an option">
  <lzt-dropdown-item value="option1">Option 1</lzt-dropdown-item>
  <lzt-dropdown-item value="option2">Option 2</lzt-dropdown-item>
  <lzt-dropdown-item value="option3">Option 3</lzt-dropdown-item>
</lzt-dropdown>
```

**プロパティ:**

- `label`: `string` - 未選択時に表示されるラベル (デフォルト: `'Select...'`)
- `value`: `string` - 選択された値

**イベント:**

- `change`: 選択が変更されたときに発火
  - `detail.value`: 新しい値
  - `detail.previousValue`: 前の値
  - `detail.label`: 選択されたアイテムのラベル

## アーキテクチャ

### TailwindElement

すべてのコンポーネントは`TailwindElement`ベースクラスを継承しています。このクラスはTailwind CSSスタイルを自動的にShadow DOMに注入します。

```typescript
import { TailwindElement } from './base-element.js'

@customElement('my-component')
export class MyComponent extends TailwindElement {
  // Tailwind CSSクラスが利用可能
}
```

### Zag.js統合

Dropdownコンポーネントは`useMachine`ユーティリティを通じてZag.jsのステートマシンを利用しています。これにより、複雑なUI状態を堅牢に管理できます。

```typescript
private service = useMachine(menu.machine, {
  context: {
    open: false,
  },
})
```

## Reactでの使用

Reactアプリケーションで使用する場合は、以下のようにインポートします：

```tsx
import '@lzt/lit-components'

function App() {
  const handleClick = () => {
    console.log('Button clicked!')
  }

  return (
    <div>
      <lzt-button variant="primary" onClick={handleClick}>
        Click me
      </lzt-button>
    </div>
  )
}
```

## 技術スタック

- **Lit**: Web Componentsフレームワーク
- **Zag.js**: ステートマシンベースのUI状態管理
- **TypeScript**: 型安全性
- **Tailwind CSS v4**: スタイリング
- **Vite**: ビルドツール
- **pnpm**: パッケージマネージャー

## 主な特徴

- **ステートマシン駆動**: Zag.jsによる堅牢な状態管理
- **アクセシビリティ**: WAI-ARIA準拠の実装
- **フレームワーク非依存**: Web Components標準に基づく
- **型安全**: TypeScriptによる完全な型サポート
- **モダンなスタイリング**: Tailwind CSS v4の最新機能

## ライセンス

MIT
