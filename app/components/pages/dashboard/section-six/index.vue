<template>
    <!-- 区负荷量 -->
    <section class='section_six bg-section-margin admin-padding'>
      <chart :uuid="'realtime-area-chart'" :label="['1区','2区','3区']"></chart>
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
