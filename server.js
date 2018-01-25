const express = require('express');
const app = require('./app/app');

app.use(express.static('./public'));

// 监听端口，等待连接
const port = 5050;
app.listen(port);

// 输出服务器启动日志
console.log(`Server listening at http://127.0.0.1:${port}`);
