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
    "url": "/user/getFriendsList",
    "title": "获取好友列表",
    "name": "getFriendsList",
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
          "content": "{\n   error: 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "错误返回",
          "content": "{\n   error: 1,\n   message: \"获取错误\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/model/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:5000/user/getFriendsList"
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
    "type": "get",
    "url": "/user/getNews",
    "title": "获取news消息",
    "name": "getNews",
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
            "optional": true,
            "field": "type",
            "description": "<p>0全部消息 1未读消息（默认） 2已读消息</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n   error: 0,\n   data: {\n       \"_id\": \"\", // 消息id\n       \"type\": \"addFriend\", // 消息类型\n       \"message\": \"123456789请求添加你为好友\", // 消息文档\n       \"data\": { // 消息数据\n           \"sendUserId\": \"5f0eca020717ae2540af29e8\",\n           \"receiverId\": \"5f0fced6394edf0c2c520cf3\"\n       },\n       \"sendTime\": \"2020-07-17T03:31:00.805Z\", // 发送时间\n       \"readTime\": null, // 读取时间\n       \"readStatus\": false // 是否已读\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "错误返回",
          "content": "{\n   error: 1,\n   message: \"查询news信息错误\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/model/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:5000/user/getNews"
      }
    ]
  },
  {
    "type": "get",
    "url": "/user/getUserChatRecord",
    "title": "获取与好友的聊天记录",
    "name": "getUserChatRecord",
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
            "field": "friendId",
            "description": "<p>好友id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n   error: 0\n   data: [{\n        sendId: \"\", // 发送者id\n        text: \"\", // 信息\n        time: \"\" // 发送时间\n     }] \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "错误返回",
          "content": "{\n   error: 1,\n   message: \"获取错误\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/model/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:5000/user/getUserChatRecord"
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
    "url": "/user/passAddFriend",
    "title": "通过添加好友请求",
    "name": "passAddFriend",
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
            "field": "friendId",
            "description": "<p>好友id</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "pass",
            "description": "<p>是否通过 0不通过 1通过</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n   error: 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "错误返回",
          "content": "{\n   error: 1,\n   message: \"已添加此好友\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/model/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:5000/user/passAddFriend"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/readNews",
    "title": "已读消息",
    "name": "readNews",
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
            "field": "newsId",
            "description": "<p>消息 ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n   error: 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "错误返回",
          "content": "{\n   error: 1,\n   message: \"已读消息错误\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/model/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:5000/user/readNews"
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
    "url": "/user/sendMessage",
    "title": "发送消息（好友）",
    "name": "sendMessage",
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
            "field": "toId",
            "description": "<p>接收者ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "text",
            "description": "<p>消息（最多1000字符）</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "time",
            "description": "<p>发送时间 js 时间戳</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n   error: 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "错误返回",
          "content": "{\n   error: 1,\n   message: \"获取错误\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/model/user.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:5000/user/sendMessage"
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
