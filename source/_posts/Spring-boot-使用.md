---
title: spring boot 使用
toc: true
date: 2016-01-11 16:00:27
tags: spring-boot
categories: 编程
---


spring boot可使用Main运行一个web程序，对于简单的web应用还是比较方便的。

### 1. 工程目录
```
    project
        src/main/assembly/assembly.xml
        src/main/java/com/rolex/samples/
            bean/
            controller/
            dao/
            service/
            util/
            Main.java
        src/main/resources/
            static/  (相当于webcontent)
                css/
                html/
                js/
                index.html
            application.properties    
        test/
        target/
        pom.xml
        README.md

### 2. 程序主要文件     

***Main.java***
```
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Created with IntelliJ IDEA.
 * User: rolex
 * Date: 2016/05/06
 * Version: 1.0
 */
@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}
```
Main是程序的入口类，程序启动时会扫描Main所在目录子目录的所有文件进行spring注入（对声明了spring注解的类有效）。

***pom.xml***
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">

    ...     
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>1.4.0.BUILD-SNAPSHOT</version>
    </parent>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>
    </dependencies>

    <repositories>
        <repository>
            <id>spring-snapshots</id>
            <name>Spring Snapshots</name>
            <url>https://repo.spring.io/libs-snapshot</url>
            <snapshots>
                <enabled>true</enabled>
            </snapshots>
        </repository>
    </repositories>
</project>
```

### 2. 启动

执行命令
>java -jar app.jar --spring.config.name=app
