<template>
  <div>
    <router-view></router-view>
    <toast></toast>
  </div>
</template>
<script type="text/javascript">
import store from '../vuex/store'
import toast from './ui/toaster.vue'

export default {
  store,
  components: {
    toast
  }
}

</script>
