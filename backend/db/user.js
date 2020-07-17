/*
 * @Author: coldlike 531595924@qq.com 
 * @Date: 2020-07-02 11:33:59 
 * @Last Modified by: coldlike 531595924@qq.com
 * @Last Modified time: 2020-07-17 11:07:08
 */
const mongoose = require('./db');

const newsChild = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
    unique: true,
    required: true
  },
  type: String,
  message: String,
  data: Object,
  sendTime: Date,
  readTime: Date,
  readStatus: Boolean
})

const Schema = new mongoose.Schema({
  // 用户名（手机号）
  username: {
    type: String,
    required: true,
    unique: true,
    match: /^(13\d|1[5-9]\d)\d{8}$/
  },
  // 密码（md5加密32位）
  password: {
    type: String,
    required: true
  },
  // 手机号
  phone: {
    type: String,
    match: /^(13\d|1[5-9]\d)\d{8}$/
  },
  // 名字
  name: String,
  // 昵称
  nickname: {
    type: String
  },
  // 年龄
  age: {
    type: Number,
    max: 120,
    min: 1
  },
  // 性别
  sex: {
    type: Number, // 0无 1男 2女
    default: 0,
    min: 0,
    max: 2
  },
  // 账号状态
  status: {
    type: Number,
    default: 1
  },
  // 注册时间
  signupdate: {
    type: Date,
    default: Date.now
  },
  // 上次登录时间
  lastlogindate: {
    type: Date
  },
  // 头像
  userPortrait: {
    type: String
  },
  // 用户好友列表
  friends: {
    type: Array
  },
  // 消息
  news: [newsChild],
  // 默认菜单项
  menudata: {
    type: Array,
    default: [
      {
        "app_name": "首页",
        "app_title": "Index",
        "app_id": 0
      },
      {
        "app_name": "账户设置",
        "app_title": "User",
        "app_id": 1
      },
      {
        "app_name": "我的好友",
        "app_title": "Friends",
        "app_id": 2
      },
      {
        "app_name": "我的群",
        "app_title": "ChatGroup",
        "app_id": 3
      }
    ]
  }
});


const Model = mongoose.model('User', Schema);

module.exports = Model;