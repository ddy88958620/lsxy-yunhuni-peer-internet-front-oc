<template>
  <div class="section-four flex flex-1  bg-section-margin  flex-direction-row">

    <div class="child-box flex flex-1  padding-right-10 ">
      <div class="flex flex-1 flex-direction-column whilebg admin-padding admin-border">
        <div class="flex section-time-box">
          <a @click="previousMonth" >上个月</a>
          <span>{{chartOneDate.year}}-0{{ chartOneDate.month }}</span>
        </div>
        <div class="flex flex-1">
          <chart
            :uuid="'realtime-app-chart5'"
            :label="['']"
            :value.sync="chartOneValue"
            :color="['#ebeecc']"
            :title="['会话量统计','会话量（次）']">
          </chart>
        </div>
      </div>
    </div>


    <div class="child-box flex flex-1  padding-left-10 ">
      <div class="flex flex-1 flex-direction-column whilebg admin-padding admin-border">
        <div class="flex section-time-box">
          <a >本月</a>
          <a @click="chartOneDate.month= chartOneDate.month - 1"  >上一月</a>
          <a @click="chartOneDate.month= chartOneDate.month + 1" >上一月</a>

          <span>2016-08-1</span>
        </div>
        <div class="flex flex-1">
          <chart
            :uuid="'realtime-app-chart6'"
            :label="['']"
            :color="['#e1a2a2']"
            :value.sync="chartTwoValue"
            :title="['API调用次数','次数(次)']"></chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        chartOneValue: [],
        chartOneDate:{
          year: 2016,
          month: 8
        },
        chartTwoValue: [],
        chartTwodate: {
          year: 2016,
          month: 8
        }
      }
    },
    watch: {
        chartOneDate: {
          handler(){
            console.log('chartOneDate update')
          },
          deep: true
        }
    },
    components:{
      'chart': require('../../../../ui/realtime-chart.vue')
    },
    methods: {
      previousMonth(){
        this.chartOneDate.month = this.chartOneDate.month > 1 ? this.chartOneDate.month - 1 : 1
      },
      nextMonth(){
        this.chartOneDate.month = this.chartOneDate.month < 12 ? this.chartOneDate.month + 1 : 12
      },
    	chartOneQuery(){
        let uid = this.$route.params.uid
        let self = this
        $.get('/tenant/tenants/'+uid+'/session/statistic', self.chartOneDate).then((res)=>{
          self.chartOneValue = res.data
          self.chartTwoValue = res.data
        })
//      /tenant/tenants/{id}/api_invoke/statistic
//      $.get('/tenant/tenants/'+uid+'/api_invoke/statistic', {year: 2016}).then((res)=>{
//        self.chartTwo = res.data
//      })
      }
    },
    ready(){
    }
  }
</script>

<style lang="sass">
  .section-four{
    height: 300px;
    background-color: transparent;
  }


</style>
