//node server listen 3000
const env = process.env.NODE_ENV

console.log(env)
if(env === 'production') {
  // 生产
	module.exports = {
		COOKIEDOAIM: 'oc.yunhuni.cn',
		COOKIENAME: 'YUNHUNISESSIONID',
		JAVAAPI: 'http://rest.oc.internal.yunhuni.cn',
		REDISHOST: '10.163.3.165',
		REDISPORT: 6379
	}
}
else if (env === 'test') {
	module.exports = {
		// 测试
		COOKIEDOAIM: 'oc.yunhuni.cn',
		COOKIENAME: 'YUNHUNISESSIONID',
		JAVAAPI: 'http://rest.oc.internal.yunhuni.cn',
		REDISHOST: '10.163.3.165',
		REDISPORT: 6379
	}
}
else if (env === 'develop') {
	module.exports = {
  // 开发
		COOKIEDOAIM: 'oc.dev.yunhuni.com',
		COOKIENAME: 'YUNHUNISESSIONID',
		JAVAAPI: 'http://192.168.10.201:18082',
		REDISHOST: '127.0.0.1',
		REDISPORT: 6379
	}
}
else if (env === 'local') {
	module.exports = {
  // 本地
		COOKIEDOAIM: 'localhost',
		COOKIENAME: 'YUNHUNISESSIONID',
		JAVAAPI: 'http://192.168.10.75:18082',
		REDISHOST: '127.0.0.1',
		REDISPORT: 6379
	}
}



