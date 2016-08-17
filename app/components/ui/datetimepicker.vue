<template>
	<div class="input-group date-component" :style="{width: `${width}px`}" >
		<input
			:value.sync='value'
			type="text"
			id="{{uuid}}"
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
				dateConfig: {},
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
				$('#'+this.uuid).datetimepicker('update');
				console.log('update type')
			},
			value: function(){
				$('#'+this.uuid).datetimepicker('update');
				console.log('update type')
			}
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
							format: 'yyyy',
							startView: 'decade',
							minView: 'decade',
							startDate: '2016',
							endDate: '2017'
						}
						console.log('here year')
						break;
					case 'month':
						self.dateConfig = {
							format: 'yyyy-mm',
							startView: 'year',
							minView: 'year',
							startDate: '2016-06',
							endDate: '2017-01'
						}
						break;
					case 'day':
						self.dateConfig = {
							format: 'yyyy-mm-dd',
							startView: 'month',
							minView: 'day',
						}
						break;
					case 'time':
						self.dateConfig = {
							format: 'yyyy-mm-dd hh:ii',
							startView: 'month',
							minView: 'hour',
						}
						break;
				}
				
				this.datetimepicker = $('#'+ self.uuid).datetimepicker(self.dateConfig).on('changeDate', function (e) {
					$(this).datetimepicker('hide')
					var currenSelectDate = $(this)[0].value
					self.value = currenSelectDate ? currenSelectDate : self.value
					self.action()
					console.log('action')
				});
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
