<template>
	<div>
		<input
			data-angleOffset="360"
			data-linecap="round"
			data-rotation="anticlockwise"
			data-thickness="0.1"
			type="text"
			class="{{uuid}}"
			data-fgColor="{{ bgcolor }}"
			data-width="100"
			data-height="100"
			data-max="{{max}}"
			data-min="{{min}}"
			v-model="value"
		/>
	</div>
</template>

<script>
  require('jquery-knob')
  export default {
    props: {
      uuid: {
        type: String,
      },
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
        type: String,
        twoWays: true,
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
     
    },
    ready(){
      let that = this
      $("."+that.uuid).knob({
        'readOnly': true,
        'min': that.min,
        'max': that.max,
        'value': that.value,
        'fgColor': that.bgcolor
      });
    }
  }
</script>


<style lang="sass">
  .dial{
    font-size: 20px !important;
  }
</style>
