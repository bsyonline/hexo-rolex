---
title: 我的 hexo 我做主
toc: true
date: 2016-07-19 14:27:28
tags: hexo
categories: hexo
---

Maupassant 主题有一些细节对于强迫症晚期患者来说，不改实在是浑身难受，遂记录一下修改项和修改方案。

### 1. 修改 toc 的位置
toc 在正文的右上，占了正文的空间，在 toc 较长的情况下，正文不能很好的显示，所以将 toc 改为在文章开头显示。

```css
.toc-article {
  border: 1px solid #bbb;
  border-radius: 7px;
  margin: 1.1em 0 0 2em;
  padding: 0.7em 0.7em 0 0.7em;
  max-width: 40%;
}

#toc {
  line-height: 1em;
  float: right;
  .toc {
    padding: 0;
    margin: 0.5em;
    line-height: 1.8em;
    li {
      list-style-type: none;
    }
  }

}
```
主要是去掉浮动和边框，在调整一下周围位置。
```css
.toc-article {
  padding: 40px 0 0 0;
}

#toc {
  line-height: 1em;
  .toc {
    padding: 20px;
    line-height: 1.8em;
    li {
      list-style-type: none;
    }
  }

}
```
### 2. 去掉 toc 中的序号
```css
#toc {
  line-height: 1em;
  .toc {
    padding: 20px;
    line-height: 1.8em;
    li {
      list-style-type: none;
      a {
        .toc-number {
          display: none;
        }
      }
    }
  }
  .toc-child {
    margin-left: 1em;
    padding-left: 0;
  }
}
```
### 3. 修改代码区样式
在将语言改成 zh_CN 后，代码区行高需要调整,去掉 `.codeblock` 的 line-height 属性,修改 `.codeblock.line` 的 height 属性。
```css
figure.highlight,
.codeblock {
    background:     #f7f8f8;
    margin:         10px 0;
    /* line-height:    1.2em; */
    color:          #333;
    padding-top:    15px;
    overflow:       hidden;
    border: 1px solid #e5e5e5; /* 代码块加边框 */

    // All lines in gutter and code container
    .line {
        height:    2.1em;
        font-size: 13px;
    }
}
```

### 4. 去掉文章结尾 tags
tags 改成在文章开始位置显示，结尾的 tags 就没必要显示了，干脆隐藏掉。
```css
.post {
  ...
  .tags{
    padding-bottom: 1em;
    height: 30px;
    a {
        display: none;
        margin-right: .5em;
        &:before {
            font-family: "FontAwesome";
            content: "\f0c6";
            padding-right: 0.3em;
        }
    }
  }
}
```
调整分享按钮的位置
```css
.article-share-link {
  margin-top: 1em;
}
```

### 5. 调整文章列表显示

```css
.post-content {
    padding-top: 10px;
}
```

### 6. 修改 table 样式
给 table 加上边框，将原有框线调细
```css
table {
    th {
        font-weight: bold;
        padding: 5px 10px;
        border: 1px solid #909ba2;
    }
    td {
        padding: 5px 10px;
        border: 1px solid #909ba2;
    }
}
```

### 7. 修改显示宽度
修改 `.body_container` 的 `max-width`
```css
.body_container {
    max-width: 85%;
}
```
调整 content 和 sidebar 宽度
```css
.pure-u-md-3-4, .pure-u-md-18-24 {
    width: 80% !important;
}
.pure-u-md-1-4, .pure-u-md-6-24 {
    width: 20% !important;
}
```
调整后 footer 不居中，修改 base.jade 第59行 `.pure-u-1.pure-u-md-3-4` 为 `.pure-u-1.pure-u-md-4-4` 。
