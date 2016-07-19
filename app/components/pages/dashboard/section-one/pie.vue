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
    data-fgColor='#89d9e3'
    data-width="80"
    data-height="80"
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
