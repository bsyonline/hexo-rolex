---
title: hadoop 2.6.2 安装
toc: true
date: 2016-07-16 15:45:55
tags: hadoop
categories: 编程
---



###1. 下载
[]()

###2. 解压缩
>tar -zxf hadoop-2.6.2.tar.gz
###3. 修改配置文件
>vi ./etc/hadoop/core-site.xml

	<configuration>
    	<property>
        	<name>fs.defaultFS</name>
        	<value>hdfs://localhost:9000</value>
   	 	</property>
	</configuration>

>vi ./etc/hadoop/hdfs-site.xml

	<configuration>
	    <property>
	        <name>dfs.replication</name>
	        <value>1</value>
	    </property>
	</configuration>
>vi ./etc/hadoop/mapred-site.xml

	<configuration>
	    <property>
	        <name>mapreduce.framework.name</name>
	        <value>yarn</value>
	    </property>
	</configuration>

>vi ./etc/hadoop/yarn-site.xml

	<configuration>
	    <property>
	        <name>yarn.nodemanager.aux-services</name>
	        <value>mapreduce_shuffle</value>
	    </property>
	</configuration>

###4. 设置互信
>ssh-keygen -t dsa -P '' -f ~/.ssh/id_dsa  
cat ~/.ssh/id_dsa.pub >> ~/.ssh/authorized_keys  
chmod 0600 ~/.ssh/authorized_keys
###5. 格式化namenode
>./bin/hdfs namenode -format

###6. 启动yarn
>./sbin/start-yarn.sh

###7. 启动hdfs
>./sbin/start-dfs.sh

###8. 执行wordcount
>./bin/hdfs dfs -mkdir /user  
./bin/hdfs dfs -mkdir /user/rolex  
./bin/hdfs dfs -mkdir /user/rolex/input  
./bin/hdfs dfs -put ./NOTICE.txt /user/rolex/input/  

>./bin/hadoop jar ./share/hadoop/mapreduce/hadoop-mapreduce-examples-2.6.2.jar wordcount /user/rolex/input/NOTICE.txt /user/rolex/output/

>./bin/hdfs dfs -cat /user/rolex/output/part-r-00000
