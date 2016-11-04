<template>
	<div>
		<line-form v-ref:line></line-form>
		<div class="admin-bottom admin-top">
			<button  class="btn btn-primary" @click="save">保存</button>
			<button  class="btn btn-default admin-margin-l" v-link="{name: 'line'}">取消</button>
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
			lineForm: require('./form.vue')
		},
		methods: {
			query(){
				let line = this.$refs.line
				$.get('config/line/detail/'+this.$route.params.lid).then((e)=>{
					line.postData = e.data
					line.selected.operator = e.data.operator.split(',')
					line.selected.areaCode = ''
				})
			},
			save(){
				$.put('config/line/edit/'+this.$route.params.lid, this.$refs.line.postData).then((e)=>{
					if(e.errorMsg){
						this.showMsg({content: e.errorMsg, type: 'danger'})
						return
					}
					this.showMsg({content: '修改成功', type: 'success'})
					this.$route.router.go({name:'line'})
				})
			}
		},
		ready(){
			this.query()
		}
	}
</script>
