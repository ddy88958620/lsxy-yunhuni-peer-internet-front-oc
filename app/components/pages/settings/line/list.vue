<template>
	<div>
		<div class="admin-table-header">
			<h4>线路管理</h4>
			<div class="admin-main-tab">
				<div class="tab inline-block"><a class="" v-link="'/admin/settings/line/list/all'">线路注册列表</a></div>
				<div class="tab inline-block"><a class="" v-link="'/admin/settings/line/list/global'">全局线路队列</a></div>
			</div>
		</div>
		<div class="margin-top-20">
			<router-view></router-view>
		</div>
	</div>
</template>
