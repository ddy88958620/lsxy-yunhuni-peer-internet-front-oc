<template>

  <a >
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
  </a>



	
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
        default: 0
      },
      max: {
        type: Number,
	      default: 0 },
      value: {
        type: Number,
        default: 0
      },
      bgcolor: {
        type: String,
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
    		this.initPie()
	    }
    },
	  methods: {
    	initPie(){
		    let that = this
		    if(this.pie){
		    	this.pie.trigger('change')
		    	return
		    }
		    this.pie = $("."+that.uuid).knob({
			    'readOnly': true,
			    'min': that.min,
			    'max': that.max,
			    'fgColor': that.bgcolor
		    });
	    }
	  },
	  ready(){
		  if( this.max !== 0) {
			  this.initPie()
		  }


/*
      $('.unclick').on('click', function(event) {
          console.log(event.preventDefault())
         
      })
*/
    

	  }
  }
</script>

<style lang="sass" scoped>
  .dial{
    font-size: 20px !important;
  }



</style>
