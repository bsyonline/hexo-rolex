---
title: spark standalone 安装
toc: true
date: 2016-05-04 16:00:22
tags: Spark
categories: 编程
---

spark standalone 即伪分布式部署,即在单击部署 spark ,部署方式比较简单.

### 1. 下载spark安装包

[http://www.apache.org/dyn/closer.lua/spark/spark-1.6.1/spark-1.6.1-bin-hadoop2.6.tgz](http://www.apache.org/dyn/closer.lua/spark/spark-1.6.1/spark-1.6.1-bin-hadoop2.6.tgz)

### 2. 解压
```
tar -zxf spark-1.6.1-bin-hadoop2.6.tgz
```
### 3. 启动
```
./sbin/start-all.sh
```

启动后可访问[http://node1:8080](http://node1:8080)查看信息

### 4. 安装客户端
```
tar -zxf spark-1.6.1-bin-hadoop2.6.tgz
```
### 5. 启动客户端

```
./bin/spark-shell --master spark://node1:7077
```
### 6. 测试
```
var rdd1 = sc.textFile("hdfs://192.168.1.11:9000/user/sparkone/input/NOTICE.txt")
val rdd2 = rdd1.flatMap(_.split(" ")).map(x=>(x,1)).reduceByKey(_+_)
rdd2.take(10)
```
