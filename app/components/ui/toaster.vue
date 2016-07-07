<template>
    <p v-if="content !== ''" 
      class="bg-success">
      {{content}}
    </p>
</template>
<script type="text/javascript">

export default {
  props: {
    type: {
      type: String,
      default: 'bg-success'
    },
    content: {
      type: String,
      default: '',
      twoWays: true
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
