package px

import (
	"github.com/asavor/decode/backend/pkgs/responseBuilder"
	redisClient "github.com/asavor/decode/backend/redis"
	"github.com/google/uuid"
	"net/http"
	"strconv"
	"strings"
)

type shareResponse struct {
	Payload   string `json:"payload"`
	CreatedAt int64  `json:"created_at"`
	Decode    bool   `json:"decode"`
	IsOwner   bool   `json:"is_owner"`
}

func Share(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		getShare(w, r)
		break
	case "DELETE":
		deleteShare(w, r)
	default:
		responseBuilder.NewHttp().WithStatus(405).WithError("Method Not Allowed").Build(w)
		break
	}
}

func getShare(w http.ResponseWriter, r *http.Request) {
	splitPath := strings.Split(r.URL.Path, "/")
	shareID := splitPath[len(splitPath)-1]

	var userID string
	decodeUserCookie, err := r.Cookie("x-decode-user")
	if err != nil {
		userID = uuid.NewString()
	} else {
		userID = decodeUserCookie.Value
	}

	result, err := redisClient.Client.HGetAll(r.Context(), shareID).Result()
	if err != nil {
		responseBuilder.NewHttp().WithStatus(500).WithError("Internal Server Error").Build(w)
	}

	if len(result) == 0 {
		responseBuilder.NewHttp().WithStatus(404).WithError("Not Found").Build(w)
		return
	}
	//check if antibot is PX

	if result["antibot"] != "PX" {
		responseBuilder.NewHttp().WithStatus(404).WithError("Not Found").Build(w)
		return
	}

	resp := &shareResponse{
		Payload:   result["payload"],
		CreatedAt: func() int64 { val, _ := strconv.Atoi(result["created_at"]); return int64(val) }(),
		Decode:    func() bool { val, _ := strconv.ParseBool(result["decode"]); return val }(),
	}
	if result["user_id"] == userID {
		resp.IsOwner = true
	}

	responseBuilder.NewHttp().WithStatus(200).WithBody(resp).WithHeader("cache-control", "s-maxage=3600").Build(w)
	return
}

func deleteShare(w http.ResponseWriter, r *http.Request) {
	splitPath := strings.Split(r.URL.Path, "/")
	shareID := splitPath[len(splitPath)-1]
	decodeUserCookie, err := r.Cookie("x-decode-user")
	if err != nil {
		responseBuilder.NewHttp().WithStatus(401).WithError("Unauthorized").Build(w)
		return
	}

	result, err := redisClient.Client.HGet(r.Context(), shareID, "user_id").Result()
	if err != nil {
		return
	}

	if result != decodeUserCookie.Value {
		responseBuilder.NewHttp().WithStatus(401).WithError("Unauthorized").Build(w)
		return
	}

	_, err = redisClient.Client.Del(r.Context(), shareID).Result()
	if err != nil {
		responseBuilder.NewHttp().WithStatus(500).WithError("Internal Server Error").Build(w)
		return
	}

	responseBuilder.NewHttp().WithStatus(200).WithMessage("resources were successfully deleted").Build(w)
	return
}
