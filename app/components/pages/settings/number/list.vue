<template>
	<div>
		<div class="admin-table-header">
			<h4>号码管理</h4>
			<div class="admin-main-tab">
				<div class="tab inline-block"><a class="" v-link="'/admin/settings/number/list/all'">号码列表</a></div>
				<div class="tab inline-block"><a class="" v-link="'/admin/settings/number/list/lock'">红黑名单</a></div>
			</div>
		</div>
		<div class="margin-top-20">
			<router-view></router-view>
		</div>
	</div>
</template>
