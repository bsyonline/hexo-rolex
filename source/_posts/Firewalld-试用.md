---
title: Firewalld 试用
toc: true
date: 2016-10-21 15:04:59
tags:
categories:
---

### 启动
```
systemctl start firewalld
```
### 停止
```
systemctl stop firewalld
```
### 删除
```
systemctl disable firewalld
```
### 查看所有打开端口
```
firewall-cmd --zone=dmz --list-ports
```
### 加入端口
```
firewall-cmd --zone=dmz --add-port=8080/tcp
```
