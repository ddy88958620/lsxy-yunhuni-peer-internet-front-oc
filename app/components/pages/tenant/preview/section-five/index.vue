<template>
  <div class="section-five admin-padding admin-border bg-section-margin whilebg  flex flex-1">
      <chart :uuid="'realtime-app-chart3'" :label="['']" :color="['#76dcd8']" :title="['实时线路情况','占用线路（线）']"></chart>
  </div>
</template>

<script>
  export default{
    components:{
      'chart': require('../../../../ui/realtime-chart.vue')
    }
  }
</script>



<style lang="sass" scoped>

</style>


