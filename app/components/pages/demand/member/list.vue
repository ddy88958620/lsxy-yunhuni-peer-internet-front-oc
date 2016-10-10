<style lang="sass" scoped>

</style>
<template>
	<div class="admin-table-header">
		<h4>会员认证审核</h4>
		<div class="admin-main-tab">
			<div class="tab inline-block"><a class="" v-link="'/admin/demand/member/list/await'">待审核</a></div>
			<div class="tab inline-block"><a class="" v-link="'/admin/demand/member/list/auditing'">审核已通过</a></div>
			<div class="tab inline-block"><a class="" v-link="'/admin/demand/member/list/unauth'">审核不通过</a></div>
		</div>
	</div>
	<router-view></router-view>
</template>
<script>
	export default {
		ready(){

		}
	}
</script>
