---
title: hive-0.9.0 安装
toc: true
date: 2015-11-12 15:49:47
tags: Hive
categories: 编程
---


###1. 解压缩
    [rolex@node2 hive]$ pwd  
/usr/hive
[rolex@node2 hive]$ tar -zxf hive-0.9.0.tar.gz

###2. 配置环境变量
    [rolex@node2 hive]$ sudo echo "HIVE_HOME=/usr/hive/hive-0.9.0">/etc/profile.d/hive.sh
[rolex@node2 hive]$ sudo echo 'PATH=$PATH:$HIVE_HOME/bin'>>/etc/profile.d/hive.sh
    [rolex@node2 hive]$ sudo echo "export HIVE_HOME PATH">>/etc/profile.d/hive.sh
[rolex@node2 hive]$ . /etc/profile

###3. 配置文件
    [rolex@node2 conf]$ pwd
/usr/hive/hive-0.9.0/conf
[rolex@node2 conf]$ cp hive-default.xml.template hive-default.xml
    [rolex@node2 conf]$ cp hive-env.sh.template hive-env.sh
[rolex@node2 conf]$ cp hive-log4j.properties.template hive-log4j.properties
    [rolex@node2 conf]$ cp hive-exec-log4j.properties.template hive-exec-log4j.properties
[rolex@node2 conf]$ cp hive-default.xml.template hive-site.xml

###4. 启动
    [rolex@node2 bin]$ pwd
/usr/hive/hive-0.9.0/bin
[rolex@node2 bin]$ ./hive
    Logging initialized using configuration in file:/usr/hive/hive-0.9.0/conf/hive-log4j.properties
    Hive history file=/tmp/rolex/hive_job_log_rolex_201511061336_165277921.txt
    hive>

###5. 测试
    hive> show databases;
    OK
    default
    Time taken: 0.101 seconds
    hive> CREATE TABLE x (a INT);
    OK
    Time taken: 0.702 seconds
    hive> SELECT * FROM x;
    OK
    Time taken: 0.283 seconds
    hive> DROP TABLE x;
    OK
    Time taken: 1.059 seconds
    hive> exit;
