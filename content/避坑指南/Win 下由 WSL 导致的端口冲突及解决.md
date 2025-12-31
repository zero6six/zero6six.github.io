
https://learn.microsoft.com/zh-cn/troubleshoot/windows-server/networking/default-dynamic-port-range-tcpip-chang

Windows 的 **WinNAT** 服务（关联 Hyper-V, WSL2, Docker）会随机预留一部分端口段作为“排除范围”，导致应用无权监听这些端口。

## 永久解决方案：修改动态端口起始范围

通过将动态端口的起始位置调高，让系统预留的“随机区间”彻底避开开发常用的低位端口（如 3000, 8080, 3306 等）。

### 1. 验证当前保留范围

在执行修改前，可以先确认当前哪些端口被系统“霸占”了：

```powershell
netsh interface ipv4 show excludedportrange protocol=tcp
```

### 2. 执行修改指令

以 **管理员身份** 打开 PowerShell，依次执行以下命令。我们将动态端口起始位置设为 `49152`，长度设为 `16384`（即占据 49152~65535 范围）。

> [!CAUTION] 注意
> 
> 执行修改前必须先关闭 winnat 服务，否则配置可能无法生效或报错。

```powershell
# 1. 停止网络地址转换服务
net stop winnat

# 2. 设置 IPv4 动态端口起始点与总数
netsh int ipv4 set dynamicport tcp start=49152 num=16384

# 3. (可选) 如果你使用 IPv6，建议同步设置
netsh int ipv6 set dynamicport tcp start=49152 num=16384

# 4. 重新启动服务
net start winnat
```

### 3. 检查修改结果

再次执行查看命令，确认 `Administered Port Exclusions` 区域已经移动到了 49152 以上：

```powershell
netsh int ipv4 show dynamicport tcp
```

## 备选方案：临时强制刷新

如果未来偶尔再次遇到类似权限问题，无需重启电脑，直接执行以下命令刷新 WinNAT 状态：

```powershell
net stop winnat
net start winnat
```
