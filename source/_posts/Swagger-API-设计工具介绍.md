---
title: 'Swagger : API 设计工具介绍'
toc: true
date: 2016-10-14 22:15:37
tags: Swagger
categories: 编程
---
Swagger 是一款基于 Node.js 的 API 设计工具，官方网站为 [swagger.io](http://swagger.io) 。Swagger Editor 能直观的生成 API 接口的说明，方便接口开发。
### Swagger Editor
Editor 可以在线使用 [http://editor.swagger.io/#/](http://editor.swagger.io/#/) ，也可以在本地环境运行，安装也很简单。
```
git clone https://github.com/swagger-api/swagger-editor.git
cd swagger-editor
npm install
npm start
```
访问 `http://localhost:8080/` 可看到效果。
![](http://7xqgix.com1.z0.glb.clouddn.com/swagger-editor.png)

swagger 使用 yaml 语法规范，简单的可参考官方示例，语法详细见 [https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md) 。

示例：

```ymal
swagger: "2.0"
info:
  version: 1.0.0
  title: A RESTful Adventure
host: 127.0.0.1:8080
schemes:
  - http
basePath: /query
consumes:
  - application/json
produces:
  - application/json
paths:
  /entInfo:
    get:
      summary: get all dataSet of ent.
      operationId: list_characters
      parameters:
        - name: entId
          in: query
          description: primary key of ent.
          required: true
          type: string
        - name: mask
          in: query
          description: dateSet name split by ','.
          required: true
          type: string
        - name: entType
          in: query
          description: type of ent.
          required: false
          type: string
      responses:
        200:
          description: An array of Characters
          schema:
            $ref: "#/definitions/Info"
          headers:
            Access-Control-Allow-Origin:
              description: The number of allowed requests in the current period
              type: string
            Access-Control-Allow-Headers:
              description: The number of remaining requests in the current period
              type: string
        400:
          description: You tried to teleport. That's just not allowed.
          schema:
            $ref: "#/definitions/Error"
        500:
          description: System error.
          schema:
            $ref: "#/definitions/Error"
        default:
          description: Unexpected errors
          schema:
            $ref: "#/definitions/Error"
  /test:
    # This is a HTTP operation
    get:
      # Describe this verb here. Note: you can use markdown
      description: |
        Gets `Person` objects.
        Optional query param of **size** determines
      # Expected responses for this operation:
      responses:
        # Response code
        200:
          description: Successful response
          # A schema describing your response object.
          # Use JSON Schema format
          schema:
            title: result
            type: string

definitions:
  Info:
    type: object
    readOnly: true
    properties:
      basic:
        $ref: "#/definitions/Basic"
      priPerson:
        type: array
        items:
          $ref: "#/definitions/PriPerson"
      shareHolder:
        type: array
        items:
          $ref: "#/definitions/ShareHolder"
      priPersonInv:
        type: array
        items:
          $ref: "#/definitions/PriPersonInv"
      entInv:
        type: array
        items:
          $ref: "#/definitions/EntInv"
      priPersonPosition:
        type: array
        items:
          $ref: "#/definitions/PriPersonPosition"
      sharesImpawn:
        type: array
        items:
          $ref: "#/definitions/SharesImpawn"
      sharesFrost:
        type: array
        items:
          $ref: "#/definitions/SharesFrost"
      disSxbzxr:
        type: array
        items:
          $ref: "#/definitions/DisSxbzxr"
      bzxr:
        type: array
        items:
          $ref: "#/definitions/Bzxr"
      filiation:
        type: array
        items:
          $ref: "#/definitions/Filiation"
      morInfo:
        type: array
        items:
          $ref: "#/definitions/MorInfo"
      morGuaInfo:
        type: array
        items:
          $ref: "#/definitions/MorGuaInfo"
      alter:
        type: array
        items:
          $ref: "#/definitions/Alter"
      liquidation:
        type: array
        items:
          $ref: "#/definitions/Liquidation"
      orgCode:
        type: array
        items:
          $ref: "#/definitions/OrgCode"
      xzcf:
        type: array
        items:
          $ref: "#/definitions/Xzcf"
  Basic:
    type: object
    properties:
      name:
        type: string
      entName:
        type: string
  PriPerson:
    type: object
    properties:
      name:
        type: string
      entName:
        type: string
  ShareHolder:
    type: object
    properties:
      name:
        type: string
      entName:
        type: string
  PriPersonInv:
    type: object
    properties:
      name:
        type: string
      entName:
        type: string
  EntInv:
    type: object
    properties:
      name:
        type: string
      entName:
        type: string
  PriPersonPosition:
    type: object
    properties:
      name:
        type: string
      entName:
        type: string
  SharesImpawn:
    type: object
    properties:
      name:
        type: string
      entName:
        type: string      
  SharesFrost:
    type: object
    properties:
      name:
        type: string
      entName:
        type: string
  DisSxbzxr:
    type: object
    properties:
      name:
        type: string
      entName:
        type: string
  Bzxr:
    type: object
    properties:
      name:
        type: string
      entName:
        type: string
  Filiation:
    type: object
    properties:
      name:
        type: string
      entName:
        type: string
  MorInfo:
    type: object
    properties:
      name:
        type: string
      entName:
        type: string        
  MorGuaInfo:
    type: object
    properties:
      name:
        type: string
      entName:
        type: string
  Alter:
    type: object
    properties:
      name:
        type: string
      entName:
        type: string  
  Liquidation:
    type: object
    properties:
      name:
        type: string
      entName:
        type: string   
  OrgCode:
    type: object
    properties:
      name:
        type: string
      entName:
        type: string        
  Xzcf:
    type: object
    properties:
      name:
        type: string
      entName:
        type: string
  Error:
    type: object
    properties:
      code:
        type: string
        description: A machine readable application error code. Not to be confused with the HTTP status code in the response.
      result:
        type: object
```
### Swagger UI
本地安装比较简单，按步骤执行命令应该没有问题，前提需要有 Node.js 环境。
```
git clone git@github.com:swagger-api/swagger-ui.git
cd swagger-ui
npm install
npm run build
npm run serve
```
访问 `http://localhost:8080` 可看到 demo 。
![](http://7xqgix.com1.z0.glb.clouddn.com/swagger-ui-index.png)


将自己写好的接口文件从 Editor 中导出，保存到 dist/ 下任意位置。
![](http://7xqgix.com1.z0.glb.clouddn.com/swagger-editor-export.png)

在浏览器中输入路径即可看到自己的接口列表。
![](http://7xqgix.com1.z0.glb.clouddn.com/swagger-ui-customiz.png)

在浏览器中可以直接进行调试，并可直观看到相关信息。
![](http://7xqgix.com1.z0.glb.clouddn.com/swagger-ui-post.png)
