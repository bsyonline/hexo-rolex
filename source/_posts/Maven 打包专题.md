---
title: Maven打包专题
toc: true
date: 2016-07-16 15:53:42
tags:
categories:
---


###1. 可执行jar包

***pom.xml***

    <build>
        <plugins>
            <plugin>
                <artifactId>maven-assembly-plugin</artifactId>
                <configuration>
                    <descriptorRefs>
                        <descriptorRef>jar-with-dependencies</descriptorRef>
                    </descriptorRefs>
                    <archive>
                        <manifest>
                            <mainClass>com.rolex.tools.Ashbringer</mainClass>
                        </manifest>
                    </archive>
                </configuration>

            </plugin>
        </plugins>
    </build>

使用命令
>mvn assembly:assembly

可生成可执行jar包。配置文件是打在jar包里边的，所以想灵活的使用外部配置文件，此方法并不合适。

###2. jar包

***jar-with-dependencies***
```
<assembly xmlns="http://maven.apache.org/plugins/maven-assembly-plugin/assembly/1.1.3"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/plugins/maven-assembly-plugin/assembly/1.1.3 http://maven.apache.org/xsd/assembly-1.1.3.xsd">
    <!-- TODO: a jarjar format would be better -->
    <id>jar-with-dependencies</id>
    <formats>
        <format>jar</format>
    </formats>
    <includeBaseDirectory>false</includeBaseDirectory>
    <dependencySets>
        <dependencySet>
            <outputDirectory>/</outputDirectory>
            <useProjectArtifact>true</useProjectArtifact>
            <unpack>true</unpack>
            <scope>runtime</scope>
        </dependencySet>
    </dependencySets>
</assembly>

```

###3. war包

###4. ear包

###5. tar.gz
针对开发、测试、生产环境各自有一套配置文件是，可将工程打tgz包部署，解压后使用软连接引用不同环境的配置。
文件目录如下：

    project
        bin/
        etc/
        lib/
        sql/
        src/main/assembly/assembly.xml
        src/main/java
        src/main/resources
        target/
        pom.xml
        README.md

***pom.xml***
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.rolex.maven.samples</groupId>
    <artifactId>maven-samples</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.build.timestamp.format>yyyyMMddHHmm</maven.build.timestamp.format>
        <java-version>1.8</java-version>
    </properties>

    <profiles>
        <!-- 防止idea每次更新pom都重置jdk设置 -->
        <profile>
            <id>jdk-1.8</id>
            <activation>
                <activeByDefault>true</activeByDefault>
                <jdk>${java-version}</jdk>
            </activation>
            <properties>
                <maven.compiler.source>${java-version}</maven.compiler.source>
                <maven.compiler.target>${java-version}</maven.compiler.target>
                <maven.compiler.compilerVersion>${java-version}</maven.compiler.compilerVersion>
            </properties>
        </profile>
    </profiles>

    <dependencies>
        ...
    </dependencies>

    <build>
        <plugins>
            <!-- 编译插件 -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>${java-version}</source>
                    <target>${java-version}</target>
                </configuration>
            </plugin>
            <!-- 解决依赖jar包插件 -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-dependency-plugin</artifactId>
                <executions>
                    <execution>
                        <id>copy-dependencies</id>
                        <phase>package</phase>
                        <goals>
                            <goal>copy-dependencies</goal>
                        </goals>
                        <configuration>
                            <!-- 将jar拷贝到lib目录 -->
                            <outputDirectory>${project.basedir}/lib</outputDirectory>
                            <overWriteReleases>false</overWriteReleases>
                            <overWriteSnapshots>true</overWriteSnapshots>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
            <!-- 打tgz包插件 -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-assembly-plugin</artifactId>
                <configuration>
                    <appendAssemblyId>false</appendAssemblyId>
                    <finalName>${project.artifactId}-${maven.build.timestamp}</finalName>
                    <descriptors>
                        <descriptor>src/main/assembly/assembly.xml</descriptor>
                    </descriptors>
                </configuration>
                <executions>
                    <execution>
                        <id>make-assembly</id>
                        <phase>package</phase>
                        <goals>
                            <goal>single</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>

    <repositories>
        <!-- 设置中央仓库 -->
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
***assembly.xml***
```
<assembly xmlns="http://maven.apache.org/plugins/maven-assembly-plugin/assembly/1.1.2"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/plugins/maven-assembly-plugin/assembly/1.1.2 http://maven.apache.org/xsd/assembly-1.1.2.xsd">
    <id>distribution</id>
    <formats>
        <format>tgz</format>
    </formats>
    <fileSets>
        <fileSet>
            <directory>${project.basedir}</directory>
            <outputDirectory>/</outputDirectory>
            <includes>
                <!-- 需要打进tgz包的文件和目录 -->
                <include>lib/**/*</include>
                <include>bin/**/*</include>
                <include>sql/**/*</include>
                <include>etc/**/*</include>
                <include>README*</include>
            </includes>
        </fileSet>
        <fileSet>
            <directory>${project.basedir}/target/classes</directory>
            <outputDirectory>/target/classes</outputDirectory>
            <includes>
                <include>**/*.class</include>
            </includes>
        </fileSet>
    </fileSets>
</assembly>
```
assembly的详细属性说明参考[http://maven.apache.org/plugins/maven-assembly-plugin/assembly.html](http://maven.apache.org/plugins/maven-assembly-plugin/assembly.html)

使用命令
>mvn clean package

可生成tgz包。
