const router = require('express').Router();
const getJsApiData = require('../libs/getJsApiData');
const config = require('../../wxconfig');

router.post('/auth', function (req, res) {
  var clientUrl = decodeURIComponent(req.body.url);
  console.log(clientUrl);
  getJsApiData(clientUrl).then(data => {
    var content = {
        signature: data[0], 
        timestamp: data[1], 
        nonceStr: data[2], 
        appId: config.appId
    };
    // res.render('base.html', content);
    res.header("Content-Type", "application/json;charset=utf-8");
    res.send({status: 1, result: content});
  });
});

module.exports = router;
