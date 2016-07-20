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
  flex-direction: row;
  display: flex;
  .app-main {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: $admin-padding;
    background-color: #EFF5FA;
  }
}

</style>
