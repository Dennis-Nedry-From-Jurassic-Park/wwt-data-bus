#!/bin/bash
# Publish dummy messages to queue

for i in {1..2}
do
    TIMESTAMP=$(($(date +%s%N)))
    echo "{\"timestamp\":\"$TIMESTAMP\",\"id\":$i,\"body\":\"my body is $i\"}" \
        | rabbitmqadmin --username=zowie --password=2840 publish exchange=clickhouse-exchange routing_key=#1-a &
done