<template>
  <div>
    <!--搜索-->
    <div class="headbox flex flex-1 align-items-c bg-section-margin whilebg">
      <span class='datetime-picker-label padding-right-20'>选择应用: </span>
      <select class="form-control flex select-box padding-right-20" v-model='serach.selectApp'>
        <option value="all">全部</option>
        <option v-for="app in serach.apps" value="{{app.id}}">{{app.name}}</option>
      </select>
    </div>
    <!--图表-->
    <div class="flex flex-1 flex-direction-column section-right whilebg admin-padding admin-border bg-section-margin">
      <div class="app-chart-header flex align-items-c">
        <input name='app-chart-type'  @click="changeDate('month')"  type="radio" value="month" v-model="radioDates"  checked=checked />
        <label for="">日统计</label>
        <input name='app-chart-type'  @click="changeDate('year')" type="radio" value="year" v-model="radioDates"  />
        <label for="">月统计</label>
        <div class="datepicker-wrap inline-block">
          <datetime-picker :uuid="'consumeChartDate'" :action="doGetComsumeChart"   :type.sync="chartdate.type" :value.sync="chartdate.value"></datetime-picker>
        </div>
      </div>
      <div class="flex-1">
        <chart :uuid="'conversation-app-chart'"
               :type="['line','bar']"
               :dateType="dateType"
               :label.sync="chartdate.type"
               :ydata1="list.session"
               :ydata2="list.cost"
               :title="['话务量','消费额']"
               :xtitle="['话务量(分钟)','消费额(元)']"
               :color="[['rgba(246,239,232,0.2)','rgba(251,54,45,0.8)','rgba(251,54,45,0.8)','#FFF','rgba(251,54,45,0.8)','rgba(220,220,220,1)'],
                    ['#ebeecc','rgba(214,235,78,0.8)','rgba(214,235,78,1)','#FFF','rgba(214,235,78,0.1)','rgba(220,220,220,0.1)']]"
        ></chart>

      </div>
    </div>
    <!--图表-->
    <div class="flex flex-1 flex-direction-column whilebg admin-padding admin-border bg-section-margin">
      <div class="app-chart-header flex align-items-c">
        <input name='app-chart-type1'  @click="changeSessionDate('month')"  type="radio"  value="month" v-model="radioSessionDates"  checked=checked/>
        <label for="">日统计</label>
        <input name='app-chart-type1'  @click="changeSessionDate('year')" type="radio" value="year" v-model="radioSessionDates" />
        <label for="">月统计</label>
        <div class="datepicker-wrap inline-block">
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
               :title="['会话量','']"
               :xtitle="['会话量(次)','']"
               :color="[['rgba(246,239,232,0.2)','rgba(251,54,45,0.8)','rgba(251,54,45,0.8)','#FFF','rgba(251,54,45,0.8)','rgba(220,220,220,1)'],
                    ['#ebeecc','rgba(214,235,78,0.8)','rgba(214,235,78,1)','#FFF','rgba(214,235,78,0.1)','rgba(220,220,220,0.1)']]"
        ></chart>
      </div>
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
        serach: {
          apps: [],
          selectApp: 'all',
        },
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
        sessionlist:[],
        radioDates:'month',
        radioSessionDates:'month'
      }
    },
    components:{
      'datetime-picker' :require('ui/datetimepicker.vue'),
      'chart': require('ui/chart.vue'),
    },
    watch: {
      'serach.selectApp': function () {
        this.changeDate(this.radioDates)
        this.changeSessionDate(this.radioSessionDates)
      }
    },
    methods: {
      //获取应用
      getApp(){
        $.get('app/list/' + this.$route.params.uid, {serviceType: 'voice,call_center'}).then((res) => {
          if (res.data.length > 0) {
            this.serach.apps = res.data
          }
          this.changeDate(this.radioDates)
          this.changeSessionDate(this.radioSessionDates)
        })
      },
      //获取话务量 消费额度
      doGetComsumeChart(){
        let params = {}
        let self = this

        if(this.chartdate.type == 'month'){
          params.year = this.chartdate.value.split('-')[0]
          params.month = this.chartdate.value.split('-')[1]
        }else{
          params.year = this.chartdate.value.split('-')[0]
        }
        if (this.serach.selectApp != 'all') {
          params.appId = self.serach.selectApp
        }
        $.get('/tenant/tenants/'+this.$route.params.uid+'/consumeAnduration/statistic',params).then((res) => {
          self.list.cost = res.data.cost
          self.list.session = res.data.session
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
      //获取会话量统计
      changeSessionDate(type){
        let self = this
        self.sessiondate.type = type
        if(type=='month'){
          self.sessiondate.value = DATE.todayString('month')
        }
        if(type=='year'){
          self.sessiondate.value = DATE.todayString('year')
        }
        this.doGetSessionChart()
      },
      doGetSessionChart(){
        let params = {}
        let self = this
        if (this.serach.selectApp != 'all') {
          params.appId = self.serach.selectApp
        }
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
    route:{
       data(){
          this.getApp()
       }
    }
  }
</script>
