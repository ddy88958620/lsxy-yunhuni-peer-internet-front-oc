<template>
	<div class="admin-table-header">
		<line-form class="margin-top-20"></line-form>
		<div class="admin-bottom admin-top">
			<button  class="btn btn-primary">保存</button>
			<button  class="btn btn-default admin-margin-l" v-link="'/admin/settings/number/list/all'">返回</button>
		</div>
	</div>
</template>
<script>
	
	export default {
		data(){
			return { }
		},
		components: {
			lineForm: require('./form.vue')
		},
		methods: {}
	}
</script>
