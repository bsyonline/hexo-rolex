---
title: 风铃企业查询api接口
toc: true
date: 2016-09-08 17:12:07
tags:
categories:
---

## 1 服务简介

企业基本信息查询api接口是内部服务接口，未做权限检查。
此文档为内部交流使用。

## 2 服务器端描述

### 2.1 简介

|术语|描述|
|-|-|
|测试地址| http://192.168.11.21:8080/query/entInfo|


### 2.2 说明

该接口为风铃向阿里提供查询服务的数据查询接口。
目前支持查询的数据集包括：企业照面信息，管理人员，股东，股东对外投资，法人对外投资，法人对外任职，股权冻结，股权出质，分支机构，动产抵押，动产抵押物，行政处罚，失信被执行人，被执行人，变更历史，清算，组织机构代码。
支持查询个体工商户基本信息。
### 2.3 申明

本文档仅提供给授权开发商设计相关接口服务使用,未经允许不得对外布。 本文档中可能存在技术部分错误或印刷不清晰,我们会定期进行更改并发布新版本,对资料中描述的产品改 进或更改,不在另行通知。

## 3 客户端调用方法描述

### 3.1 电信数据核查

####3.1.1  HTTP HEADER设置
无

#### 3.1.2 请求参数描述


|参数名称|类型|是否必需|描述|
|-|-|
|entName|string|必须|企业名称|
|mask|string|必须|掩码为任意项组合。basic,shareHolders,priPerson,priPersonInv,priPersonPosition,entInv,sharesFrost, sharesImpawn,filiation,bzxr,xzcf,disSxbzxr,morGuaInfo,morInfo,alter,liquidation,orgCode|
|entType|string|必须|ent或gt|

#### 3.1.3 请求示例

```json
GET http://192.168.11.21:8080/query/entInfo?entName=%E5%A4%A7%E9%80%9A%E5%8E%BF%E8%AF%9A%E5%8F%8B%E6%B1%BD%E8%BD%A6%E8%A3%85%E7%92%9C
 &mask=basic%2CshareHolders%2CpriPerson%2CpriPersonInv%2CpriPersonPosition%2CentInv%2CsharesFrost%2C
 sharesImpawn%2Cfiliation%2Cbzxr%2Cxzcf%2CdisSxbzxr%2CmorGuaInfo%2CmorInfo%2Calter%2Cliquidation&entType=gt
```

#### 3.1.4 返回值参数描述

|类|类型|描述|
|-|-|
|basic|Object|照面信息
|shareHolders|List|股东|
|priPerson|List|管理人员|
|priPersonInv|List|法人对外投资|
|priPersonPosition|List|法人对外任职|
|entInv|List|企业对外任职|
|sharesFrost|List|股权冻结|
|sharesImpawn|List|股权出质|
|filiation|List|分支机构|
|bzxr|List|被执行人|
|xzcf|List|行政处罚|
|disSxbzxr|List|失信被执行人|
|morGuaInfo|List|动产抵押物|
|morInfo|List|动产抵押|
|alter|List|变更历史|
|liquidation|List|清算|
|orgCode|List|组织机构代码|

