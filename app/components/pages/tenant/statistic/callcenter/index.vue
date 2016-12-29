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
    <!--本月数据-->
    <section class='section-data-box flex bg-section-margin flex-direction-column justify-content-s '>
      <div class="panel panel-default flex-1">
        <div class="panel-heading">本月数据 <a class="float-r" v-link="'/admin/tenant/detail/'+$route.params.uid+'/statistic/calldetail/'+this.serach.selectApp">查看明细</a></div>
        <div class="panel-body flex flex-1">
          <div class="no-wrap">
            <div class="inline-block box border-right">
              <div class="flex flex-1 align-items-c ">
                <i class="icon iconfont icon-oc-incoming bigicon"></i>
                <span class="green money">{{ current.callIn }}</span>
                <!--<div class="inline-block" v-if="indicant.dto1.costCoin === true" >
                  <i class="iconfont {{ current.callIn >= 0 ? 'icon-oc-up' : 'icon-oc-down'}}"></i><span class='text-danger'>{{current.dto.callIn}}%</span>
                </div>
                <div class="inline-block" v-else>
                  --
                </div>-->
              </div>
              <div class="flex flex-1 middle-font-size middle-font-color">
                呼入量(次)
              </div>
            </div>
            <div class="inline-block box border-right">
              <div class="flex flex-1 align-items-c ">
                <i class="icon iconfont icon-oc-exhale bigicon"></i>
                <span class="green money">{{ current.callOut }}</span>
             <!--   <div class="inline-block" v-if="indicant.dto1.rechargeCoinRate === true" >
                  <i class="iconfont {{ indicant.dto.recharge_coin_rate >= 0 ? 'icon-oc-up' : 'icon-oc-down'}}"></i><span class='text-danger'>{{indicant.dto.recharge_coin_rate}}%</span>
                </div>
                <div class="inline-block" v-else>
                  &#45;&#45;
                </div>-->
              </div>
              <div class="flex flex-1 middle-font-size middle-font-color">
                呼出量(次)
              </div>
            </div>
            <div class="inline-block box border-right">
              <div class="flex flex-1 align-items-c ">
                <i class="icon iconfont icon-oc-transfer bigicon"></i>
                <span class="green money">{{ current.transferSuccess }}</span>
                <!--<div class="inline-block" v-if="indicant.dto1.sessionCountRate === true" >
                  <i class="iconfont {{ indicant.dto.session_count_rate >= 0 ? 'icon-oc-up' : 'icon-oc-down'}}"></i><span class='text-danger'>{{indicant.dto.session_count_rate}}%</span>
                </div>
                <div class="inline-block" v-else>
                  &#45;&#45;
                </div>-->
              </div>
              <div class="flex flex-1 middle-font-size middle-font-color">
                转接成功(次)
              </div>
            </div>
            <div class="inline-block box border-right">
              <div class="flex flex-1 align-items-c ">
                <i class="icon iconfont icon-oc-lineup bigicon"></i>
                <span class="green money">{{ current.formTime }}</span>
               <!-- <div class="inline-block" v-if="indicant.dto1.sessionTimeRate === true" >
                  <i class="iconfont {{ indicant.dto.session_time_rate >= 0 ? 'icon-oc-up' : 'icon-oc-down'}}"></i><span class='text-danger'>{{indicant.dto.session_time_rate}}%</span>
                </div>
                <div class="inline-block"  v-else>
                  &#45;&#45;
                </div>-->
                <!--  <i class="iconfont icon-oc-up"></i><span class='text-danger'>{{indicant.dto.session_time_rate}}%</span> -->
              </div>
              <div class="flex flex-1 middle-font-size middle-font-color">
                平均排队时长(秒)
              </div>
            </div>
            <div class="inline-block box border-right">
              <div class="flex flex-1 align-items-c ">
                <i class="icon iconfont icon-oc-talktime bigicon"></i>
                <span class="green money">{{ current.callTime }}</span>
               <!-- <div class="inline-block" v-if="indicant.dto1.avgSessionTimeRate === true" >
                  <i class="iconfont {{ indicant.dto.age_session_time >= 0 ? 'icon-oc-up' : 'icon-oc-down'}}"></i><span class='text-danger'>{{indicant.dto.age_session_time}}%</span>
                </div>
                <div class="inline-block"  v-else>
                  &#45;&#45;
                </div>-->
                <!-- <i class="iconfont icon-oc-up"></i><span class='text-danger'>{{indicant.dto.age_session_time_rate}}%</span> -->
              </div>
              <div class="flex flex-1 middle-font-size middle-font-color">
                平均通话时长(秒)
              </div>
            </div>
            <div class="inline-block box">
              <div class="flex flex-1 align-items-c ">
                <i class="icon iconfont icon-oc-wastage bigicon"></i>
                <span class="green money">{{ current.callFail }}</span>
               <!-- <div v-if="indicant.dto1.connectedRateRate === true" >
                  <i class="iconfont {{ indicant.dto.connected_rate_rate >= 0 ? 'icon-oc-up' : 'icon-oc-down'}}"></i><span class='text-danger'>{{indicant.dto.connected_rate_rate}}%</span>
                </div>
                <div class="inline-block"  v-else>
                  &#45;&#45;
                </div>-->
              </div>
              <div class="flex flex-1 middle-font-size middle-font-color">
                呼入流失率(%)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
               :type="['line','line']"
               :dateType="dateType"
               :label.sync="chartdate.type"
               :ydata1="calllist"
               :ydata2=""
               :title="['呼叫次数统计','']"
               :xtitle="['呼叫次数(次)','']"
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
               :type="['line','line']"
               :dateType="dateType"
               :label.sync="sessiondate.type"
               :ydata1="sessionlist"
               :ydata2=""
               :title="['通话时长统计','']"
               :xtitle="['通话时长(分钟)','']"
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
        'current':{
          callOut: 0,
          callFail: 0,
          transferSuccess: 0,
          callIn: 0,
          formTime:0,
          callTime: 0
        },
        'sessiondate':{
          type:'month',
          value:DATE.todayString('month')
        },
        'chartdate':{
          type:'month',
          value:DATE.todayString('month')
        },
        calllist:[],
        sessionlist:[],
        radioDates:'month',
        radioSessionDates:'month'
      }
    },
    components:{
      'datetime-picker' :require('ui/datetimepicker.vue'),
      'chart': require('ui/chart.vue'),
    },
    watch:{
      "serach.selectApp":function(){
        this.getCurrent()
        this.changeDate(this.radioDates)
        this.changeSessionDate(this.radioSessionDates)
      }
    },
    methods: {
      //获取应用
      getApp(){
        $.get('app/list/' + this.$route.params.uid, {serviceType: 'call_center'}).then((res) => {
          if (res.data.length > 0) {
            this.serach.apps = res.data
          }
          this.getCurrent()
          this.changeDate(this.radioDates)
          this.changeSessionDate(this.radioSessionDates)
        })
      },
      //获取本月数据
      getCurrent(){
        let params = {}
        if(this.serach.selectApp!='all'){
          params.appId = this.serach.selectApp
        }
        $.get('tenant/tenants/' + this.$route.params.uid+'/call_center/current', params).then((res) => {
          if (res.data!=null) {
            this.current = res.data
          }
        })
      },
      //呼叫次数统计
      doGetComsumeChart(){
        let params = { type:'amongCall',timeType:this.chartdate.type}
        if(this.chartdate.type == 'month'){
          params.time = this.chartdate.value.split('-')[0] +'-'+this.chartdate.value.split('-')[1] ;
        }else{
          params.time = this.chartdate.value.split('-')[0];
        }
        if (this.serach.selectApp != 'all') {
          params.appId = this.serach.selectApp
        }
        //GET /tenant/tenants/{id}/call_center
        $.get('/tenant/tenants/'+this.$route.params.uid+'/call_center',params).then((res) => {
          this.calllist = res.data[0]
        })
      },
      //呼叫次数统计
      changeDate(type){
        this.chartdate.type = type
        if(type=='month')
          this.chartdate.value = DATE.todayString('month')
        if(type=='year')
          this.chartdate.value = DATE.todayString('year')
        this.doGetComsumeChart()
      },
      //通话时长统计
      changeSessionDate(type){
        this.sessiondate.type = type
        if(type=='month'){
          this.sessiondate.value = DATE.todayString('month')
        }
        if(type=='year'){
          this.sessiondate.value = DATE.todayString('year')
        }
        this.doGetSessionChart()
      },
      //通话时长统计
      doGetSessionChart(){
        let params = { type:'amongCostTime',timeType:this.sessiondate.type}
        if (this.serach.selectApp != 'all') {
          params.appId = this.serach.selectApp
        }
        if(this.sessiondate.type == 'month'){
          params.time = this.sessiondate.value.split('-')[0] +'-'+this.sessiondate.value.split('-')[1] ;
        }else{
          params.time = this.sessiondate.value.split('-')[0]
        }
        let self = this
        $.get('/tenant/tenants/'+this.$route.params.uid+'/call_center',params).then((res) => {
          self.sessionlist = res.data[0]
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
