<template>
  <div class="section-four bg-section-margin no-wrap ">

    <div class="child-box inline-block width-50 padding-right-10 ">
      <div class="flex flex-1 flex-direction-column whilebg admin-padding admin-border">
        <div class="flex section-time-box">
          <datetime-picker :uuid="'preview-section-four1'" :action="chartSessionQuery" :type.sync="chartSessionDate.type" :value.sync="chartSessionDate.value"></datetime-picker>
        </div>
        <div class="flex flex-1">
          <chart
            :uuid="'sectionThreeChart2'"
            :type="['line','line']"
            :ydata1="chartSessionValue"
            :title="['会话量统计', '']"
            :xtitle="['会话量(次)','']"
            :color="[['rgba(246,239,232,0.2)','rgba(251,54,45,0.8)','rgba(251,54,45,0.8)','#FFF','rgba(251,54,45,0.8)','rgba(220,220,220,1)'],
                    ['#ebeecc','rgba(214,235,78,0.8)','rgba(214,235,78,1)','#FFF','rgba(214,235,78,0.1)','rgba(220,220,220,0.1)']]"
          ></chart>
        </div>
      </div>
    </div>


    <div class="child-box inline-block width-50  padding-left-10 ">
      <div class="flex flex-1 flex-direction-column whilebg admin-padding admin-border">
        <div class="flex section-time-box">
          <datetime-picker :uuid="'preview-section-four2'" :action="chartApiQuery" :type.sync="chartApiDate.type" :value.sync="chartApiDate.value"></datetime-picker>
        </div>
        <div class="">
          <chart
            :uuid="'sectionThreeChart1'"
            :type="['line','line']"
            :ydata1.sync="chartApiValue"
            :title="['API调用次数', '']"
            :xtitle="['次数(次)','']"
            :color="[['rgba(246,239,232,0.2)','rgba(251,54,45,0.8)','rgba(251,54,45,0.8)','#FFF','rgba(251,54,45,0.8)','rgba(220,220,220,1)'],
                    ['#ebeecc','rgba(214,235,78,0.8)','rgba(214,235,78,1)','#FFF','rgba(214,235,78,0.1)','rgba(220,220,220,0.1)']]"
          ></chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import DATE from '../../../../../utils/date'
  export default{
    data(){
      return {
        chartSessionValue: [],
        chartSessionDate: {
				  type: 'month',
          value: DATE.todayString('month'),
        },
        chartApiValue: [],
        chartApiDate: {
          type: 'month',
          value: DATE.todayString('month'),
        },
      }
    },
    components:{
      'chart': require('../../../../ui/chart.vue'),
      'datetime-picker': require('../../../../ui/datetimepicker.vue')
    },
    methods: {
    	chartSessionQuery(){
        let uid = this.$route.params.uid
        let self = this
        $.get('/tenant/tenants/'+uid+'/session/statistic', DATE.dateParse(self.chartSessionDate.value)).then((res)=>{
          self.chartSessionValue = res.data
        })
      },
      chartApiQuery(){
        let uid = this.$route.params.uid
        let self = this
        $.get('/tenant/tenants/'+uid+'/interfaceInvoke/statistic', DATE.dateParse(self.chartApiDate.value)).then((res)=>{
          self.chartApiValue = res.data
        })
      }
    },
    ready(){
    	this.chartSessionQuery()
	    this.chartApiQuery()
    }
  }
</script>

<style lang="sass">
  .section-four{
    height: 300px;
    background-color: transparent;
  }
</style>
