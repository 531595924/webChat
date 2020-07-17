/*
 * @Author: coldlike 531595924@qq.com 
 * @Date: 2020-06-30 17:39:56 
 * @Last Modified by: coldlike 531595924@qq.com
 * @Last Modified time: 2020-07-15 17:53:19
 */
const express = require("express");
const compression = require('compression'); // gzip压缩
const ws = require("./websocket")

app = express();
// app.use(express.json())//express v4.x 之后自带组件 参数解析中间件 支持 application/x-www-form-urlencoded  application/json
// app.use(express.urlencoded({ extended: true }))

// 允许跨域设置
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "Accept, content-type, Authorization");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.sendStatus(200);  //让options尝试请求快速结束
  else
    next();
});

// 过滤掉了请求头包含'x-no-compression'
app.use(compression({ filter: shouldCompress }));

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    return false
  }
  return compression.filter(req, res)
}

app.use('/', require('./model/index'))

const port = 5000;
app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`服务器已开启, 端口 ${port}`);
  }
})