<template>
	<!--新增线路号码-->
	<modal :show.sync="show" title="新增线路号码" :action="newNumber">
		<div slot="body">
			<div class="form-group">
				<label class="control-label">新增号码 : </label>
				<input type="text" class="form-control input-width" placeholder="" v-model="postData.number.telNumber">
			</div>
			<br/>
			<div class="form-group">
				<label class='datetime-picker-label control-label'>运营商 : </label>
				<select class="form-control middle input-width" v-model='postData.number.operator'>
					<option value=''>选择运营商</option>
					<option value='中国移动'>中国移动</option>
					<option value="中国联通">中国联通</option>
					<option value="中国电信">中国电信</option>
				</select>
			</div>
			<br/>
			<div class="form-group">
				<label class="control-label">归属地 : </label>
				<select class="form-control input-width-select" v-model="selected.province" @change="fetchCityList(selected.province)">
					<option value="">--省--</option>
					<option v-for="province in list.province" :value="province">{{ province }}</option>
				</select>
				<select class="form-control input-width-select" v-model="postData.number.areaCode">
					<option value="">--市--</option>
					<option v-for="city in list.city" :value="city.areaCode">{{ city.city}}</option>
				</select>
			</div>
			<br/>
			<div class="form-group">
				<label class="control-label">呼叫URI : </label>
				<input type="text" class="form-control input-width" placeholder="" v-model="postData.number.callUri">
			</div>
			<br/>
			<div class="form-group">
				<label class="control-label">资源占用费 : </label>
				<input type="text" class="form-control input-width" placeholder="" v-model="postData.number.amount">
			</div>
			<br/>
			<p class="text-danger">*每个号码的使用费需要手动配置*</p>
			<input type="checkbox" v-model="postData.number.isDialing" :true-value="1" :false-value="0" > 可主叫
			<input type="checkbox" v-model="postData.number.isCalled" :true-value="1" :false-value="0"> 可被叫
		</div>
	</modal>

</template>
<script>
	export default {
		vuex:{
			actions: {
				showMsg: require('actions').showMsg
			}
		},
		data(){
			return {
				show: false,
				postData: {
					number: {
						amount: '', // 号码占用费
						areaCode: '', // 归属地区号
						callUri: '', //呼出URI
						isCalled: '', // 可被叫 1 是 0 否
						isDialing: '', // 可主叫 1 ，0
						operator: '', // 运营商
						telNumber: '', //号码
					}
				},
				originData: {
					
				},
				selected: {
					province: '',
					operator: []
				},
				list: {
					province: [],
					city: []
				}
			}
		},
		watch: {
			selected: {
				handler: function(e){
					this.postData.operator = e.operator.join(',')
				},
				deep: true
			}
		},
		components: {
			'modal': require('ui/modal.vue'),
		},
		methods: {
			newNumber(){
				$.post('/config/line/telnum/new/'+this.$route.params.lid, this.postData.number).then((e)=>{
					if(e.errorMsg){
						this.showMsg({content: e.errorMsg, type: 'danger'})
						return
					}
					this.showMsg({content: '新建成功', type: 'success'})
					this.$route.router.replace({name: 'telnum', query: {t: new Date()}})
					this.show = false
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
			}
		},
		ready(){
			this.fetchProvinceList()
		}
	}
</script>
