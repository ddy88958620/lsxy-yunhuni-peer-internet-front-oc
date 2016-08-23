<template>
	<div class="input-group date date-component input-append" :style="{width: `${width}px`}" >
		<input
			v-model="value"
			type="text"
			id="{{uuid}}"
			class="form_datetime _month form-control"
			data-date-end-date="0m" readonly/>
		<span v-if='buttonStatus === 0' class="add-on" @click="clearDate"><i class="icon-remove"></i>xxx</span>
		<span v-if='buttonStatus === 0' class="iconfont icon-oc-date"></span>
	</div>
</template>
<script>
	require("bootstrap-datetime-picker")
	require("bootstrap-datetime-picker/js/locales/bootstrap-datetimepicker.zh-CN.js")
	
	export default {
		data(){
			return {
				dateConfig: {},
				buttonStatus: 0
			}
		},
		props: {
			value: {
				twoWays: true,
				type: String,
			},
			action: {
				type: Function,
				default: function(){
					return
				}
			},
			uuid: {
				type: String,
			},
			type: {
				type: String,
				twoWays: true,
				default: 'year'
			},
			width: {
				type: Number,
				default: 120
			}
		},
		watch: {
			type: function () {
				this.initDateTimePicker()
			},
			value: function () {
				this.initDateTimePicker()
				this.action()
			},
		},
		methods: {
			initDateTimePicker(){
				var self = this
				// 当前日期
				var type = self.type
				var date = new Date()
				switch (type) {
					case 'year':
						self.dateConfig = {
							language: 'zh-CN',
							format: 'yyyy',
							startView: 'decade',
							minView: 'decade',
							startDate: '2016',
							endDate: '2017',
						}
						break;
					case 'month':
						self.dateConfig = {
							language: 'zh-CN',
							format: 'yyyy-mm',
							startView: 'year',
							minView: 'year',
							startDate: '2016-06',
							endDate: '2017-01'
						}
						break;
					case 'day':
						self.dateConfig = {
							language: 'zh-CN',
							format: 'yyyy-mm-dd',
							startView: 'month',
							minView: 'month',
						}
						break;
					case 'time':
						self.dateConfig = {
							language: 'zh-CN',
							format: 'yyyy-mm-dd hh:ii',
							todayBtn: true,
							startView: 'month',
							minView: 'hour',
						}
						break;
				}
				
				this.datetimepicker = $('#'+self.uuid)
				
				if(this.datetimepicker) {
					this.datetimepicker.datetimepicker('remove')
				}
				
				let once = 1
				this.datetimepicker.datetimepicker(self.dateConfig).on('changeDate', function (ev) {
					if (once){
						$(this).datetimepicker('hide')
						let currenSelectDate = $(this)[0].value
						self.value = currenSelectDate ? currenSelectDate : self.value
						once = null
					}
				}).on('show', function(){
					self.buttonStatus = 1
				}).on('hide', function(){
					self.buttonStatus = 0
				});
			},
			clearDate(){
				this.value = ''
			}
		},
		ready(){
			this.initDateTimePicker('month')
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
		z-index: 12;
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
