<template>
  <div id="topbox">
    <headerbar></headerbar>
    <section class='app-main'>
        <asidebar></asidebar>
        <router-view
          class=''
          transition='fade'
          transition-mode='out-in'
          keep-live>
        </router-view>
    </section>
    <footerbar></footerbar>
  </div>
</template>
<script>
import headerbar from '../layout/header.vue'
import footerbar from '../layout/footer.vue'
import asidebar from '../layout/aside.vue'

export default {
  components: {
    headerbar,
    footerbar,
    asidebar
  }
}
</script>
<style lang='sass'>
@import '../../scss/index.scss';

#topbox {
  flex: 1;
  flex-direction: column;
  display: flex;

  .app-main {
    display: flex;
    flex: 1;
  }

}

.app-main-content {
  display: flex;
  flex: 1;
  height: 100%;

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


</style>
