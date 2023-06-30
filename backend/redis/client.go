package redis

import (
	"crypto/tls"
	"github.com/redis/go-redis/v9"
	"os"
)

var redisUrl, _ = redis.ParseURL(os.Getenv("KV_URL"))

var Client = redis.NewClient(&redis.Options{
	Addr:     redisUrl.Addr,
	Username: redisUrl.Username,
	Password: redisUrl.Password,
	DB:       0,
	TLSConfig: &tls.Config{
		MinVersion: tls.VersionTLS12,
	},
})
