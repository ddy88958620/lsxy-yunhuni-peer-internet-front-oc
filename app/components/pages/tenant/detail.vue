<template>
	<div class="admin-padding">
		<div class="flex flex-1 admin-main-tab">
			<div class="tab"><a class="flex"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/preview'">会员总览</a></div>
			<div class="tab"><a class="flex"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/base'">基础信息</a></div>
			<div class="tab"><a class="flex"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/app'">应用信息</a></div>
			<div class="tab"><a class="flex"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/statistic'">统计信息</a></div>
			<div class="tab"><a class="flex"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session'">会话详单</a></div>
			<div class="tab"><a class="flex"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/switch'">功能开关</a></div>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
	export default {
		route: {
			data(){
				
			}
		}
	}
</script>