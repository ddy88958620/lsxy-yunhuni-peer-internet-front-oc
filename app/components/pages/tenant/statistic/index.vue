<template>
	<div class="flex flex-1 bg-section-margin">
		<div class="admin-toolbar flex normal-font-size small-font-color cursor" >
			<span class="toolbar first-toolbar" v-link="'/admin/tenant/detail/'+$route.params.uid+'/statistic/consume'" >消费统计</span>
			<span class="toolbar" v-link="'/admin/tenant/detail/'+$route.params.uid+'/statistic/recharge'" >充值明细</span>
			<span class="toolbar" v-link="'/admin/tenant/detail/'+$route.params.uid+'/statistic/conversation'" >会话统计</span>
			<span class="toolbar" v-link="'/admin/tenant/detail/'+$route.params.uid+'/statistic/interface'" >API调用统计</span>
			<span class="toolbar remove-border-right last-toolbar" v-link="'/admin/tenant/detail/'+$route.params.uid+'/statistic/line'" >线路负载量</span>
		</div>
	</div>
	<router-view></router-view>
</template>

<script>
	export default{}
</script>


