<<<<<<< HEAD
ARG DOCKER_HUB="docker.io"

FROM node:10.10-alpine as build
=======
FROM node:10.10-alpine AS build
>>>>>>> a5e93649190f6ac9525c2014b147f647a3c32bbd

WORKDIR /workspace/ 

COPY . /workspace/

RUN npm install
RUN npm run build

<<<<<<< HEAD
# ARG NGINX_VERSION="1.17.6"
FROM nginx AS runtime
=======
FROM nginx:1.19.6 AS runtime
>>>>>>> a5e93649190f6ac9525c2014b147f647a3c32bbd

COPY --from=build /workspace/dist/ /usr/share/nginx/html/
COPY --from=build /workspace/nginx.default.conf /etc/nginx/conf.d/default.conf

RUN chmod a+rwx /var/cache/nginx /var/run /var/log/nginx                        && \
    #    sed -i.bak 's/listen\(.*\)80;/listen 8080;/' /etc/nginx/conf.d/default.conf && \
    #    sed -i.bak '/index  index.html index.htm;/a try_files $uri $uri\/ \/index.html?$args;' /etc/nginx/conf.d/default.conf && \
    sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

EXPOSE 80

USER nginx

HEALTHCHECK CMD [ "service", "nginx", "status" ]


