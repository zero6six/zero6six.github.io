
VMWare：在 .vmx 文件中新加 `firmware="efi"`，使用 UEFI 作为引导方式。不过好像找找设置也能改引导方式。

https://wiki.archlinuxcn.org/wiki/%E5%AE%89%E8%A3%85%E6%8C%87%E5%8D%97

https://www.cnblogs.com/Thato/p/18311683


4G 内存，30G 硬盘

```bash
systemctl stop reflector.service #关闭默认镜像源
nano /etc/pacman.d/mirrorlist #删除其他源

cfdisk /dev/sda #分区，这步得看是 MBR-BIOS 还是 GPT-UEFI，swap 分区是可选的
mkfs.ext4 /dev/root_partition（根分区）
# mkfs.fat -F 32 /dev/efi_system_partition（EFI 系统分区）
# mkswap /dev/swap_partition（交换空间分区）
mount /dev/root_partition（根分区） /mnt
# mount --mkdir /dev/efi_system_partition /mnt/boot # 挂载 EFI 系统分区
# swapon /dev/_swap_partition（交换空间分区）# 启用交换空间

nano /etc/pacman.conf # 修改 #ParallelDownloads
# pacman -Syu archlinux-keyring # 对于老的 iso 文件需要更新密钥环
pacstrap -K /mnt base base-devel linux linux-firmware # 安装必要的软件包
pacstrap /mnt nano vim 
# pacstrap /mnt intel-ucode # 虚拟机不用装的 CPU 微码包

genfstab -U /mnt > /mnt/etc/fstab



arch-chroot /mnt # 进入 chroot 环境

nano /etc/pacman.conf # 修改 #ParallelDownloads
pacman -Syu archlinux-keyring # 安装完的系统需要更新密钥环
pacman-key --init

ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
nano /etc/locale.gen # 取消相关语言选项的注释，注意：Ctrl+F 能查找
locale-gen
hwclock --systohc
echo 'LANG=en_US.UTF-8' > /etc/locale.conf # 不推荐在这里改中文，可以进系统改

echo 'myArch' > /etc/hostname # 主机名
nano /etc/hosts# 添加
# 127.0.0.1 localhost
# ::1 localhost 
# 127.0.0.1 myArch.localdomain myArch

# 安装并配置 GRUB
## UEFI 用这个
# pacman -S grub efibootmgr
# grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB # 前面已经挂载 EFI 到 /mnt/boot 就用这个命令

## BIOS 用这个
# pacman -S grub
# grub-install --target=i386-pc /dev/sda

grub-mkconfig -o /boot/grub/grub.cfg

pacman -S networkmanager # 装网
systemctl enable NetworkManager

visudo # 设置 sudo 相关设置
passwd # 设置 root 用户的密码

exit
shutdown now # 关机，移除 iso 文件再进入安装好的 Arch



pacman -S neofetch
# neofetch

# 临时修改下语言再装桌面环境，这样字体自动选择带 CJK 的
export LANG=zh_CN.UTF-8
pacman -S plasma-meta sddm xorg noto-fonts-cjk konsole
# xorg 好像是相对于 wayland 来说的，不知道要不要装
systemctl enable sddm
useradd -m -G wheel zero6six
passwd zero6six

reboot # 🎉🎉🎉
```

- [Hyper-V 启用增强会话](https://maxlhy0424.github.io/post/5.html)，注意新版本此博客存在小问题，见评论区。

```bash
sudo pacman -S flatpak
flatpak remote-add --if-not-exists --user flathub https://dl.flathub.org/repo/flathub.flatpakrepo
flatpak remote-modify flathub --url=https://mirror.sjtu.edu.cn/flathub
reboot
```

之后就能在默认的应用商店里装应用了。

#### 杂项

### 更新 pacman 缓存

`sudo pacman -Sy`

### 启用 SSH

```bash
pacman -S openssh
sudo ssh-keygen -A
systemctl enable sshd.service
```

### 网络及代理

```bash
ip addr # 查看虚拟机 IP
ip route # 查看宿主机 IP
# sudo pacman -S proxychains
sudo nano /etc/proxychains.conf # 记得关闭宿主机防火墙
proxychains curl http://example.com 
# proxychains 不是很靠谱，有的时候爬不上

export http_proxy="http://172.31.176.1:7890"
export https_proxy="http://172.31.176.1:7890"
unset http_proxy
unset https_proxy
```

### [安装 AUR 包](https://wiki.archlinuxcn.org/wiki/Arch_%E7%94%A8%E6%88%B7%E8%BD%AF%E4%BB%B6%E4%BB%93%E5%BA%93_(AUR))

如果一个 AUR 包依赖其他 AUR 包，那么首先要安装其它 AUR 包。

1. git clone 或者下载 snapshot(`tar -xvf _package_name_.tar.gz`)
2. `proxychains makepkg -sc`
3. `pacman -U _package_name_-_version_-_architecture_.pkg.tar.zst`

### 扩展分区

```bash
sudo sfdisk /dev/sda
sudo partprobe /dev/sda
sudo resize2fs /dev/sda3 # ext4
```