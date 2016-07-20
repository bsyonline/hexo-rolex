---
title: 字符界面安装vmwaretools
toc: true
date: 2016-07-16 15:53:17
tags:
categories:
---

####1. 挂载cdrom
     cd /mnt
     mkdir cdrom
     mount /dev/cdrom /mnt/cdrom
####2. 拷贝vmwaretools
     cp /mnt/cdrom/VMwareTools-9.6.1-1378637.tar.gz /tmp
     tar -zxvf /tmp/VMwareTools-9.6.1-1378637.tar.gz
     cd /tmp/vmware-tools-distrib/
     ./vmware-install.pl
####3. 默认一路回车+yes


>少perl包

	yum install perl gcc kernel-devel
