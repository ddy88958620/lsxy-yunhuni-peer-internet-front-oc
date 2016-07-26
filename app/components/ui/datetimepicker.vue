<template>
	<div class="input-group date-component" >
		<input
			type="text"
			:style="{width: `${width}px`}"
			:value.sync='date'
			class="form_datetime _month form-control"
			data-date-end-date="0m" />
		<span class="iconfont icon-oc-date"></span>
	</div>
</template>
<script>
	require("bootstrap-datetime-picker")
	
	export default {
		data(){
			return {
				date: ''
			}
		},
		props: {
			type: {
				type: String,
				default: 'year'
			},
			width: {
				type: Number,
				default: 120
			}
		},
		watch: {},
		ready(){
			const self = this
			// 当前日期
			let date = new Date()
			let type = self.type
			let datetimepickerObj = null
			switch (type){
				case 'year':
					datetimepickerObj = {
						format: 'yyyy-mm',
						startView: 'year',
						minView: 'year',
					}
					break;
				case 'time':
					datetimepickerObj = {
						format: 'yyyy-mm-dd hh:ii',
						startView: 'month',
						minView: 'hour',
					}
					break;
			}
			
			$('.form_datetime').datetimepicker(datetimepickerObj).on('changeDate',function(e){
				$(this).datetimepicker('hide')
				
				let currenSelectDate = $(this)[0].value
				console.log(currenSelectDate);
				self.date = currenSelectDate ? currenSelectDate : self.date
			});
		}
	}
</script>
<style lang='sass'>
	@import '~bootstrap-datetime-picker/css/bootstrap-datetimepicker';
	
	.date-component {
		background-color: white;
		display: inline-block;
		position: relative;
	span {
		font-size: 2.2rem;
		position: absolute;
		right: 8px;
		top: 2px;
		z-index: 2;
	}
	.form-control {
		display: inline-block;
	}
	}
	
	.input-group-addon {
		background: none;
		border-left: none;
	}

</style>
