<template>
	<div class="admin-table-header">
		<h4>新增号码</h4>
		<div class="alert alert-success" role="alert">
			1、租户自带的号码不需要租户支付号码月租费和资源占用费。<br/>
			2、采购线路需要租户支付号码月租费和资源占用费。
		</div>
		<line-form v-ref:new class="margin-top-20"></line-form>
		<div class="admin-bottom admin-top">
			<button class="btn btn-primary" @click="new">创建</button>
			<button class="btn btn-default admin-margin-l" v-link="'/admin/settings/number/list/all'">取消</button>
		</div>
	</div>
</template>
<script>
	
	export default {
		vuex: {
			actions: {showMsg: require('actions').showMsg}
		},
		data(){
			return {
				list: { }
			}
		},
		components: {
			lineForm: require('./form.vue')
		},
		methods: {
			new(){
				$.post('config/telnum/new', this.$refs.new.postData).then((e)=> {
					if(e.errorMsg){
						this.showMsg({content: e.errorMsg, type: 'danger'})
						return
					}
					this.showMsg({content: '新建成功', type: 'success'})
					this.$route.router.go({name:'numberAll'})
				})
			},
		}
	}
</script>
