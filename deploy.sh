apt update

apt install npm nodejs certbot python3-certbot-nginx

npm install

certbot certanly --standalone -d dev5.cyberbunny.online --non-interactive --agree-tos -m lucasst626@gmail.com

cp /etc/letsencrypt/live/dev5.cyberbunny.online/fullchain.pem /etc/ssl/certs/dev7.cyberbunny.online.crt

cp /etc/letsencrypt/live/dev5.cyberbunny.online/privkey.pem /etc/ssl/private/dev7.cyberbunny.online.key