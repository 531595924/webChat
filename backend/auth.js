/*
 * @Author: coldlike 531595924@qq.com 
 * @Date: 2020-07-02 11:34:09 
 * @Last Modified by: coldlike 531595924@qq.com
 * @Last Modified time: 2020-07-16 14:35:07
 */
const { checkToken } = require("./token")
const userDb = require('./db/user')

// token 验证
const auth = async (req, res, next) => {
  let token = req.headers.authorization;
  try {
    let verifyRes = await checkToken(token);
    let dbRes = await (await userDb.findOne({ username: verifyRes.username, password: verifyRes.password }).select({_id: 1, nickname: 1, userPortrait:1, username: 1, sex: 1, menudata: 1, friends: 1}));
    if (dbRes) {
      // 验证权限成功后 将数据添加到中间件
      req.user = dbRes;
      next()
    }
    else {
      throw new Error()
    }
  } catch (err) {
    res.send({ error: 1008, message: "登陆过期，请重新登陆" })
  }
}

module.exports = auth;