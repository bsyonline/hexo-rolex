---
title: Ubuntu 16.04 修复 grub
toc: true
date: 2016-10-24 18:31:44
tags: Linux
categories: 装系统
---

今天手欠，更新了一下系统更新，结果无限引导界面，进不了系统了。之前都是直接重做系统，不过这次懒得捯饬备份，试了试修复 grub 。上网科普了一下步骤，看着都比较简单，不过第一次搞还是比较懵逼。

**1. 查看 /boot 分区位置**
首先准备一张 U 盘启动盘，用 U 盘启动，选择 Live CD ，进入系统后，打开终端,查看 /boot 分区在什么位置。
```
sudo fdisk -l
```
![](http://7xqgix.com1.z0.glb.clouddn.com/fdisk.png)
我的系统装在 /dev/sda5 , /dev/sda6, /dev/sda7 上，/boot 是单独在 /dev/sda5 的分区上。
**2. 挂载目录**
```
sudo -i
mkdir /media/tmp
mount /dev/sda6 /media/tmp
mount /dev/sda5 /media/tmp/boot
```
**3. 安装 grub**
```
grub-install --root-directory=/media/tmp /dev/sda
```
看到信息 `Installation finished， no error occured` 则安装成功，不出意外，重启就可以正常引导了。
