<template>
    <section class='section_five bg-section-margin admin-padding'>
    <chart :uuid="'realtime-app-chart'" :label="['1']" :color="['#bde8ef']" :title="['实时并发量','并发量']"></chart>
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

.section_five {
  background-color: white;
}
</style>
