# Node.js開発環境用Dockerfile
# mise.tomlで指定されたバージョンに合わせる
FROM node:24.3.0-slim

# pnpmのインストール（mise.tomlで指定されたバージョン）
RUN npm install -g pnpm@10.12.3

# 作業ディレクトリの設定
WORKDIR /app

# package.jsonとpnpm-lock.yamlをコピー
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/lit-components/package.json ./packages/lit-components/
COPY packages/react-demo/package.json ./packages/react-demo/

# 依存関係のインストール
RUN pnpm install --frozen-lockfile

# ソースコードをコピー
COPY . .

# ポートの公開
EXPOSE 5173 6006

# デフォルトコマンド
CMD ["pnpm", "dev"]
