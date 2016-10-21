var REQUEST = require('request')
var fs = require('fs')

REQUEST.get('http://localhost:18082/v2/api-docs',function (req, res) {
	fs.writeFile('./doc/swagger.json', res.body)
})
