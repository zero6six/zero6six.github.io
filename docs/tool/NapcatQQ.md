
自动生成的命令如下：

`sudo docker run -d -e ACCOUNT=xxxxxx -e WSR_ENABLE=true -e NAPCAT_GID=0 -e NAPCAT_UID=0 -e WS_URLS='[]' -p 6099:6099 --privileged --name napcat --restart=always docker.1panel.dev/mlikiowa/napcat-docker:latest`

指定 --network host 来防止反向 ws 连不上。

那就是 `sudo docker run -d -e ACCOUNT=xxxxxx -e WSR_ENABLE=true -e NAPCAT_GID=0 -e NAPCAT_UID=0 -e WS_URLS='[]' --network host --privileged --name napcat --restart=always docker.1panel.dev/mlikiowa/napcat-docker:latest`


``