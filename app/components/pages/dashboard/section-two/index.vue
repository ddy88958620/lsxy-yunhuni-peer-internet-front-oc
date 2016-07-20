<template>
    <section class='section_two admin-padding'>
      <app-chart-line></app-chart-line>
    </section>
</template>
<script>
export default {
  components: {
    'app-chart-line': require('./appChartLine.vue')
  }
}
</script>

<style>

.section_two {
  background-color: white;
}
</style>
