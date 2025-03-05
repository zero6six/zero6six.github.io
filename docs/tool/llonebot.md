
自己电脑上使用 `docker pull initialencounter/llonebot:latest`，然后使用 `docker save -o llonebot.tar initialencounter/llonebot:latest` 导出，导出完上传到服务器上之后使用 `docker load -i llonebot.tar` 导入。

在服务器上，我们使用

```shell
docker run --network host --name llonebot -e VNC_PASSWD=vncpassword --privileged initialencounter/llonebot:latest
```