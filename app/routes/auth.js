const router = require('express').Router();
const getJsApiData = require('../libs/getJsApiData');
const config = require('../../wxconfig');

router.get('/auth', function (req, res) {
  var clientUrl = 'http://' + req.hostname + req.url;
  getJsApiData(clientUrl).then(data => {
    var content = {
        signature: data[0], 
        timestamp: data[1], 
        nonceStr: data[2], 
        appId: config.appId
    };
    // res.render('base.html', content);
    res.send(200, {status: 1, result: content});
  });
});

module.exports = router;