#### 3.1.5 响应示例
```
{
    "basic":{
        "entName":"大通县诚友汽车装璜",
        "name":"张文刚",
        "identity":"",
        "regNo":"6301213010207",
        "oriRegNo":"",
        "orgCodes":"",
        "regCap":"5000",
        "recCap":"",
        "regCapCur":"",
        "esDate":"2006-11-07",
        "opFrom":"2006-11-07",
        "opTo":"2009-12-31",
        "entType":"9999",
        "entStatus":"3",
        "changeDate":"2006-11-07",
        "canDate":"2006-11-07",
        "revDate":"",
        "dom":"大通县桥头镇解放路",
        "abuItem":"汽车装璜 服务***",
        "cbuItem":"汽车装璜 服务***",
        "opScope":"",
        "opScoAndForm":"汽车装璜 服务***",
        "regOrgCode":"630121",
        "regOrgProvince":"630000",
        "ancheYear":"",
        "ancheDate":"",
        "industryPhyCode":"O",
        "industryCoCode":"8011",
        "empNum":"1",
        "entNameEng":"",
        "tel":"2013306",
        "creditCode":"",
        "province":"",
        "oploc":"大通县桥头镇解放路",
        "domDistrict":"630121001",
        "pripid":"630000_630121000052006110715045"
    },
    "shareHolders":[    ],
    "priPerson":[    ],
    "priPersonInv":[    ],
    "priPersonPosition":[    ],
    "entInv":[    ],
    "sharesFrost":[    ],
    "sharesImpawn":[    ],
    "filiation":[    ],
    "bzxr":[    ],
    "xzcf":[    ],
    "disSxbzxr":[    ],
    "morGuaInfo":[    ],
    "morInfo":[    ],
    "alter":[    ],
    "liquidation":[    ]
}
```
说明：数据集会返回全部字段。
**1. Basic**

字段名|字段说明|
-|-
entName|企业名称
name|法定代表人姓名
identity|个人识别码
regNo|注册号（新）
oriRegNo|原注册号
orgCodes|组织机构代码
regCap|注册资本(万元)
recCap|实收资本(万元)
regCapCur|注册资本币种
esDate|开业日期
opFrom|经营期限自
opTo|经营期限至
entType|企业(机构)类型
entStatus|经营状态
changeDate|变更日期
canDate|注销日期
revDate|吊销日期
dom|住址
abuItem|许可经营项目
cbuItem|一般经营项目
opScope|经营(业务)范围
opScoAndForm|经营(业务)范围及方式
regOrgCode|注册地址行政区编号
regOrgProvince|所在省份
ancheYear|最后年检年度
ancheDate|最后年检日期
industryPhyCode|行业门类代码
industryCoCode|国民经济行业代码
empNum|员工人数
entNameEng|企业英文名称
tel|电话
creditCode|信用代码
province|省节点编码
oploc|经营场所
domDistrict|住所所在行政区划
pripid|pripid

**2. ShareHolder**

字段名|字段說明
-|-
inv| 股东名称
identity| 个人识别码
invType| 股东类型
subConAm| 认缴出资额(万元)
conDate| 出资日期
currency| 币种，CA04
conform| 出资方式
conprop| 出资比例
country| 国别

**3. PriPerson**

字段名|字段說明
-|-
name| 人员姓名
identity| 个人标识
position| 职务
sex| 性别
birth| 出生年份

**4. PriPersonInv**

字段名|字段說明
-|-
name| 法人名称
entJgName| 企业机构名称
regNo| 注册号
entType| 企业类型
regCap| 注册资本
regCapCur| 注册资本币种
entStatus| 企业状态
canDate| 注销日期
revDate| 吊销日期
regOrgCode| 登记机关
subConAm| 认缴出资额
currency| 认缴出资额币种
conform| 出资方式
conprop| 出资比例
esDate| 开业日期

**5. PriPersonPosition**

字段名|字段說明
-|-
name| 法人姓名
entJgName| 企业机构名称
regNo| 注册号
entType| 企业机构类型
regCap| 注册资本
regCapCur| 注册资本币种
entStatus| 企业状态
canDate| 注销日期
revDate| 吊销日期
regOrgCode| 注册地址行政区编号
position| 职务
lerepSign| 是否法人
esDate| 开业日期

**6. EntInv**

字段名|字段說明
-|-
entJgName| 企业机构名称
regNo| 注册号
entType| 企业类型
regCap| 注册资本
regCapCur| 注册资本币种
entStatus| 企业状态
canDate| 注销日期
revDate| 吊销日期
regOrgCode| 登记机关
subConAm| 认缴出资额
currency| 认缴出资额币种
conform| 出资方式
conprop| 出资比例
esDate| 开业日期
name| 法人姓名

**7. SharesFrost**

