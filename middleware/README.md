## 启动脚本

任何环境第一次启动是 'npm run back'

## 业务环境

```js
//node server listen 3000
const env = process.env.NODE_ENV

console.log(env)
if(env === 'production') {
  // 生产
	module.exports = {
		REDISHOST: 'p04a',
		REDISPORT: 6379
	}
}
else if (env === 'test') {
	module.exports = {
		// 测试
		REDISHOST: '10.163.3.165',
		REDISPORT: 6379
	}
}
else if (env === 'develop') {
  module.exports = {
 		// 开发
    REDISHOST: '10.162.199.238',
    REDISPORT: 6379
  }
}

else if (env === 'local') {
	module.exports = {
  // 本地
		REDISHOST: '127.0.0.1',
		REDISPORT: 6379
	}
}
```

以上用nginx 代理取代

```sh
stream {
    upstream redis_servers {
      server 127.0.0.1:6379;
    }

    server {
      listen 6379;
      proxy_connect_timeout 1000s;
      proxy_timeout 3000s;
      proxy_pass redis_servers;
    }
}
```
