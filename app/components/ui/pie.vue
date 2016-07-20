<style scoped>
</style>
<template>
  <input
    data-angleOffset="-90"
    data-linecap="round"
    data-thickness="0.1"
    type="text"
    class="dial"
    data-fgColor='{{ bgcolor }}'
    data-width="80"
    data-height="80"
    data-max="{{ max }}"
    data-min="{{ min }}"
    value="{{ value }}"/>
</template>

<script>
  require('jquery-knob')
  export default {
    props: {
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      value: {
        type: Number,
        default: 50
      },
      bgcolor: {
        type:String,
        defualt:'#89d9e3'
      },
      height: {
        type: String,
        default:'80'
      },
      weight: {
        type:String,
        defualt:'80'
      }
    },
    computed: {
      angleOffset(){
        return parseInt(this.value)/parseInt(this.max)*360
      }
    },
    ready(){
      $(".dial").knob({
        readOnly: true
      });
    }
  }
</script>
