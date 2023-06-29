package responseBuilder

import (
	"encoding/json"
	"net/http"
)

type ResponsePayload struct {
	Data    interface{} `json:"data"`
	Error   interface{} `json:"error"`
	Message interface{} `json:"message"`
}

type ResponseBuilder interface {
	WithStatus(code int) ResponseBuilder
	WithHeader(key, value string) ResponseBuilder
	WithBody(data interface{}) ResponseBuilder
	WithError(err interface{}) ResponseBuilder
	WithMessage(message string) ResponseBuilder
	Build(w http.ResponseWriter)
}

type HTTPResponseBuilder struct {
	response *http.Response
	body     interface{}
}

func NewHttp() *HTTPResponseBuilder {
	return &HTTPResponseBuilder{
		response: &http.Response{
			Header: make(http.Header),
		},
	}
}

func (rb *HTTPResponseBuilder) WithStatus(code int) ResponseBuilder {
	rb.response.StatusCode = code
	return rb
}

func (rb *HTTPResponseBuilder) WithHeader(key, value string) ResponseBuilder {
	rb.response.Header.Set(key, value)
	return rb
}

func (rb *HTTPResponseBuilder) WithBody(data interface{}) ResponseBuilder {
	rb.body = &ResponsePayload{
		Data: data,
	}
	return rb
}

func (rb *HTTPResponseBuilder) WithMessage(message string) ResponseBuilder {
	rb.body = &ResponsePayload{
		Message: message,
	}
	return rb
}

func (rb *HTTPResponseBuilder) WithError(err interface{}) ResponseBuilder {
	rb.body = &ResponsePayload{
		Error: err,
	}
	return rb
}

func (rb *HTTPResponseBuilder) Build(w http.ResponseWriter) {
	for k, v := range rb.response.Header {
		w.Header().Set(k, v[0])
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(rb.response.StatusCode)
	json.NewEncoder(w).Encode(rb.body)

}
