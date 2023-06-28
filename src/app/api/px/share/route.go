package handler

import (
  "fmt"
  "net/http"
)

func Handler(w http.ResponseWriter, r *http.Request) {
    w.write([]byte("Hello, World!"))
    return
}