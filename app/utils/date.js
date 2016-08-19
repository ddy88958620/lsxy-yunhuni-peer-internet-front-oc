function totalDate(){
	let date = new Date()
	let obj = {
		year: date.getFullYear(),
		month: date.getMonth()+1,
		day: date.getDate()
	}
	return obj
}

export default{
	totalDate
}