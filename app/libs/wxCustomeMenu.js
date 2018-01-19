const fs = require('fs');
const request = require('request');
const config = require('../../wxconfig');

//token
const token = fs.readFileSync('./token').toString();
const AppID = config.appId;
const return_uri = 'http://supermall.junior2ran.cn/';
const scope = 'snsapi_userinfo';

//常用type为view和click,分别为点击事件和链接
var menus = {
  "button": [
    {
      "name": "测试菜单1",
      "sub_button": [
        {
          "type": "view",
          "name": "电商平台",
          "url": 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+AppID+'&redirect_uri='+return_uri+'&response_type=code&scope='+scope+'&state=1#wechat_redirect'
        }]
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