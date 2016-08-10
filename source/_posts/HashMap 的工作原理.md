---
title: HashMap 的工作原理
toc: false
date: 2016-08-09 11:37:57
tags: Java
categories: 编程
---

HashMap 是最常用的集合类之一，在面试中也出境颇高。经常会问 **HashMap 的特点** 及 **HashMap 和 Hashtable 的区别** 等等。那么就先做一下简单总结。

|HashMap|Hashtable
-|-|-
所在位置|实现 Map 接口，JDK 1.2 加入到 Java Collections Framework |Hashtable 集成自 Dictionary ，JDK 1.2 实现了 Map 接口
是否支持 null key 或 null value|是|否
线程安全|不安全|安全

以上是3点是我们耳熟能详的二者之间的区别，Hashtable 不是我们此篇的重点，暂且放在一旁。
### 碰撞
上边这个面试题是通常只是开胃菜，每个熟悉 Java 的人都能知晓。上题热身之后，经常会有这样的问题提出： **HashMap 是如何存储数据的?**
看过源码就能知道 HashMap 底层是使用 **Array** 和 **Linked Table** 来存储数据的。
```java
// jdk 1.8.0_74
public V put(K key, V value) {
    return putVal(hash(key), key, value, false, true);
}
```
HashMap 在 put 一个 key-value 对时，首先对 key 做 hash 操作，然后将 key 分配到 table[i] 的位置。如果两个 key 的 hash(key) 结果相同，那么这两个 key 就都会分配到 table[i] 的位置，这两个 key 就会在 table[i] 的位置以链表的形式存储，这种现象称为 **碰撞**。
可以用一张图来说明，我们假设将取模作为 `hash(key)` 的话，put 如下一组数据：

key|7|17|23|33|39|49|55|73|87|103|
-|-|-
value|a|b|c|d|e|f|g|h|i|j

将形成下图的结构

![](http://7xqgix.com1.z0.glb.clouddn.com/hashmap_01.png)

可以看到对 hash(key) 操作后，数据通过链表的形式分别存储在索引1和7的位置， 17,33,49 都存储在位置1，就是上文提到的碰撞。如果要从 HashMap 中取到33的值，首先需要定位到位置1，再遍历链表。理想情况下，如果在一个 HashMap 中数据都分散在数组中，没有出现碰撞，那么 get 的速度最快，时间复杂度为 O(1) , 如果出现碰撞，get 的性能将有所下降。极端情况下，如果所有数据都存储在相同位置，那 HashMap 就变成了 Linked Table ，时间复杂度为 O(n) 。
针对这样的情况，JDK 1.8 对 HashMap 的实现方式进行了优化，如果链表的长度大于阀值，就将链表改成红黑树，get 的时间复杂度为 O(logn) , 如图：

![](http://7xqgix.com1.z0.glb.clouddn.com/hashmap_02.png)

好了，说了这么多，简单总结一下吧。通常情况下，如果两个对象的 key 的 hashCode() 相同，那么他们 bucket 的位置相同而发生碰撞，Map.Entry 对象存储在链表中。当 get 时，通过 hashCode() 找到 bucket 的位置，然后遍历链表，通过 key.equals() 找到指定的值。

**为什么使用 String 作为 key 是一个不错选择？**
其实，答案可以从上边获得。因为，String 是 final 的，并且有固定的 hashCode() 和 equals() 方法，所以能有效减少碰撞的发生，同时由于不可变，可以缓存 key 的 hashcode ，提高 get 对象的速度。同理，如果自定义对象作为 key ，应保证对象是不可变的，即保证 equals() 和 hashCode() 方法正确重写。

### rehashing 问题
HashMap 还有一个知识点会作为问题提出： HashMap 的容量是固定的么？ 如何扩容？ 会有什么问题？...等等。诸如此类的一系列问题，了解了 HashMap 的 resize 之后都可以轻松回答。
HashMap 有两个重要的参数，DEFAULT_INITIAL_CAPACITY 和 DEFAULT_LOAD_FACTOR 。在初始化时默认容量为16，当 bucket 的使用数量超过 DEFAULT_INITIAL_CAPACITY 和 DEFAULT_LOAD_FACTOR 的乘积时，HashMap 会将容量扩充为原来的两倍（就是将上图中的数组大小变成原来的两倍），同时重新按照 hash(key) 来存放对象到新的数组中，这个过程叫做 rehashing 。
在 JDK 1.8 之前，每次 resize 需要从新计算 hash(key) 的值，在 JDK 1.8 中对这里也做了优化。1.8 的 resize 使用的是2次幂扩展，所以在 resize 的过程中，元素要么在原索引位置，要么在2倍索引位置。如下图所示：

![](http://7xqgix.com1.z0.glb.clouddn.com/hashmap_03.png)


看一下源码会更清楚
```java
// jdk 1.8.0_74
Node<K,V> loHead = null, loTail = null;
Node<K,V> hiHead = null, hiTail = null;
Node<K,V> next;
do {
    next = e.next;
    if ((e.hash & oldCap) == 0) {
        if (loTail == null)
            loHead = e;
        else
            loTail.next = e;
        loTail = e;
    }
    else {
        if (hiTail == null)
            hiHead = e;
        else
            hiTail.next = e;
        hiTail = e;
    }
} while ((e = next) != null);
if (loTail != null) {
    loTail.next = null;
    newTab[j] = loHead;
}
if (hiTail != null) {
    hiTail.next = null;
    newTab[j + oldCap] = hiHead;
}
```
先遍历链表算出 hiTail 和 loTail ，然后根据 hiTail 和 loTail 得到元素在新数组中的位置。说简单点，由于扩容是向左移一位，那么不用每次都重新计算 hash(key) ，只要看左边新扩展的一位是0还是1, 0就留在原位置，1就将原位置索引加上原容量得到新位置的索引。计算结果参考下图：
![](http://7xqgix.com1.z0.glb.clouddn.com/hashmap_04.png)

最后 rehashing 有没有问题呢？ 在多线程环境下，rehashing 会出现条件竞争，导致程序死循环。这也是为什么要在多线程环境中对 HashMap 进行线程安全处理的原因了。
