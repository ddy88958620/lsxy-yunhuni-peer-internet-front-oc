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
</script>
<style lang='sass' scoped>

p{
  padding: 15px;
  width: 300px;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 30px;
  transform: translate(-50%, -50%);
}
</style>
