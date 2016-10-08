---
title: linux 安装图形界面
toc: false
date: 2015-08-01 15:53:23
tags: Linux
categories: 编程
---

```shell
yum -y groupinstall Desktop
yum -y groupinstall "X Window System"
yum install libXfont-1.4.5-*
yum install libX11
startx  
```

切换界面失败
```shell
chkconfig --level 35 haldaemon on
chkconfig --level 35 messagebus on
```
