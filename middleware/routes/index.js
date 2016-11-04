var router = require('koa-router')();
var REQUEST = require('request')
var covertKOAURL = require('../utils/coverURLSwaggerToKoa.js')
var checkType = require('../utils/checkType')
const UUID = require('node-uuid')
const fs = require('fs')
const config = require('../config')
const prefix = config.JAVAAPI

//请求拦截器，解决session中间件只会在内容改变的时候更新过期时间的bug
router.use(async(ctx, next) => {
	ctx.session.refresh = ctx.session.refresh ? false : true;
	await next()
});

// 下面代码还需重构
function request(method, ctx) {
	let headers = ctx.headers
	headers["X-YUNHUNI-API-TOKEN"] = ctx.session.token ? ctx.session.token : ''
	console.log('token node', ctx.session.token)
	let data = ctx.request.body ? ctx.request.body : {}
	let url = ctx.req.url
	return new Promise((resolve, reject)=> {
		REQUEST({
			url: prefix + url,
			method: method,
			headers: headers,
			body: JSON.stringify(data)
		}, (error, res, body) => {
			resolve(body)
		})
	})
}

function handlerFile(){
	
}

// 生成cookie
router.get('/login', async(ctx, next) => {
	let swaggerData = await request('/auth/login', 'post', {userName: 'user001', password: '123456'})
	ctx.session.token = swaggerData.data.token
	ctx.body = 'ok'
})

//生产随机码
var generate = function () {
	let str_ary = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
		'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	let str_num = 4;
	let r_num = str_ary.length;
	let text = '';
	for (let i = 0; i < str_num; i += 1) {
		let pos = Math.floor(Math.random() * r_num);
		text += str_ary[pos];//生成随机数
	}
	return text;
}
router.get('/verCode', async(ctx, next) => {
	let code = generate()
	//调用java生成图片的接口
	let stream = REQUEST({
		url: prefix + '/vc/code?code=' + code,
		method: 'get'
	})
	ctx.session.verCode = code
	ctx.type = `image/jpeg;charset=UTF-8`
	ctx.body = stream
})

// 同步获取 swagger doc, 保存在内在当中
const path = JSON.parse(fs.readFileSync('./doc/swagger.json', 'utf8')).paths

for (let [key, value] of Object.entries(path)) {
	// 登入
	if (key === '/auth/login') {
		router.post(key, async function (ctx, next) {
			let uuid = UUID.v1()
			let data = ctx.request.body
			if (!ctx.session.verCode || !data.code
				|| ctx.session.verCode.toLowerCase() !== data.code.toLowerCase()) {//验证码不匹配
				ctx.body = {
					errorMsg: "验证码错误",
					data: false
				}
				return
			}
			let swaggerData = JSON.parse(await request('post', ctx))
			// 登入成功后生成 session cookie
			if (swaggerData.data && swaggerData.data.token) {
				ctx.cookies.set('YUNHUNISESSIONID', uuid, {
					expires: new Date(),
					maxAge: 30 * 60 * 1000,
					domain: ctx.request.hostname
				})
				ctx.session.token = swaggerData.data.token
				delete swaggerData.data.token
				ctx.body = {
					data: true
				}
				return
			}
			ctx.body = swaggerData
		})
	}
	else if (key.indexOf('/config/line/telnum/upload/') > -1){
		router.post(covertKOAURL(key), async(ctx, next) => {
			let token = ctx.session.token
			console.log('token node', token)
			if (!token) {
				ctx.status = 401
				ctx.body = ' node token null'
				return
			}
			console.log(ctx.request.body)
			console.log(ctx.request.get('content-type'))
			ctx.status = 200
			// let req_url = ctx.req.url
			// let headers = ctx.headers
			// headers["X-YUNHUNI-API-TOKEN"] = ctx.session.token ? ctx.session.token : ''
			// let req = REQUEST({
			// 	url: prefix + req_url,
			// 	method: 'post',
			// 	header: {
			// 		'content-type': ctx.request.get('content-type')
			// 	}
			// },(err,res,body)=>{
			// 	if(res.statusCode === 200){
			// 		console.log('ok')
			// 		console.log(body)
			// 	}
			// })
			// let form = req.form()
			// let files = ctx.request.body
			// console.log(files)
			// form.append('file', fs.createReadStream(file.path))
	})
	}
	else if (key === '/ossfile/img' || key === '/ossfile/telnum') {
		router.get(covertKOAURL(key), async(ctx, next) => {
			let token = ctx.session.token
			console.log('token node', token)
			if (!token) {
				ctx.status = 401
				ctx.body = ' node token null'
				return
			}
			let req_url = ctx.req.url
			let stream = REQUEST({
				url: prefix + req_url,
				method: 'get',
				headers: {
					"X-YUNHUNI-API-TOKEN": token,
					"content-type": ctx.type
				},
			})
			if (checkType.checkImageType(req_url)) {
				let temp = req_url.split('.')
				let type = temp[temp.length - 1]
				ctx.type = `image/${type};charset=UTF-8`
			}
			else if (checkType.checkAudioType(req_url)) {
				ctx.type = 'audio/wav;charset=UTF-8'
			}
			else {
				ctx.type = 'application/vnd.ms-excel;charset=UTF-8'
				ctx.response.attachment('example.xlsx')
			}
			
			ctx.body = stream
		})
	}
	else {
		// switch get post put
		for (let method of Object.keys(value)) {
			router[method](covertKOAURL(key), async(ctx, next) => {
				let token = ctx.session.token
				if (!token) {
					ctx.status = 401
					ctx.body = ' node token null'
					return
				}
				ctx.body = await request(method, ctx)
			})
		}
	}
}
module.exports = router;
