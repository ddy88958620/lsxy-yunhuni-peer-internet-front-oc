<template>
  <div id="topbox" class="height-100">
    <asidebar></asidebar>
    <section class='app-main'>
        <headerbar></headerbar>
        <router-view
          class=''
          transition='fade'
          transition-mode='out-in'
          keep-live>
        </router-view>
    </section>
    <!-- <footerbar></footerbar> -->
  </div>
</template>
<script>
import headerbar from '../layout/header.vue'
import footerbar from '../layout/footer.vue'
import asidebar from '../layout/aside.vue'
import {getMessageNum} from '../../vuex/actions.js'

export default {
  vuex:{
    actions:{
      getMessageNum
    }
  },
  components: {
    headerbar,
    footerbar,
    asidebar
  },
  route: {
    data(){
      this.getMessageNum()
      if(this.$route.query.init === 'login') this.$route.router.go({name:'dashboard'})
    }
  }
}
</script>
<style lang='scss' rel='stylesheet/sass'>
@import '../../scss/variable.scss';

#topbox {
 height: auto !important;
  position: absolute;
  min-height: 100%;
  width: 100%;
}
.app-main {
       margin-left: $sidebar-width;
       margin-top: 60px;
}
</style>
