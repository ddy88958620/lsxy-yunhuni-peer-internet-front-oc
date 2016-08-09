<template>

  <div class="headbox flex flex-1 align-items-c ">
    <span class="padding-right-20">选择应用</span>
    <select class="form-control flex selcet-box">
      <option value="">全部</option>
      <option value="">飞飞应用</option>
    </select>
  </div>


  <div class="flex flex-1 admin-padding admin-border bg-section-margin whilebg ">
    <chart :uuid="'realtime-app-chart1'" :label="['']" :color="['#deef70']" :title="['API调用次数统计','次数(次)']"></chart>
  </div>
  <div class="flex-flex-1 bg-section-margin">
    <admin-table></admin-table>
  </div>
</template>
<style lang="sass" scoped>

</style>
<script>
  export default{
    components:{
      'chart': require('../../../../ui/realtime-chart.vue'),
      'admin-table': require('./table.vue')
    }
  }
</script>
