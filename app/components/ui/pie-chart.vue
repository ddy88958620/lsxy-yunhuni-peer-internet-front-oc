/**
*
这是查询的chart组件,还有一个实时chart组件
*
***/

<template>
	<canvas :class="[uuid]" height='100'></canvas>
</template>
<script>
	import Chart from 'chart.js';
	import chance from 'chance'

	export default {
		data(){
			return {
				class: '',
			}
		},
		props: {
			uuid: {
				require: true,
				type: String
			},
			label: {
				type: Array
			},
			color: {
				type: Array,
				default: ['#84e8e6', '#d5f5f1', '#fdf7c9', '#fdf7c9', '#e4f6c3','#fbd0b0']
			},
			title: {
				type: Array,
				default: ['线路1','线路2','线路3','线路4','线路5','线路6','线路7','线路8','线路9','线路10']
			}
		},
		methods: {

		},
		ready(){

			let self = this
			const ctx = document.querySelector("." + self.uuid).getContext('2d')
			new Chart(ctx, {
				type: 'pie',
				data: {
					labels:this.title,
					datasets: [
						{
							data: [300, 50, 100,100,200],
							backgroundColor:this.color,
							hoverBackgroundColor: this.color
						}]
				}
			});
			$(window).resize(function()
			{
				$('canvas').css('width','100%');
			});


		}
	}
</script>
