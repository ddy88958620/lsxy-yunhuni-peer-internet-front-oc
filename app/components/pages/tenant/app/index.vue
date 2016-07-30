<template>
	<div class="flex flex-direction-column bg-section-margin">
		<div class="flex justify-content-b flex-wrap" >
			<single-one-app
				:appdata="singledata"
			></single-one-app>
		</div>
	</div>
</template>
<script>
	export default {
		components: {
			'singleOneApp': require('./single.vue')
		},
		data(){
			return{
				singledata:[
					{
						name:'流行行云',
						status:0,
						img:'',
						appid:'8a2bc7f666028155915613413444',
						introduce:'这是一个即时通信APP，主要为企业提供高效便捷的交流方式，最简单实用的办公软件，提升工作效率，减低沟通成本，做世界一流的企业应用',
						consume:0,
						conversation:210,
						traffic:120
					},
					{
						name:'银泰通信',
						status:0,
						img:'',
						appid:'8a2bc7f666028155915613413444',
						introduce:'这是一个即时通信APP，主要为企业提供高效便捷的交流方式',
						consume:0,
						conversation:210,
						traffic:120
					},
					{
						name:'飞飞语音',
						status:1,
						img:'',
						appid:'8a2bc7f666028155915613413444',
						introduce:'',
						consume:0,
						conversation:210,
						traffic:120
					},
					{
						name:'飞飞语音',
						status:1,
						img:'',
						appid:'8a2bc7f666028155915613413444',
						introduce:'',
						consume:0,
						conversation:210,
						traffic:120
					}
				]
			}
		},
		ready(){

		}
	}
</script>
