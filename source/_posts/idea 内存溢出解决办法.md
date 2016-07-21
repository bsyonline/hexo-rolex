---
title: idea内存溢出解决办法
toc: true
date: 2016-07-16 15:49:52
tags:
categories:
---


###1. 使用idea64.exe启动
###2. 修改bin目录下的idea.exe.vmoptions文件
	-Xms128m
	-Xmx1024m
###3. 添加运行VM参数
     -server -XX:PermSize=512M -XX:MaxPermSize=1024m
