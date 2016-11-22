<template>
	<input id="{{uuid}}" type="text" data-slider-min="{{ min }}" data-slider-max="{{ max }}" data-slider-step="{{ step }}"
				 data-slider-id='ex1Slider'
				 data-slider-value="{{ realValue }}"
				 data-slider-tooltip="hide"
				 v-model="realValue"
	/>
</template>

<script>
	import Slider  from 'bootstrap-slider';
	export default {
		props:{
			uuid:{
				type:String,
				require: true,
			},
			min: {
				type: Number,
				default: 0
			},
			max: {
				type: Number,
				default: 1
			},
			step:{
				type: Number,
				default : 1
			},
			value: {
				type: Number,
				default: 0,
				twoWays: true
			},
		},
		data () {
			return {
				realValue: this.value
			}
		},
		watch: {
			realValue(){
				this.value = parseInt(this.realValue)
			},
			value(){
				this.initSlider()
			}
		},
		methods: {
			initSlider(){
				if(this.slider){
					this.slider.setValue(this.value)
					return
				}
				const options = {
					formatter: function(value) {
						return 'Current value: ' + value;
					}
				}

				this.slider = new Slider('#'+this.uuid,options)

			}
		},
		ready(){
			this.initSlider()
		}
	}
</script>

<style lang="sass" rel="stylesheet/scss">
	@import '~bootstrap-slider/src/sass/bootstrap-slider.scss';
	.slider.slider-horizontal { width: 100%;}
</style>
