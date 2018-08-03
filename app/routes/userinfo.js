const router = require('express').Router();
const querystring = require("querystring");
const getToken = require('../websdk/getWebToken');
const getUserInfo = require('../websdk/getWebUserInfo');
const config = require('../../wxconfig');

router.get('/ver', function (req, res) {
  console.log(req.originalUrl);
  var host = config.domainHost;
  //重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
  var redirect_uri = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+config.appId+'&redirect_uri='+host+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
  if (!req.query.code) {
    var encodeParams = encodeURIComponent(req.originalUrl);
    var params_uri = redirect_uri.replace(host, host+encodeParams);  // 参数放在redirect_uri里会被丢失，只能通过转码来传递
    console.log(params_uri)
    res.redirect(params_uri);
  }
  else{
    getToken(req.query.code)
    .then(function (data) {
      if(JSON.parse(data).errcode){
        var paramsObj = req.query;
        delete paramsObj.code;
        delete paramsObj.state;
        var paramsUrl = '/?'+querystring.stringify(paramsObj);
        var encodeParams = encodeURIComponent(paramsUrl);
        var params_uri = redirect_uri.replace(host, host+encodeParams);  // 参数放在redirect_uri里会被丢失，只能通过转码来传递
        res.redirect(params_uri);
      } else {
        return JSON.parse(data);
      }
    })
    .then(function (data) {
      getUserInfo(data['access_token'], data['openid']).then(_ => {
        res.render('index2.html', JSON.parse(_));
      })
    }).
    catch(function (err) {
      console.log(1);
    });
  }
});

router.get('/', function (req, res) {
  console.log(req.originalUrl);
  var host = config.domainHost;
  // var host = config.secondaryHost;
  //重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
  var redirect_uri = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+config.appId+'&redirect_uri='+host+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
  if (!req.query.code) {
    var encodeParams = encodeURIComponent(req.originalUrl);
    var params_uri = redirect_uri.replace(host, host+encodeParams);  // 参数放在redirect_uri里会被丢失，只能通过转码来传递
    console.log(params_uri)
    res.redirect(params_uri);
  }
  else{
    getToken(req.query.code)
    .then(function (data) {
      if(JSON.parse(data).errcode){
        var paramsObj = req.query;
        delete paramsObj.code;
        delete paramsObj.state;
        var paramsUrl = '/?'+querystring.stringify(paramsObj);
        var encodeParams = encodeURIComponent(paramsUrl);
        var params_uri = redirect_uri.replace(host, host+encodeParams);  // 参数放在redirect_uri里会被丢失，只能通过转码来传递
        res.redirect(params_uri);
      } else {
        return JSON.parse(data);
      }
    })
    .then(function (data) {
      getUserInfo(data['access_token'], data['openid']).then(_ => {
        res.render('index.html', JSON.parse(_));
      })
    }).
    catch(function (err) {
      console.log(1);
    });
  }
});

module.exports = router;