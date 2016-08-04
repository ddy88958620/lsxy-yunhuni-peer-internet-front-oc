<template>
	<div class="flex flex-direction-column bg-section-margin ">
		<div class="flex justify-content-b flex-wrap" >
			<single :messages="sigledata"></single>
		</div>
	</div>
</template>


<script>
	export default{
		components:{
			'single': require('./single.vue')
		},
		data(){
			return {
				sigledata:[
					['Hello world','123123','2016-06-06 16:30','13611460986','475647150@qq.com'],
					['通讯','飞飞语音','www.yunhuni.com'],
					['广东广州','天河区黄埔大道羊城创意园','020-86435555'],
					['公司','流水行云科技有限公司','广州天河','互联网通信','三证合一（一证一码）','135546546465546564465','']
				]
			}
		}
	}
</script>



<style lang="sass" scoped>

</style>

