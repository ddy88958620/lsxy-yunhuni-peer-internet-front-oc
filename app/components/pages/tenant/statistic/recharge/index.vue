<template>
    <div class="flex flex-1">
        <chart :uuid="'realtime-app-chart1'" :label="['1']" :color="['#deef70']" :title="['充值统计','充值额(元)']"></chart>
    </div>

    <admin-table></admin-table>


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
