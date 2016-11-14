<template>
	<form class="form-horizontal line_form" role="form">
		<div v-if="!$route.params.nid" class="form-group">
			<label class="control-label">号码来源 : </label>
			<input type="radio" class="" placeholder="" value="0" v-model="postData.type"> 租户自带
			<input type="radio" class="" placeholder="" value="1" v-model="postData.type"> 采购线路
		</div>
		<div v-else class="form-group">
			<label class="control-label">号码来源 : </label>
			<span>{{ postData.type === '0' ? '租户自带' : '采购线路'}}</span>
		</div>
		<!--<div class="form-group" v-if="numberType!==1">-->
			<!--<label class="control-label">所属租户 : </label>-->
			<!--<input type="text" class="form-control" placeholder="" v-model="selected.tenant.tenantName">-->
		<!--</div>-->
		<div class="form-group">
			<label class="control-label">所属租户 : </label>
			<!--<input type="text" class="form-control" placeholder="" v-model="selected.tenant.tenantName">-->
			<v-select v-if="!postData.tenant" class="form-control" :value.sync="selected.tenant" :label.sync="'tenantName'"  :options="list.tenant"></v-select>
			<span v-else>{{ postData.tenant.tenantName }}</span>
			<button v-if="postData.tenant" @click.prevent="$refs.number.show = true" class="btn btn-primary">号码回收</button>
		</div>
		<div class="form-group">
			<label class="control-label">归属线路 : </label>
			<select v-if="!$route.params.nid" class="form-control" v-model='postData.lineId' >
				<option value=''>请选择线路</option>
				<option v-for="line in list.line" :value="line.id">{{ line.lineNumber }}</option>
			</select>
			<span v-else>{{ postData.line.lineNumber | fixNull }}</span>
		</div>
		<!-- 新建线路对应 postData.lineId ,  号码详情对应 postData.line, 不存在 lineId  -->
		<div class="form-group" v-if="postData.lineId !== ''">
			<label class="control-label">号码属性 : </label>
			<input type="checkbox" :disabled="$route.params.nid" v-model="postData.isDialing" :true-value="'1'" :false-value="'0'"> 可主叫
			<input type="checkbox" :disabled="$route.params.nid"  v-model="postData.isCalled" :true-value="'1'" :false-value="'0'"> 可被叫
		</div>
		<div class="form-group">
			<label class="control-label">运营商 : </label>
			<select class="form-control" v-model='postData.operator' >
				<option value=''>请选择运营商</option>
				<option value='中国移动'>中国移动</option>
				<option value='中国联通'>中国联通</option>
				<option value='中国电信'>中国电信</option>
			</select>
			<span class="text-danger">*</span>
		</div>
		<div class="form-group">
			<label class="control-label">归属地 : </label>
			<select class="form-control input-width-select" v-model="selected.province" @change="fetchCityList(selected.province)">
				<option value="">--省--</option>
				<option v-for="province in list.province" :value="province">{{ province }}</option>
			</select>
			<select class="form-control input-width-select" v-model="postData.areaCode">
				<option value="">--市--</option>
				<option v-for="city in list.city" :value="city.areaCode">{{ city.city}}</option>
			</select>
			<span v-if="postData.areaCode">当前区号: {{postData.areaCode}}</span>
			<span class="text-danger">*</span>
		</div>
		<div class="form-group">
			<label class="control-label">呼出URI : </label>
			<input type="text" class="form-control" v-model="postData.callUri" placeholder="">
			作主叫呼出号码时使用
			<span class="text-danger">*</span>
		</div>
		<div class="form-group">
			<label class="control-label">真实号码 : </label>
			<input v-model="postData.telNumber" type="text" class="form-control" placeholder="">
			呼出时作为来电显示，呼入时作为被叫号码
			<span class="text-danger">*</span>
		</div>
		<div class="form-group" v-if="postData.type==='1'">
			<label class="control-label">号码占用费 : </label>
			<input v-model="postData.amount" type="text" class="form-control" placeholder="">
			元
			<span class="text-danger">*</span>
		</div>
		<modal v-ref:number title="提示" :action="numberBack">
			<div slot="body">
				<div>
					请确认回收号码！
				</div>
			</div>
		</modal>
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
