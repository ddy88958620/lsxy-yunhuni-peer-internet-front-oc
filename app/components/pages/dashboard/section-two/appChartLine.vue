<template>
  <div id="app-chart">
    <div class="app-chart-header flex align-items-c">
      <input name='app-chart-type' @click="changeDate('month')"  type="radio" checked=checked/>
      <label for="">日统计</label>
      <input name='app-chart-type' @click="changeDate('year')"  type="radio"/>
      <label for="">月统计 </label>
      <div class="datepicker-wrap inline-block">
        <datetime-picker :uuid="'datetimepicker1'" :action="doGetNewMemberAndApp" :type.sync="date.type" :value.sync="date.value"></datetime-picker>
      </div>
    </div>
    <chart :uuid="'bashboard-app-chart'"
           :type="['line','line']"
           :dateType="dateType"
           :label.sync="date.type"
           :ydata1="member"
           :ydata2="app"
           :title="['新增注册会员','新增应用']"
           :xtitle="['会员数(个)','应用数(个)']"
           :color="[['rgba(246,239,232,0.8)','rgba(251,54,45,0.8)','rgba(251,54,45,0.8)','#FFF','rgba(251,54,45,0.8)','rgba(220,220,220,1)'],
                    ['rgba(247,249,242,0.4)','rgba(214,235,78,0.8)','rgba(214,235,78,1)','#FFF','rgba(214,235,78,0.1)','rgba(220,220,220,0.1)']]"
    ></chart>
  </div>
</template>

<script>
  import  {getNewMemberAndApp } from '../../../../vuex/actions.js' 
  import DATE from '../../../../utils/date'
  export default {
    vuex : {
      getters: {
        app : ({app}) => app.statistic.memberapp.app_count,
        member : ({app}) => app.statistic.memberapp.member_count
      },
      actions: {
        getNewMemberAndApp
      }
    },
    data() {
      return {
        date: {
          type: 'month',
          value: DATE.todayString('month')+1
        },
      }
    },
    components: {
      'chart': require('../../../ui/chart.vue'),
      'datetime-picker': require('../../../ui/datetimepicker.vue')
    },
    methods: {
	    doGetNewMemberAndApp(date){
        console.log(date)
      	if (date) {
      	  this.getNewMemberAndApp(date)
        } else {
        	let year = this.date.value.split('-')[0]
          let month = this.date.value.split('-')[1]
		      // {year, month} === {year: year, month: month
          this.getNewMemberAndApp({year: year,month})
        }
      },
      changeDate(type){
        let thisDate = new Date()
        let self = this
        self.date.type = type
        if(type=='year'){
           self.date.value = DATE.todayString('year')
          this.getNewMemberAndApp({year:DATE.today('month').year})
        }else{
          self.date.type ='month'
          self.date.value = DATE.todayString('month')
          this.getNewMemberAndApp({year:DATE.today('month').year,month:DATE.today('month').month})
        }
      }
    },
	  ready(){
       this.changeDate('month')
    },
  }
</script>
<style lang='sass' scoped>
</style>
