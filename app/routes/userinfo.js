const router = require('express').Router();
const getToken = require('../websdk/getWebToken');
const getUserInfo = require('../websdk/getWebUserInfo');
const config = require('../../wxconfig');

router.get('/', function (req, res) {
  console.log(req.originalUrl);
  //重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
  var redirect_uri = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+config.appId+'&redirect_uri='+config.domainHost+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
  if (!req.query.code) {
    var state = {
      from_user: req.query.from_user
    };
    res.redirect(redirect_uri);
  }
  else{
    getToken(req.query.code)
    .then(function (data) {
      if(JSON.parse(data).errcode){
        res.redirect(redirect_uri);
      }
      return JSON.parse(data);
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

router.get('/ver', function (req, res) {
  getToken(req.query.code)
    .then(function (data) {
      return JSON.parse(data);
    })
    .then(function (data) {
      getUserInfo(data['access_token'], data['openid']).then(_ => {
        res.render('index2.html', JSON.parse(_));
      })
    }).
    catch(function (err) {
      console.log(err);
    });
});

module.exports = router;