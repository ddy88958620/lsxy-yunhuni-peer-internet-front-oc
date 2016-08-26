<template>

  <div class="flex flex-1 flex-direction-column admin-padding admin-border bg-section-margin whilebg ">
    <div class="app-chart-header flex align-items-c">
	    <input name='app-chart-type' @click="changeDate('month')"  type="radio" checked=checked/>
	    <label for="">日统计</label>
	    <input name='app-chart-type' @click="changeDate('year')"  type="radio"/>
	    <label for="">月统计 </label>
	    <div class="datepicker-wrap">
		    <datetime-picker :uuid="'datetimepicker1'" :action="chartApiQuery" :type.sync="date.type" :value.sync="date.value"></datetime-picker>
	    </div>
    </div>
    <div class="flex-1">
			<chart
				:uuid="'sectionThreeChart1'"
				:type="['line','line']"
				:label.sync="date.type"
				:ydata1.sync="chartApiValue"
				:title="['API调用', '']"
				:xtitle="['话务量(分钟)','消费额(元)']"
				:color="[['rgba(246,239,232,0.2)','rgba(251,54,45,0.8)','rgba(251,54,45,0.8)','#FFF','rgba(251,54,45,0.8)','rgba(220,220,220,1)'],
											['#ebeecc','rgba(214,235,78,0.8)','rgba(214,235,78,1)','#FFF','rgba(214,235,78,0.1)','rgba(220,220,220,0.1)']]"
			></chart>
		</div>
  </div>
  <div class="flex-flex-1 bg-section-margin">
    <admin-table :value.sync="chartApiValue" :date.sync='date.value'></admin-table>
  </div>
</template>
<style lang="sass" scoped>

</style>
<script>
  import DATE from '../../../../../utils/date'
  export default{
  	data(){
  		return {
  			chartApiValue: [],
			  date: {
  				type: 'month',
				  value: DATE.todayString('month'),
			  }
      }
    },
    components:{
      'chart': require('../../../../ui/chart.vue'),
      'admin-table': require('./table.vue'),
	    'datetime-picker': require('../../../../ui/datetimepicker.vue')
    },
    methods: {
	    changeDate(type){
		    let self = this
		    self.date.type = type
		    
		    if(type=='year'){
			    this.chartApiQuery(DATE.todayString('year'))
			    this.date.value = DATE.todayString('year')
		    }
		
		    if(type === 'month'){
			    this.chartApiQuery(DATE.todayString('month'))
			    this.date.value = DATE.todayString('month')
		    }
		    
	    },
      chartApiQuery(date){
        let uid = this.$route.params.uid
	      let params = date ? date : this.date.value
	      let self = this
        $.get('/tenant/tenants/'+uid+'/interfaceInvoke/statistic', DATE.dateParse(params)).then((res)=>{
          self.chartApiValue = res.data
        })
      }
    },
    ready(){
    	this.chartApiQuery()
    }
  }
</script>
