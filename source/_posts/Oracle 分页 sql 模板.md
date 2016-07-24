---
title: Oracle分页sql模板
toc: false
date: 2016-07-16 15:53:54
tags: oracle
categories: 数据库
---

Oracle通过ROWNUM进行分页，通过子查询实现。

```sql
SELECT *
FROM (SELECT
        A.*,
        ROWNUM RN
      FROM (
        SELECT * FORM t
      ) A
      WHERE ROWNUM <= 100)
WHERE RN >= 0
```
