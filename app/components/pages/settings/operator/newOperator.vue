<template>
	<div class="admin-table-header">
		<h4>新增角色</h4>
		<role-form></role-form>
		<div class="admin-bottom admin-top admin-form-submit">
			<button class="btn btn-primary" >创建</button>
			<button class="btn btn-default admin-margin-l" v-link="'/admin/settings/operator/list'">取消</button>
		</div>
	</div>
</template>
<script>
	import localStorage from 'localStorage'
	export default {
		components: {
			roleForm: require('./operatorForm.vue')
		},
		data(){
			return {
				
			}
		},
		ready(){
			let permission = {
				tenant: {
					see: true,
					operator: false
				}
			}
			localStorage.set('lsxyPermission', permission)
		}
	}
</script>