/*
 * @Author: coldlike 531595924@qq.com 
 * @Date: 2020-06-30 17:39:51 
 * @Last Modified by: coldlike 531595924@qq.com
 * @Last Modified time: 2020-07-02 11:03:10
 */
const jwt = require("jsonwebtoken")

const secret = '-=-=---='; // 密匙，不要暴露

/**
 * 生成token
 * @param {json} payload 需要加密的数据
 * @return {string} tonken字符串
 */
function createToken(payload) {
  return jwt.sign(payload, secret, {expiresIn: "12h"}); // 过期时间12小时
}
/**
 * token 解密
 * @param {string} token token字符串
 * @return {Promise} 解密数据
 */
function checkToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, res) => {
      if (!err) {
        resolve(res)
      } else {
        reject(err);
      }
    })
  })
}

module.exports = {
  createToken, checkToken
}