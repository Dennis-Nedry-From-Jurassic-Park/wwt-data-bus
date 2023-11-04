Windows:

```bash
docker network create -d bridge atr
```
# exec server
```bash
docker run -d \\
  --name clickhouse_host \\
  --ulimit nofile=262144:262144 \\
  -p 8123:8123 \\
  -v \\wsl$\Ubuntu\clickhouse_data\log:/var/log/clickhouse-server \\
  -v \\wsl$\Ubuntu\clickhouse_data\data:/var/lib/clickhouse \\
  clickhouse/clickhouse-server:23.1.3.5-alpine
```
```ps !!!
docker run -d --name clickhouse_host --expose 8123 --restart unless-stopped --ulimit nofile=262144:262144 -p 8123:8123 -v \\wsl$\Ubuntu\clickhouse_data\log:/var/log/clickhouse-server -v \\wsl$\Ubuntu\home\zowie\config.xml:/etc/clickhouse-server/config.xml -v \\wsl$\Ubuntu\home\zowie\users.xml:/etc/clickhouse-server/users.xml -v \\wsl$\Ubuntu\clickhouse_data\data:/var/lib/clickhouse clickhouse/clickhouse-server:23.1.3.5-alpine
```
# exec client
```shell
docker run -it --net=atr --rm --link clickhouse_host:clickhouse-server clickhouse/clickhouse-client:21.3.20.1 --host clickhouse-server
```

links:
https://websitelytics.top/blog/clickhouse-deployment/
https://g-ek.com/dostup-k-fajlam-wsl-linux-v-windows10

explorer.exe .

network problems
https://github.com/docker/for-win/issues/9272
netcfg -d
Get-WindowsOptionalFeature -online | ? featurename -like "IIS" | Disable-WindowsOptionalFeature -Online -Remove
