# go install

https://ubuntuhandbook.org/index.php/2024/02/how-to-install-go-golang-1-22-in-ubuntu-22-04/
OR
https://www.digitalocean.com/community/tutorials/how-to-install-go-on-ubuntu-20-04

1) wget -c https://go.dev/dl/go1.22.0.linux-amd64.tar.gz
2) sudo tar -C /usr/local/ -xzf go1.22.0.linux-amd64.tar.gz
3) ls /usr/local
4) export PATH=$PATH:/usr/local/go/bin
5) nano ~/.bashrc
6) add in ~/.bashrc
### golang ###
# set PATH so it includes /usr/local/go/bin if it exists
if [ -d "/usr/local/go/bin" ] ; then
PATH="/usr/local/go/bin:$PATH"
fi
### golang end ###
7) nano Ctrl + O
8) go version