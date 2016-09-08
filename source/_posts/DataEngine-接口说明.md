---
title: dataengine框架结构
toc: true
date: 2016-07-15 22:25:09
tags: chinadaas
categories: chinadaas
---
### 1. 数据流
hdfs到hbase

	HDFS->HDFSDataProvider->*DataProvider->HbaseListener->hbase

hbase到hbase

	HBase->HBaseDataProvider->*DataProvider->HbaseListener->hbase

部署
=

####执行脚本
	data_loader.sh E_ENT_BASEINFO 20150510 hdfs://chinadaas11:8020/hive1/user/hive/warehouse/enterprisebaseinfocollect_20150510_compare/

	data_loader.sh E_INV_INVESTMENT 20150510 hdfs://chinadaas11:8020/hive1/user/hive/warehouse/e_inv_investment_20150510_compare/

	data_loader.sh E_PRI_PERSON 20150510 hdfs://chinadaas11:8020/hive1/user/hive/warehouse/e_pri_person_20150510_compare/

	data_loader.sh E_GT_BASEINFO 20150510 hdfs://chinadaas11:8020/hive1/user/hive/warehouse/e_gt_baseinfo_20150510_compare/

	data_loader.sh E_GT_PERSON 20150510 hdfs://chinadaas11:8020/hive1/user/hive/warehouse/e_gt_person_20150510_compare/

	data_loader.sh DIS_SXBZXR 20150510 dis_sxbzxr_new_name

	data_loader.sh FROST 20150510 frost_pripid

	data_loader.sh IMPAWN 20150510 impawn_pripid

	data_loader.sh XZCF 20150510 xzcf_pripid


http接口说明
=

####1. CL:根据用户id查监控的变更企业列表
#####1.1 接口说明
本接口用于获取用户监控名单中发生变更的企业列表。
#####1.2 请求类型
GET
#####1.3 输入参数
参数||说明
-|-|-
type||业务类型
params||
|uid|用户id
|form|起始记录
|to|结束记录

>业务类型参考附录1  
>起始from为0，to-from默认为10

#####1.4 返回结果
参数|说明
-|-
uid|用户请求时携带的用户id
total|总记录数
begin|查询的起始记录
end|查询的结束记录
ents|用户监控名单中变更的企业的pripid列表

>返回结果为JSON格式
#####1.5 示例
请求：

	GET http://localhost:8080/datum/changes?
	{
	    "type": "cl",
	    "params": {
	        "uid": "61301",
	        "from": 1,
	        "to": 4
	    }
	}
响应：

	{
	    "uid": "61301",
		"total": 84,
		"begin": 1,
		"end": 5,
	    "ents": [
	        "110000_17DBF8047B3244ADBFB8EDB2B964B9FA",
	        "210000_0475ba9b-491b-415d-964b-4d6be6b88476",
	        "210000_0a591f44-3030-4171-aa88-7fea64c5254c",
	        "520000_5201005000023769"
	    ]
	}

####2. CD:根据用户id和企业pripid获取企业的变更详情
#####2.1 接口说明
本接口用于获取用户监控名单中发生变更的企业列表。
#####2.2 请求类型
GET
#####2.3 输入参数
参数||说明
-|-|-
type||业务类型
params||参数
|uid|用户id
|pripid|企业pripid
|provider|查询的数据源类型

>数据源类型参考附录2
#####2.4 返回结果
参数|说明
-|-
uid|用户请求时携带的用户id
ent|用户请求时携带的企业pripid
provider|用户请求时携带的数据源类型
changeItems|企业变更详情根节点
column|变更字段
oldValue|变更前值
newValue|变更后值
type|变更类型

>返回结果为JSON格式

#####2.5 示例
请求：

	GET http://localhost:8080/datum/changes?
	{
	    "type": "cd",
	    "params": {
	        "uid": "61301",
	        "pripid": "210000_210200000022001120400213",
	        "provider": "A"
	    }
	}
响应：

	{
	    "uid": "61301",
	    "ent": "210000_0475ba9b-491b-415d-964b-4d6be6b88476",
	    "provider": "A",
	    "changeItems": [
	        {
	            "column": "INDUSTRYPHY",
	            "newValue": "H",
	            "oldValue": "F",
	            "type": "UPDATE"
	        }
	    ]
	}

####3. QO:根据订单id获取订单快照
#####3.1 接口说明
本接口用于获取指定id的订单快照信息。
#####3.2 请求类型
GET
#####3.3 输入参数
参数|说明
-|-
order|订单id
#####3.4 返回结果
参数|说明
-|-
orderId|用户请求时携带的订单id
info|订单信息

>返回结果为JSON格式

#####3.5 示例
请求：

	GET http://localhost:8080/datum/order/61301

