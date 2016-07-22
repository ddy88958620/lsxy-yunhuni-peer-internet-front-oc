<template>
  <section class='flex section_one bg-section-margin'>
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

<style lang="sass" scoped>
  .section_one{

  }

</style>