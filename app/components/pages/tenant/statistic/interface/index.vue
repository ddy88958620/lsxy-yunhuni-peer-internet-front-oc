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
    <div class="flex flex-1 flex-direction-column admin-padding admin-border bg-section-margin whilebg ">
      <div class="app-chart-header flex align-items-c">
        <input name='app-chart-type' @click="changeDate('month')" type="radio" value="month" v-model="radioDates"
               checked=checked/>
        <label for="">日统计</label>
        <input name='app-chart-type' @click="changeDate('year')" type="radio" value="year" v-model="radioDates"/>
        <label for="">月统计 </label>
        <div class="datepicker-wrap inline-block">
          <datetime-picker :uuid="'datetimepicker1'" :action="chartApiQuery" :type.sync="date.type"
                           :value.sync="date.value"></datetime-picker>
        </div>
      </div>
      <div class="flex-1">
        <chart
          :uuid="'sectionThreeChart1'"
          :type="['line','line']"
          :label.sync="date.type"
          :ydata1.sync="chartApiValue"
          :title="['API调用', '']"
          :xtitle="['API调用(次数)','']"
          :color="[['rgba(246,239,232,0.2)','rgba(251,54,45,0.8)','rgba(251,54,45,0.8)','#FFF','rgba(251,54,45,0.8)','rgba(220,220,220,1)'],
											['#ebeecc','rgba(214,235,78,0.8)','rgba(214,235,78,1)','#FFF','rgba(214,235,78,0.1)','rgba(220,220,220,0.1)']]"
        ></chart>
      </div>
    </div>
    <div class="flex-flex-1 bg-section-margin">
      <admin-table :value.sync="chartApiValue" :date.sync='date.value'></admin-table>
    </div>
  </div>
</template>
<style lang="sass" scoped>

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
        chartApiValue: [],
        date: {
          type: 'month',
          value: DATE.todayString('month'),
        },
        radioDates: 'month',
      }
    },
    components: {
      'chart': require('ui/chart.vue'),
      'admin-table': require('./table.vue'),
      'datetime-picker': require('ui/datetimepicker.vue')
    },
    watch: {
      'serach.selectApp': function () {
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
          this.changeDate(this.radioDates)
        })
      },
      changeDate(type){
        let self = this
        self.date.type = type
        if (type == 'year') {
          this.chartApiQuery(DATE.todayString('year'))
          this.date.value = DATE.todayString('year')
        }
        if (type === 'month') {
          this.chartApiQuery(DATE.todayString('month'))
          this.date.value = DATE.todayString('month')
        }
      },
      chartApiQuery(date){
        let datetime = date ? date : this.date.value
        let params = DATE.dateParse(datetime)
        if (this.serach.selectApp != 'all') {
          params.appId = this.serach.selectApp
        }
        $.get('/tenant/tenants/' + this.$route.params.uid + '/interfaceInvoke/statistic', params).then((res)=> {
          this.chartApiValue = res.data
        })
      }
    },
    route: {
      data(){
        this.getApp()
      }
    }
  }
</script>