响应：

	{
	    "orderId": "61301",
	    "info": [
	        {
	        }
	    ]
	}


####4. SO:保存订单快照
#####4.1 接口说明
本接口用于保存订单快照信息。
#####4.2 请求类型
POST
#####4.3 输入参数
无
#####4.4 返回结果
参数|说明
-|-
orderId|订单id
status|操作状态，0保存成功，1保存失败


>返回结果为JSON格式

#####4.5 示例
请求：

	POST http://localhost:8080/datum/order
	{
		"orderId": "SDFYGTYYTUUUWQ",
		"snapshot": "ORDER INFO"
	}

响应：

	{
		"orderId": "SDFYGTYYTUUUWQ",
		"status": 0
	}


####5.CH:查询变更历史
#####5.1 接口说明
本接口用于查询一段时间内监控企业的变更历史。
#####5.2 请求类型
GET
#####5.3 输入参数
参数||说明
-|-|-
type||业务类型
params||请求参数
|uid|用户id
|pripid|企业pripid
|startDate|开始日期
|endDate|结束日期
#####5.4 返回结果
参数|||说明
-|-|-|
uid|||用户id
pripid|||企业pripid
history|||变更历史
|date||时间
|changeItem||变更项
||column|数据源类型
||type|变更类型
||oldValue|旧值
||newValue|新值

>返回结果为JSON格式

#####5.5 示例
请求：

	GET http://localhost:8080/datum/changes?
	{
	    "type": "ch",
	    "params": {
	        "uid": "31834",
	        "pripid": "210000_210200000022002082100109",
	        "startDate": "20150101",
	        "endDate": "20160101"
	    }
	}

响应：

	{
	    "uid": "31834",
	    "pripid": "210000_210200000022002082100109",
	    "history": [
	        {
	            "date": "20151214",
	            "changeItems": [
	                {
	                    "column": "S_EXT_SEQUENCE",
	                    "newValue": "210000201505072002331631",
	                    "oldValue": "210000201510092065303796",
	                    "type": "UPDATE"
	                },
	                {
	                    "column": "S_EXT_TIMESTAMP",
	                    "newValue": "2015-05-07 06:57:34.0",
	                    "oldValue": "2015-10-09 05:38:08.0",
	                    "type": "UPDATE"
	                },
	                {
	                    "column": "CERTYPE",
	                    "newValue": "!",
	                    "oldValue": "1",
	                    "type": "UPDATE"
	                },
	                {
	                    "column": "ABUITEM",
	                    "newValue": "",
	                    "oldValue": "210213061",
	                    "type": "UPDATE"
	                }
	            ]
	        }
	    ]
	}

####6.QA:查询企业基本信息
#####6.1 接口说明
本接口用于查询企业基本信息。
#####6.2 请求类型
GET
#####6.3 输入参数
参数||说明
-|-|-
type||业务类型
params||请求参数
|pripid|企业pripid
#####6.4 返回结果
参数|说明
-|-
ENTNAME|企业名称
...|

>返回结果为JSON格式

#####6.5 示例
请求：

	GET http://localhost:8080/datum/query?
	{
	    "type": "qa",
	    "params": {
	        "pripid": "210000_210200000022002082100109"
	    }
	}

