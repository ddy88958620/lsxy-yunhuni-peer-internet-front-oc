<template>
    <section class='section_five'>
    <chart :uuid="'realtime-app-chart'" :label="['1']"></chart>
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
