---
title: /etc/profile和/etc/profile.d的区别
toc: true
date: 2016-03-30 15:53:25
tags: Linux
categories: 编程
---


 1. 两个文件都是设置环境变量文件的，/etc/profile是永久性的环境变量,是全局变量，/etc/profile.d/设置所有用户生效  

 2. /etc/profile.d/比/etc/profile好维护，不想要什么变量直接删除/etc/profile.d/下对应的shell脚本即可，不用像/etc/profile需要改动此文件
