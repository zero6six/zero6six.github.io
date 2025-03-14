
https://www.runoob.com/docker/docker-start-stop-restart-command.html

### 安装

参考阿里云的指南 https://help.aliyun.com/zh/ecs/use-cases/install-and-use-docker#7112366a92vay 。

### 连接

使用 `docker attach mc` 附加到容器，`ctrl+p ctrl+q` 来退出。

使用 `docker start -ia mc` 可以启动并附加标准输入输出。

### 生命周期

Docker容器的生命周期是从创建到销毁的整个过程，涵盖了容器的多个关键阶段和状态。以下是Docker容器生命周期的详细解释：

#### 一、生命周期状态

Docker容器的生命周期状态包括以下几种：

1. **已创建（Created）**：容器已创建但尚未启动。
2. **运行中（Running）**：容器正在运行，可以处理请求。
3. **已停止（Stopped）**：容器已停止运行，不再处理请求。
4. **暂停中（Paused）**：容器的所有进程都被停止，但容器的状态和数据依然保留在内存中。
5. **删除中/已删除（Deleting/Deleted）**：容器正在被删除或已被删除。

#### 二、管理命令

在Docker容器的生命周期中，可以使用以下命令来管理容器：

1. **创建容器**：`docker create [OPTIONS] IMAGE [COMMAND] [ARG...]` 或 `docker compose up`(当前目录下有 `docker-compose.yml`时)
2. **启动容器**：`docker start [CONTAINER]` 或 `docker run [OPTIONS] IMAGE [COMMAND] [ARG...]`后者相当于创建+运行，前者就是运行已经创建的或者已停止的、已暂停的。
3. **停止容器**：`docker stop [CONTAINER]`
4. **强制停止容器**：`docker kill [CONTAINER]`
5. **重启容器**：`docker restart [CONTAINER]` 相当于 stop + start。
6. **删除容器**：`docker rm [CONTAINER]`（需先停止容器）
7. **查看容器状态**：`docker ps`（查看正在运行的容器）和`docker ps -a`（查看所有容器，包括已停止的）
8. **查看容器日志**：`docker logs [CONTAINER]`

综上所述，Docker容器的生命周期涵盖了从创建到销毁的多个阶段和状态。通过合理地使用Docker命令来管理容器的生命周期，可以确保应用程序的稳定性和可靠性，并更好地应对容器化应用开发和运维的挑战。

### 网络

在 Docker 中，默认情况下，容器会使用 Docker 引擎创建的默认桥接网络（通常是 `bridge` 网络）。

使用桥接网络时，在 run 时使用 -p 映射端口，多个 -p 即映射多个端口。例：

```
docker run -d \
  --name=syncthing \
  --hostname=syncthing `#optional` \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Etc/UTC \
  -p 8384:8384 \
  -p 22000:22000/tcp \
  -p 22000:22000/udp \
  -p 21027:21027/udp \
  -v /path/to/syncthing/config:/config \
  -v /path/to/data1:/data1 \
  -v /path/to/data2:/data2 \
  --restart unless-stopped \
  lscr.io/linuxserver/syncthing:latest
```

然而，如果你想让容器使用宿主机的网络命名空间（即让容器直接共享宿主机的网络栈），你可以使用 Docker 的 `--network host` 选项。

以下是使用 `--network host` 选项运行容器的步骤：

**运行容器时使用 `--network host`**：

   当你运行一个新的 Docker 容器时，可以通过添加 `--network host` 选项来让容器使用宿主机的网络。例如：

   ```sh
   docker run --network host my_container_image
   ```

### 日志

要查看 Docker 容器最近的日志，可以使用 `docker logs` 命令。以下是一些常用的选项：

1. **查看最近的日志**：
   ```bash
   docker logs <container_name_or_id>
   ```

2. **查看最近的 N 行日志**：
   ```bash
   docker logs --tail <N> <container_name_or_id>
   ```
   例如，查看最近的 10 行日志：
   ```bash
   docker logs --tail 10 <container_name_or_id>
   ```

3. **实时查看日志（类似于 `tail -f`）**：
   ```bash
   docker logs -f <container_name_or_id>
   ```

4. **查看指定时间范围内的日志**：
   ```bash
   docker logs --since <time> <container_name_or_id>
   ```
   例如，查看过去 5 分钟的日志：
   ```bash
   docker logs --since 5m <container_name_or_id>
   ```

5. **查看日志并显示时间戳**：
   ```bash
   docker logs -t <container_name_or_id>
   ```

6. **组合使用多个选项**：
   ```bash
   docker logs --tail 10 -f -t <container_name_or_id>
   ```
   这将显示最近的 10 行日志，并实时跟踪新日志，同时显示时间戳。

### 示例
假设你的容器名称为 `my_container`，你可以使用以下命令查看最近的 20 行日志并实时跟踪：
```bash
docker logs --tail 20 -f my_container
```

### 注意事项
- `<container_name_or_id>` 可以是容器的名称或 ID。
- 如果容器已经停止，你仍然可以查看其日志。

通过这些命令，你可以方便地查看 Docker 容器的日志信息。
