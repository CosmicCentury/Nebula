#!/bin/bash
nginx -c /etc/nginx/nginx.conf
nginx -s reload
/usr/bin/exporter -nginx.scrape-uri http://127.0.0.1/stub_status -web.listen-address :80
tail -f /dev/null #实现本shell永不运行完成，容器不退出。