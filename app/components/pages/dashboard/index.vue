<template>
  <div class="app-main-content admin-padding flex-direction-column">
    <!-- <ul class='app&#45;main&#45;left'> -->
    <!--   <li> -->
    <!--     <a v&#45;link="'/admin/dashboard/a'">a</a></li> -->
    <!--   <li><a v&#45;link="'/admin/dashboard/b'">b</a></li> -->
    <!-- </ul> -->

    <section-one></section-one>
    <section-two></section-two>
    <section-three></section-three>
    <section-four></section-four>
    <section-five></section-five>
    <section-six></section-six>
    <router-view></router-view>
 </div>
</template>
<script>
export default {
  components: {
    'section-one': require('./section-one/index.vue'),
    'section-two': require('./section-two/index.vue'),
    'section-three': require('./section-three/index.vue'),
    'section-four': require('./section-four/index.vue'),
    'section-five': require('./section-five/index.vue'),
    'section-six': require('./section-six/index.vue'),
  }
}
</script>
<style lang='sass'>
@import '../../../scss/layout.scss';

</style>
