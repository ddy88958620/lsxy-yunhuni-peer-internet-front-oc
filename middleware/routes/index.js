var router = require('koa-router')();
var REQUEST = require('request')
const RedisStore = require("../utils/store.js");
const store = new RedisStore()


function request() {
	return new Promise((resolve, reject)=>{
		REQUEST.get('http://localhost:8000/auth.json', (error, res, body) => {
			resolve(body)
		})
	})
}

router.get('/', async (ctx, next) => {
	ctx.body =  await request()
})

// 登入
router.get('/auth/login', async function (ctx, next) {
	
	// 登入成功后生成 session cookie
	ctx.cookies.set('uuid', 'token', {maxAge: 6000})
	store.set('uuid', 'token')
	ctx.body = '123'
})

module.exports = router;
