---
title: Elasticsearch 检索
toc: true
date: 2016-07-15 22:25:09
tags: Elasticsearch
categories: Elasticsearch
---


<!--more-->

### 1. 精确查询
	public void query(String name, String queryString){
        QueryBuilder queryBuilder = QueryBuilders.queryString(queryString).field(name);
        SearchResponse response = client.prepareSearch(index).setTypes(type)
                .setQuery(queryBuilder).execute().actionGet();
        System.out.println(response.getHits().totalHits());//命中个数
        System.out.println(response.getHits().getAt(0).getId());//获取id
        System.out.println(response.getHits().getAt(0).getSource().get("column"));//获取column的值
        System.out.println(response.toString());//结果json串
    }

### 2. 范围查询
	public void queryRange(String name, String start, String end){
        QueryBuilder queryBuilder = QueryBuilders.rangeQuery(name).from(start).to(end);
        SearchResponse response = client.prepareSearch(index).setTypes(type)
                .setQuery(queryBuilder).execute().actionGet();
        System.out.println(response.getHits().totalHits());
        System.out.println(response.getHits().getAt(0).getId());
        System.out.println(response.getHits().getAt(0).getSource().get("column"));
        System.out.println(response.toString());
    }

### 3. 分页
	public void queryPagination(int begin, int pageSize){
        QueryBuilder queryBuilder = QueryBuilders.rangeQuery("date").from("20150101").to("20160101");
        SearchResponse response = client.prepareSearch(index).setTypes(type).setFrom(begin).setSize(pageSize)
                .setQuery(queryBuilder).execute().actionGet();
        System.out.println(response.getHits().totalHits());
        System.out.println(response.getHits().getAt(0).getId());
        System.out.println(response.getHits().getAt(0).getSource().get("column"));
        System.out.println(response.toString());
    }

### 4. 组合查询

	public void queryComplex(){
		//查询date在20150101到20160101之间并且pripid等于510000_CD6022264999并且变更字段为PRIPERSON的记录
		final BoolQueryBuilder query = new BoolQueryBuilder();
        query.must(QueryBuilders.queryString("510000_CD6022264999").field("pripid"));
        query.must(QueryBuilders.rangeQuery("date").from("20150101").to("20160101"));
		query.must(QueryBuilders.queryString("PRIPERSON").field("column"));

        SearchResponse response = client.prepareSearch(index).setTypes(type)
                .setQuery(query)
                .execute().actionGet();
        long hits = response.getHits().totalHits();
        if(hits > 0) {
            System.out.println(response.getHits().getAt(0).getId());
            System.out.println(response.getHits().getAt(0).getSource().get("column"));
            System.out.println(response.toString());
        }
    }

### 5. 前缀查询
	public void queryByPrefix(String name, String prefix){
        QueryBuilder queryBuilder = QueryBuilders.prefixQuery(name, prefix);
        SearchResponse response = client.prepareSearch(index).setTypes(type)
                .setQuery(queryBuilder).execute().actionGet();
        System.out.println(response.getHits().totalHits());
    }

### 6. id查询
	public void queryIds(String... ids){
        QueryBuilder queryBuilder = QueryBuilders.idsQuery(type).addIds(ids);
        SearchResponse response = client.prepareSearch(index)
                .setQuery(queryBuilder).execute().actionGet();
        System.out.println(response.getHits().totalHits());
        System.out.println(response.getHits().getAt(0).getId());
        System.out.println(response.getHits().getAt(0).getSource().get("column"));
        System.out.println(response.toString());
    }
