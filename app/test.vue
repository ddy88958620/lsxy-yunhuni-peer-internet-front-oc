<template>
  <div class="">
    {{msg}}
  </div>
</template>
<script>
import subjs from './sub'

export default {
  data(){
    return {msg: 'hello ,world'}
  },
  ready: () => {
    subjs()
  }
}
</script>
