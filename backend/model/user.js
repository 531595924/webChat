/*
 * @Author: coldlike 531595924@qq.com 
 * @Date: 2020-06-30 17:39:33 
 * @Last Modified by: coldlike 531595924@qq.com
 * @Last Modified time: 2020-08-10 15:09:50
 */
const express = require(`express`)
const router = express.Router()
const userDb = require('../db/user')
const Joi = require('@hapi/joi')
const { createToken } = require('../token')
const fs = require("fs")
const auth = require('../auth')
const ws = require('../websocket')

/**
 * @api {post} /user/registerByPhone 注册账号-手机号
 * @apiVersion 0.1.0
 * @apiName registerByPhone
 * @apiGroup User
 * @apiDescription 描述详细描述
 * 
 * @apiParam {string} username 用户名(手机号)
 * @apiParam {string} password 密码(md5加密)
 * @apiParam {string} repeatPassword 重复密码(md5加密)

 * 
 * @apiSuccessExample  {json} 成功返回
 * {
 *    error: 0,
 *    message: "注册成功"
 * }
 * 
 * @apiErrorExample  {json} 错误返回
 * {
 *    error: 1,
 *    message: "该用户已注册"
 * }
 */

router.post('/registerByPhone', async (req, res) => {
  let reqData = req.fields;
  // joi 验证前端传入数据
  let schema = Joi.object({
    username: Joi.string().pattern(new RegExp(/^(13\d|1[5-9]\d)\d{8}$/)).required(),
    password: Joi.string().alphanum().min(32).max(32).required(),
    repeatPassword: Joi.ref('password')
  });

  await schema.validateAsync(reqData).catch(err => {
    res.send({
      error: 1,
      message: '用户名或密码输入错误'
    })
    return Promise.reject()
  });
  let repeatRes = await userDb.findOne({ username: reqData.username })
  if (!repeatRes) {
    let dBdata = new userDb({
      username: reqData.username,
      password: reqData.password
    });

    dBdata.save()
      .then(saveres => {
        res.send({
          error: 0,
          message: '注册成功'
        })
      })
      .catch(err => {
        res.send({
          error: 500,
          message: '注册失败,请联系网站管理员',
          sysErr: err
        })
        return Promise.reject()
      })
  } else {
    res.send({
      error: 1,
      message: '该用户已注册'
    })
  }
})

/**
 * @api {post} /user/login 登陆-手机号
 * @apiName login
 * @apiGroup User
 * 
 * @apiParam {string} username 用户名(手机号)
 * @apiParam {string} password 密码(md5加密)
 * 
 * @apiSuccessExample  {json} 成功返回
 * {
 *    error: 0,
 *    data: {
 *      userinfo: {
 *        _id: "_id",                     // id
 *        username: "username",           // 用户名
 *        name: "name",                   // 姓名
 *        nickname: "nickname",           // 昵称
 *        sex: [0,1,2],                   // 性别 0 无 1 男 2 女
 *        lastlogindate: Date             // 上次登陆时间
 *      },
 *      token: "token"                    // 保存在客户端，后续接口需要验证 headers.Authorization;
 *    }
 * }
 * 
 * @apiErrorExample  {json} 错误返回
 * {
 *    error: 1,
 *    message: "用户名密码错误"
 * }
 */
router.post('/login', async (req, res) => {
  let reqData = req.fields;
  // joi 验证前端传入数据
  let schema = Joi.object({
    username: Joi.string().pattern(new RegExp(/^(13\d|1[5-9]\d)\d{8}$/)).required(),
    password: Joi.string().alphanum().min(32).max(32).required()
  });

  await schema.validateAsync(reqData).catch(err => {
    res.send({
      error: 1,
      message: '用户名或密码输入错误',
      sysErr: err.details[0].message
    })
    return Promise.reject()
  });

  let dbRes = await userDb.findOne({
    username: reqData.username,
    password: reqData.password
  })
    .select({
      _id: 1,
      username: 1,
      name: 1,
      nickname: 1,
      sex: 1,
      lastlogindate: 1,
      userPortrait: 1
    })
    .catch(err => {
      res.send({
        error: 500,
        message: '服务器错误',
        sysErr: err
      })
      return Promise.reject()
    });

  if (dbRes) {
    await userDb.updateOne({ _id: dbRes._id }, { lastlogindate: new Date() });
    let token = createToken({ _id: dbRes._id, username: reqData.username, password: reqData.password });
    res.send({
      error: 0,
      data: {
        userInfo: dbRes,
        token: token
      }
    })
  } else {
    res.send({
      error: 1,
      message: '用户名或密码输入错误'
    })
  }
})

