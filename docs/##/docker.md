docker network create -d bridge atr

# list nets and containers used this net
docker inspect ${network_name} | grep Name

# copy file from docker container
docker cp $container_id$:/var/log/clickhouse-server/clickhouse-server.err.log g:/

docker cp fa393c3ca9d5d70a16c68d87f00a44861f771d545201a9b54085a24bddecacb9:/var/log/clickhouse-server/clickhouse-server.err.log g:/

# run postgres postgresql
docker run --restart=always --network atr -d --name postgres_host -p 5432:5432 -p 9005:9005 --expose 5432 --expose 9005 -e POSTGRES_USER=GPT -e POSTGRES_PASSWORD=!qazxsw2 -e POSTGRES_DB=db -e POSTGRES_HOST_AUTH_METHOD=trust -v postgres-volume:/var/lib/postgresql/data:rw postgres:16.1-bullseye

# run clickhouse
docker run -d --name clickhouse_host --expose 8123 --network atr --restart unless-stopped --ulimit nofile=262144:262144 -p 8123:8123 -v \\wsl$\Ubuntu\clickhouse_data\log:/var/log/clickhouse-server -v \\wsl$\Ubuntu\home\zowie\config.xml:/etc/clickhouse-server/config.xml -v \\wsl$\Ubuntu\home\zowie\users.xml:/etc/clickhouse-server/users.xml -v \\wsl$\Ubuntu\clickhouse_data\data:/var/lib/clickhouse clickhouse/clickhouse-server:24.1.6-alpine
