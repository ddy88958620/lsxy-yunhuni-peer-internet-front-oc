<template>
	<div>
		<input
			data-angleOffset="360"
			data-linecap="round"
			data-rotation="anticlockwise"
			data-thickness="0.1"
			type="text"
			class="{{uuid}}"
			data-width="100"
			data-height="100"
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
        twoWays: true,
	      default: 0 },
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
    watch: {
    	max: function(state, old) {
        console.log('watch')
    		this.initPie()
	    }
    },
	  methods: {
    	initPie(){
		    let that = this
		    $("."+that.uuid).knob({
			    'readOnly': true,
			    'min': that.min,
			    'max': that.max,
			    'fgColor': that.bgcolor
		    });
	    }
	  },
	  ready(){
		  if(this.max !== 0){
			  this.initPie()
		  }
	  }
  }
</script>


<style lang="sass">
  .dial{
    font-size: 20px !important;
  }
</style>
