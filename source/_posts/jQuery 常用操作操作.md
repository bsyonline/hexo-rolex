---
title: jQuery常用操作操作
toc: true
date: 2016-07-16 16:00:33
tags: jQuery
categories: 前端
---

jQuery 的常用操作整理一下，备忘。

### 1. 遍历json map
```js
$.each(map,function(key,values){     
    console.log(key);     
    $(values).each(function(){     
        console.log("/t" + this);     
    });     
 });
```
