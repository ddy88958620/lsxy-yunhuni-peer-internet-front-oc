<template>
  <div id="app-chart">
    <div class="app-chart-header flex align-items-c">
      <input name='app-chart-type' type="radio" checked=checked/>
      <label for="">日统计</label>
      <input name='app-chart-type' type="radio"/>
      <label for="">月统计</label>
      <div class="datepicker-wrap">
        <datetime-picker></datetime-picker>
      </div>
    </div>
    <chart :uuid="'bashboard-app-chart'":type="['line','line']"></chart>
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
<style lang='sass' scoped>

.app-chart-header {
  input {
    margin: 0px;
  }

  label {
    margin-bottom: 0px;
    font-weight: 300;
    padding-right: 10px;
  }

  .datepicker-wrap {
    padding-left: 15px;
  }
}


</style>
