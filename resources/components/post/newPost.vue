<style>
</style>
<template>
  <div>
    {{ msg }}
    <input type="text" v-model='msg'/>
    <button @click=' show = !show'>click! </button>
    <p v-if='show'> {{ msg }}</p>
  </div>
</template>
<script>

export default {
  data: function(){
    return {
      msg: 'hello world',
      show: false 
    }
  },

}
</script>
