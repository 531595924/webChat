/*
 * @Author: coldlike 531595924@qq.com 
 * @Date: 2020-07-02 11:34:02 
 * @Last Modified by:   coldlike 531595924@qq.com 
 * @Last Modified time: 2020-07-02 11:34:02 
 */
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log('链接成功');
  })
  .catch(err => {
    console.log('链接失败');
    console.log(err);
  });

module.exports = mongoose;