// 微信公众平台服务器配置填写路由wechat指向该函数，微信服务器将发送GET请求到填写的服务器地址URL上。
// 若确认此次GET请求来自微信服务器，请原样返回echostr参数内容，则接入生效，成为开发者成功，否则接入失败。
const crypto = require('crypto');
const path = require('path');
const url = require('url');

//import config
const config = require('../../wxconfig');

//进行sha1加密
function sha1(str) {
  var shasum = crypto.createHash("sha1");
  shasum.update(str);
  str = shasum.digest("hex");
  return str;
}

function wechatAuth(req, res) {
  var query = url.parse(req.url, true).query;
  var signature = query.signature;
  var echostr = query.echostr;
  var timestamp = query['timestamp'];
  var nonce = query.nonce;

  var reqArray = [nonce, timestamp, config.token];

  //对数组进行字典排序
  reqArray.sort();
  var sortStr = reqArray.join('');
  var sha1Str = sha1(sortStr);

  if (signature === sha1Str) {
    res.end(echostr);
  } else {
    res.end("false");
    console.log("授权失败!");
  }
}


module.exports = wechatAuth;