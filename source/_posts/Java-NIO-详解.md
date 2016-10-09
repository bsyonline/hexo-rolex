---
title: Java NIO 详解
toc: true
date: 2016-09-21 11:12:01
tags:
categories: 其他
---

Java NIO 库是在JDK 1.4中引入的。Java NIO 弥补了原来的 I/O 的不足，它在标准 Java 代码中提供了高速的、面向块的 I/O。Java I/O 库与 Java NIO 最重要的区别是数据打包和传输的方式的不同，Java I/O 以**流**的方式处理数据，而 Java NIO 以**块**的方式处理数据。通过代码可以对 Java I/O 和 Java NIO 有直观的认识。
```java
/**
 * 使用IO读取指定文件的前1024个字节的内容。
 * @param args
 * @throws Exception
 */
public static void main(String[] args) throws Exception {
    FileInputStream is = new FileInputStream("GitHub.txt");

    byte[] buffer = new byte[8];

    is.read(buffer);

    System.out.println(new String(buffer));

    is.close();
}

/**
 * 使用NIO读取指定文件的前1024个字节的内容。
 * @param args
 * @throws Exception
 */
public static void main(String[] args) throws Exception {
    FileInputStream is = new FileInputStream("GitHub.txt");

    //为该文件输入流生成唯一的文件通道  FileChannel
    FileChannel channel = is.getChannel();

    //开辟一个长度为1024的字节缓冲区
    ByteBuffer buffer = ByteBuffer.allocate(8);

    channel.read(buffer);

    System.out.println(new String(buffer.array()));

    channel.close();
    is.close();
}
```
从上边的代码可以看出，Java NIO 的主要使用了 Channel 和 Buffer ，它们是 Java NIO 的核心。FileChannel 和 ByteBuffer 是 Channel 和 Buffer 最常用的实现类。
Java NIO 是 Java I/O 的补充而不是替代，在某些场景使用 Java I/O 要容易很多。例如一次读一行，使用 BufferedReader 的 readLine() 方法很容易，而要使用 Java NIO 则需要自己来判断一行从哪里结束。
### Channel
Channel 相当于 Java I/O 的流，Java NIO 所有的操作都由 Channel 开始的。
### Buffer
Channel 提供了从源读取数据的渠道，而数据的操作都是由 Buffer 完成的。每个 Buffer 都有 capacity 、limit 、position 、mark 4 个属性。
* capacity
  Buffer 的容量
* limit
  limit 是 Buffer 操作数据的范围。写数据时，limit 的上限等于 capacity，读数据时，limit 为有效数据的长度。
* position
  position 指示了 Buffer 中下一个可操作的数据的位置。
* mark
  临时的 position 。

以上边代码为例。当 new 一个 ByteBuffer 时，首先将 capacity 和 limit 的大小都设置为 8 ，mark 为 -1， position 为 0 ，初始化完成 capacity 的大小就不变了。
![](http://7xqgix.com1.z0.glb.clouddn.com/buffer init_12.png)
有了 Buffer 就可以开始写数据了。从 Chanel 读 5 个字节到 Buffer 中，position 变为 5 。

![](http://7xqgix.com1.z0.glb.clouddn.com/buffer_write_1.png)
现在要从 Buffer 中将数据写到 Chanel 中，需要执行 flip() 方法。执行 flip() 方法后，position 变为 0， limit 变为 5 。

![](http://7xqgix.com1.z0.glb.clouddn.com/buffer_flip_1.png)
如果 Buffer 中写了 3 个字节到 Chanel 中，如果执行 clear() 方法，剩余的 2 个字节将被丢弃，Buffer 可重新读入数据。如果想保留 2 个字节后续处理，可执行 compact() ，Buffer 将拷贝 2 个字节到起始位置，将 position 置为 2 ，limit 置为 8 。
![](http://7xqgix.com1.z0.glb.clouddn.com/buffer_compact.png)

### 大文件处理
Java 中大文件处理通常会使用带缓冲的流，Java NIO 提供了
