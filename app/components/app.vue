<template>
  <div>
    <router-view keep-alive></router-view>
    <toaster :content.sync='message.content'></toaster>
  </div>
</template>
<script>
import toaster from './ui/toaster.vue'
import store from '../vuex/store'
import '../utils/fetch'

export default {
  store,
  vuex: {
    getters:{
      message: ({showmsg}) => showmsg.message
    }
  },
  components: {
    toaster
  }
}

</script>
<style lang='sass'>
@import '../scss/index.scss';

</style>
