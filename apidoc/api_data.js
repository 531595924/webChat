define({ "api": [
  {
    "type": "get",
    "url": "/miscellaneous/news",
    "title": "查看消息",
    "version": "0.2.0",
    "name": "news",
    "group": "Miscellaneous",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>登陆后返回的token</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "普通用户"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "repeatPassword",
            "description": "<p>重复密码(md5加密)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n   error: 0,\n   opepk: 1231,\n   message: \"注册成功\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "错误返回",
          "content": "{\n   error: 1,\n   message: \"该用户已注册\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/model/miscellaneous.js",
    "groupTitle": "Miscellaneous",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:5000/miscellaneous/news"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/addFriends",
    "title": "添加好友",
    "name": "addFriends",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>登陆后返回的token</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "普通用户"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userid",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n   error: 0,\n   message: \"添加好友请求已发送\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "错误返回",
          "content": "{\n   error: 1,\n   message: \"添加好友失败\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/model/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:5000/user/addFriends"
      }
    ]
  },
  {
    "type": "get",
    "url": "/user/getMenu",
    "title": "获取菜单",
    "name": "getMenu",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>登陆后返回的token</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "普通用户"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n   error: 0,\n   data: [\n       { name: \"首页\", route: \"home\" }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/model/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:5000/user/getMenu"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/login",
    "title": "登陆-手机号",
    "name": "login",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>用户名(手机号)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码(md5加密)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n   error: 0,\n   data: {\n     userinfo: {\n       _id: \"_id\",                     // id\n       username: \"username\",           // 用户名\n       name: \"name\",                   // 姓名\n       nickname: \"nickname\",           // 昵称\n       sex: [0,1,2],                   // 性别 0 无 1 男 2 女\n       lastlogindate: Date             // 上次登陆时间\n     },\n     token: \"token\"                    // 保存在客户端，后续接口需要验证 headers.Authorization;\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "错误返回",
          "content": "{\n   error: 1,\n   message: \"用户名密码错误\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/model/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:5000/user/login"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/registerByPhone",
    "title": "注册账号-手机号",
    "version": "0.1.0",
    "name": "registerByPhone",
    "group": "User",
    "description": "<p>描述详细描述</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>用户名(手机号)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码(md5加密)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "repeatPassword",
            "description": "<p>重复密码(md5加密)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n   error: 0,\n   message: \"注册成功\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "错误返回",
          "content": "{\n   error: 1,\n   message: \"该用户已注册\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/model/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:5000/user/registerByPhone"
      }
    ]
  },
  {
    "type": "get",
    "url": "/user/searchUsers",
    "title": "搜索用户",
    "name": "searchUsers",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>登陆后返回的token</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "普通用户"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "text",
            "description": "<p>用户 昵称 / 姓名 / 手机号</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n   error: 0,\n   data: [\n     {\n       nickname: \"\", // 用户昵称\n       userId: \"\", // 用户id\n       portraitUrl: \"\" // 用户头像\n     } // 最多返回5个\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "错误返回",
          "content": "{\n   error: 1,\n   message: \"没有找到用户\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/model/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:5000/user/searchUsers"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/setUserInfo",
    "title": "设置用户信息",
    "name": "setUserInfo",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>登陆后返回的token</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "普通用户"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "nickname",
            "description": "<p>昵称（1-10位，中文、字母、数字）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "sex",
            "description": "<p>性别（0无 1男 2女）</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n   error: 0,\n   data: userInfo // 返回更新后的用户信息\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "错误返回",
          "content": "{\n   error: 1,\n   message: \"用户信息设置错误，请重试\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/model/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:5000/user/setUserInfo"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/setUserPortrait",
    "title": "设置头像",
    "name": "setUserPortrait",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>登陆后返回的token</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "普通用户"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "binary",
            "optional": false,
            "field": "userPortrait",
            "description": "<p>头像（binary）</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n   error: 1,\n   data: {\n     url: url // 头像地址\n   },\n   message: \"上传成功\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "错误返回",
          "content": "{\n  error: 1,\n  sysError: err, // 系统错误\n  messate: \"上传失败，请重试或联系管理员\"\n)",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/model/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:5000/user/setUserPortrait"
      }
    ]
  }
] });
