# despliege_https

curl -X GET http://dev7.cyberbunny.online:3000/messages -H "apikey: 1234567890abcdef"


curl -X POST "http://dev7.cyberbunny.online:3000/messages?content=Este%20es%20un%20mensaje&user=UsuarioPrueba" -H "apikey: 1234567890abcdef"

curl -X POST "http://localhost:3000/messages?content=Este%20es%20un%20mensaje" -H "apikey: 1234567890abcdef"
