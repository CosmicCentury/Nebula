
FROM nginx/nginx-prometheus-exporter:0.8.0 as exporter

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf

COPY --from=exporter /usr/bin/exporter /usr/bin/exporter

ADD run.sh /run.sh

RUN chmod 777 /run.sh

EXPOSE 80 9112

CMD ["/bin/sh", "/run.sh"]