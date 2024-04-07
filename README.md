## ~~This project is not ready yet. Work in progress...~~

# audit
https://mythril-classic.readthedocs.io/en/master/installation.html
docker pull mythril/myth:0.24.8

docker run mythril/myth:0.24.8 analyze -a 0xC6b42b2A7C7b0C5Fa8C2c27e619dEfa8646735CA
docker run -v $(pwd):/tmp mythril/myth:0.24.8 analyze tmp/scam.sol
0xC6b42b2A7C7b0C5Fa8C2c27e619dEfa8646735CA


