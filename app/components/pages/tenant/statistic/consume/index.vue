
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
    <!--表格-->
    <div class="admin-panel admin-border">
      <div class="panel-heading ofh">
        <span class="inline-block admin-label">消费月结账单</span>
        <span class="float-r">
				<datetime-picker :uuid="'consumeDate'" :action="doGetComsume" :type.sync="consumedate.type"
                         :value.sync="consumedate.value"></datetime-picker>
			</span>
      </div>
      <div class="admin-table flex flex-1">
        <table class="table remove-border ">
          <tr v-for="list in comsumelist">
            <td>{{list.type}}</td>
            <td>{{list.amongAmount}}</td>
          </tr>
        </table>
      </div>
    </div>
    <!--图表-->
    <div class="flex flex-1 flex-direction-column whilebg admin-padding admin-border">
      <div class="app-chart-header flex align-items-c">
        <input name='app-chart-type' @click="changeDate('month')" type="radio" value="month" v-model="radioDates"
               checked=checked/>
        <label for="">日统计</label>
        <input name='app-chart-type' @click="changeDate('year')" type="radio" value="year" v-model="radioDates"/>
        <label for="">月统计</label>
        <div class="datepicker-wrap inline-block">
          <datetime-picker :uuid="'consumeChartDate'" :action="doGetComsumeChart" :type.sync="chartdate.type"
                           :value.sync="chartdate.value"></datetime-picker>
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
    </div>
  </div>


</template>

<script>
  import DATE from '../../../../../utils/date'
  export default{
    data(){
      return {
        serach: {
          apps: [],
          selectApp: 'all',
        },
        'consumedate': {
          type: 'month',
          value: DATE.todayString('month')
        },
        'chartdate': {
          type: 'month',
          value: DATE.todayString('month')
        },
        comsumelist: [],
        chart: [],
        radioDates: 'month'
      }
    },
    components: {
      'datetime-picker': require('ui/datetimepicker.vue'),
      'chart': require('ui/chart.vue')
    },
    watch: {
      'serach.selectApp': function () {
        this.doGetComsume()
        this.changeDate(this.radioDates)
      }
    },
    methods: {
      //获取应用
      getApp(){
        $.get('app/list/' + this.$route.params.uid, {serviceType: ''}).then((res) => {
          if (res.data.length > 0) {
            this.serach.apps = res.data
          }
          this.doGetComsume()
          this.changeDate(this.radioDates)
        })
      },
      //获取消费统计额度
      doGetComsumeChart(){
        let params = {}
        let self = this
        let appid = this.$route.params.aid
        if (this.chartdate.type == 'month') {
          params.year = this.chartdate.value.split('-')[0]
          params.month = this.chartdate.value.split('-')[1]
        } else {
          params.year = this.chartdate.value.split('-')[0]
        }
        if (this.serach.selectApp != 'all') {
          params.appId = self.serach.selectApp
        }
        $.get('tenant/tenants/' + this.$route.params.uid + '/consume/statistic', params).then((res) => {
          self.chart = res.data
        })
      },
      changeDate(type){
        let self = this
        self.chartdate.type = type
        if (type == 'month') {
          self.chartdate.value = DATE.todayString('month')
        }
        if (type == 'year') {
          self.chartdate.value = DATE.todayString('year')
        }
        this.doGetComsumeChart()
      },
      //获取月结账单
      doGetComsume(){
        let params = {}
        let self = this
        if (this.serach.selectApp != 'all') {
          params.appId = self.serach.selectApp
        }
        if (this.consumedate.value == '') {
          this.comsumelist = []
          return
        }
        params.month = this.consumedate.value
        $.get('tenant/tenants/' + this.$route.params.uid + '/consume_month', params).then((res) => {
          self.comsumelist = res.data
        })
      },

    },
    route: {
      data(){
        this.getApp()
      }
    }
  }
</script>
<style lang="sass" scoped>
  .admin-panel {
    .admin-label {
      line-height: 34px;
    }
  }
</style>
