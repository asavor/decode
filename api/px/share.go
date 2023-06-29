package px

import (
	"encoding/json"
	"github.com/asavor/decode/backend/pkgs/responseBuilder"
	"github.com/asavor/decode/backend/redis"
	gonanoid "github.com/matoous/go-nanoid/v2"
	"net/http"
	"strconv"
	"time"
)

type shareRequest struct {
	Payload string `json:"payload"`
	Ttl     int    `json:"ttl"`
}

func Share(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "POST":
		createShare(w, r)
		break
	default:
		responseBuilder.NewHttp().WithStatus(405).WithError("Method Not Allowed").Build(w)
		break
	}
}

func createShare(w http.ResponseWriter, r *http.Request) {
	shareID, err := gonanoid.Generate("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 10)
	if err != nil {
		responseBuilder.NewHttp().WithStatus(500).WithError("Internal Server Error").Build(w)
		return
	}

	var request shareRequest
	err = json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		responseBuilder.NewHttp().WithStatus(400).WithError("Bad Request").Build(w)
		return
	}
	data := map[string]string{"payload": request.Payload, "created_at": strconv.Itoa(int(time.Now().Unix())), "antibot": "PX"}

	for k, v := range data {
		err := redis.Client.HSet(r.Context(), shareID, k, v).Err()
		if err != nil {
			responseBuilder.NewHttp().WithStatus(500).WithError("Internal Server Error").Build(w)
			return
		}
	}
	err = redis.Client.Expire(r.Context(), shareID, time.Duration(request.Ttl)*time.Hour).Err()

	if err != nil {
		responseBuilder.NewHttp().WithStatus(500).WithError("Internal Server Error").Build(w)
		return
	}

	responseBuilder.NewHttp().WithStatus(201).WithBody(shareID).Build(w)
}
