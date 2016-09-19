<template>
  <div id="topbox">
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
<style lang='sass'>
@import '../../scss/variable.scss';

#topbox {
  flex: 1;
  flex-direction: row;
  display: flex;
  .app-main {
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: #EFF5FA;
  }
}

</style>
