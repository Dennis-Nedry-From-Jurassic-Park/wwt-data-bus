# 1. start RabbitMQ
```sh
docker run -d -p 5672:5672 -p 15672:15672 --rm --hostname rabbit_hostname --name rabbitmq -e RABBITMQ_DEFAULT_USER=zowie -e RABBITMQ_DEFAULT_PASS=2840 bitnami/rabbitmq:3.12.7
```
# 2. start ClickHouse
