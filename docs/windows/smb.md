
文件夹高级共享设置，新增一个本地账户

---

检查端口占用

```shell
netstat -aon | findstr "445"
```

### 取消端口转发

1. **查看当前的端口转发规则：**

   你可以使用以下命令查看当前所有的端口转发规则：

```bash
netsh interface portproxy show all
```

   这将显示所有当前的端口转发规则，包括协议（TCP/UDP）、监听地址、监听端口、连接地址和连接端口。

2. **删除特定的端口转发规则：**

   一旦你找到了要删除的端口转发规则，使用以下命令删除它：

   ```bash
   netsh interface portproxy delete v4tov4 listenport=监听端口 listenaddress=监听地址
   ```

   例如，如果你想删除监听端口为 `8080`，监听地址为 `0.0.0.0` 的规则，可以使用：

   ```bash
   netsh interface portproxy delete v4tov4 listenport=8080 listenaddress=0.0.0.0
   ```

3. **验证删除：**

   再次运行以下命令，确保该规则已被删除：

   ```bash
   netsh interface portproxy show all
   ```

这将确保你设置的端口转发规则已经被成功删除。

