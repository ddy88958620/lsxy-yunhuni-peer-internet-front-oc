<style lang="sass" scoped>
	.admin-panel {
		.admin-label {
			line-height: 34px;
		}
	}
</style>
<template>

	<div class="admin-panel admin-border">
		<div class="panel-heading ofh">
			<span class="inline-block admin-label">消费月结账单</span>
			<span class="float-r">
				<datetime-picker :uuid="'consumeDate'" :action="doGetComsume"  :type.sync="consumedate.type" :value.sync="consumedate.value" ></datetime-picker>
			</span>
		</div>
		<div class="admin-table flex flex-1">
			<table class="table remove-border ">
				<tr v-for="list in comsumelist">
					<td>{{list.type}}</td>
					<td>{{list.amongAmount}}</td>
				</tr>
				<!-- 
				<tr>
					<td>单向外呼</td>
					<td>102元</td>
					<td>双向呼叫</td>
					<td>102元</td>
				</tr>
				<tr>
					<td>电话会议</td>
					<td>100元</td>
					<td>电话接入IVR</td>
					<td>102元</td>
				</tr>
				<tr>
					<td>IVR外呼放音</td>
					<td>100元</td>
					<td>短信</td>
					<td>102元</td>
				</tr>
				<tr>
					<td>电话通知</td>
					<td>100元</td>
					<td>录音通知</td>
					<td>102元</td>
				</tr>
				<tr>
					<td>IVR功能费</td>
					<td>100元</td>
					<td>IVR号码租用费</td>
					<td>102元</td>
				</tr>

				<tr>
					<td>录音文件存储</td>
					<td>102元</td>
					<td colspan="2"></td>
				</tr> -->
			</table>
		</div>
	</div>

	<div class="flex flex-1 flex-direction-column whilebg admin-padding admin-border">
		<div class="app-chart-header flex align-items-c">
			<input name='app-chart-type'  @click="changeDate('month')"  type="radio" value="month" v-model="radioDates"  checked=checked />
			<label for="">日统计</label>
			<input name='app-chart-type'  @click="changeDate('year')" type="radio" value="year" v-model="radioDates" />
			<label for="">月统计</label>
			<div class="datepicker-wrap inline-block">
				<datetime-picker :uuid="'consumeChartDate'" :action="doGetComsumeChart"   :type.sync="chartdate.type" :value.sync="chartdate.value"></datetime-picker>
			</div>
		</div>
		<chart :uuid="'consume-app-chart'"
           :type="['line','line']"
           :dateType="dateType"
           :label.sync="chartdate.type"
           :ydata1="chart"
           :ydata2="[]"
           :title="['消费额统计','']"
           :xtitle="['消费额(元)','']"
           :color="[['rgba(246,239,232,0.8)','rgba(251,54,45,0.8)','rgba(251,54,45,0.8)','#FFF','rgba(251,54,45,0.8)','rgba(220,220,220,1)'],
                    ['rgba(247,249,242,0.4)','rgba(214,235,78,0.8)','rgba(214,235,78,1)','#FFF','rgba(214,235,78,0.1)','rgba(220,220,220,0.1)']]"
        ></chart>

		<!-- <chart :uuid="'realtime-app-chart1'" :label="['']" :color="['#deef70']" :title="['消费额统计','消费额(元)']"></chart> -->
	</div>


</template>

<script>
	import DATE from '../../../../../utils/date'
	export default{
		data(){
			return {
				'consumedate':{
					type:'month',
					value:DATE.todayString('month')
				},
				'chartdate':{
					type:'month',
					value:DATE.todayString('month')
				},
				comsumelist:[],
				chart:[],
				radioDates:'month'
			}
		},
		components: {
			'datetime-picker': require('../../../../ui/datetimepicker.vue'),
			'chart': require('../../../../ui/chart.vue')
		},
		methods: {
		  //获取消费统计额度
		  doGetComsumeChart(){
		  	let params = {}
			let self = this 
			let appid =  this.$route.params.aid  
		  	if(this.chartdate.type == 'month'){
		  		params.year = this.chartdate.value.split('-')[0]
		  		params.month = this.chartdate.value.split('-')[1]
		  	}else{
		  		params.year = this.chartdate.value.split('-')[0]
		  	}
		  	let appId =  this.$route.params.aid 
			//params.month = this.$route.params.uid
			if(appId!='all'){
				params.appId = appId
			}
		 
		  	
		  	//GET /tenant/tenants/{tenant}/consume/statistic
			$.get('/tenant/tenants/'+this.$route.params.uid+'/consume/statistic',params).then((res) => {
				self.chart = res.data
			})
		  },
		  changeDate(type){
		  	let self = this
		    self.chartdate.type = type
		   	if(type=='month'){
		   		self.chartdate.value = DATE.todayString('month')
		   	}
		   	if(type=='year'){
		   		self.chartdate.value = DATE.todayString('year')
		   	}
		    this.doGetComsumeChart()
		  },
		  //获取月结账单
		  doGetComsume(){
		  	let params = {}
			let self = this 
			let appId =  this.$route.params.aid 
			//params.month = this.$route.params.uid
			if(appId!='all'){
				params.appId = appId
			}
			if(this.consumedate.value==''){
				this.comsumelist = []
				return
			}
			params.month = this.consumedate.value
			$.get('/tenant/tenants/'+this.$route.params.uid+'/consume_month',params).then((res) => {
				self.comsumelist = res.data
			})
		  },

		},
		route:{
			data(){
				this.doGetComsume()
				this.changeDate(this.radioDates)
			}
		},
		ready(){

		}
	}
</script>
