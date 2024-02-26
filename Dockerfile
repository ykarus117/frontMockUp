FROM nginx:1.25.4-alpine
RUN apk update && apk add python3 augeas
RUN python3 -m venv /opt/certbot/ && /opt/certbot/bin/pip install --upgrade pip
RUN /opt/certbot/bin/pip install certbot certbot-nginx && ln -s /opt/certbot/bin/certbot /usr/bin/certbot
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
ENV FILEPATH=/web/main
COPY $FILEPATH/* /usr/share/nginx/html
ENV DOMAIN=example.com
ENV EMAIL=mail@mail.com
CMD certbot --nginx --non-interactive --agree-tos --email $EMAIL -d $DOMAIN