/**
 * @api {get} /user/getMenu 获取菜单
 * @apiName getMenu
 * @apiGroup User
 * 
 * @apiHeader {string} Authorization 登陆后返回的token
 * @apiPermission 普通用户
 * 
 * @apiSuccessExample  {json} 成功返回
 * {
 *    error: 0,
 *    data: [
 *        { name: "首页", route: "home" }
 *    ]
 * }
 */
router.get('/getMenu', auth, async (req, res) => {
  res.send({
    error: 0,
    data: req.user.menudata
  })
})

/**
 * @api {post} /user/setUserPortrait 设置头像
 * @apiName setUserPortrait
 * @apiGroup User
 * 
 * @apiHeader {string} Authorization 登陆后返回的token
 * @apiPermission 普通用户
 * 
 * @apiParam {binary} userPortrait 头像（binary）
 * 
 * @apiSuccessExample  {json} 成功返回
 * {
 *    error: 1,
 *    data: {
 *      url: url // 头像地址
 *    },
 *    message: "上传成功"
 *   }
 * 
 * @apiErrorExample  {json} 错误返回
 *  {
 *    error: 1,
 *    sysError: err, // 系统错误
 *    messate: "上传失败，请重试或联系管理员"
 *  )
 */
router.post('/setUserPortrait', auth, async (req, res) => {
  const file = req.files.userPortrait;
  // 限制文件格式
  if (file.type != "image/jpeg") {
    res.send({
      error: 1,
      message: "头像文件要求 jpg 格式"
    })
    await fs.promises.unlink(file.path)
    return false
  }
  // 限制文件大小
  if ((file.bytesWritten / 1024) > 2048) {
    res.send({
      error: 1,
      message: "头像文件要小于 2M"
    })
    await fs.promises.unlink(file.path)
    return false
  }
  let time = new Date();
  time = time.getTime();
  let url = `http://localhost:5000/userUpData/userPortrait/${req.user._id}-${time}.jpg`;

  try {
    await fs.promises.rename(file.path, `../userUpData/userPortrait/${req.user._id}-${time}.jpg`)
    await userDb.updateOne({ _id: req.user._id }, { $set: { userPortrait: url } })

    // 删除原头像文件
    let oldUrl = req.user.userPortrait;
    if (oldUrl && oldUrl != "") {
      oldUrl = oldUrl.split("/")
      oldUrl = oldUrl[oldUrl.length - 1]
      await fs.promises.unlink(`../userUpData/userPortrait/${oldUrl}`)
    }
  } catch (err) {
    res.send({
      error: 1,
      sysError: err,
      messate: "上传失败，请重试或联系管理员"
    })
  }

  res.send({
    error: 0,
    data: {
      url: url
    },
    message: "上传成功"
  })
})


/**
 * @api {post} /user/setUserInfo 设置用户信息
 * @apiName setUserInfo
 * @apiGroup User
 * 
 * @apiHeader {string} Authorization 登陆后返回的token
 * @apiPermission 普通用户
 * 
 * @apiParam {string} nickname 昵称（1-10位，中文、字母、数字）
 * @apiParam {string} sex 性别（0无 1男 2女）
 * 
 * @apiSuccessExample  {json} 成功返回
 * {
 *    error: 0,
 *    data: userInfo // 返回更新后的用户信息
 * }
 * 
 * @apiErrorExample  {json} 错误返回
 * {
 *    error: 1,
 *    message: "用户信息设置错误，请重试"
 * }
 */
