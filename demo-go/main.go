package main

import (
	"html/template"
	"log"
	"net/http"
	"path/filepath"
)

func main() {
	// 静的ファイルの配信設定
	staticDir := filepath.Join(".", "static")
	fs := http.FileServer(http.Dir(staticDir))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	// ルートハンドラー
	http.HandleFunc("/", indexHandler)

	// サーバー起動
	port := ":8080"
	log.Printf("Server starting on http://localhost%s", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatal(err)
	}
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	// テンプレートのパース
	tmpl, err := template.ParseFiles("templates/index.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// データの準備
	data := struct {
		Title   string
		Message string
	}{
		Title:   "LZT UI - Golang Demo",
		Message: "Golang + Web Components Demo",
	}

	// テンプレートの実行
	if err := tmpl.Execute(w, data); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
