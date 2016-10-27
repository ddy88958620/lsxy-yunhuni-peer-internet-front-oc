<template>
	<div>
		<div class="admin-table-header">
			<h4>线路详情</h4>
			<div class="admin-main-tab">
				<div class="tab inline-block"><a class="" v-link="'/admin/settings/line/detail/'+$route.params.lid+'/base'">基础信息</a></div>
				<div class="tab inline-block"><a class="" v-link="'/admin/settings/line/detail/'+$route.params.lid+'/number'">线路配套号码</a></div>
				<div class="tab inline-block"><a class="" v-link="'/admin/settings/line/detail/'+$route.params.lid+'/tenant'">绑定租户信息</a></div>
			</div>
		</div>
		<div class="margin-top-20">
			<router-view></router-view>
		</divcl>
	</div>
</template>
<script>
	export default {
		ready(){}
	}
</script>
