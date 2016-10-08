---
title: 添加sudo权限
toc: false
date: 2015-08-09 15:53:17
tags: Linux
categories: Linux
---

错误消息：xxx is not in the sudoers file
```
su root
visudo
```
root ALL=(ALL) ALL下添加一行
```
xxx  ALL=(ALL) ALL
```
