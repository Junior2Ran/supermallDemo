const fs = require('fs');
const request = require('request');
const config = require('../../wxconfig');

//token
const token = fs.readFileSync('./token').toString();
const AppID = config.appId;
const return_uri1 = config.domainHost;
const return_uri2 = config.domainHost+'/ver';
const scope = 'snsapi_userinfo';

//常用type为view和click,分别为点击事件和链接
var menus = {
  "button": [
    {
      "name": "通用平台商城",
      "type": "view",
      "url": 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+AppID+'&redirect_uri='+return_uri2+'&response_type=code&scope='+scope+'&state=1#wechat_redirect'
    },{
      "name": "土特产商城",
      "type": "view",
      "url": 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+AppID+'&redirect_uri='+return_uri1+'&response_type=code&scope='+scope+'&state=1#wechat_redirect'
    }]
};

function createMenu() {
  let options = {
    url: 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=' + token,
    form: JSON.stringify(menus),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  
  request.post(options, function (err, res, body) {
    if (err) {
      console.log(err)
    } else {
      console.log(body);
    }
  })
  
}

module.exports = createMenu;