<style scoped>
span {

}
</style>
<template>
  <input
    data-angleOffset=90
    data-linecap=round
    data-thickness="0.1"
    type="text"
    class="dial"
    data-width="100"
    data-height="100"
    data-min="0"
    data-max="2000"
    value="1534"/>
</template>

<script>
require('jquery-knob')

export default {
  computed: {
    angleOffset: {
      handle(){
        return
      }
    }
  },
  ready(){
    console.log('ready')
      $(".dial").knob({
        readOnly: true
      });
  }
}
</script>
