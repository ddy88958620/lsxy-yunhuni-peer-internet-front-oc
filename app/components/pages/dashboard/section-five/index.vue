<template>
    <section class='section_five bg-section-margin admin-padding admin-border'>
    <div class="flex flex-1 justify-content-e">
        <button class="btn btn-primary ">刷新</button>
    </div>
    <chart :uuid="'realtime-app-chart'" :label="['']" :color="['#bde8ef']" :title="['实时并发量','并发量']"></chart>
    </section>
</template>
<script>
export default {
  components: {
    'chart': require('../../../ui/realtime-chart.vue'),
  },
  
}
</script>

<style>

.section_five {
  background-color: white;
}
</style>
