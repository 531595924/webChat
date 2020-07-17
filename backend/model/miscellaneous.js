/*
 * @Author: coldlike 531595924@qq.com 
 * @Date: 2020-07-02 11:33:51 
 * @Last Modified by: coldlike 531595924@qq.com
 * @Last Modified time: 2020-07-08 16:01:10
 */
const express = require(`express`)
const router = express.Router()
const Joi = require('@hapi/joi')
const auth = require("../auth") // auth token 认证模块

// paidoc 版本

/**
 * @api {get} /miscellaneous/news 查看消息
 * @apiVersion 0.2.0
 * @apiName news
 * @apiGroup Miscellaneous
 * @apiHeader {string} Authorization 登陆后返回的token
 * @apiPermission 普通用户
 * 
 * @apiParam {string} [repeatPassword] 重复密码(md5加密)
 * 
 * @apiSuccessExample  {json} 成功返回
 * {
 *    error: 0,
 *    opepk: 1231,
 *    message: "注册成功"
 * }
 * 
 * @apiErrorExample  {json} 错误返回
 * {
 *    error: 1,
 *    message: "该用户已注册"
 * }
 */
router.get("/news", auth, async (req, res) => {
  let resData = req.fields;
  // joi 验证前端传入数据
  let schema = Joi.object({
    username: Joi.string().pattern(new RegExp(/^(13\d|1[5-9]\d)\d{8}$/)),
    password: Joi.string().alphanum()
  });

  let resss = await schema.validateAsync(resData).catch(err => {
    res.send({
      error: 1,
      message: '参数错误',
      sysErr: err.details[0].message
    })
    return Promise.reject()
  });

  res.send(resss)
})

module.exports = router