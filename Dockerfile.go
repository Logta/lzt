# Go demo用Dockerfile（マルチステージビルド）
# mise.tomlでは "latest" を使用

# ビルドステージ
FROM golang:alpine AS builder

WORKDIR /app

# Go modulesのダウンロード
COPY demo-go/go.* ./
RUN go mod download || true

# ソースコードのコピー
COPY demo-go/ .

# バイナリのビルド
RUN CGO_ENABLED=0 GOOS=linux go build -o server .

# 実行ステージ
FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /app

# ビルドステージからバイナリをコピー
COPY --from=builder /app/server .

# テンプレートと静的ファイルをコピー
COPY demo-go/templates ./templates
COPY demo-go/static ./static

# ポートの公開
EXPOSE 8080

# サーバーの実行
CMD ["./server"]
