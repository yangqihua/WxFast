## api 接口文档

##### 1.用户登录
- POST /auth/login
- Request Body: code(用来换取openid),request_code,avatarUrl,city,province,gender,nickName
- success response for json
  ```
    {
        "result": {
            "userId":xxx,
            "userName":xxx,
            "hasPhone":是否已经绑定手机
        },
        "status":1
    } 
  ```
##### 2.怎么使用code 去请求微信服务器换取用户唯一标识openid
  ```
    GET https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
    其中：appid 为小程序 appid，secret 为小程序 secret，js_code 为客户端传过去的 code，grant_type 为固定字符串 authorization_code
  ```
  

  
##### 3.绑定手机
- POST /auth/bindphone
- Request Body: userId,phone,identityCode
- success response for json
```
  {
      "result": {
      },
      "status":1
  } 
```
