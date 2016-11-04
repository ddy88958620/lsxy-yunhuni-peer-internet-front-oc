<template>
	<div class="admin-table-header">
		<line-form v-ref:edit class="margin-top-20"></line-form>
		<div class="admin-bottom admin-top">
			<button  class="btn btn-primary" @click="save">保存</button>
			<button  class="btn btn-default admin-margin-l" v-link="'/admin/settings/number/list/all'">返回</button>
		</div>
	</div>
</template>
<script>
	
	export default {
		data(){
			return { }
		},
		vuex: {
			actions: {showMsg: require('actions').showMsg}
		},
		components: {
			lineForm: require('./form.vue')
		},
		methods: {
			fetch(){
				$.get('config/telnum/detail/'+this.$route.params.nid).then((e)=>{
					if(e.errorMsg){
						this.showMsg({content: e.errorMsg, type: 'danger'})
						return
					}
					this.$refs.edit.postData = e.data
					this.$refs.edit.selected.tenant = e.data.tenant
				})
			},
			save(){
				$.put('config/telnum/edit/'+this.$route.params.nid, this.$refs.edit.postData).then((e)=> {
					if(e.errorMsg){
						this.showMsg({content: e.errorMsg, type: 'danger'})
						return
					}
					this.showMsg({content: '修改成功', type: 'success'})
					this.$route.router.go({name:'numberAll'})
				})
			},
			
		},
		ready(){
			this.fetch()
		}
	}
</script>
