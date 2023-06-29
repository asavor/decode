package px

import (
	"github.com/asavor/decode/backend/pkgs/responseBuilder"
	redisClient "github.com/asavor/decode/backend/redis"
	"github.com/redis/go-redis/v9"
	"net/http"
	"strings"
)

func Share(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		getShare(w, r)
		break
	default:
		responseBuilder.NewHttp().WithStatus(405).WithError("Method Not Allowed").Build(w)
		break
	}
}

func getShare(w http.ResponseWriter, r *http.Request) {
	splitPath := strings.Split(r.URL.Path, "/")
	shareID := splitPath[len(splitPath)-1]

	result, err := redisClient.Client.HGetAll(r.Context(), shareID).Result()
	if err != nil {
		if err == redis.Nil {
			responseBuilder.NewHttp().WithStatus(404).WithError("Not Found").Build(w)
			return
		} else {
			responseBuilder.NewHttp().WithStatus(500).WithError("Internal Server Error").Build(w)
			return
		}
	}

	responseBuilder.NewHttp().WithStatus(200).WithBody(result).Build(w)
	return
}
