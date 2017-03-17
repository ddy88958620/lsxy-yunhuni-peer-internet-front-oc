
<template>
	<div>
		<div class="flex flex-direction-column admin-table-header">
			<h4>模板申请</h4>
			<div class="flex flex-1 admin-main-tab">
				<div class="tab inline-block"><a class="" v-link="{path:'/admin/demand/template/list/await',replace: true}">待审核</a></div>
				<div class="tab inline-block"><a class="" v-link="'/admin/demand/template/list/auditing'">审核已通过</a></div>
				<div class="tab inline-block"><a class=""  v-link="'/admin/demand/template/list/unauth'">审核不通过</a></div>
			</div>
		</div>
    <list-table></list-table>
	</div>
</template>
<script>
	export default {
    components: {
      'list-table': require('./table.vue'),
    },
	}
</script>
