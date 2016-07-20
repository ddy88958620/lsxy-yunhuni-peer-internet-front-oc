<template>
  <div class="app-main-content">
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

.app-main-content {
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: column;

  .app-main-left {
    width: 200px;
    padding: 0px;
    list-style: none;
    margin-bottom: 0;
    background-color: #EAEDF1;
  }
  .app-main-right {
    flex: 1;
  }
}

.app-main-left {

  a {
    color: #333;
    font-size: 1rem;
    width: 100%;
    display: inline-block;
    text-align: center;
    line-height: 1;
    padding: 15px;
  }

  a.v-link-active {
    background-color: white;
  }

}


</style>
