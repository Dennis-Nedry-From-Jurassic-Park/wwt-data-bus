# links
https://clickhouse.com/docs/ru/engines/table-engines/integrations/rabbitmq
https://github.com/rabbitmq/rabbitmq-perf-test
https://www.mongodb.com/compatibility/deploying-a-mongodb-cluster-with-docker

# glossary
https://capnproto.org/
tp = third party (любой сторонний сервис)
ms = microservice (на нашей стороне)
# 1. start RabbitMQ
```sh
docker run -d -p 5672:5672 -p 15672:15672 --rm --hostname rabbit_hostname --name rabbitmq -e RABBITMQ_DEFAULT_USER=zowie -e RABBITMQ_DEFAULT_PASS=2840 bitnami/rabbitmq:3.12.7
```
# 2. start ClickHouse
docker run -d --name clickhouse_host --expose 8123 --restart unless-stopped --ulimit nofile=262144:262144 -p 8123:8123 -v \\wsl$\Ubuntu\clickhouse_data\log:/var/log/clickhouse-server -v \\wsl$\Ubuntu\home\zowie\config.xml:/etc/clickhouse-server/config.xml -v \\wsl$\Ubuntu\home\zowie\users.xml:/etc/clickhouse-server/users.xml -v \\wsl$\Ubuntu\clickhouse_data\data:/var/lib/clickhouse clickhouse/clickhouse-server:23.1.3.5-alpine
# 3. определяем порт rabbitmq container'a
```sh
docker inspect rabbitmq
```
либо
```sh
docker container inspect -f '{{ .NetworkSettings.IPAddress }}' rabbitmq
```
copy Networks -> IPAddress
add rabbitmq_host_port = '172.17.0.2:5672'