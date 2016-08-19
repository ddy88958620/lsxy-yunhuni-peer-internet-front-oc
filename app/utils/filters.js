export function date(timestamp) {
	let date = new Date(timestamp)
	let year = date.getFullYear()
	let month = date.getMonth() < 10 ? '0'+date.getMonth() : date.getMonth()
	let day = date.getDate().toString().length < 2 ? '0'+ date.getDate() : date.getDate()
	
	return `${year}-${month}-${day}`
}