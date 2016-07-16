<template>
  <div class="app-main-content">
    <!-- <ul class='app&#45;main&#45;left'> -->
    <!--   <li> -->
    <!--     <a v&#45;link="'/admin/dashboard/a'">a</a></li> -->
    <!--   <li><a v&#45;link="'/admin/dashboard/b'">b</a></li> -->
    <!-- </ul> -->

    <section class='flex flex-1 section_one'>
      <member></member>
      <app></app>
    </section>


    <router-view></router-view>
 </div>
</template>
<script>
import member from './components/member.vue'
import app from './components/app.vue'

export default {
  components: {
    member,
    app
  }
}
</script>
<style lang='sass'>

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
  height: 20rem;
}


</style>
