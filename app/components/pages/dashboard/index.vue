<template>
  <div class="app-main-content">
    <!-- <ul class='app&#45;main&#45;left'> -->
    <!--   <li> -->
    <!--     <a v&#45;link="'/admin/dashboard/a'">a</a></li> -->
    <!--   <li><a v&#45;link="'/admin/dashboard/b'">b</a></li> -->
    <!-- </ul> -->

    <section class='flex section_one bg-section-margin'>
      <member></member>
      <app></app>
    </section>
    <section class='section_two'>
      <app-chart-line></app-chart-line>
    </section>


    <router-view></router-view>
 </div>
</template>
<script>
import member from './components/member.vue'
import app from './components/app.vue'
import appChartLine from './components/appChartLine.vue'

export default {
  components: {
    member,
    app,
    appChartLine
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

.section_one {
}

.section_two {
  background-color: white;
}


</style>
