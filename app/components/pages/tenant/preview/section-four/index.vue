<template>
  <div class="section-four flex flex-1  bg-section-margin  flex-direction-row">

    <div class="child-box flex flex-1  padding-right-10 ">
      <div class="flex flex-1 flex-direction-column whilebg admin-padding admin-border">
        <div class="flex section-time-box">
          <a @click="previousMonth" >上个月</a>
          <span>{{chartOneDate ? chartOneDate.year+'-0'+chartOneDate.month : '0'}}</span>
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
          <a @click="previousMonthApi"  >上一月</a>
          <a @click="nextMonthApi" >下一月</a>

          <span>2016-08-1</span>
        </div>
        <div class="flex flex-1">
          <chart
            :uuid="'realtime-app-chart6'"
            :label="['']"
            :color="['#e1a2a2']"
            :value.sync="chartApiValue"
            :title="['API调用次数','次数(次)']"></chart>
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
        chartOneValue: [],
        chartOneDate: null,
        chartApiValue: [],
        chartApiDate: null,
      }
    },
    watch: {
      chartOneDate: {
        handler(newDate, old){
          this.chartOneQuery()
        },
        deep: true
      },
      chartApiDate:{
        handler(newDate, old){
          this.chartApiQuery()
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
	    previousMonthApi(){
		    this.chartApiDate.month = this.chartApiDate.month > 1 ? this.chartApiDate.month - 1 : 1
	    },
	    nextMonthApi(){
		    this.chartApiDate.month = this.chartApiDate.month < 12 ? this.chartApiDate.month + 1 : 12
	    },
    	chartOneQuery(){
        let uid = this.$route.params.uid
        let self = this
		    if (this.chartOneDate === null){
			    this.chartOneDate = DATE.totalDate()
        }
        $.get('/tenant/tenants/'+uid+'/session/statistic', self.chartOneDate).then((res)=>{
          self.chartOneValue = res.data
        })
      },
      chartApiQuery(){
        let uid = this.$route.params.uid
        let self = this
        if (this.chartApiDate === null){
          this.chartApiDate = DATE.totalDate()
        }
        $.get('/tenant/tenants/'+uid+'/session/statistic', self.chartApiDate).then((res)=>{
          self.chartApiValue = res.data
        })
      }
    },
    ready(){
    	this.chartOneQuery()
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
