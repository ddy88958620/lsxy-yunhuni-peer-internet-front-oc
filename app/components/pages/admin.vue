<template>
  <div id="topbox">
    <headerbar></headerbar>
    <asidebar></asidebar>
    <section class='app-main'>
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

.app-main {
  margin-left: $sidebar-width;
}

</style>
