import domain from '../config/domain'
export function date(timestamp) {
	let date = new Date(timestamp)
	let year = date.getFullYear()
	let month = date.getMonth() < 10 ? '0'+date.getMonth() : date.getMonth()
	let day = date.getDate().toString().length < 2 ? '0'+ date.getDate() : date.getDate()
	
	return `${year}-${month}-${day}`
}



export function img(filename) {
	let fileurl = 'http://192.168.10.75:18082/ossfile/img?uri='+filename
	/*let fileurl = domain.API_ROOT+'/ossfile/img?uri='+filename*/
	return fileurl
}

