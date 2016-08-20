export function date(timestamp) {
	let date = new Date(timestamp)
	let year = date.getFullYear()
	let month = date.getMonth() < 10 ? '0'+date.getMonth() : date.getMonth()
	let day = date.getDate().toString().length < 2 ? '0'+ date.getDate() : date.getDate()
	
	return `${year}-${month}-${day}`
}

export function totalDate(timestamp) {
	let date = new Date(timestamp)
	let year = date.getFullYear()
	let month = date.getMonth() < 10 ? '0'+date.getMonth() : date.getMonth()
	let day = date.getDate().toString().length < 2 ? '0'+ date.getDate() : date.getDate()
	
	let hour = date.getHours().toString().length < 2 ? '0'+ date.getHours() : date.getHours()
	let minute = date.getMinutes().toString().length < 2 ? '0'+ date.getMinutes() : date.getMinutes()
	let second = date.getSeconds().toString().length < 2 ? '0'+ date.getSeconds() : date.getMinutes()
	return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

export function totalDateWithNoSeconds(timestamp) {
	let date = new Date(timestamp)
	let year = date.getFullYear()
	let month = date.getMonth() < 10 ? '0'+date.getMonth() : date.getMonth()
	let day = date.getDate().toString().length < 2 ? '0'+ date.getDate() : date.getDate()
	
	let hour = date.getHours().toString().length < 2 ? '0'+ date.getHours() : date.getHours()
	let minute = date.getMinutes().toString().length < 2 ? '0'+ date.getMinutes() : date.getMinutes()
	return `${year}-${month}-${day} ${hour}:${minute}`
}


export function img(filename) {
	let fileurl = 'http://192.168.10.75:18082/ossfile/img?uri='+filename
	/*let fileurl = domain.API_ROOT+'/ossfile/img?uri='+filename*/
	return fileurl
}

