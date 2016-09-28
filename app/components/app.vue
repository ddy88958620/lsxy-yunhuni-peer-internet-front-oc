<template>
  <div>
    <router-view keep-alive></router-view>
    <toaster :show.sync="message.show" :content='message.content' :type="message.type" :title="message.title"></toaster>
  </div>
</template>
<script>
import toaster from './ui/toaster.vue'
import store from '../vuex/store'
import '../utils/fetch'
import '../assets/js/zoom.js'
require('es6-promise').polyfill()

export default {
  store,
  vuex: {
    getters:{
      message: ({showmsg}) => showmsg.message
    }
  },
  components: {
    toaster
  },
	ready(){
  }
}

</script>
<style lang='sass'>
@import '../scss/index.scss';

</style>
