<template>

  <div class="flex flex-1 flex-direction-column section-right whilebg admin-padding admin-border">
    <div class="app-chart-header flex align-items-c">
      <input name='app-chart-type' type="radio" checked=checked/>
      <label for="">日统计</label>
      <input name='app-chart-type' type="radio"/>
      <label for="">月统计</label>
      <div class="datepicker-wrap">
        <datetime-picker></datetime-picker>
      </div>
    </div>
    <div class="flex-1">
      <chart :uuid="'dashboard-st3-chart'" :type="['line','bar']"
             :title="['会话量','消费额']"
             :color="[['rgba(246,239,232,0.2)','rgba(251,54,45,0.8)','rgba(251,54,45,0.8)','#FFF','rgba(251,54,45,0.8)','rgba(220,220,220,1)'],
                    ['#ebeecc','rgba(214,235,78,0.8)','rgba(214,235,78,1)','#FFF','rgba(214,235,78,0.1)','rgba(220,220,220,0.1)']]"
      ></chart>
    </div>
  </div>

  <div class="flex flex-1 flex-direction-column whilebg admin-padding admin-border bg-section-margin">
    <div class="app-chart-header flex align-items-c">
      <input name='app-chart-type' type="radio" checked=checked/>
      <label for="">日统计</label>
      <input name='app-chart-type' type="radio"/>
      <label for="">月统计</label>
      <div class="datepicker-wrap">
        <datetime-picker></datetime-picker>
      </div>
    </div>
    <chart2 :uuid="'realtime-app-chart2'" :label="['1']" :color="['#deef70']" :title="['会画量统计','会话量(次)']"></chart2>
  </div>
</template>
<style>

</style>
<script>
  export default{
    components:{
      'datetime-picker' :require('../../../../ui/datetimepicker.vue'),
      'chart': require('../../../../ui/chart.vue'),
      'chart2':require('../../../../ui/realtime-chart.vue')
    }
  }
</script>
