---
title: Oracle日期转换
toc: true
date: 2016-07-16 15:53:51
tags: oracle
categories: technology
---

Oracle日期转换示例。

### 1. 英语日期格式转换

```sql
SELECT
  TO_DATE(SUBSTR('29-JAN-16 03.09.31.030943000 PM', 0, 9), 'dd-MON-yy', 'NLS_DATE_LANGUAGE = American') d1,
  TO_CHAR(sysdate, 'DD-MON-YY', 'NLS_DATE_LANGUAGE = American') d2,
  TO_CHAR(sysdate, 'DD-MON-YY') d3
FROM dual
```

d1|d2|d3
-|-|-
2016-01-29 00:00:00 | 01-JUL-16|01-7月 -16
