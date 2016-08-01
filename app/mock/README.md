# Mock 规范

## url

* GET /zoos：列出所有动物园
* POST /zoos：新建一个动物园
* GET /zoos/ID：获取某个指定动物园的信息
* PUT /zoos/ID：更新某个指定动物园的信息（提供该动物园的全部信息）
* PATCH /zoos/ID：更新某个指定动物园的信息（提供该动物园的部分信息）
* DELETE /zoos/ID：删除某个动物园
* GET /zoos/ID/animals：列出某个指定动物园的所有动物
* DELETE /zoos/ID/animals/ID：删除某个指定动物园的指定动物


* ?limit=10：指定返回记录的数量
* ?offset=10：指定返回记录的开始位置。
* ?page=2&per_page=100：指定第几页，以及每页的记录数。
* ?sortby=name&order=asc：指定返回结果按照哪个属性排序，以及排序顺序。
* ?animal_type_id=2：指定筛选条件


## 返回数据

### 单数据：


```javascript
{
  "success": true,
  "errorCode": null,
  "errorMsg": null,
  "data": {
    "id": "4028809e55d8e9434532d92296f10004",
    "deleteTime": null,
    "sortNo": 0,
    "version": 0,
    "tenant": {
      "id": "1",
      "createTime": 1467337504000,
      "lastTime": 1467337504000,
      "deleteTime": null,
      "sortNo": 0,
      "version": 0,
      "isRealAuth": 2,
      "tenantUid": null,
      "registerUserId": null
    },
    "balance": 83388.17,
    "voiceRemain": 24,
    "smsRemain": 54,
    "conferenceRemain": 68
  }
}
```

### 请求成功但业务处理失败抛出异常：

{
  "success": false,
  "errorCode": "0000",
  "errorMsg": "aaaaaa",
  "data": null
}


### 多数据（list）

{
  "success": true,
  "errorCode": null,
  "errorMsg": null,
  "data": [
    {
      "id": "11",
      "createTime": 1467251075000,
      "lastTime": 1467251075000,
      "deleteTime": null,
      "sortNo": 0,
      "version": 0,
      "tenant": {
        "id": "1",
        "createTime": 1467337504000,
        "lastTime": 1467337504000,
        "deleteTime": null,
        "sortNo": 0,
        "version": 0,
        "isRealAuth": 2,
        "tenantUid": null,
        "registerUserId": null
      },
      "name": "应用",
      "status": 1,
      "description": "描述？呵呵",
      "type": "餐饮",
      "industry": "金融",
      "whiteList": "",
      "url": "www.baidu.com",
      "isAuth": null,
      "isVoiceDirectly": 1,
      "isVoiceCallback": 1,
      "isSessionService": 1,
      "isRecording": 1,
      "isVoiceValidate": 1,
      "isIvrService": 1
    },
  ]
}


//分页（page）

{
  "success": true,
  "errorCode": null,
  "errorMsg": null,
  "data": {
    "pageSize": 20,
    "startIndex": 1,
    "totalCount": 29,
    "totalPageCount": 2,
    "currentPageNo": 1,
    "result": [
      {
        "id": "4028809e55e7b5610155e7b7e5420000",
        "createTime": 1468471436000,
        "lastTime": 1468471436000,
        "deleteTime": null,
        "sortNo": 1468471436596,
        "version": 0,
        "tenant": {
          "id": "1",
          "createTime": 1467337504000,
          "lastTime": 1467337504000,
          "deleteTime": null,
          "sortNo": 0,
          "version": 0,
          "isRealAuth": 2,
          "tenantUid": null,
          "registerUserId": null
        },
        "amount": 0.01,
        "type": "ZHIFUBAO",
        "status": "PAID",
        "orderId": "510d19ff2d746ffe8d92ffe6abb541d7"
      },
    ]
  }
}
