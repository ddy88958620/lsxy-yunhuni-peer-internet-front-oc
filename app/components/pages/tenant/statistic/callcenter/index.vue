<template>
  <section class='section-data-box flex bg-section-margin flex-direction-column justify-content-s '>
    <div class="panel panel-default flex-1">
      <div class="panel-heading">本月数据 <a class="float-r" v-link="'/admin/tenant/detail/'+$route.params.uid+'/statistic/'+this.$route.params.aid+'/calldetail/calldetail'">查看明细</a></div>
      <div class="panel-body flex flex-1">
        <div class="no-wrap">
          <div class="inline-block box border-right">
            <div class="flex flex-1 align-items-c ">
              <i class="icon iconfont icon-oc-wallet bigicon"></i>
              <span class="green money">{{ indicant.dto.cost_coin >0 ? indicant.dto.cost_coin.toFixed(2) : '0.00' }}</span>
              <div class="inline-block" v-if="indicant.dto1.costCoin === true" >
                <i class="iconfont {{ indicant.dto.cost_coin_rate >= 0 ? 'icon-oc-up' : 'icon-oc-down'}}"></i><span class='text-danger'>{{indicant.dto.cost_coin_rate}}%</span>
              </div>
              <div class="inline-block" v-else>
                --
              </div>
            </div>
            <div class="flex flex-1 middle-font-size middle-font-color">
              呼入量(次)
            </div>
          </div>
          <div class="inline-block box border-right">
            <div class="flex flex-1 align-items-c ">
              <i class="icon iconfont icon-oc-recharge bigicon"></i>
              <span class="green money">{{ indicant.dto.recharge_coin >0 ? indicant.dto.recharge_coin.toFixed(2) : '0.00' }}</span>

              <div class="inline-block" v-if="indicant.dto1.rechargeCoinRate === true" >
                <i class="iconfont {{ indicant.dto.recharge_coin_rate >= 0 ? 'icon-oc-up' : 'icon-oc-down'}}"></i><span class='text-danger'>{{indicant.dto.recharge_coin_rate}}%</span>
              </div>
              <div class="inline-block" v-else>
                --
              </div>
            </div>
            <div class="flex flex-1 middle-font-size middle-font-color">
              呼出量(次)
            </div>
          </div>
          <div class="inline-block box border-right">
            <div class="flex flex-1 align-items-c ">
              <i class="icon iconfont icon-oc-msg1 bigicon"></i>
              <span class="green money">{{ indicant.dto.session_count }}</span>
              <div class="inline-block" v-if="indicant.dto1.sessionCountRate === true" >
                <i class="iconfont {{ indicant.dto.session_count_rate >= 0 ? 'icon-oc-up' : 'icon-oc-down'}}"></i><span class='text-danger'>{{indicant.dto.session_count_rate}}%</span>
              </div>
              <div class="inline-block" v-else>
                --
              </div>
            </div>
            <div class="flex flex-1 middle-font-size middle-font-color">
              转接成功(次)
            </div>
          </div>
          <div class="inline-block box border-right">
            <div class="flex flex-1 align-items-c ">
              <i class="icon iconfont icon-oc-mobile bigicon"></i>
              <span class="green money">{{ indicant.dto.session_time }}</span>
              <div class="inline-block" v-if="indicant.dto1.sessionTimeRate === true" >
                <i class="iconfont {{ indicant.dto.session_time_rate >= 0 ? 'icon-oc-up' : 'icon-oc-down'}}"></i><span class='text-danger'>{{indicant.dto.session_time_rate}}%</span>
              </div>
              <div class="inline-block"  v-else>
                --
              </div>
              <!--  <i class="iconfont icon-oc-up"></i><span class='text-danger'>{{indicant.dto.session_time_rate}}%</span> -->
            </div>
            <div class="flex flex-1 middle-font-size middle-font-color">
              平均排队时长(秒)
            </div>
          </div>
          <div class="inline-block box border-right">
            <div class="flex flex-1 align-items-c ">
              <i class="icon iconfont icon-oc-talktime bigicon"></i>
              <span class="green money">{{ indicant.dto.age_session_time }}</span>
              <div class="inline-block" v-if="indicant.dto1.avgSessionTimeRate === true" >
                <i class="iconfont {{ indicant.dto.age_session_time >= 0 ? 'icon-oc-up' : 'icon-oc-down'}}"></i><span class='text-danger'>{{indicant.dto.age_session_time}}%</span>
              </div>
              <div class="inline-block"  v-else>
                --
              </div>
              <!-- <i class="iconfont icon-oc-up"></i><span class='text-danger'>{{indicant.dto.age_session_time_rate}}%</span> -->
            </div>
            <div class="flex flex-1 middle-font-size middle-font-color">
              平均通话时长(秒)
            </div>
          </div>
          <div class="inline-block box">
            <div class="flex flex-1 align-items-c ">
              <i class="icon iconfont icon-oc-callrate bigicon"></i>
              <span class="green money">{{ indicant.dto.connected_rate }}</span>
              <div v-if="indicant.dto1.connectedRateRate === true" >
                <i class="iconfont {{ indicant.dto.connected_rate_rate >= 0 ? 'icon-oc-up' : 'icon-oc-down'}}"></i><span class='text-danger'>{{indicant.dto.connected_rate_rate}}%</span>
              </div>
              <div class="inline-block"  v-else>
                --
              </div>
            </div>
            <div class="flex flex-1 middle-font-size middle-font-color">
              呼入流失率(%)
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

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
           :ydata2=""
           :title="['呼叫次数统计','']"
           :xtitle="['呼叫次数(次)','']"
           :color="[['rgba(246,239,232,0.2)','rgba(251,54,45,0.8)','rgba(251,54,45,0.8)','#FFF','rgba(251,54,45,0.8)','rgba(220,220,220,1)'],
                    ['#ebeecc','rgba(214,235,78,0.8)','rgba(214,235,78,1)','#FFF','rgba(214,235,78,0.1)','rgba(220,220,220,0.1)']]"
        ></chart>
     
    </div>
  </div>


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
           :title="['通话时长统计','']"
           :xtitle="['通话时长（分钟','']"
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
        sessionlist:[],
        radioDates:'month',
        radioSessionDates:'month'
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
       
        if(this.chartdate.type == 'month'){
          params.year = this.chartdate.value.split('-')[0]
          params.month = this.chartdate.value.split('-')[1]
        }else{
          params.year = this.chartdate.value.split('-')[0]
        }

        let appId =  this.$route.params.aid 
        if(appId!='all'){
          params.appId = appId
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
        let appId =  this.$route.params.aid 
        if(appId!='all'){
          params.appId = appId
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
         this.changeDate(this.radioDates)
         this.changeSessionDate(this.radioSessionDates)
       }
    }
  }
</script>
