<template>
	<div>
		<input
			data-angleOffset="360"
			data-linecap="round"
			data-rotation="anticlockwise"
			data-thickness="0.1"
			type="text"
			class="dial"
			data-fgColor="{{ bgcolor }}"
			data-width="100"
			data-height="100"
			data-max="{{ max }}"
			data-min="{{ min }}"
			v-model="value"
		/>
	</div>
</template>

<script>
  require('jquery-knob')
  export default {
    props: {
      min: {
        type: Number,
        twoWays: true,
        default: 0
      },
      max: {
        type: Number,
        twoWays: true
      },
      value: {
        type: Number,
        twoWays: true,
        default: 50
      },
      bgcolor: {
        defualt:'#89d9e3'
      },
      height: {
        type: Number,
        default:80
      },
      weight: {
        type: Number,
        defualt: 80
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
      console.log('pie')
    }
  }
</script>


<style lang="sass" scoped>
  .dial{
    font-size: 20px !important;
  }
</style>
