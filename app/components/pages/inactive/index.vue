<template>
	<div class="admin-padding">
		<div class="admin-table-header">
			<h4>未激活账户管理</h4>
			<div class="admin-main-tab">
				<div class="tab inline-block"><a class="" v-link="'/admin/inactive/wait'">待激活账号</a></div>
				<div class="tab inline-block"><a class="" v-link="'/admin/inactive/lose'">失效账号</a></div>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>
