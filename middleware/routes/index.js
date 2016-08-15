var router = require('koa-router')();
var REQUEST = require('request')
const RedisStore = require("../utils/store.js");
const store = new RedisStore()
const UUID = require('node-uuid')

function swagger() {
  request.get('http://localhost:8000/swagger.json')
}

function request() {
	return new Promise((resolve, reject)=>{
		REQUEST.get('http://localhost:8000/swagger.json', (error, res, body) => {
			resolve(body)
		})
	})
}

router.get('/', async (ctx, next) => {
	ctx.body =  await request()
})

const path = {'/a': 'path a','/b': 'path b'}
for (let [key, value] of Object.entries(path)) {
  // 登入
	if (key === '/auth/login'){
		router.get(key , async function (ctx, next) {
			// 登入成功后生成 session cookie
			let uuid = UUID.v1()
			ctx.cookies.set('YUNHUNISESSIONID', uuid, {maxAge: 6000})
			store.set('uuid', uuid)
			ctx.body = '123'
		})
	} else {
		// switch get post put
		router.get(key, async(ctx, next) => {
			ctx.body = value
		})
	}
}

module.exports = router;
