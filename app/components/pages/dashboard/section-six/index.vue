<template>
    <!-- 区负荷量 -->
    <section class='section_six bg-section-margin admin-padding'>
      <chart :uuid="'realtime-area-chart'" :title="['实时负荷量','负荷量']" :label="['1区','2区','3区']" :color="['#f5f7c6','#f8c0a9','#bde8ef']"></chart>
    </section>
</template>
<script>
export default {
  components: {
    'chart': require('../../../ui/realtime-chart.vue'),
  }
}
</script>

<style>

.section_six {
  background-color: white;
}
</style>
