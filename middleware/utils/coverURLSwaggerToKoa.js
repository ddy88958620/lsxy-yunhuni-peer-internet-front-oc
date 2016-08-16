// /a/b/{uid}  => /a/b/:uid
// /a/b/{uid}/{cid}  => /a/b/:uid/:cid

function covertKOAURL(str) {
	let newStr = ''
	for (let s of str){
		if (s === '{'){
			s = ':'
		}
		if (s === '}'){
			s = ''
		}
		newStr = newStr + s
	}
	return newStr
}

module.exports = covertKOAURL
