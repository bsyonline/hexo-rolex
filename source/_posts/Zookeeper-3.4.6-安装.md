---
title: Zookeeper-3.4.6 安装
toc: true
date: 2016-07-14 16:00:38
tags: Zookeeper
categories: 大数据
---

zookeeper 是分布式的开源协调服务程序，官方网站 [http://zookeeper.apache.org/](http://zookeeper.apache.org/) 。

### 1. 环境变量
```
sudo echo "ZOOKEEPER_HOME=/usr/zookeeper/zookeeper-3.4.6">/etc/profile.d/zookeeper.sh
sudo echo 'PATH=\$PATH :$ZOOKEEPER_HOME/bin'>>/etc/profile.d/zookeeper.sh
. /etc/profile
```
### 2. 配置文件
```
cp /usr/zookeeper/zookeeper-3.4.6/conf/zoo_sample.cfd /usr/zookeeper/zookeeper-3.4.6/conf/zoo.cfd
```
### 3. 启动
```
/usr/zookeeper/zookeeper-3.4.6/bin/zkServer.sh start
```
