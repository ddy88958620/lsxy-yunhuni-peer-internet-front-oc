function today(type){
	let date = new Date()
	let obj = null
	
	let year = date.getFullYear()
	let month = date.getMonth() < 10 ? '0'+date.getMonth() : date.getMonth()
	let day = date.getDate().toString().length < 2 ? '0'+ date.getDate() : date.getDate()
	
	// 2016-09
	if (type === 'month')
	{
		obj = {
			year: year,
			month: month,
		}
	}
	
	// 2016-09-09
	if (type === 'day')
	{
		obj = {
			year: year,
			month: month,
			day: day
		}
	}
	return obj
}

export default{
	today
}