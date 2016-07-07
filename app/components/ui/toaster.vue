<template>
    <p v-if="message.content !== ''" 
      class="bg-success">
      {{message.content}}
    </p>
</template>
<script type="text/javascript">
import {showMsg,hideMsg} from '../../vuex/actions'

export default {
  vuex: {
    getters: {
     message: ({showmsg}) => showmsg.message
    },
    actions: {
      showMsg,
      hideMsg
    }
  },
}
</script><`2`>
<style lang='stylus' scoped>
@import '../../stylus/mixin'

p
  padding: 15px
  width: 300px
  text-align: center
  center()

</style>
