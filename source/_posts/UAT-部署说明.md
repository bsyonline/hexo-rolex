---
title: UAT 部署说明
toc: true
date: 2016-07-15 22:25:09
tags: chinadaas
categories: 编程
---


### 创建用户和组
创建ops，application用户
```
cd /home  
groupadd ops  
useradd -g ops ops  
useradd -g ops application
```

添加sudo权限
```
visudo

ops     ALL=NOPASSWD:   ALL -- sudo时不需要密码
```
设置ops用户口令
```
passwd ops
```

### 建立互信

>ssh-keygen

将ssh公钥内容拷贝至/home/ops/.ssh/下authorized_keys（若文件不存在，则新建）中

	ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEA4jWPNAwuWGf/WeJqF24yfXfhOizrHsDKIBb5/dasyX8KoUrvxGu60+XHgjcavnzjUihBUNdkWFXTUHFvMzkUZ3jhgMyX8s+ILll8jwCnCYPRprjEqDX+BCj/JVEVIhwb6qHQUV5KVi1d2cVG+OAXlY4quQgxKG1aoAu2bNAKrJHP85BAJ5KbE0oCJmqJGs3OzvFR7CzklYHdehdLwwQPaAvMG1bsTgenoPJnOQlps0H627itQPRMUv/mCzNvUWuQBwcBWMXrHtjS5VGe/3KDJFoYQPHzTAy9k4LG1gO+aYDaX+hYxB5sSoS4y3VT/mh4bgac/qClcs4fWm8RVbyPDQ== ops@chinadaas20


### 执行部署

1. 安装db(MySQL)
```
fab -f fabfile_uat.py install_mysql
```
2. 安装redis
```
fab -f fabfile_uat.py install_redis  
fab -f fabfile_uat.py sync_redis_conf
```
启动
```
fab -f fabfile_uat.py start:redis,roles=redis
```
3. 安装search
```
fab -f fabfile_uat.py install_search  
fab -f fabfile_uat.py install_search_service
```
启动
```
fab -f fabfile_uat.py start:elasticsearch,roles=search
```
4. 安装nginx
```
fab -f fabfile_uat.py install_nginx  
fab -f fabfile_uat.py sync_nginx_conf
```
准备app directory
```
fab -f fabfile_uat.py setup
fab -f fabfile_uat.py install_web_service

fab -f fabfile_uat.py start:nginx,roles=web
```
5. 执行脚本
登录192.168.11.20
ops/daas@2015
```
cd risk-bell  
./deploy2uat.sh
```
6. 修改配置文件
```
vi ./config/elasticsearch.yml

cluster.name: daas  
node.name: chinadaas01
network.host: 192.168.200.163
discovery.zen.ping.unicast.hosts: ["192.168.200.163","192.168.200.164","192.168.200.165","192.168.200.166"]
discovery.zen.minimum_master_nodes: 4
```
所有机器执行相同配置，ip和node.name改成对应机器的ip。

### 执行

1. 环境准备
```
/opt/data-engine/current/bin/init.sh
```
2. 在uat环境执行compare过程和创建用户清单
```
/opt/data-engine/current/bin/batch_compare_loader.sh 20150510000000
```


### 完成后执行变更推送
```
/opt/data-engine/current/bin/push.sh 20150510000000
```
### 启动web程序
```
/opt/data-engine/current/bin/product.sh
```
### 测试
