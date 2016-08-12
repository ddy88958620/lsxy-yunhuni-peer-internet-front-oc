var router = require('koa-router')();
var fetch = require('node-fetch')

var data = {userName: 'user001', password: 123456}
function request() {
	return new Promise((resolve, reject)=>{
		fetch('http://192.168.10.75:18082/auth/login',{
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(data)
		}).then((e)=>{
			resolve(e.json())
		})
	})
}

router.get('/auth/login', async (ctx, next) => {
	ctx.body =  await request()
})

router.get('/foo', async function (ctx, next) {
	ctx.body = 'this is foo';
})
	
router.get('/bar', async function (ctx, next) {
	ctx.body = 'this is bar';
})

module.exports = router;
