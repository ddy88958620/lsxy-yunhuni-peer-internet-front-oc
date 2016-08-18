var REQUEST = require('request')
var fs = require('fs')

REQUEST.get('http://192.168.10.75:18082/v2/api-docs',function (req, res) {
	fs.writeFile('./swagger.json', res.body)
})