---
title: CentOS 7 编译安装 gcc
toc: true
date: 2016-10-21 11:26:34
tags:
categories:
---

### 下载
```
wget https://mirrors.ustc.edu.cn/gnu/gcc/gcc-6.2.0/gcc-6.2.0.tar.gz
```
### 解压
```
tar -zxf gcc-6.2.0.tar.gz
```

### 准备编译
```
cd gcc-6.2.0
./contrib/download_prerequisites
```
