---
title: http上传文件原理
toc: true
date: 2015-08-30 15:49:49
tags: http
categories: 编程
---


1. 通过request.getInputStream()来得到上传的整个post实体的流
2. 用 request.getHeader("Content-Type")来取得实体内容的分界字符串
3. 然后根据http协议，分析取得的上传的实体流
4. 把文件部分给筛出来在服务器端保存到磁盘文件中
