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
OR
```sh
$IP
docker container inspect -f '{{ .NetworkSettings.IPAddress }}' rabbitmq
```
copy Networks -> IPAddress
change rabbitmq_host_port = '$IP:5672'

```sql
CREATE OR REPLACE TABLE rmq.flatten_json (
        timestamp DateTime64(3),
        id UInt32,
        routingKey String,
        body String,
        _exchange_name String,
        _channel_id String,
        _delivery_tag UInt64,
        _timestamp UInt64
) ENGINE = RabbitMQ
SETTINGS
    rabbitmq_host_port = '172.17.0.3:5672',
    rabbitmq_exchange_name = 'exch',
    rabbitmq_exchange_type = 'direct',
    rabbitmq_format = 'JSONEachRow',
    rabbitmq_routing_key_list = 'ms.scam-coin.IsHoneypotCoin1',
    rabbitmq_num_consumers = 1,
    date_time_input_format = 'best_effort';
    //rabbitmq_address = 'amqp://zowie:2840@localhost:5672',
```

# glossary
tp = third party (любой сторонний сервис)
ms = microservice (на нашей стороне)

# schema
https://capnproto.org/
# links
https://clickhouse.com/docs/ru/engines/table-engines/integrations/rabbitmq
https://github.com/rabbitmq/rabbitmq-perf-test
https://www.mongodb.com/compatibility/deploying-a-mongodb-cluster-with-docker
# audit contracts
https://www.immunebytes.com/rust-smart-contract-audit/
https://github.com/Vid201/awesome-ethereum-rust
https://stellar.org/blog/developers/how-to-migrate-smart-contracts-from-ethereum-s-solidity-to-soroban-rust

https://github.com/ethereum/fe

