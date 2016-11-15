<template>
	<form class="form-horizontal line_form" role="form">
		<div v-if="!$route.params.nid" class="form-group">
			<label class="control-label">计费项 : </label>
			<span>资源占用费</span>
		</div>
		<div v-if="!$route.params.nid" class="form-group">
			<label class="control-label">计费标识 : </label>
			<span>12313aac</span>
		</div>
		<div class="form-group">
			<label class="control-label">所属产品 : </label>
			<select v-if="!$route.params.nid" class="form-control" v-model='postData.lineId' >
				<option value=''>云呼叫中心</option>
				<option v-for="line in list.line" :value="line.id">{{ line.lineNumber }}</option>
			</select>
			<span v-else>{{ postData.line.lineNumber | fixNull }}</span>
		</div>
		<div class="form-group">
			<label class="control-label">价格(元) : </label>
			<input v-model="postData.telNumber" type="text" class="form-control" placeholder="">
		</div>
		<div class="form-group">
			<label class="control-label">计价单位 : </label>
			<select class="form-control" v-model='postData.operator' >
				<option value=''>请选择运营商</option>
				<option value='中国移动'>个</option>
				<option value='中国联通'>月</option>
				<option value='中国电信'>星期</option>
			</select>
		</div>
	</form>
</template>
<script>
	import vSelect from "vue-select"
	export default {
		vuex: {
			actions: {showMsg: require('actions').showMsg}
		},
		data(){
			return {
				search: false,
				postData: {
					amount: 0,
					areaCode: '',
					callUri: '',
					isCalled: '',
					isDialing: '',
					lineId: '',
					operator: '',
					telNumber: '',
					tenantId: '', // 所属租户
					type: '0',
				},
				list: {
					province: [],
					city: [],
					areaList: [],
					line: [],
					tenant: []
				},
				selected: {
					province: [],
					tenant: ''
				}
			}
		},
		components: {
			vSelect,
			'modal': require('ui/modal.vue'),
		},
		watch: {
			selected: {
				handler: function(e){
					this.postData.tenantId = this.selected.tenant ? this.selected.tenant.id : ''
				},
				deep: true
			},
			postData: {
				handler: function(e){
					console.log(this.postData.type === '0' && this.postData.lineId !== '')
				},
				deep: true
			}
		},
		methods: {
			fetchAreaList(){
				$.get('/config/area/list').then((e)=>{
					this.list.areaList = e.data
				})
			},
			fetchProvinceList(){
				$.get('/config/attribution/province/list').then((e)=>{
					this.list.province = e.data
				})
			},
			fetchCityList(province){
				$.get('/config/attribution/city/list/'+province).then((e)=>{
					this.list.city= e.data
				})
			},
			fetchLineList(){
				$.get('config/line/list').then((e)=> {
					this.list.line = e.data
				})
			},
			fetchTenant(){
				$.get('/tenant/list').then((e)=>{
					this.list.tenant = e.data
				})
			},
			numberBack(){
				$.put('config/telnum/release/'+this.$route.params.nid).then((e)=> {
					if(e.errorMsg){
						this.showMsg({content: e.errorMsg, type: 'danger'})
						return
					}
					this.showMsg({content: '修改成功', type: 'success'})
					this.$route.router.replace({name:'numberAll'})
				})
			}
		},
		ready(){
			this.fetchProvinceList()
			this.fetchLineList()
			this.fetchTenant()
		}
		
	}
</script>

<style lang="sass" rel="stylesheet/scss">
	.line_form {
		width: 907px;
		margin-left: 20px;
		$input-width: 300px;
		font-size: 1.4rem;
	
	.form-group {
		margin-bottom: 0;
	}
	
	.control-label {
		display: inline-block;
		width: 95px;
		margin: 10px 20px 10px 0px;
	}
	
	.form-control {
		width: $input-width;
		vertical-align: middle;
	}
	
	.input-width {
		display: inline-block;
		width: $input-width;
	}
	
	.sub_form_group {
		display: inline-block;
		vertical-align: text-top;
	}
	.radio-group {
		vertical-align: text-top;
		line-height: 25px;
	}
	}
	.v-select {
		.dropdown-toggle {
			border: none !important;
		}
		.selected-tag{
			background-color: #fff  !important;;
			border:none !important;;
			margin: 0 !important;;
		}
	}
</style>
