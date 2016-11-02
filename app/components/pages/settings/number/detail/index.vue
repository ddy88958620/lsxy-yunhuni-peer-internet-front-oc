<template>
	<div>
		<div class="admin-table-header">
			<h4>号码详情</h4>
			<div class="admin-main-tab">
				<div class="tab inline-block"><a class="" v-link="'/admin/settings/number/detail/'+$route.params.nid+'/base'">基础信息</a></div>
				<div class="tab inline-block"><a class="" v-link="'/admin/settings/number/detail/'+$route.params.nid+'/relate'">关联线路</a></div>
			</div>
		</div>
		<div class="margin-top-20">
			<router-view></router-view>
			</divcl>
		</div>
</template>