响应：

	{
	    "version": 5,
	    "minSize": 75,
	    "S_EXT_NODENUM": "",
	    "PRIPID": "",
	    "S_EXT_SEQUENCE": "",
	    "ENTNAME": "大连站商场",
	    "ORIREGNO": "",
	    "REGNO": "24129465",
	    "ENTTYPE": "3200",
	    "PPRIPID": "",
	    "PENTNAME": "",
	    "PREGNO": "",
	    "HYPOTAXIS": "",
	    "INDUSTRYPHY": "F",
	    "INDUSTRYCO": "5139",
	    "ABUITEM": "",
	    "CBUITEM": "",
	    "OPFROM": "1899-12-30",
	    "OPTO": "1899-12-30",
	    "POSTALCODE": "",
	    "TEL": "3631881-3157",
	    "EMAIL": "",
	    "LOCALADM": "210200",
	    "CREDLEVEL": "",
	    "ASSDATE": "1900-01-01",
	    "ESDATE": "1899-12-30",
	    "APPRDATE": "1899-12-30",
	    "REGORG": "210200",
	    "ENTCAT": "1",
	    "ENTSTATUS": "3",
	    "REGCAP": "10",
	    "OPSCOPE": "百货",
	    "OPFORM": "",
	    "OPSCOANDFORM": "",
	    "PTBUSSCOPE": "",
	    "DOMDISTRICT": "210202",
	    "DOM": "大连市中山区长江路２６１号",
	    "ECOTECDEVZONE": "",
	    "DOMPRORIGHT": "02",
	    "OPLOCDISTRICT": "",
	    "OPLOC": "",
	    "RECCAP": "0",
	    "INSFORM": "",
	    "PARNUM": "0",
	    "PARFORM": "",
	    "EXENUM": "0",
	    "EMPNUM": "0",
	    "SCONFORM": "",
	    "FORCAPINDCODE": "",
	    "MIDPREINDCODE": "",
	    "PROTYPE": "",
	    "CONGRO": "0",
	    "CONGROCUR": "",
	    "CONGROUSD": "0",
	    "REGCAPUSD": "0",
	    "REGCAPCUR": "",
	    "REGCAPRMB": "0",
	    "FORREGCAPCUR": "",
	    "FORREGCAPUSD": "0",
	    "FORRECCAPUSD": "0",
	    "WORCAP": "0",
	    "CHAMECDATE": "1900-01-01",
	    "OPRACTTYPE": "",
	    "FORENTNAME": "",
	    "DEPINCHA": "大连市公安局",
	    "COUNTRY": "",
	    "ITEMOFOPORCPRO": "",
	    "CONOFCONTRPRO": "",
	    "FORDOM": "",
	    "FORREGECAP": "0",
	    "FOROPSCOPE": "",
	    "S_EXT_ENTPROPERTY": "",
	    "S_EXT_TIMESTAMP": "2015-05-07 06:57:34.0",
	    "S_EXT_BATCH": "",
	    "S_EXT_VALIDFLAG": "1",
	    "S_EXT_INDUSCAT": "3",
	    "S_EXT_ENTTYPE": "A02",
	    "MANACATE": "",
	    "LIMPARNUM": "0",
	    "FOREIGNBODYTYPE": "",
	    "ENTNAME_OLD": "大连站商场",
	    "PERSON_ID": "",
	    "NAME": "刘玉芳",
	    "CERTYPE": "!",
	    "CERNO": "",
	    "ANCHEYEAR": "\\N",
	    "CANDATE": "1996-10-11",
	    "REVDATE": "\\N",
	    "RECORD_STAT": "0",
	    "RECORD_DESC": "",
	    "ORGCODES": "",
	    "CREDITCODE": ""
	}

####7.CA:按地区统计变更企业数量
#####7.1 接口说明
本接口用于按统计每个地区某一批次数据的变更企业数量。
#####7.2 请求类型
GET
#####7.3 输入参数
参数||说明
-|-|-
type||业务类型
params||请求参数
|uid|用户id
|date|批次
#####7.4 返回结果
参数|说明
-|-
uid|用户id
date|批次
data|<k,v>，k为地区代码，v为企业变更量

>返回结果为JSON格式

#####7.5 示例
请求：

	GET http://localhost:8080/datum/countup?
	{
	    "type": "ca",
	    "params": {
	        "uid": "61301",
	        "date": "20151214"
	    }
	}

响应：

	{
	    "uid": "61301",
	    "date": "20151214",
	    "data": {
	        "210000": 490
	    }
	}

####8.CC:统计变更量
#####8.1 接口说明
本接口用于按统计某一批次数据的用户监控企业的字段变更量。
#####8.2 请求类型
GET
#####8.3 输入参数
参数||说明
-|-|-
type||业务类型
params||请求参数
|uid|用户id
|date|批次
#####8.4 返回结果
参数|说明
-|-
uid|用户id
date|批次
count|字段变更量

>返回结果为JSON格式

#####8.5 示例
请求：

	GET http://localhost:8080/datum/countup?
	{
	    "type": "cc",
	    "params": {
	        "uid": "61301",
	        "date": "20151214"
	    }
	}

响应：

	{
	    "uid": "61301",
	    "date": "20151214",
	    "count": 4486
	}

####9.CI:按指标统计企业变更数量
#####9.1 接口说明
本接口用于按统计某一批次数据的某些指标变更的企业。
#####9.2 请求类型
GET
#####9.3 输入参数
参数||说明
-|-|-
type||业务类型
params||请求参数
|uid|用户id
|date|批次

#####9.4 返回结果
参数|说明
-|-
uid|用户id
date|批次
count|企业变更数量
ents|数组，企业pirpid

>返回结果为JSON格式

#####9.5 示例
请求：

	GET http://localhost:8080/datum/countup?
	{
	    "type": "ci",
	    "params": {
	        "uid": "61301",
	        "date": "20151214",
	        "indicators": [
	            "ABUITEM",
	            "REGORG"
	        ]
	    }
	}

响应：

	{
	    "uid": "61301",
	    "date": "20151214",
	    "count": 38,
	    "ents": [
	        "210000_21021100001200103070022X",
	        "210000_210283000022012011800252",
			...
	    ]
	}

