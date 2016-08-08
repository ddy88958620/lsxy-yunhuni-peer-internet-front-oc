<template>
  <div class="flex flex-1 admin-padding admin-border bg-section-margin whilebg ">
    <chart :uuid="'realtime-app-chart1'" :label="['1']" :color="['#deef70']" :title="['API调用次数统计','次数(次)']"></chart>
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
