<template>
	<input :class="classObject" type="range" :min="min" v-model="value" :max="max" :step="step" :name="name"
	       :orient="vertical && 'vertical'" :disabled="disabled" number>
</template>

<script>
	export default {
		props: {
			min: {
				type: Number,
				default: 0
			},
			max: {
				type: Number,
				default: 1
			},
			step: {
				type: Number,
				default: 0.01
			},
			value: {
				type: Number,
				default: 0,
				twoWays: true
			},
			type: String,
			name: String,
			size: String,
			isFullwidth: Boolean,
			disabled: Boolean,
			// orientation:
			vertical: Boolean
		},
		data () {
			return {
				realValue: this.value
			}
		},
		mounted () {
			this.$el.style.setProperty('--low', this.low)
			this.$el.style.setProperty('--high', this.high)
		},
		watch: {
			realValue (val) {
				this.$el.style.setProperty('--high', this.high)
				this.$emit('change', val)
			},
			value (val) {
				this.realValue = val
				return val
			}
		},
		computed: {
			low () {
				return '0%'
			},
			high () {
				return this.realValue / this.max * 100 + '%'
			},
			classObject () {
				const {type, size, isFullwidth} = this
				return {
					slider: true,
					[`is-${type}`]: type,
					[`is-${size}`]: size,
					'is-fullwidth': isFullwidth
				}
			}
		}
	}
</script>

<style lang="sass" rel="stylesheet/scss">
	input[type=range].slider {
		$radius: 290486px;
		--height: 8px;
		&.is-small {
			--height: 4px;
		}
		&.is-medium {
			--height: 12px;
		}
		&.is-large {
			--height: 16px;
		}
		&.is-fullwidth {
			width: 100%;
		}
		border: none;
		border-radius: $radius;
		display: block;
		height: var(--height);
		padding: 0;
		margin: 0;
		cursor: pointer;
		outline: none;
		-webkit-tap-highlight-color: transparent;
		&:focus {
			outline: none;
		}
		&::-moz-focus-outer {
			border: none;
		}
		&::-webkit-slider-runnable-track,
		&::-webkit-slider-thumb,
		& {
			appearance: none;
		}
		@mixin thumb-base() {
			border-radius: 50%;
			height: calc(var(--height) * 2.33);
			width: calc(var(--height) * 2.33);
			background-color: #FFF;
			// border: calc(var(--height) / 2) solid $text;
			box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1);
			transform: translateZ(0);
			transition: (0.233s / 2) ease-in-out;
			box-sizing: border-box;
			&:hover {
				transform: scale(1.25);
			}
		}
		@mixin thumb-base-active {
			cursor: grabbing;
		}
		@mixin track {
			display: flex;
			align-items: center;
			height: var(--height);
			border-radius: $radius;
			// --track-background: linear-gradient(to right, transparent var(--low), $text calc(0%), $text var(--high), transparent calc(0%)) no-repeat 0 100%;
			background: var(--track-background);
			transform: translateZ(0);
			transition: (0.233s / 2);
		}
		&::-webkit-slider-thumb {
			@include thumb-base();
			&:active {
				@include thumb-base-active();
			}
		}
		&::-webkit-slider-runnable-track {
			@include track();
		}
		&::-moz-range-thumb {
			@include thumb-base();
			&:active {
				@include thumb-base-active();
			}
		}
		&::-moz-range-progress:focus {
			outline: 0;
			border: 0;
		}
		&::-moz-range-track {
			background: transparent;
		}
		&::-moz-range-progress {
			display: flex;
			align-items: center;
			width: 100%;
			height: var(--height);
			border-radius: $radius;
			// background-color: $text;
		}
		&::-ms-thumb {
			@include thumb-base();
			&:active {
				@include thumb-base-active();
			}
		}
		&::-ms-tooltip {
			display: none;
		}
		// Colors
		&[orient=vertical] {
			writing-mode: bt-lr;
			// IE
			-webkit-appearance: slider-vertical;
			// webkit
			height: 200px;
			width: var(--height);
			-webkit-transform-origin: 0 0;
			position: relative;
			top: 0;
			left: 0;
			// Colors
		}
	}
</style>