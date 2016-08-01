<template>
  <div class="section-four flex flex-1 admin-padding bg-section-margin whilebg  flex-direction-row">
    <div class="child-box flex flex-1 flex-direction-column padding-right-10">
      <div class="flex section-time-box">
        <a >上个月</a>
        <span>2016-08-1</span>
      </div>
      <div class="flex flex-1">
        <chart :uuid="'realtime-app-chart2'" :label="['1']" :color="['#ebeecc']" :title="['会话量统计','会话量（次）']"></chart>
      </div>
    </div>
    <div class="child-box flex flex-1 flex-direction-column padding-left-10">
      <div class="flex section-time-box">
        <a >本月</a>  <a >上一月</a> <a >上一月</a>
        <span>2016-08-1</span>
      </div>
      <div class="flex flex-1">
        <chart :uuid="'realtime-app-chart1'" :label="['1']" :color="['#e1a2a2']" :title="['API调用次数','次数(次)']"></chart>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    components:{
      'chart': require('../../../../ui/realtime-chart.vue')
    }
  }
</script>

<style lang="sass">
  .section-four{
    height: 300px;
  }
  .padding-left-10{
    padding-left: 10px;
  }
  .padding-right-10{
    padding-right: 10px;
  }

</style>
