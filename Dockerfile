FROM node:20.10.0 as builder

WORKDIR /source

COPY package.json /source

COPY package-lock.json /source

RUN npm ci

COPY . /source

RUN npm run build

FROM nginx

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx/nginx.conf /etc/nginx/conf.d/nginx.conf

COPY --from=builder /source/out /usr/share/nginx/html

EXPOSE 80 443

CMD nginx -g "daemon off;"