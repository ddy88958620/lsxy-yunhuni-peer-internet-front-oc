<template>
	<div class="flex flex-direction-column bg-section-margin">
		<div class="flex justify-content-b flex-wrap">
			<single-one-app
				:appdata="singledata"
			></single-one-app>
		</div>
	</div>
</template>

<script>
	export default{
		components: {
			'singleOneApp': require('./single.vue')
		},
		data(){
			return{
				singledata:[]
			}
		},
		ready(){
			var self = this;
			$.get('/tenant/tenants/'+this.$route.params.uid+'/apps').then((res)=> {
				return res.data && (self.singledata = res.data);
			})
		}

	}
</script>

<style lang="sass" scoped>
	.single-box{
		width: 49%;
		margin-bottom: 20px;
	}
	.header-box{
		padding: 20px;
		background-color:#97a1be;
	.name{
		margin-top: 10px;
	}
	}
	.main-box{
		height: 183px;
		width: 100%;
		padding: 10px 0;
	}
	.data-box{
		padding-left: 20px;
	}
	.money{
		font-size: 2.6rem;
	}
</style>