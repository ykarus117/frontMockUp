FROM nginx:1.25.4-alpine
EXPOSE 443
RUN apk update && apk add python3 augeas
RUN python3 -m venv /opt/certbot/ && /opt/certbot/bin/pip install --upgrade pip
RUN /opt/certbot/bin/pip install certbot certbot-nginx && ln -s /opt/certbot/bin/certbot /usr/bin/certbot
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
ENV FILEPATH=./src
COPY $FILEPATH/ /usr/share/nginx/html
ENV DOMAIN=example.com
ENV EMAIL=mail@mail.com
CMD sh -c "certbot --nginx --non-interactive --agree-tos --email $EMAIL -d $DOMAIN && nginx -g 'daemon off;'"