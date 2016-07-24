---
title: CentOS 6.5 安装JDK
toc: true
date: 2016-07-16 15:53:32
tags: Linux
categories: Linux
---

###1. 下载
####1.1 安装wget
>yum install -y wget

####1.2 下载JDK

>wget "http://download.oracle.com/otn-pub/java/jdk/8u20-b26/jdk-8u20-linux-x64.tar.gz"

###2. 解压

>tar -zxf jdk-8u20-linux-x64.tar.gz

###3. 配置环境变量

>echo "JAVA_HOME=/usr/java/jdk1.8.0_20" > /etc/profile.d/java.sh  
echo '\$JAVA_HOME/bin:$PATH' >> /etc/profile.d/java.sh  
echo 'export JAVA_HOME PATH' >> /etc/profile.d/java.sh
