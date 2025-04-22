
### [发现服务器](https://docs.syncthing.net/users/stdiscosrv.html)

先看看只配置中继服务器能不能用，要是只配置中继也好用就不用这个了。

### [中继服务器](https://docs.syncthing.net/users/strelaysrv.html)

首先安装相关包。

```sh
sudo install syncthing-relaysrv
```

```sh
screen -S SyncRelay
sudo useradd strelaysrv
sudo mkdir /etc/strelaysrv
sudo chown strelaysrv /etc/strelaysrv
sudo -u strelaysrv /usr/local/bin/strelaysrv -keys /etc/strelaysrv # 这个报错，不知道为什么
strelaysrv -pools="" # -token 用不了，也不知道为什么，希望别给我流量跑没了
```