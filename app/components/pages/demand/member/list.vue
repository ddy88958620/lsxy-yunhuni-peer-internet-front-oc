<style lang="sass" scoped>

</style>
<template>
	<div class="flex flex-direction-column admin-table-header">
		<h4>会员认证审核</h4>
		<div class="flex flex-1 admin-main-tab">
			<div class="tab"><a class="flex" v-link="'/admin/demand/member/list/await'">待审核</a></div>
			<div class="tab"><a class="flex" v-link="'/admin/demand/member/list/auditing'">审核已通过</a></div>
			<div class="tab"><a class="flex" v-link="'/admin/demand/member/list/unauth'">审核不通过</a></div>
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
