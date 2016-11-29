<template>
	<div class="input-group date date-component input-append" :style="{width: `${width}px`}" >
		<input
			v-model="value"
			type="text"
			id="{{uuid}}"
			class="form_datetime _month form-control"
			data-date-end-date="0m" readonly/>
		<!--<span v-if="buttonStatus === 1" class="add-on" @click="clearDate"><i class="iconfont icon-oc-delete"></i></span>-->
		<span class="iconfont icon-oc-date"></span>
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
				default: 130
			},
			isstartday: {
				type: String,
				default: 'false'
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
        $.fn.datetimepicker.dates['zh-CN'] = {
          days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
          daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
          months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
          monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
          today: "今天",
          clear: '清除',
          suffix: [],
          meridiem: ["上午", "下午"]
        };
				var self = this
				// 当前日期
				var type = self.type
				var date = new Date()
				let year = date.getFullYear()
				let month = (date.getMonth()+1) < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1)
				let day = date.getDate().toString().length < 2 ? '0'+ date.getDate() : date.getDate()
				let hours = date.getHours().toString.length < 2 ? '0'+date.getHours() : date.getHours()
				let minutes = date.getMinutes().toString.length < 2 ? '0'+date.getMinutes() : date.getMinutes()
				let seconds = date.getSeconds().toString.length < 2 ? '0'+date.getSeconds() : date.getSeconds()

				switch (type) {
					case 'year':
						self.dateConfig = {
							language: 'zh-CN',
							format: 'yyyy',
							startView: 'decade',
							minView: 'decade',
							startDate: '2016',
							endDate: '2017',
              clearBtn: true
						}
						break;
					case 'month':
						self.dateConfig = {
							language: 'zh-CN',
							format: 'yyyy-mm',
							startView: 'year',
							minView: 'year',
              clearBtn: true
							/*startDate: '2016-06',
							endDate: '2017-01'*/
						}
						break;
					case 'day':
						self.dateConfig = {
							language: 'zh-CN',
							format: 'yyyy-mm-dd',
							startView: 'month',
							minView: 'month',
              clearBtn: true

						}
						break;
					case 'time':
						self.dateConfig = {
							language: 'zh-CN',
							format: 'yyyy-mm-dd hh:ii',
							todayBtn: true,
							startView: 'month',
							minView: 'hour',
							startDate: self.isstartday==='true' ? year+'-'+month+'-'+day+' '+hours+':'+minutes : null,
              clearBtn: true,
							endDate:null
						}
						break;

				}
				
				this.datetimepicker = $('#'+self.uuid)
				if (this.datetimepicker) {
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
				})
//          .on('show', function(){
//					self.buttonStatus = 1
//				}).on('hide', function(){
//					self.buttonStatus = 0
//				});
			},
			clearDate () {
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
			z-index: 300;
		}
		.form-control {
			display: inline-block;
			border-bottom-right-radius: 4px !important;
    		border-top-right-radius: 4px !important;
		}
	}
	.form-control[disabled], .form-control[readonly], fieldset[disabled] .form-control {
	    background-color: #FFF !important;
	    opacity: 1 !important;
	}
  
  .table-condensed  {
    width: 200px;
  }

</style>
