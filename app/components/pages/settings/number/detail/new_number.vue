<template>
	<div class="admin-table-header">
		<h4>新增号码</h4>
		<div class="alert alert-success" role="alert">
			1、租户自带的号码不需要租户支付号码月租费和资源占用费。<br/>
			2、采购线路需要租户支付号码月租费和资源占用费。
		</div>
		<line-form class="margin-top-20"></line-form>
		<div class="admin-bottom admin-top">
			<button  class="btn btn-primary">创建</button>
			<button  class="btn btn-default admin-margin-l" v-link="'/admin/settings/number/list/all'">取消</button>
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
