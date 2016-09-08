---
title: Java 关键字 volatile 详解
toc: false
date: 2016-08-08 11:39:01
tags: Java
categories: 编程
---

volatile 是 Java 语言的关键字，用来修饰变量。Java 的每个线程都拥有自己的内存，在某个时间点，多个线程中间的同一个变量的值可能是不同的，volatile 的作用就是让变量对所有线程都是一致的，每次获得的都是该变量的最新值。
<!--more-->
volatile 在特殊情况下（变量之间或前后没有约束）是能够保证线程安全的，反之，是不能保证线程安全的，比如，不能使用 volatile 来实现线程安全的计数器。 因为 volatile 不是原子性的，而 `i+1` 或 `i++` 操作实际是三个原子操作（read，赋值，write）的组合，所以不能保证线程安全。

volatile 不能像 synchronized 一样广泛的用于线程安全，虽然 volatile 的用法要和某些情况下的性能要比 synchronized 和锁简单和高效，但误用将导致程序出现错误。如果能在正确的场景使用 volatile ，还是能使程序更加简单。比如程序需要有一个标识来指示一个一次性操作，像资源初始化，那么使用 volatile 是非常方便的。
```java
volatile boolean isInit；
public void init() {
  isINit = true;
}

public void doSomething(){
  while(isInit){
    // do something
  }
}
```
volatile 变量比使用 synchronized 代码要简单一些，在这种只有一种状态转换的情况使用 volatile 是合适的。

**volatile 和 synchronized 简单比较**

|volatile|synchronized
-|-|-
作用位置|变量|方法，代码块
同步对象|主内存和线程内存之间某个变量的值|主内存和线程内存之间所有变量的值
消耗资源|少|多
