<template>
  <div id="app-chart">
    <div class="app-chart-header">
      <input name='app-chart-type' type="radio" checked=checked/>日统计
      <input name='app-chart-type' type="radio"/>月统计
      <datetime-picker></datetime-picker>
    </div>
    <chart></chart>
  </div>
</template>

<script>

export default {
  data(){
    return {
    }
  },
  components: {
    'chart': require('../../../ui/chart.vue'),
    'datetime-picker': require('../../../ui/datetimepicker.vue')
  }
}
</script>
