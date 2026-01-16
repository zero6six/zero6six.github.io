
闲来无事，给自己的日版续航版硬破系统升个级，记录下方法以及中途遇到的坑。

# 🛠️ 第一阶段：准备工作与资源下载

截至 2026/01/08 的相关组件版本：

| **组件名称**              | **最新版本**   | **备注**                                  |
| --------------------- | ---------- | --------------------------------------- |
| **Switch 官方固件 (HOS)** | **21.1.0** | 2025年12月发布，提升了系统稳定性并优化了网络连接。            |
| **Atmosphère (大气层)**  | **1.10.1** | 支持 21.1.0 系统，修复了部分游戏（如《古墓丽影》）无法运行的 Bug。 |
| **Hekate (引导工具)**     | **v6.4.2** | 完美支持 21.1.0 系统，包含 Nyx v1.8.2 图形界面。      |
| Sys-patch(签名补丁)       |            | 自动适配版本                                  |

1. 核心组件下载地址：也可以看下这个[集成包](https://github.com/laila509/Atmosphere-syspatch/releases)中附带的。

| **组件名称**       | **说明**          | **GitHub 下载链接**                                                             |
| -------------- | --------------- | --------------------------------------------------------------------------- |
| **Atmosphere** | 核心大气层系统         | [Atmosphere Releases](https://github.com/Atmosphere-NX/Atmosphere/releases) |
| **Hekate**     | 引导加载程序          | [Hekate Releases](https://github.com/CTCaer/hekate/releases)                |
| **Sys-patch**  | 签名补丁（推荐，自动适配版本） | [Sys-patch GitHub](https://github.com/impeeza/sys-patch/releases)           |
2. 固件：[NX_Firmware](https://github.com/THZoria/NX_Firmware)

# 📂 第二阶段：手动部署文件

1. 备份并删除旧文件：
	1. `/atmosphere`：备份并整个删除，`/atmosphere/contents` 为插件目录，但旧版本插件大概率要更新，不建议保留，建议删除并挨个更新。
	2. 其余文件由于除 `/switch` 和 `emuMMC` 外都很小，都建议备份一遍
2. 覆盖新版本：
	1. **解压 Atmosphere：** 将 `atmosphere-x.x.x.zip` 的所有内容直接拖入 SD 卡根目录，提示覆盖则选择覆盖。
	2. **解压 Hekate：** 将 `hekate_ctcaer_x.x.x.zip` 里的 `bootloader` 文件夹拖入根目录并覆盖。
	3. **开机启动 Hekate：** 将解压出来的 `hekate_ctcaer_x.x.x.bin` 文件重命名为 **`payload.bin`**，并放回 SD 卡根目录（覆盖原有的，这是硬破机开机引导的关键）。
	4. `fusee.bin` 是大气层专门的引导固件，老的固件逐渐不再支持，若使用 Hekate 引导大气层需要将其放到 SD 卡的 `/bootloader/payloads/` 文件夹下。并确保你的 `/bootloader/hekate_ipl.ini` 配置文件正确。示例配置文件如后文。
	5. **解压签名补丁：** 将 `sys-patch` 解压后的 `atmosphere` 文件夹拖入根目录覆盖。

示例 `/bootloader/hekate_ipl.ini` 配置文件：
```toml
[Atmosphere FSS0 EmuMMC]
fss0=atmosphere/package3 # 这个是重点，Hekate 会直接利用 `package3` 引导，此时 `fusee.bin` 甚至不需要参与。
kip1patch=nosigchk
emummcforce=1
icon=bootloader/res/icon_payload.bmp
```

# 🚀 第三阶段：升级系统固件 (Daybreak)

## 1. 备份固件

在升级系统固件之前，建议使用 Hekate 对虚拟系统进行备份，虚拟系统（emuMMC）包括两种，一种是基于文件的，一种是基于分区的。可以在主界面中的“虚拟系统”大选项卡中看见具体的情况。

对于基于文件的虚拟系统，我们备份相应基准文件夹下的相关文件即可，一般总大小为 30GB 左右。

对于基于分区的虚拟系统，我们要备份：
- **eMMC BOOT0 & BOOT1**：这是系统的引导文件，非常小，备份很快。它们记录了系统的核心启动信息。
- **eMMC RAW GPP**：这是整个系统的“主体”，包括系统文件、用户存档、设置以及安装在系统分区里的游戏。对于 32GB 的 Switch 来说，这个备份文件通常在 **29GB - 30GB** 左右，备份时间较长（通常需要 30 分钟到 1 小时）。

可以在 hekate 的 `Tools -> Backup eMMC` 内备份：
- **关键开关：** 进入 `Tools -> Backup eMMC` 后，屏幕下方有一个 **SD emuMMC Raw Partition** 的按钮，打开这个是备份 SD 卡内的虚拟 eMMC，机身系统的 eMMC 也可以在这里备份。
- **如果你想备份虚拟系统：** 必须确保这个按钮显示为 **ON**。此时顶部的选项会变成 `SD emuMMC BOOT0 & BOOT1` 和 `SD emuMMC RAW GPP`。

## 2. 正式安装

- **准备固件包：** 在 SD 卡根目录新建一个文件夹，命名为 `firmware`，将你下载的固件压缩包里的所有 `.nca` 文件解压进去。
- **运行 Daybreak：** * 进入 Switch 的 **相册 (Album)**，找到 **Daybreak** 工具（大气层自带）。
    - 选择 **Install** -> 找到你的 `firmware` 文件夹。
- **验证与安装：**
    - Daybreak 会校验固件完整性，完成后点击 **Continue**。
    - 选择 **Preserve Settings** (保留设置)。
    - 选择 **Install (FAT32 + exFAT)** (即使你的卡是 FAT32，也选这个以防万一)。
- **完成重启：** 安装完成后，点击 **Reboot** 重启机器。

# ⚠️ 关键注意事项

- **版本匹配：** **务必先更新 Atmosphere 和 Hekate，再通过 Daybreak 更新固件。** 如果顺序反了，可能会导致无法进入系统。
- **Tesla 插件：** 如果你有使用 Tesla 菜单或各种插件，升级固件后可能会导致报错（蓝屏代码）。如果遇到报错，请先删除 `/atmosphere/contents/` 文件夹下对应的插件文件夹。
- **电池电量：** 升级过程中请确保电量在 50% 以上，或者连接充电线。

# 后日谈

过了几天想装 tesla 模块，然后找到了[集成包](https://github.com/laila509/Atmosphere-syspatch/releases)，早知道直接覆盖集成包了，不用去各处寻找资源，覆盖之后依然是使用 Daybreak 升级固件。

注意：集成包的真实系统未屏蔽序列号和任天堂服务器，真实系统内乱搞可能 ban 机，记得手动调。