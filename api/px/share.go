package px

import (
	"encoding/json"
	"github.com/asavor/decode/backend/pkgs/responseBuilder"
	"github.com/asavor/decode/backend/redis"
	"github.com/google/uuid"
	gonanoid "github.com/matoous/go-nanoid/v2"
	"net/http"
	"strconv"
	"time"
)

type shareRequest struct {
	Payload string `json:"payload"`
	Ttl     int    `json:"ttl"`
	Decode  bool   `json:"decode"`
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
	var userID string
	decodeUserCookie, err := r.Cookie("x-decode-user")
	if err != nil {
		userID = uuid.NewString()
	} else {
		userID = decodeUserCookie.Value
	}

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
	data := map[string]string{"payload": request.Payload, "created_at": strconv.Itoa(int(time.Now().Unix())), "antibot": "PX", "user_id": userID, "decode": strconv.FormatBool(request.Decode)}

	for k, v := range data {
		err := redis.Client.HSet(r.Context(), shareID, k, v).Err()
		if err != nil {
			responseBuilder.NewHttp().WithStatus(500).WithError("Internal Server Error").Build(w)
			return
		}
	}
	if request.Ttl != 0 {
		err = redis.Client.Expire(r.Context(), shareID, time.Duration(request.Ttl)*time.Hour).Err()

		if err != nil {
			responseBuilder.NewHttp().WithStatus(500).WithError("Internal Server Error").Build(w)
			return
		}
	}

	responseBuilder.NewHttp().WithStatus(201).WithBody(shareID).WithCookie(http.Cookie{
		Name:    "x-decode-user",
		Value:   userID,
		Expires: time.Now().Add(time.Duration(request.Ttl) * time.Hour),
		Path:    "/",
	}).Build(w)
}
