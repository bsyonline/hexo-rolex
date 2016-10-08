---
title: Nexus 私服搭建
toc: true
date: 2016-02-22 15:53:46
tags: Nexus
categories: 编程
---


### 下载

下载最新的Nexus OSS
[http://www.sonatype.org/downloads/nexus-latest-bundle.tar.gz](http://www.sonatype.org/downloads/nexus-latest-bundle.tar.gz)

### 解压
```
tar -zxf nexus-latest-bundle.tar.gz  
mv nexus-2.11.1-01 nexus2

chown -R nexus2
chown -R sonatype-work
```
### 启动
```
./bin/nexus start
```
### 安装服务
```
vi ./bin/nexus

PIDDIR="/home/rolex/piddir"

sudo ln -s /home/soft/nexus/nexus-2.11.2-06/bin/nexus /etc/init.d/nexus  
chkconfig --add nexus  
chkconfig --levels 345 nexus on  

service nexus start
```
### 访问

在浏览器中输入[http://192.168.1.201:8081/nexus/](http://192.168.1.201:8081/nexus/)
![img](http://7xqgix.com1.z0.glb.clouddn.com/9.png)

### 配置

管理员账号admin，默认密码admin123，通过右上角登录。

### 添加代理仓库

点击左侧的Repositories，然后再点击右侧的Add，会弹出下拉菜单，选择Proxy Repository，如下配置。
![http://7xqgix.com1.z0.glb.clouddn.com/10.png](http://7xqgix.com1.z0.glb.clouddn.com/10.png)
选中Public Repositories，将新建的Proxy Repository加入到Public Repositories组，并Update Index。
![http://7xqgix.com1.z0.glb.clouddn.com/11.png](http://7xqgix.com1.z0.glb.clouddn.com/11.png)

### 配置maven

修改maven的**settings.xml**文件
```
<mirrors>
<mirror>
  <id>nexus</id>
  <mirrorOf>*</mirrorOf>     
  <url>http://192.168.1.201:8081/nexus/content/groups/public/</url>
</mirror>
</mirrors>

<profiles>
<profile>
    <id>nexus</id>
    <repositories>
      <repository>
        <id>nexus</id>
        <name>Nexus</name>
        <url>http://192.168.1.201:8081/nexus/content/groups/public/</url>
        <releases><enabled>true</enabled></releases>
        <snapshots><enabled>true</enabled></snapshots>
      </repository>
    </repositories>
    <pluginRepositories>
      <pluginRepository>
        <id>nexus</id>
          <name>Nexus</name>
          <url>http://192.168.1.201:8081/nexus/content/groups/public/</url>
          <releases><enabled>true</enabled></releases>
          <snapshots><enabled>true</enabled></snapshots>
      </pluginRepository>
    </pluginRepositories>
  </profile>
</profiles>

<activeProfiles>
	<activeProfile>nexus</activeProfile>
</activeProfiles>
```

第一次安装后，nexus私服仓库是空的，通过maven下载jar包显示从私服仓库下载，实际还是从公网下载，然后保存到本地,以后再下载相同的jar包就直接从本地下载了。
