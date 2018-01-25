const router = require('express').Router();
const getToken = require('../websdk/getWebToken');
const getUserInfo = require('../websdk/getWebUserInfo');
const config = require('../../wxconfig');


router.get('/', function (req, res) {
  const redirect_uri = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+config.appId+'&redirect_uri=http://supermall.junior2ran.cn'+req.originalUrl+'&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
  if (!req.query.code) {
    res.redirect(redirect_uri);
  }
  getToken(req.query.code)
    .then(function (data) {
      return JSON.parse(data);
    })
    .then(function (data) {
      getUserInfo(data['access_token'], data['openid']).then(_ => {
        res.render('index.html', JSON.parse(_));
      })
    }).
    catch(function (err) {
      console.log(err);
    });
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