# LZT UI

Lit + Zag.jsで構築されたUIコンポーネントライブラリ

Zag.jsのステートマシンを活用し、WAI-ARIA準拠のアクセシブルなWeb Componentsを提供します。

## プロジェクト構成

このプロジェクトはpnpm workspaceを使用したモノレポ構成になっています：

- `packages/lit-components`: Litで開発されたWeb Componentsライブラリ
- `packages/react-demo`: ReactでLitコンポーネントを使用するデモアプリケーション

## セットアップ

### 前提条件

以下のいずれかの環境が必要です：

**オプション1: mise を使用（推奨）**
- [mise](https://mise.jdx.dev/) がインストールされていること
- mise.tomlで以下が自動的にインストールされます：
  - Node.js 24.3.0
  - pnpm 10.12.3
  - Go (latest)

**オプション2: ローカル環境**
- Node.js 24.3.0
- pnpm 10.12.3
- Go (latest) - demo-goを実行する場合のみ

**オプション3: Docker**
- Docker と Docker Compose

### mise を使用したセットアップ（推奨）

```bash
# miseで依存関係を自動インストール
mise install

# プロジェクトの依存関係をインストール
mise run install

# 開発サーバーを起動
mise run dev

# Storybookを起動
mise run storybook

# React demoを起動
mise run dev:react

# Go demoのセットアップ（ビルド＆バンドルコピー）
mise run setup:go

# Go demoサーバーを起動
mise run dev:go
```

### ローカル環境（miseなし）

```bash
# 依存関係のインストール
pnpm install
```

### Docker環境

Docker Composeは以下の3つのサービスを提供します：

1. **builder**: Litコンポーネントをビルド
2. **react-demo**: React demoアプリケーション
3. **demo-go**: Go demoアプリケーション

```bash
# React demoを起動
docker-compose up react-demo

# Litをビルドして、Go demoを起動
docker-compose up builder demo-go

# 個別にビルドのみ実行
docker-compose run --rm builder
```

## 開発

### ローカル環境での開発

#### Litコンポーネントの開発

```bash
# Litコンポーネントの開発サーバーを起動
pnpm dev

# または
cd packages/lit-components
pnpm dev
```

http://localhost:5173 でLitコンポーネントのデモページが表示されます。

#### Storybookでコンポーネントを確認

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

#### React環境でのテスト

```bash
# React demoアプリケーションを起動
pnpm dev:react

# または
cd packages/react-demo
pnpm dev
```

http://localhost:5173 でReactアプリケーションが表示されます。

### Docker環境での開発

Docker環境では以下の3つのサービスを利用できます：

#### React demoの起動

```bash
# React demoアプリケーションを起動
docker-compose up react-demo

# バックグラウンドで実行
docker-compose up -d react-demo
```

http://localhost:5173 でReactアプリケーションにアクセスできます。

#### Litコンポーネントのビルド

```bash
# コンポーネントをビルド
docker-compose run --rm builder
```

ビルド成果物は `packages/lit-components/dist` に出力されます。

#### Go demoの起動

```bash
# Litをビルドして、Go demoを起動
docker-compose up builder demo-go

# バックグラウンドで実行
docker-compose up -d builder demo-go
```

http://localhost:8080 でGoアプリケーションにアクセスできます。

#### サービスの管理

```bash
# 実行中のサービスを確認
docker-compose ps

# ログを確認
docker-compose logs -f

# サービスを停止
docker-compose down

# ボリュームも含めて削除
docker-compose down -v
```

## ビルド

このプロジェクトは3つの異なるビルドターゲットをサポートしています：

### ローカル環境でのビルド

#### 1. Vanilla JS / Web Components向けビルド

標準的なWeb Componentsとして使用できる形式です。

```bash
pnpm build:wc
```

出力: `packages/lit-components/dist/wc/`

#### 2. React向けビルド

`@lit/react`でラップされたReactコンポーネントとして使用できる形式です。

```bash
pnpm build:react
```

出力: `packages/lit-components/dist/react/`

#### 3. Golang (SSR)向けバンドルビルド

全ての依存関係を含む単一ファイルとして出力され、SSR環境で使用できます。

```bash
pnpm build:bundle
```

出力: `packages/lit-components/dist/bundle/`
- `lzt-components.iife.js` - ブラウザでグローバル変数として使用可能
- `lzt-components.js` - ESモジュール形式

#### すべてビルド

```bash
pnpm build
```

上記3つすべてをビルドします。

#### Storybookのビルド

```bash
pnpm build-storybook
```

出力: `packages/lit-components/storybook-static`

### Docker環境でのビルド

```bash
# コンポーネントをビルド
docker-compose run --rm builder

# Goデモアプリケーションをビルド＆実行
docker-compose up builder demo-go
```

Goデモアプリケーションは http://localhost:8080 でアクセスできます。

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
import { LztButton, LztDropdown, LztDropdownItem } from '@lzt/lit-components/react';

function App() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  const handleChange = (e: CustomEvent) => {
    console.log('Selected:', e.detail.value);
  };

  return (
    <div>
      <LztButton
        variant="primary"
        size="medium"
        onButtonClick={handleClick}
      >
        Click me
      </LztButton>

      <LztDropdown
        label="Select an option"
        onChange={handleChange}
      >
        <LztDropdownItem value="1">Option 1</LztDropdownItem>
        <LztDropdownItem value="2">Option 2</LztDropdownItem>
      </LztDropdown>
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

### BaseElement

すべてのコンポーネントは`BaseElement`ベースクラスを継承しています。このクラスは共通のベーススタイルをShadow DOMに注入し、CSS Custom Propertiesを使用したテーマシステムを提供します。

```typescript
import { BaseElement } from './base-element.js'

@customElement('my-component')
export class MyComponent extends BaseElement {
  // ベーススタイルとCSS変数が利用可能
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
- **CSS Custom Properties**: テーマとスタイリング
- **Vite**: ビルドツール
- **pnpm**: パッケージマネージャー
- **mise**: 開発環境管理ツール
- **Docker**: コンテナ化された開発環境

## 主な特徴

- **ステートマシン駆動**: Zag.jsによる堅牢な状態管理
- **アクセシビリティ**: WAI-ARIA準拠の実装
- **フレームワーク非依存**: Web Components標準に基づく
- **型安全**: TypeScriptによる完全な型サポート
- **柔軟なスタイリング**: CSS Custom Propertiesによるカスタマイズ可能なテーマシステム

## ライセンス

MIT
