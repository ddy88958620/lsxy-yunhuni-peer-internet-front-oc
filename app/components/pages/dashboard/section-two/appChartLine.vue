<template>
  <div id="app-chart">
    <div class="app-chart-header flex align-items-c">
      <input name='app-chart-type' type="radio" checked=checked/>
      <label for="">日统计</label>
      <input name='app-chart-type' type="radio"/>
      <label for="">月统计</label>
      <div class="datepicker-wrap">
        <datetime-picker :uuid='date'></datetime-picker>
      </div>
    </div>
    <chart :uuid="'bashboard-app-chart'" :type="['line','line']"
           :title="['新增注册会员','新增应用']"
           :xtitle="['会员数(个)','应用数(个)']"
           :color="[['rgba(246,239,232,0.8)','rgba(251,54,45,0.8)','rgba(251,54,45,0.8)','#FFF','rgba(251,54,45,0.8)','rgba(220,220,220,1)'],
                    ['rgba(247,249,242,0.4)','rgba(214,235,78,0.8)','rgba(214,235,78,1)','#FFF','rgba(214,235,78,0.1)','rgba(220,220,220,0.1)']]"
    ></chart>
  </div>
</template>

<script>
  import {getNewMemberAndApp} from '../../../../vuex/actions.js' 

  export default {
    vuex:{
      getter: {

      },
      actions: {
        getNewMemberAndApp
      }
    },
    data(){
      return {
      }
    },
    components: {
      'chart': require('../../../ui/chart.vue'),
      'datetime-picker': require('../../../ui/datetimepicker.vue')
    },
    ready(){
      this.getNewMemberAndApp({year:'2016',month:'06'})
    }

  }
</script>
<style lang='sass' scoped>
</style>
