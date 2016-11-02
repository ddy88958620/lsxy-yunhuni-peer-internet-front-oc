<template>
	<div class="admin-table-header">
		<h4>新增线路</h4>
		<line-form v-ref:lineform class="margin-top-20"></line-form>
		<div class="admin-bottom admin-top">
			<button class="btn btn-primary" @click="newLine">创建</button>
			<button  class="btn btn-default admin-margin-l" v-link="'/admin/settings/line/list'">取消</button>
		</div>
	</div>
</template>
<script>
	import {showMsg} from 'actions'
	export default {
		vuex:{
			actions:{ showMsg }
		},
		components: {
			lineForm: require('./detail/form.vue')
		},
		methods: {
			newLine(){
				$.post('/config/line/new', this.$refs.lineform.postData).then((e)=>{
					if(e.errorMsg){
						this.showMsg({content: e.errorMsg, type: 'danger'})
						return
					}
					this.showMsg({content: '新建成功', type: 'success'})
					this.$route.router.go({name:'line'})
				})
			}
		}
	}
</script>
