var REQUEST = require('request')
var fs = require('fs')

REQUEST.get('http://api.oc.dev.yunhuni.com/v2/api-docs', function(req, res) {
	fs.writeFile('./doc/swagger.json', res.body)
})
