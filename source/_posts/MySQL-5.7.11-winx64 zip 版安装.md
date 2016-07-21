---
title: MySQL-5.7.11-winx64 zip版安装
toc: true
date: 2016-07-15 22:25:09
tags: mysql
categories: technology
---

>OS : Windows 10 x64

####1. 解压


解压路径为 **%MYSQL_HOME%**

####2. 配置环境变量

add **%MYSQL_HOME%\bin** to path

####3. 修改my.ini

拷贝my-default.ini为my.ini

	basedir = D:\Program Files\MySQL\mysql-5.7.11-winx64
	datadir =  D:\Program Files\MySQL\mysql-5.7.11-winx64\data
	port = 3306

####4. 初始化

>mysqld --initialize --user=mysql --console

记录末尾的初始密码

####5. 安装服务

>mysqld --install MySQL

####6. 启动

>net start mysql

####7. 登录

>mysql -u root -p

####8. 修改密码

>set password for root@localhost = password('123456');
