<template>
  <section class='dashboard-section_one bg-section-margin no-wrap'>
    <member></member>
    <app></app>
  </section>
</template>

<script>

export default {
  components: {
    "member": require('./member.vue'),
    "app": require('./app.vue'),
  }
}

</script>

<style lang="sass">
  .dashboard-section_one{
    font-size: 1.4rem;
    color:#666;
  }

  .pie_wrap {
    padding: 15px;
    width: 125px;
    padding-right: 0px;
  }


</style>