router.post('/setUserInfo', auth, async (req, res) => {
  let reqData = req.fields;
  // joi 验证前端传入数据
  let schema = Joi.object({
    nickname: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9_\u4e00-\u9fa5]{1,10}$/)).required(),
    sex: Joi.number().min(0).max(2).required()
  });

  await schema.validateAsync(reqData).catch(err => {
    res.send({
      error: 1,
      message: '用户信息格式错误，请重试',
      sysErr: err.details[0].message
    })
    return Promise.reject()
  });
  userDb.findByIdAndUpdate(req.user._id, {
    $set: {
      nickname: reqData.nickname,
      sex: reqData.sex
    }
  }, { new: true })
    .select({
      _id: 1,
      username: 1,
      name: 1,
      nickname: 1,
      sex: 1,
      lastlogindate: 1,
      userPortrait: 1
    })
    .then(dbRes => {
      if (dbRes) {
        res.send({
          error: 0,
          data: dbRes
        })
      } else {
        res.send({
          error: 1,
          message: "用户未找到，请重试"
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.send({
        error: 1,
        message: "用户信息设置失败，请重试"
      })
    })
})

/**
 * @api {get} /user/searchUsers 搜索用户
 * @apiName searchUsers
 * @apiGroup User
 * 
 * @apiHeader {string} Authorization 登陆后返回的token
 * @apiPermission 普通用户
 * 
 * @apiParam {string} text 用户 昵称 / 姓名 / 手机号
 * 
 * @apiSuccessExample  {json} 成功返回
 * {
 *    error: 0,
 *    data: [
 *      {
 *        nickname: "", // 用户昵称
 *        userId: "", // 用户id
 *        portraitUrl: "" // 用户头像
 *      } // 最多返回5个
 *    ]
 * }
 * 
 * @apiErrorExample  {json} 错误返回
 * {
 *    error: 1,
 *    message: "没有找到用户"
 * }
 */
router.get('/searchUsers', auth, async (req, res) => {
  let reqData = req.query;
  // joi 验证前端传入数据
  let schema = Joi.object({
    text: Joi.string().min(2).max(20).required()
  });

  await schema.validateAsync(reqData).catch(err => {
    res.send({
      error: 1,
      message: '用户信息格式错误，请重试',
      sysErr: err.details[0].message
    })
    return Promise.reject()
  });
  let reg = new RegExp(reqData.text)
  userDb.find({
    $or: [
      { username: reg },
      { name: reg },
      { nickname: reg }
    ]
  })
    .limit(6)
    .select({
      _id: 1,
      nickname: 1,
      userPortrait: 1
    })
    .then(dbRes => {
      if (dbRes.length != 0) {
        res.send({
          error: 0,
          data: dbRes
        })
      } else {
        res.send({
          error: 1,
          message: "用户未找到，请重试"
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.send({
        error: 1,
        message: "用户搜索失败，请重试"
      })
    })
})

/**
 * @api {post} /user/addFriends 添加好友
 * @apiName addFriends
 * @apiGroup User
 * 
 * @apiHeader {string} Authorization 登陆后返回的token
 * @apiPermission 普通用户
 * 
 * @apiParam {string} userid 用户id
 * 
 * @apiSuccessExample  {json} 成功返回
 * {
 *    error: 0,
 *    message: "添加好友请求已发送"
 * }
 * 
 * @apiErrorExample  {json} 错误返回
 * {
 *    error: 1,
 *    message: "添加好友失败"
 * }
 */
router.post('/addFriends', auth, async (req, res) => {
  let reqData = req.fields;
  // joi 验证前端传入数据
  let schema = Joi.object({
    userid: Joi.string().min(24).max(24).required(),
    text: Joi.string().max(16)
  });

  await schema.validateAsync(reqData).catch(err => {
    res.send({
      error: 1,
      message: '格式错误，请重试',
      sysErr: err.details[0].message
    })
    return Promise.reject()
  });
  try {
    if (reqData.userid == req.user._id) {
      res.send({
        error: 1,
        message: "不能添加自己为好友"
      })
      return false
    }
    let friend = await userDb.findById(reqData.userid);
    if (!friend) {
      res.send({
        error: 1,
        message: "添加好友失败，用户不存在"
      })
      return false
    }
    let repeat = req.user.friends.every(i => i.friendId != reqData.userid)
    if (!repeat) {
      res.send({
        error: 1,
        message: "添加好友失败，已有此好友"
      })
      return false
    }
    await ws.sendNews(reqData.userid, {
      type: "news",
      secondType: "addFriend",
      message: `${req.user.nickname}请求添加你为好友`,
      data: {
        text: reqData.text,
        sendUserId: req.user._id
      }
    })
    res.send({
      error: 0,
      message: "添加好友请求已发送"
    })
  } catch (error) {
    console.log(error)
    res.send({
      error: 1,
      message: '添加好友失败，请重试或联系管理员',
      sysErr: error
    })
  }
})


/**
 * @api {get} /user/getNews 获取news消息
 * @apiName getNews
 * @apiGroup User
 * 
 * @apiHeader {string} Authorization 登陆后返回的token
 * @apiPermission 普通用户
 * 
 * @apiParam {string} [type] 0全部消息 1未读消息（默认） 2已读消息
 * 
 * @apiSuccessExample  {json} 成功返回
 * {
 *    error: 0,
 *    data: {
 *        "_id": "", // 消息id
 *        "type": "addFriend", // 消息类型
 *        "message": "123456789请求添加你为好友", // 消息文档
 *        "data": { // 消息数据
 *            "sendUserId": "5f0eca020717ae2540af29e8",
 *            "receiverId": "5f0fced6394edf0c2c520cf3"
 *        },
 *        "sendTime": "2020-07-17T03:31:00.805Z", // 发送时间
 *        "readTime": null, // 读取时间
 *        "readStatus": false // 是否已读
 *    }
 * }
 * 
 * @apiErrorExample  {json} 错误返回
 * {
 *    error: 1,
 *    message: "查询news信息错误"
 * }
 */
router.get('/getNews', auth, async (req, res) => {
  let reqData = req.query;
  // joi 验证前端传入数据
  let schema = Joi.object({
    type: Joi.string().valid('0', '1', '2')
  });

  await schema.validateAsync(reqData).catch(err => {
    res.send({
      error: 1,
      message: '用户信息格式错误，请重试',
      sysErr: err.details[0].message
    })
    return Promise.reject()
  });

  let type = reqData.type ? reqData.type : '0';

  let filter = [
    { $match: { _id: req.user._id } },
    { $project: { _id: 0, news: 1 } },
    { $unwind: "$news" },
  ]

  if (type == 1) {
    filter.push({ $match: { 'news.readStatus': false } })
  } else if (type == 2) {
    filter.push({ $match: { 'news.readStatus': true } })
  }

  userDb.aggregate(filter).then(dbRes => {
    if (dbRes.length != 0) {
      let resData = []
      dbRes.forEach(i => {
        resData.push(i.news)
      })
      res.send({
        error: 0,
        data: resData
      })
    } else {
      res.send({
        error: 1,
        message: "无未读消息"
      })
    }
  })
    .catch(err => {
      console.log(err)
      res.send({
        error: 1,
        message: "消息搜索失败，请重试"
      })
    })
})

/**
 * @api {post} /user/readNews 已读消息
 * @apiName readNews
 * @apiGroup User
 * 
 * @apiHeader {string} Authorization 登陆后返回的token
 * @apiPermission 普通用户
 * 
 * @apiParam {string} newsId 消息 ID
 * 
 * @apiSuccessExample  {json} 成功返回
 * {
 *    error: 0
 * }
 * 
 * @apiErrorExample  {json} 错误返回
 * {
 *    error: 1,
 *    message: "已读消息错误"
 * }
 */
router.post('/readNews', auth, async (req, res) => {
  let reqData = req.fields;
  // joi 验证前端传入数据
  let schema = Joi.object({
    newsId: Joi.string().min(24).max(24).required()
  });

  await schema.validateAsync(reqData).catch(err => {
    res.send({
      error: 1,
      message: '提交格式错误，请重试',
      sysErr: err.details[0].message
    })
    return Promise.reject()
  });

  userDb.updateOne(
    { _id: req.user._id, "news._id": reqData.newsId },
    { $set: { "news.$.readStatus": true } }
  )
    .then(dbRes => {
      res.send({ error: 0 })
    })
    .catch(dbErr => {
      console.log(dbErr)
      res.send({
        error: 1,
        message: "已读消息错误"
      })
    })
})

/**
 * @api {post} /user/passAddFriend 通过添加好友请求
 * @apiName passAddFriend
 * @apiGroup User
 * 
 * @apiHeader {string} Authorization 登陆后返回的token
 * @apiPermission 普通用户
 * 
 * @apiParam {string} friendId 好友id
 * @apiParam {number} pass 是否通过 0不通过 1通过
 * 
 * @apiSuccessExample  {json} 成功返回
 * {
 *    error: 0
 * }
 * 
 * @apiErrorExample  {json} 错误返回
 * {
 *    error: 1,
 *    message: "已添加此好友"
 * }
 */
router.post('/passAddFriend', auth, async (req, res) => {
  let reqData = req.fields;
  // joi 验证前端传入数据
  let schema = Joi.object({
    friendId: Joi.string().min(24).max(24).required(),
    pass: Joi.number().valid(0, 1).required()
  });

  await schema.validateAsync(reqData).catch(err => {
    res.send({
      error: 1,
      message: '提交格式错误，请重试',
      sysErr: err.details[0].message
    })
    return Promise.reject()
  });

  let hasFriend = await userDb.findOne({ _id: req.user._id, "friends.friendId": reqData.friendId });
  console.log(hasFriend)
  if (!hasFriend) {
    if (reqData.pass == 1) {
      await userDb.findByIdAndUpdate(req.user._id, {
        $push: { friends: { friendId: reqData.friendId } }
      });
      let newFriend = await userDb.findByIdAndUpdate(reqData.friendId, {
        $push: { friends: { friendId: req.user._id } }
      }, { new: true });

      ws.sendNews(req.user._id, {
        type: "news",
        secondType: "passFriend",
        message: `已添加${newFriend.nickname}为好友`
      })

      ws.sendNews(reqData.friendId, {
        type: "news",
        secondType: "passFriend",
        message: `请求通过，已添加${req.user.nickname}为好友`
      })
      res.send({
        error: 0
      })
    } else if (reqData.pass == 0) {
      ws.sendNews(reqData.friendId, {
        type: "news",
        secondType: "passFriend",
        message: `${req.user.nickname}拒绝添加好友请求`
      })
    }
  } else {
    res.send({
      error: 1,
      message: "已添加此好友"
    })
  }

})

/**
 * @api {get} /user/getFriendsList 获取好友列表
 * @apiName getFriendsList
 * @apiGroup User
 * 
 * @apiHeader {string} Authorization 登陆后返回的token
 * @apiPermission 普通用户
 *  
 * @apiSuccessExample  {json} 成功返回
 * {
 *    error: 0
 * }
 * 
 * @apiErrorExample  {json} 错误返回
 * {
 *    error: 1,
 *    message: "获取错误"
 * }
 */
router.get('/getFriendsList', auth, async (req, res) => {
  try {
    let dbRes = await userDb.aggregate([
      { $match: { _id: req.user._id } },
      {
        $lookup: {
          from: 'users',
          localField: 'friends.friendId',
          foreignField: '_id',
          as: 'friendsList'
        }
      },
      {
        $project: {
          'friends.friendId': 1,
          'friends.unreadNum': 1,
          'friendsList._id': 1,
          'friendsList.sex': 1,
          'friendsList.status': 1,
          'friendsList.online': 1,
          'friendsList.username': 1,
          'friendsList.nickname': 1,
          'friendsList.userPortrait': 1
        }
      }
    ]);
  
    let friendsInfo = dbRes[0].friends;
    let friendslist = dbRes[0].friendsList;
    friendslist.forEach(i => {
      friendsInfo.forEach(o => {
        if(String(i._id) === String(o.friendId)){
          i.unreadNum = o.unreadNum;
        }
      })
    })
    res.send({
      error: 0,
      data: dbRes[0].friendsList
    })
  } catch (error) {
    res.send({
      error: 1,
      message: "获取错误"
    });
    console.log(error)
  }
})

/**
 * @api {post} /user/sendMessage 发送消息（好友）
 * @apiName sendMessage
 * @apiGroup User
 * 
 * @apiHeader {string} Authorization 登陆后返回的token
 * @apiPermission 普通用户
 * 
 * @apiParam {string} toId 接收者ID
 * @apiParam {string} text 消息（最多1000字符）
 * @apiParam {date} time 发送时间 js 时间戳
 * 
 * @apiSuccessExample  {json} 成功返回
 * {
 *    error: 0
 * }
 * 
 * @apiErrorExample  {json} 错误返回
 * {
 *    error: 1,
 *    message: "获取错误"
 * }
 */
router.post('/sendMessage', auth, async (req, res) => {
  let reqData = req.fields;
  // joi 验证前端传入数据
  let schema = Joi.object({
    toId: Joi.string().min(24).max(24).required(),
    text: Joi.string().min(1).max(1000).required(),
    time: Joi.date().timestamp().required()
  });

  await schema.validateAsync(reqData).catch(err => {
    res.send({
      error: 1,
      message: '提交格式错误，请重试',
      sysErr: err.details[0].message
    })
    return Promise.reject()
  });

  let Time = new Date(Number(reqData.time))
  let record = {
    sendId: req.user._id,
    text: reqData.text,
    time: Time
  }
  await userDb.updateOne({
    _id: req.user._id,
    "friends.friendId": reqData.toId
  },
    {
      $push: {
        "friends.$.chatRecord": record
      }
    }
  );

  await userDb.updateOne({
    _id: reqData.toId,
    "friends.friendId": req.user._id
  },
    {
      $push: {
        "friends.$.chatRecord": record
      },
      "$inc": { "friends.$.unreadNum": 1 }
    }
  );

  let message = {
    type: "sendMessage",
    data: record
  }

  ws.clients.forEach(client => {
    if (reqData.toId == client.user._id) {
      client.send(JSON.stringify(message));
    }
  })

  res.send({ error: 0 })
})


/**
 * @api {get} /user/getUserChatRecord 获取与好友的聊天记录
 * @apiName getUserChatRecord
 * @apiGroup User
 * 
 * @apiHeader {string} Authorization 登陆后返回的token
 * @apiPermission 普通用户
 * 
 * @apiParam {string} friendId 好友id
 * @apiParam {number} [limit] 条数 默认 20
 * @apiParam {number} [skip] 跳过条数 默认 0
 * 
 * @apiSuccessExample  {json} 成功返回
 * {
 *    error: 0
 *    data: [{
 *         sendId: "", // 发送者id
 *         text: "", // 信息
 *         time: "" // 发送时间
 *      }],
 *    limit: 20,
 *    skip: 0
 * }
 * 
 * @apiErrorExample  {json} 错误返回
 * {
 *    error: 1,
 *    message: "获取错误"
 * }
 */
router.get('/getUserChatRecord', auth, async (req, res) => {
  let reqData = req.query;
  // joi 验证前端传入数据
  let schema = Joi.object({
    friendId: Joi.string().min(24).max(24).required(),
    limit: Joi.number().min(0),
    skip: Joi.number().min(0)
  });

  await schema.validateAsync(reqData).catch(err => {
    res.send({
      error: 1,
      message: '提交格式错误，请重试',
      sysErr: err.details[0].message
    })
    return Promise.reject()
  });

  let limit = reqData.limit ? Number(reqData.limit) : 20;
  let skip = reqData.skip ? Number(reqData.skip) : 0;

  let dbRes = await userDb.findById(req.user._id, { "friends": { $elemMatch: { "friendId": reqData.friendId } } });
  let chatRecord = dbRes.friends[0].chatRecord;
  let start = chatRecord.length - limit - skip;
  start = start >= 0 ? start : 0;
  let end = chatRecord.length - skip;
  end = end >= 0 ? end : 0;
  let doc = chatRecord.slice(start, end);
  res.send({
    error: 0,
    data: doc,
    limit: limit,
    skip: skip
  })
})

module.exports = router