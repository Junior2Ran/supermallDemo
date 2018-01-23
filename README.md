# supermallDemo
电商平台移动端微信开发者服务端  
前端工程请点击：[电商平台移动端前端](https://github.com/Junior2Ran/superMall)


## 技术选型
nodejs + express + nginx + pm2

## 使用说明
1. 将本仓库代码克隆到本地  
```bash
git clone https://github.com/Junior2Ran/supermallDemo.git
```

2. 部署前端工程里打好包的文件  
`index.html`部署在`supermallDemo`文件夹根目录下  
`js`文件夹部署在`supermallDemo/public`文件夹目录下  
若`images`文件夹有更新，前端无法打包，直接手动复制粘贴到`supermall/public`文件夹目录下  

3. 上传本地部署完成的代码  
```bash
git add .
git commit -m "update server"
git push origin master
```

4. 登录服务器，下载代码，重启服务器pm2  
```bash
cd /data/supermallDemo/
git pull
pm2 restart server.js
```
至此，代码部署完成，微信公众号上的网站已更新

5. 服务器配置  
项目在`/data/supermallDemo/`目录下，通过pm2起一个本地服务，然后通过nginx转发到80端口  
nginx配置文件在`/etc/nginx/nginx.conf`下
