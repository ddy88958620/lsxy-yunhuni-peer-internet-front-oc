<template>
	<div class="flex flex-1 admin-padding  bg-section-margin flex-direction-column  whilebg ">
		<div class="datepicker-wrap flex flex-1">
			<datetime-picker :uuid="'rechargeChartDate'" :action="doGetRechargeChart"   :type.sync="rechargedate.type" :value.sync="rechargedate.value"></datetime-picker>
		</div>
		<div class="flex flex-1">
			<chart :uuid="'recharge-app-chart'"
           :type="['line','line']"
           :dateType="dateType"
           :label.sync="rechargedate.type"
           :ydata1="rechargelist"
           :ydata2="[]"
           :title="['充值统计','']"
           :xtitle="['充值额(元)','']"
           :color="[['rgba(246,239,232,0.8)','rgba(251,54,45,0.8)','rgba(251,54,45,0.8)','#FFF','rgba(251,54,45,0.8)','rgba(220,220,220,1)'],
                    ['rgba(247,249,242,0.4)','rgba(214,235,78,0.8)','rgba(214,235,78,1)','#FFF','rgba(214,235,78,0.1)','rgba(220,220,220,0.1)']]"
       		 ></chart>
		</div>
	</div>
	<div class="flex-flex-1 bg-section-margin">
		<admin-table></admin-table>
	</div>
</template>

<script>
  import DATE from '../../../../../utils/date'
	export default{
		components: {
			'datetime-picker': require('../../../../ui/datetimepicker.vue'),
			'chart': require('../../../../ui/chart.vue'),
			'admin-table': require('./table.vue')
		},
		data(){
			return{
				rechargedate:{
					type:'year',
					value: DATE.today('month').year.toString()
				},
				rechargelist:[]
			}
		},
		methods: {
		  //获取消费统计额度
		  doGetRechargeChart(){
		  	let params = {}
			let self = this 
		  	params.year = this.rechargedate.value
			$.get('/tenant/tenants/'+this.$route.params.uid+'/recharges/statistic',params).then((res) => {
				self.rechargelist = res.data
			})
		  }
		},
		ready(){
			this.doGetRechargeChart()
		}

	}
</script>


<style lang="sass" scoped>

</style>