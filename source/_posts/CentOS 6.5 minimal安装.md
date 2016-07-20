---
title: CentOS 6.5 minimal安装
toc: true
date: 2016-07-16 15:53:37
tags:
categories:
---

###1. 安装eth0

>vi /etc/sysconfig/network-scripts/ifcfg-eth0

	ONBOOT=yes
	BOOTPROTO=static
	IPADDR=192.168.1.64
	GATEWAY=192.168.1.1

###2. 创建用户和组

>groupadd rolex  
>useradd -g rolex rolex  
>passwd rolex

###3. 添加sudo权限

>visudo

	rolex	ALL=(ALL)	ALL
	rolex	ALL=NOPASSWD:	ALL


###4. 安装ftp

参考 **CentOS 6.5 安装ftp.md**

###5. 安装JDK

参考 **CentOS 6.5 安装JDK.md**
