---
title: linux安装图形界面
toc: true
date: 2016-07-16 15:53:23
tags:
categories:
---


>yum -y groupinstall Desktop
	yum -y groupinstall "X Window System"
	yum install libXfont-1.4.5-*
	yum install libX11
	startx  


切换界面失败

>chkconfig --level 35 haldaemon on
	chkconfig --level 35 messagebus on
