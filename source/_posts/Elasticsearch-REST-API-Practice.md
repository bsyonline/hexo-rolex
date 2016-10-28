---
title: Elasticsearch REST API Practice
toc: true
date: 2016-10-28 13:58:36
tags: Elasticsearch
categories: 编程
---

<!-- toc -->
## I. 索引
#### 创建索引
```
curl -XPUT 'http://localhost:9200/twitter/tweet/1' -d '{
    "user" : "kimchy",
    "post_date" : "2009-11-15T14:12:12",
    "message" : "trying out Elasticsearch"
}'
```
#### 获取索引
```
curl -XGET 'http://localhost:9200/twitter/tweet/1'
```
不显示索引内容
```
curl -XGET 'http://localhost:9200/twitter/tweet/1?_source=false'
```
只显示索引内容
```
curl -XGET 'http://localhost:9200/twitter/tweet/1/_source'
```
一次查多个
```
curl 'http://localhost:9200/_mget' -d '{
    "docs" : [
        {
            "_index" : "twitter",
            "_type" : "tweet",
            "_id" : "1"
        },
        {
            "_index" : "twitter",
            "_type" : "tweet",
            "_id" : "2"
        }
    ]
}'

curl 'http://localhost:9200/twitter/_mget' -d '{
    "docs" : [
        {
            "_type" : "tweet",
            "_id" : "1"
        },
        {
            "_type" : "tweet",
            "_id" : "2"
        }
    ]
}'

curl 'http://localhost:9200/twitter/tweet/_mget' -d '{
    "docs" : [
        {
            "_id" : "1"
        },
        {
            "_id" : "2"
        }
    ]
}'

curl localhost:9200/twitter/tweet/_mget -d '{"ids":["1","2"]}'

curl localhost:9200/twitter/_mget -d '{
  "docs":[
      {
        "_type":"tweet",
        "_id":"1",
        "fields":["user","message"]
      },
      {
        "_type":"tweet1",
        "_id":"2",
        "fields":["year"]
      }
  ]
}'
```
#### 删除索引
```
curl -XDELETE 'http://localhost:9200/twitter/tweet/1'
```
#### 更新索引
```
curl -XPOST 'http://localhost:9200/twitter/tweet/1/_update' -d '{
    "doc" : {
        "name" : "new_name"
    }
}'
```
#### 批量操作
```
curl -s -XPOST localhost:9200/_bulk -d '
{ "index" : { "_index" : "test", "_type" : "type1", "_id" : "1" } }
{ "field1" : "value1" }
{ "delete" : { "_index" : "test", "_type" : "type1", "_id" : "2" } }
{ "create" : { "_index" : "test", "_type" : "type1", "_id" : "3" } }
{ "field1" : "value3" }
{ "update" : {"_id" : "1", "_type" : "type1", "_index" : "index1"} }
{ "doc" : {"field2" : "value2"} }'
```
#### 重建索引
```
curl localhost:9200/_reindex -d '
{
  "source":{
    "index":"twitter"
  },
  "dest":{
    "index":"new_twitter"
  }
}'
```
对部分索引重建
```
curl localhost:9200/_reindex -d '
{
  "source":{
    "index":"twitter",
    "query":{
      "term":{
        "user":"kimchy"
      }
    }
  },
  "dest":{
    "index":"new_twitter1"
  }
}'
```
合并为新索引
```
curl localhost:9200/_reindex -d '
{
  "source":{
    "index":["twitter","test"]
  },
  "dest":{
    "index":"new_twitter2"
  }
}'
```
限制重建索引的数量
>注意 size 的位置，如果放在 source 内，表示 **batch size** ，默认为 1000 。

```
curl localhost:9200/_reindex -d '
{
  "size":1,
  "source":{
    "index":"twitter"
  },
  "dest":{
    "index":"new_twitter4"
  }
}'
```
## II. 检索
**初始化数据**
```
curl -XPUT 'http://localhost:9200/twitter/tweet/1' -d '{
    "user" : "kimchy",
    "postDate" : "2009-11-15T14:12:12",
    "message" : "trying out Elasticsearch"
}'

curl -XPUT 'http://localhost:9200/twitter/tweet/2' -d '{
    "user" : "allen",
    "postDate" : "2010-01-25T11:02:10",
    "message" : "using Elasticsearch"
}'
```
####  分页
分页使用的参数 from 和 size ，from 表示从第一个文档开始，默认从 0 开始，size 表示一页几条记录，默认是 10 条。
```
curl 'localhost:9200/twitter/_search' -d '{
    "from":0,
    "size":10,
    "query":{
        "term" : {"user" : "kimchy"}
    }
}'
```
>和数据库分页不同，elasticsearch 的分页数量 from + size 不能超出 index.max_result_window 参数的限制（默认为 10000）。该值可在 elasticsearch 的配置文件中修改。

