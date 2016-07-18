<template>
  <div>
    <router-view></router-view>
    <toaster :content.sync='message.content'></toaster>
  </div>
</template>
<script>
import toaster from './ui/toaster.vue'
import store from '../vuex/store'

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
