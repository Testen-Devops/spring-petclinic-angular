FROM node:10.10-alpine AS build

WORKDIR workspace 

COPY . /workspace/

RUN npm install
RUN npm run build

FROM nginx:1.19.6 AS runtime

COPY --from=build /workspace/dist/ /usr/share/nginx/html/
COPY --from=build /workspace/nginx.default.conf /etc/nginx/conf.d/default.conf

RUN chmod a+rwx /var/cache/nginx /var/run /var/log/nginx /etc/letsencrypt/                       && \
    #    sed -i.bak 's/listen\(.*\)80;/listen 8080;/' /etc/nginx/conf.d/default.conf && \
    #    sed -i.bak '/index  index.html index.htm;/a try_files $uri $uri\/ \/index.html?$args;' /etc/nginx/conf.d/default.conf && \
    sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443


USER nginx

HEALTHCHECK CMD [ "service", "nginx", "status" ]


