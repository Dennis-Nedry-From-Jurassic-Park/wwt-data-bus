docker network create -d bridge atr

# list nets and containers used this net
docker inspect ${network_name} | grep Name