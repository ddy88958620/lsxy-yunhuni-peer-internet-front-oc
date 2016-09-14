## 安装依赖

**Requires Node.js 6+**

``` bash
# install dependencies
npm install

# build for production
npm run build
```

## 各个环境

在各个项目中的 `package.json`, 都已经写好相应环境的运行命令,

```
"product": "cross-env NODE_ENV=production pm2 start server.js --name='yunhuni-site-www-product'",
"dev": "cross-env NODE_ENV=develop pm2 start server.js --name='yunhuni-site-www-dev'",
"test": "cross-env NODE_ENV=test pm2 start server.js --name='yunhuni-site-www-test'",
"local": "cross-env NODE_ENV=local node server.js --name='yunhuni-site-www-local'",
```

以上分别对应`npm run product` , `npm run dev` ...

## 后台进程管理

后台服务使用pm2管理，如果程序无反应可以通过

* pm2 list ，先查看应用的状态
* pm2 logs ids , 查看对应应用id的日志

若需要重启应用 `pm2 restart ids`

## 自动部署

### OSS

各个环境对应 oss 目录下的 `uploadoss_dev.sh`, `uploadoss_product.sh`

### CI

各个环境对应 项目根目录下的 `update_dev.sh`, `update_product.sh`


以上环境脚本有需要可自行添加


------------------ 以上部份通用任何项目 ------------------

## 官网

### welcome页面

* 该项目独立于官网，但资源在官网项目的welcome文件夹中
* oss需要通过nginx代理转发
* 拥有独立的二级域名