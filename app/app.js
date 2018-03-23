const express = require('express');
const wxconfig = require('../wxconfig');
const path = require('path');
const nunjucks =require('nunjucks');
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

//引入token刷新
const getToken = require('./libs/common');
getToken();

//创建菜单
const createMenu = require('./libs/wxCustomeMenu');
createMenu();

//引入路由
const weixin = require('./routes/weixin');
const auth = require('./routes/auth');
const userinfo = require('./routes/userinfo');

//app配置
const app = express();
app.set('views', path.join(__dirname, '../'));

//跨域配置
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});

//解析xml
app.use(bodyParser.xml({
  limit: '1MB',
  xmlParseOptions: {
    normalize: true,
    normalizeTags: true,
    explicitArray: false
  }
}));
//解析json
app.use(bodyParser.json({
  limit: '1MB'
}));

//启用nunjucks模板
app.engine('html', nunjucks.render);
app.set('view engine', 'html');

//启用路由
app.use('/wechat', weixin);
app.use(auth);
app.use('/', userinfo);

module.exports = app;
