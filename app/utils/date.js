function today(type) {
	let date = new Date()
	let obj = null
	
	let year = date.getFullYear()
	let month = (date.getMonth()+1) < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1)
	let day = date.getDate().toString().length < 2 ? '0' + date.getDate() : date.getDate()


	//2016
	if (type === 'year')
	{
		string = `${year}`
	}
	
	// {
	// 	year: 2015,
	// 	month: 12,
	// }
	if (type === 'month') {
		obj = {
			year: year,
			month: month,
		}
	}
	
	// {
	// 	year: 2015,
	// 	month: 12,
	// 	day: 03
	// }
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

function todayString(type){
	let date = new Date()
	let string = ''
	
	let year = date.getFullYear()
	let month = (date.getMonth()+1) < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1)
	let day = date.getDate().toString().length < 2 ? '0'+ date.getDate() : date.getDate()

	//2016
	if (type === 'year')
	{
		string = `${year}`
	}

	
	// 2016-09
	if (type === 'month')
	{
		string = `${year}-${month}`
	}
	
	// 2016-09-09
	if (type === 'day')
	{
		string = `${year}-${month}-${day}`
	}
	return string
	
}

function dateParse(date){
	let obj = date.split('-')
	let params = {}
	
	let year = obj[0]
	let month = obj[1]
	
	params.year = year
	params.month = month
	
	return params
}

export default{
	today,
	todayString,
	dateParse
}