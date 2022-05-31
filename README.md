# decode.antibot.to

Open source tools to help you decode/encode sensor data.

## Features

- Browser decoding/encoding
- API decoding/encoding
- Akamai version monitor

## Usage decode

### PerimeterX

#### Encode

```http
 POST /api/px/encode
```

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `payload` | `string` | **Required**. JSON payload data |
| `uuid`    | `string` | **Required**. Uuid              |
| `sts`     | `string` | **Not Required**. can be empty  |

#### Decode

```http
  POST /api/px/decode
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `payload` | `string` | **Required**. Encoded payload data |
| `uuid`    | `string` | **Required**. Uuid                 |
| `sts`     | `string` | **Not Required**. can be empty     |

## Demo

![](https://i.gyazo.com/09e680dc947627c59ff287c1ac9d64c4.gif)

## Monitor

Returns all akamai version

```http
  GET /api/akamai/version
```

Returns all akamai site

```http
  GET /api/akamai/monitor
```

## Roadmap

- Add akamai script to a S3 bucket so the user can download the script.
- Monitor Px sites version
- Decode akamai sensor data
- Fix Nav bar on mobile device

## Contributing

Contributions are always welcome!

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://github.com/asavor/decode/blob/032d1dcf3c9abd9cec8addee84e4e410bf20a52a/LICENSE)
