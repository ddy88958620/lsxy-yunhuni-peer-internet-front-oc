<template>

	<div class="flex flex-1 bg-section-margin">
		<div class="btn-group   tenant" role="group" >
			<button type="button" class="btn btn-default" v-link="'/admin/tenant/detail/'+$route.params.uid+'/statistic/consume'" >消费统计</button>
			<button type="button" class="btn btn-default" v-link="'/admin/tenant/detail/'+$route.params.uid+'/statistic/recharge'" >充值明细</button>
			<button type="button" class="btn btn-default" v-link="'/admin/tenant/detail/'+$route.params.uid+'/statistic/conversation'" >会话统计</button>
			<button type="button" class="btn btn-default" v-link="'/admin/tenant/detail/'+$route.params.uid+'/statistic/interface'" >API调用统计</button>
			<button type="button" class="btn btn-default" v-link="'/admin/tenant/detail/'+$route.params.uid+'/statistic/line'" >线路负载量</button>
		</div>
	</div>

	<router-view></router-view>

</template>

<script>
	export default{

	}
</script>

<style lang="sass" scoped>
	.tenant .v-link-active {
		background-color: #f6f6f6;
	}
</style>
