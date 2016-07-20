---
title: 添加sudo权限
toc: true
date: 2016-07-16 15:53:17
tags:
categories:
---

>错误消息：xxx is not in the sudoers file

	$su root
	#visudo

root ALL=(ALL) ALL下添加一行

	xxx  ALL=(ALL) ALL
