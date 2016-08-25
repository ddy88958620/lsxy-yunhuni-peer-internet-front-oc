<template>


  <div class="flex flex-1 flex-direction-column section-right whilebg admin-padding admin-border bg-section-margin">
    <div class="app-chart-header flex align-items-c">
      <input name='app-chart-type'  @click="changeDate('month')"  type="radio" checked=checked/>
      <label for="">日统计</label>
      <input name='app-chart-type'  @click="changeDate('year')" type="radio"/>
      <label for="">月统计</label>
      <div class="datepicker-wrap">
        <datetime-picker :uuid="'consumeChartDate'" :action="doGetComsumeChart"   :type.sync="chartdate.type" :value.sync="chartdate.value"></datetime-picker>
      </div>
    </div>
    <div class="flex-1">
      <chart :uuid="'conversation-app-chart'"
           :type="['line','bar']"
           :dateType="dateType"
           :label.sync="chartdate.type"
           :ydata1="list.cost"
           :ydata2="list.session"
           :title="['话务量','消费额']"
           :xtitle="['话务量(次数)','消费额(元)']"
           :color="[['rgba(246,239,232,0.2)','rgba(251,54,45,0.8)','rgba(251,54,45,0.8)','#FFF','rgba(251,54,45,0.8)','rgba(220,220,220,1)'],
                    ['#ebeecc','rgba(214,235,78,0.8)','rgba(214,235,78,1)','#FFF','rgba(214,235,78,0.1)','rgba(220,220,220,0.1)']]"
        ></chart>
     
    </div>
  </div>




  <div class="flex flex-1 flex-direction-column whilebg admin-padding admin-border bg-section-margin">

    <div class="app-chart-header flex align-items-c">
      <input name='app-chart-type'  @click="changeSessionDate('month')"  type="radio" checked=checked/>
      <label for="">日统计</label>
      <input name='app-chart-type'  @click="changeSessionDate('year')" type="radio"/>
      <label for="">月统计</label>
      <div class="datepicker-wrap">
        <datetime-picker :uuid="'sessionChartDate'" :action="doGetSessionChart"   :type.sync="sessiondate.type" :value.sync="sessiondate.value"></datetime-picker>
      </div>
    </div>

     <div class="flex-1">
      <chart :uuid="'conversation-session-app-chart'"
           :type="['line','']"
           :dateType="dateType"
           :label.sync="sessiondate.type"
           :ydata1="sessionlist"
           :ydata2=""
           :title="['会话量(次)','']"
           :xtitle="['(时长)','']"
           :color="[['rgba(246,239,232,0.2)','rgba(251,54,45,0.8)','rgba(251,54,45,0.8)','#FFF','rgba(251,54,45,0.8)','rgba(220,220,220,1)'],
                    ['#ebeecc','rgba(214,235,78,0.8)','rgba(214,235,78,1)','#FFF','rgba(214,235,78,0.1)','rgba(220,220,220,0.1)']]"
        ></chart>
     
    </div>
  </div>


</template>
<style>

</style>
<script>
  import DATE from '../../../../../utils/date'
  export default{
    data(){
      return {
        'sessiondate':{
          type:'month',
          value:DATE.todayString('month')
        },
        'chartdate':{
          type:'month',
          value:DATE.todayString('month')
        },
        list:{
          cost:[],
          session:[]
        },
        sessionlist:[]
      }
    },
    components:{
      'datetime-picker' :require('../../../../ui/datetimepicker.vue'),
      'chart': require('../../../../ui/chart.vue'),
    },
    methods: {
      //获取话务量 消费额度
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
        $.get('/tenant/tenants/'+this.$route.params.uid+'/consumeAnduration/statistic',params).then((res) => {
          self.list.cost = res.data.cost
          self.list.session = res.data.session
        })
      },
      changeDate(type){
        let self = this
        self.chartdate.type = type
        this.doGetComsumeChart()
      },
      //获取会话量统计
      changeSessionDate(type){
        let self = this
        self.sessiondate.type = type
        this.doGetSessionChart()
      },
      doGetSessionChart(){
        let params = {}
        let self = this 
        let appid =  this.$route.params.aid  
        if(this.sessiondate.type == 'month'){
          params.year = this.sessiondate.value.split('-')[0]
          params.month = this.sessiondate.value.split('-')[1]
        }else{
          params.year = this.sessiondate.value.split('-')[0]
        }
        $.get('/tenant/tenants/'+this.$route.params.uid+'/session/statistic',params).then((res) => {
          self.sessionlist = res.data
        })

      }
    },
    ready(){
       this.changeDate('month')
       this.changeSessionDate('month')
    }
  }
</script>
