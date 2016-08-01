---
title: Client SDK (Java 版)
toc: true
date: 2016-07-16 16:00:45
tags: chinadaas
categories: chinadaas
---

<!--more-->
```
ChinadaasClient client = new ChinadaasClient(url, clientId, appId, token);
PersonCheckRequest request1 = new PersonCheckRequest(name, identity, type);
String result = client.get(request1);
```