#### 查询得分
每个查询到的文档都有一个得分，查询结果可以通过得分来过滤，不过这个不常用，因为无法知道每个文档在每次查询中的具体得分。
```
curl 'localhost:9200/twitter/_search' -d '{
    "min_score":0.5,
    "query":{
        "term" : {"user" : "kimchy"}
    }
}'
```

#### 指定返回的字段
```
curl 'localhost:9200/twitter/_search' -d '{
    "fields":["user","message"],
    "query":{
        "term" : {"user" : "kimchy"}
    }
}'

curl 'localhost:9200/twitter/_search' -d '{
    "query":{
        "term" : {"user" : "kimchy"}
    }
}'
```
>如果不指定 fields ，elasticsearch 默认返回 \_source 字段。

#### 指定查询的类型
elasticsearch 提供了一下几种查询类型：
* query_and_fetch
  1.3 以后移除
* query_then_fetch
  先获文档排序信息，在获取相关分片，返回结果最大为 size 取值。
* dfs_query_and_fetch
  1.3 以后移除
* dfs_query_then_fetch
  比 query_then_fetch 多了一步计算分布式词频。
* count
  2.0 废弃
* scan
  2.0 废弃
可在查询是指定类型
```
curl 'localhost:9200/twitter/_search?pretty=true&search_type=query_then_fetch' -d '{
    "query":{
        "term" : {"user" : "kimchy"}
    }
}'
```
>默认是 query_then_fetch

#### 指定检索执行的位置（preference）
elasticsearch 默认在分片之间随机执行，可以修改为一下方式：
* \_primary
  在主分片上执行。
* \_primary_first
  优先在主分片上执行，如果主分片不可用，则在其他分片上执行。
* \_local
  在请求发送到的节点上的分片上执行。
* \_replica
  在副本上执行。
* \_replica_first
  优先在副本上执行。
* \_only_node:xyz
  在 node_id 为 xyz 的节点上执行。
* \_prefer_node:xyz
  优先在 node_id 为 xyz 的节点上执行。
* \_shards:2,3
  在 2 和 3 分片上执行。
* \_only_nodes
  在子节点上执行。
* custome
  一个字符串值，带有相同的值的请求会在相同的节点上执行。

```
curl 'localhost:9200/twitter/_search?preference=_local' -d '{
    "query":{
        "term" : {"user" : "kimchy"}
    }
}'
```
#### DSL 查询
DSL （Domain Specific Language）包含两种类型的子句：
* Leaf query clauses
  用特定的值查找特定的字段
* 复合子句
  Leaf query clauses 和 复合子句的包装
##### 全文检索
###### match_all
```
curl 'localhost:9200/twitter/_search?preference=_local' -d '{
    "query":{
        "match_all": { "boost" : 1.2 }
    }
}'
```
###### match
```
curl 'localhost:9200/twitter/_search?preference=_local' -d '{
    "query":{
        "match" : {
            "message" : "Elasticsearch"
        }
    }
}'
```
有三种类型：
* **boolean match**
默认的 match 查询类型。
```

```
* **match_phrase**
```

```
* **match_phrase_prefix**
```

```




##### term 级别查询
###### term 查询
精确匹配给定的值。
```
curl 'localhost:9200/twitter/_search' -d '{
    "query":{
        "term" : {"user" : "kim"}
    }
}'
```
>term 不会解析查询的字段，即不会对字段分词

###### terms 查询
```
curl 'localhost:9200/twitter/_search' -d '{
    "query":{
        "terms" : {
            "user" : ["kimchy", "allen"]
        }
    }
}'
```


#### 排序
elasticsearch 使用的默认排序为得分逆序排序。
```
"sort":[
    {"_score": "desc"}
]
```
我们可对一个或多个字段指定排序规则。
```
```
