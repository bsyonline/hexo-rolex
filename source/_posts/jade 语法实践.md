---
title: jade 语法实践
toc: true
date: 2016-07-18 14:29:39
tags: jade
categories: technology
---

jade是一个模板引擎，可以通过node.js来使用。本来对前端技术了解不多，接触jade源于搭建hexo博客系统。maupassant主题模板是基于jade的，所以想按自己的想法来定制maupassant主题简单了解了一下jade。

hexo的maupassant主题是一个极简主题模板，安装也很简单，用起来不错，但是有些小地方还是想按照自己的想法改一改：
1. 默认只有归档，没有tags和categories。而且添加了tags和categories后不能显示tags和categories的列表；
2. 每篇文章tags标签在文章末尾，希望categories一样在文章开头显示；

### 增加tags列表
安装hexo和maupassant主题后在themes/maupassant/_ config.yml中添加tags和categories两个menu，重启服务界面能看到tags和categories的菜单导航。但是点击会报找不到页面错误，所以还需要生成tags/index和categories/index。执行
```
hexo new page tags
hexo new page categories
```
会生成tags/index.md和categories/index.md文件，重启后不会再报找不到页面的错误。
但index.md默认是空白页面，内容需要自己写，所以想参考archive来写一些内容。想显示的内容也很简单，首先就是列出所有tags或categories，然后能显示每个tag或category下的文章数量。
网站的tags和categories不是固定的，所以在index.md中写死是不行的，需要利用模板来实现。看了看maupassant主题的layout结构，首先先参考archive.jade创建了一个tags.jade文件,只保留大的结构。
```
extends base

block title
  title= page.tag + ' | ' + config.title
block content

  include _partial/paginator.jade
```
参考archive.jade代码，对网站所有tag进行分组，然后遍历显示。
```
each tags in _.groupBy(site.tags.toArray(), function(p){return page.tag})
  ul.listing
    for tag in tags
      li
        h4
          a(href=url_for(tag.path))= _.split(tag.path,'\/')[1]
```
最后一行代码等号后边是tag的名字，原本以为tag.name就可以了，但是重建之后发现不能正常显示。不明白原因，查看了hexo的文档，在hexo的变量声明中tag的名字是page.tag，猜测是在post页面中才能引用tag属性。查了文档也没找到正确的打开方式，忽然发现tag.path可以正常显示tag的路径，所以是否可以在path中将tag的name提取出来呢？于是查了一下[https://lodash.com/docs](https://lodash.com/docs)(archive.jade里注释中有让看的，就看看喽)，还真有spilt的函数。改完重新生成，显示正常了(别忘了把tag/index.md的layout改成tags哈)。


### 改变文章中tags的显示位置
默认界面tags在文章结束坐下位置，但我期望在界面文章开始位置增加tags的显示，即在点击量统计的后边再增加显示tags内容。结合模板代码和界面的显示效果，可以大致定位到具体代码位置。文章正文默认使用的post模板，位于themes/maupassant/layout/post.jade。在文件15-19行是点击量统计的代码，所以在后面可添加tags显示代码。
```
if page.tags.length > 0
  span= ' | '
  span.tag
    for tag in page.tags.toArray()
      i(class=['fa','fa-paperclip']) &nbsp;
      a(href=url_for(tag.path))= tag.name + ''

```
jade模板的语法有严格缩进要求，所以和上边的代码位置一致即可。
代码看起来很简单，但是改的时候还是费了一些周折。
```
page.tags.toArray()
```
的写法参考上文
```
page.categories.toArray()
```
很容易写出来。
```
i(class=['fa','fa-paperclip']) &nbsp;
```
是一个i标签，用于显示图标，渲染成html是
```
<i class="fa fa-paperclip">&nbsp;</i>
```
如果不看jade的语法，只根据post.jade文件中的代码可以大致推测jade的语法规则比如
```
span.category
```
渲染成html后是```
<span class="category"></span>
```
但是单class属性图标无法正常显示，也试过
```
i.fa.fa-paperclip
或
i.fa i.fa-paperclip
```
等等写法，均不能达到效果，只好去看jade的文档。在[http://jade-lang.com/reference/attributes/](http://jade-lang.com/reference/attributes/)中**Class Attributes**找到了多个class的语法说明，问题至此得以解决。
