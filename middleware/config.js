const env = process.env.NODE_ENV

console.log(env)
if(env === 'production') {
  // 生产
	module.exports = {
		COOKIEDOAIM: 'oc.dev.yunhuni.com',
		COOKIENAME: 'YUNHUNISESSIONID',
		JAVAAPI: 'http://10.171.69.136:18082',
		REDISHOST: '10.162.199.238',
		REDISPORT: 6379
	}
}
else if (env === 'test') {
	module.exports = {
		// 开发
		COOKIEDOAIM: 'localhost',
		COOKIENAME: 'YUNHUNISESSIONID',
		JAVAAPI: 'http://192.168.10.201:18082',
		REDISHOST: '127.0.0.1',
		REDISPORT: 6379
	}
}
else if (env === 'develop') {
	module.exports = {
  // 开发
		COOKIEDOAIM: 'localhost',
		COOKIENAME: 'YUNHUNISESSIONID',
		JAVAAPI: 'http://192.168.10.201:18082',
		REDISHOST: '127.0.0.1',
		REDISPORT: 6379
	}
}