####10. SE:检索
#####10.1 接口说明
本接口用于提供模糊检索。查询字段为：名称，注册号、组织机构代码，统一社会信用代码。  
命中规则：wd为检索关键字，名称中包含wd或注册号、组织机构代码、统计社会信用代码以wd开头的记录为命中。
#####10.2 请求类型
GET
#####10.3 输入参数
参数|说明
-|-
wd|检索的关键字
#####10.4 返回结果
参数||说明
-|-|
wd||检索的关键字
results||检索结果
|score|评分
|pripid|主体id
|ename|主体名称
|regNo|注册号
|orgCode|组织机构代码
|creditCode|统一社会信用代码

>返回结果为JSON格式

#####10.5 示例
请求：

	GET http://localhost:8080/datum/search?wd=辽宁

响应：

	{
	    "wd": "辽宁",
	    "results": [
	        {
	            "score": 0.13453172,
	            "pripid": "210000_210202000011998102800195",
	            "ename": "辽宁书画院",
	            "regNo": "210202000022199",
	            "orgCode": "",
	            "creditCode": ""
	        },
	        {
	            "score": 0.13453172,
	            "pripid": "210000_210282000011980120100222",
	            "ename": "辽宁盐业机械厂",
	            "regNo": "11873106",
	            "orgCode": "",
	            "creditCode": ""
	        },
	        {
	            "score": 0.13453172,
	            "pripid": "210000_210202000011961030100026",
	            "ename": "辽宁电位器厂",
	            "regNo": "2102021100676",
	            "orgCode": "",
	            "creditCode": ""
	        },
	        {
	            "score": 0.13453172,
	            "pripid": "210000_21020200001199308260074X",
	            "ename": "辽宁万宁国际运输公司",
	            "regNo": "2102021105329",
	            "orgCode": "",
	            "creditCode": ""
	        },
	        {
	            "score": 0.13453172,
	            "pripid": "210000_210211000011900010101767",
	            "ename": "辽宁无线电二厂",
	            "regNo": "11857934",
	            "orgCode": "",
	            "creditCode": ""
	        }
	    ]
	}



remote接口说明
=

####1. 使用方法
实例化com.daas.data.business.RemoteBusiness

	RemoteBusiness remoteBusiness = SpringUtil.getAc().getBean(RemoteBusiness.class);

####2. 方法说明
#####2.1 查询变更列表
	public Changes findChanges(String uid, int from, int to);
#####2.2 查询变更明细
	public ChangeDetails findDetails(String uid, String pripid, String provider);
#####2.3 查企业基本信息
	public EntInfo findEntInfo(String pripid);
#####2.4 抓取订单快照
	public Order fetch(String orderId);
#####2.5 保存订单快照
	public Order save(String orderId, String snapshot);
#####2.6 查询一段时间企业变更历史
	public History changeHistory(String uid, String pripid, String startDate, String endDate);
#####2.7 统计某批次用户监控企业的字段变更量（按变更字段统计，有一项变更计算一次）
	public CountUp countUpByChangeItem(String uid, String date);
#####2.8 指标统计
	public CountUp countUpByIndicator(String uid, String date, String... indicator);
#####2.9 按地区统计变更企业数量
	public CountUp countUpByArea(String uid, String date);



#####附录1：业务类型

业务名称|类型|代码
-|-|-
查询基本信息|query
查询企业基本信息||qa
查询法人信息||qp
查询对外投资信息||qi
查询个体工商户信息||qb
查询个体经营者信息||qg
查询订单快照||qo
查询变更|changes|
查询变更列表||cl
查询变更详情||cd
查询变更历史||ch
保存|save
保存订单快照||so
统计|countup|
按地区统计||ca
按指标统计||ci
统计变更量||cc
检索|search|se




#####附录2：数据源类型
数据源名称|英文|代码
-|-|-
企业基本信息|E_ENT_BASEINFO|A
主要人员信息|E_PRI_PERSON|B
对外投资|E_INV_INVESTMENT|C
个体工商户基本信息|E_GT_BASEINFO|D
个体经营者基本信息|E_GT_PERSON|E
股权冻结|FROST|G
股权出质|IMPAWN|H
行政处罚|XZCF|I
失信被执行人|DIS_SXBZXR|J
变更推送|PUSH_CHANGE|F

#####附录3：表

表名|备注
-|-
meta|元数据表
m_gs_change|工商数据变更汇总表
m_non_gs_change|非工商数据变更汇总表
p_change|变更推送表
xzcf_pripid|行政处罚索引表
xzcf|行政处罚数据表
frost_pripid|股权冻结索引表
frost|股权冻结数据表
impawn_pripid|股权出质索引表
impawn|股权出质数据表
dis_sxbzxr_new_name|失信被执行人索引表
ENTERPRISEBASEINFOCOLLECT_ENTNAME_$DATE|失信被执行人字典表
dis_sxbzxr_new|失信被执行人数据表
|
