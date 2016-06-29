<template>
  <div id="topbox">
    <headerbar></headerbar>
    <asidebar></asidebar>
    <section class='app-main'>
      <div class="container">
        <router-view
          class=''
          transition='fade'
          transition-mode='out-in'
          keep-live>
        </router-view>
      </div>
    </section>
    <footerbar></footerbar>
  </div>
</template>
<script>
import headerbar from './layout/header.vue'
import footerbar from './layout/footer.vue'
import asidebar from './layout/aside.vue'

export default {
  components: {
    headerbar,
    footerbar,
    asidebar
  }
}
</script>
