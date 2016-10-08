---
title: idea内存溢出解决办法
toc: true
date: 2014-01-13 15:49:52
tags: IDEA
categories: 编程
---


### 1. 使用 idea64.exe 启动
### 2. 修改 bin 目录下的 idea.exe.vmoptions 文件
	-Xms128m
	-Xmx1024m
### 3. 添加运行VM参数
     -server -XX:PermSize=512M -XX:MaxPermSize=1024m
