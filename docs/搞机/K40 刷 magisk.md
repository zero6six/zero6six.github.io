
https://zhuanlan.zhihu.com/p/416286615

先傻瓜式解锁，然后去[这里](https://xiaomirom.com/)下ROM，刷机包以安装方式区分，包括 **Recovery 卡刷包** 及 **Fastboot 线刷包**，提取 image/boot.img，丢进手机，在 magisk app 内修补。

修补完之后把修补后的镜像搞回电脑，进入 fastboot 然后开刷

```text
fastboot devices #确认设备进入Fastboot模式并已连接
fastboot flash boot magisk_patched-XXXXX_XXXXX.img #刷入打了补丁的Magisk，注意替换XXXXX
fastboot reboot #重启
```

成功拿到 root。