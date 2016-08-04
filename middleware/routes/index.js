var router = require('koa-router')();
var REQUEST = require('request')

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

router.get('/foo', async function (ctx, next) {
	ctx.body = 'this is foo';
})
	
router.get('/bar', async function (ctx, next) {
	ctx.body = 'this is bar';
})

module.exports = router;
