/*
 * @Author: coldlike 531595924@qq.com 
 * @Date: 2020-06-30 17:39:42 
 * @Last Modified by: coldlike 531595924@qq.com
 * @Last Modified time: 2020-07-15 17:45:12
 */
const express = require(`express`)
const router = express.Router()
const formidable = require('express-formidable') // 解析 form-data 中间件 req.fields 非文件 req.files 文件

// 配置文件 https://github.com/node-formidable/formidable#api
app.use(formidable({
  uploadDir: '../fileTmp', // 文件缓存目录
  maxFileSize: '2048 * 1024 * 1024' // 文件大小限制
}));

// 静态文件
app.use("/api", express.static("../apidoc")) // api 文档
app.use("/userUpData", express.static("../userUpData")) // 头像文件夹

// 二级路由
router.use('/user', require('./user'));
router.use('/miscellaneous', require('./miscellaneous'));

module.exports = router