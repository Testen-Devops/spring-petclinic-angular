FROM node:10.10-alpine AS build

WORKDIR workspace 

COPY . /workspace/

RUN npm install
RUN npm run build

FROM nginx:1.19.6 AS runtime

COPY  --from=build /workspace/dist/ /usr/share/nginx/html/

RUN chmod a+rwx /var/cache/nginx /var/run /var/log/nginx                        && \
    sed -i.bak 's/listen\(.*\)80;/listen 443;/' /etc/nginx/conf.d/default.conf && \
    sed -i.bak '/listen 443;/a ssl on;' /etc/nginx/conf.d/default.conf && \
    sed -i.bak '/ssl on;/a ssl_certificate /etc/letsencrypt/live/server.ninopeters.de/fullchain.pem;' /etc/nginx/conf.d/default.conf && \
    sed -i.bak '/ssl_certificate /etc/letsencrypt/live/server.ninopeters.de/fullchain.pem;/a ssl_certificate_key /etc/letsencrypt/live/server.ninopeters.de/privkey.pem;' /etc/nginx/conf.d/default.conf && \
    sed -i.bak '/index  index.html index.htm;/a try_files $uri $uri\/ \/index.html?$args;' /etc/nginx/conf.d/default.conf && \
    sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

EXPOSE 443

USER nginx

HEALTHCHECK CMD [ "service", "nginx", "status" ]