字段名|字段說明
-|-
froDocNo| 冻结文号
froAuth| 冻结机关
froFrom| 开始日期
froTo| 冻结截止日期
froAm| 冻结金额
thawAuth| 解冻机关
thawDocNo| 解冻文号
thawDate| 解冻日期
thawComment| 解冻说明

**8. SharesImpawn**

字段名|字段說明
-|-
impOrg| 质权人姓名
impOrgType| 出质人类别
impAm| 出质金额
impOnRecDate| 出质备案日期
impExaeep| 出质审批部门
impSanDate| 出质批准日期
impTo| 出质截至日期

**9.  Bzxr**

字段名|字段說明
-|-
caseNo|	案号
name|	被执行人姓名/名称
regNo|	身份证号码/组织机构代码
gender|  性别
age|  年龄
province|  省
ysfzd| 身份证原始发证地
courtName|	执行法院
regDate|	立案时间
status|	状态
money|	执行标的
focusNum|	关注次数

**10. DisSxbzxr**

字段名|字段說明
-|-
 caseNo| 案号
name| 被执行人姓名
type| 失信人类型
gender| 性别
age| 年龄
regNo|身份证号码/工商注册号
ysfzd| 身份证原始发证地
businessEntity| 法定代表人/负责人姓名
regDate|立案时间
publishDate| 发布时间
courtName| 执行法院
province| 省份
gistNo| 执行依据文号
gistUnit|做出执行依据单位
duty|生效法律文书确定的义务
disruptTypeName| 失信被执行人行为具体情形
performance| 被执行人的履行情况
performedPart| 已履行(元)
unperformPart|未履行(元)
focusNum|关注次数
exitDate| 退出日期
caseStatus| 案件状态

**11. Alter**
字段名|字段說明
-|-
altDate|变更时间
altItem|变更项
altBe|变更前
altAf|变更后

**12. Filiation**

字段名|字段說明
-|-
brName| 分支机构名称
brRegNo| 分支机构企业注册号
brPrincipal| 分支机构负责人
cbuItem| 一般经营项目
brAddr| 分支机构地址

**13. Liquidation**

字段名|字段說明
-|-
ligEntity| 清算责任人
ligPrincipal| 清算负责人
liqMen| 清算组成员
tel| 联系电话
ligst| 清算完结情况，CD14
ligEndDate| 清算完结日期
debtTranee| 债务承接人
claimTranee| 债权承接人

**14. MorInfo**

字段名|字段說明
-|-
morRegId|抵押ID
morTgagor|抵押人
mor|抵押权人
regOrgCode|登记机关
regDate|登记日期
morType|状态标识
morRegNo|登记证号
appRegRea| 申请抵押原因/申请抵押物登记原因
priClasecKind| 被担保的主债权种类
priClasecAm| 被担保的主债权数额
pefPerFrom| 履约起始日期/履约期限自
pefPerTo| 履约截止日期/履约期限至
canDate| 注销日期

**15. MorGuaInfo**

字段名|字段說明
-|-
guaId|抵押ID
guaName|抵押物名称
guaNum| 数量
guaVal| 价值

**16. Xzcf**

字段名|字段說明
-|-
caseTime| 案发时间
caseReason| 案由
caseVal| 案值
caseResult| 案件结果
caseType| 案件类型
exeSort| 执行类别
illegAct| 主要违法事实
penBasis| 处罚依据
penType| 处罚种类
penResult| 处罚结果
penAm| 处罚金额
penDecissDate| 触犯决定书签发日期
penExest| 处罚执行情况
penAuth| 处罚机关
penDecNo| 处罚决定文书

**17. OrgCode**

字段名|字段說明
-|-
orgCode| 组织代码
orgName| 组织名称
name| 法定代表人
manageOrg| 办证机构
regDate| 注册日期
orgType| 机构类型
regOrgCode| 行政区划
addr| 机构地址
date| 办证日期
invalidDate| 作废日期
zybz| 质疑标识：1 正常 2 废置
regNo| 注册号
isEnterprise| 是否企业(1:企业 2:非企业)
