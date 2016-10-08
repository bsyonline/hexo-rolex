---
title: idea 使用 maven 每次更新 pom 不重置 LanguageLevel 和 JavaCompiler 的办法
toc: true
date: 2014-01-10 15:49:54
tags: IDEA
categories: 编程
---


在pom.xml中加入

	<build>
	    <plugins>
	        <plugin>
	            <groupId>org.apache.maven.plugins</groupId>
	            <artifactId>maven-compiler-plugin</artifactId>
	            <version>2.3.2</version>
	            <configuration>
	                <source>1.7</source>
	                <target>1.7</target>
	            </configuration>
	        </plugin>
	    </plugins>
	</build>
