<template>
	<form class="form-horizontal line-form" role="form">
		<div class="form-group">
			<label class="control-label">线路标识 : </label>
			<input type="text" class="form-control" v-model="postData.lineNumber" placeholder="">
			<span class="text-danger">*</span>
		</div>
		<div class="form-group">
			<label class="control-label">运营商 : </label>
			<input type="checkbox" placeholder="" v-model="selected.operator" value="中国电信"> 电信 &nbsp;
			<input type="checkbox" placeholder="" v-model="selected.operator" value="中国移动"> 移动 &nbsp;
			<input type="checkbox" placeholder="" v-model="selected.operator" value="中国联通"> 联通 &nbsp;
			<span class="text-danger">*</span>
		</div>
		<div class="form-group">
			<label class="control-label">区域绑定 : </label>
			<select class="form-control" v-model="postData.areaId">
				<option value="">-- 请选区域 --</option>
				<option v-for="area in areaList" :value="area.id">{{ area.name}}</option>
			</select>
			<span class="text-danger">*</span>
		</div>
		<div class="form-group">
			<label class="control-label">归属地 : </label>
			<select class="form-control input-width-select" v-model="selected.province" @change="fetchCityList(selected.province)">
				<option value="">--省--</option>
				<option v-for="province in provinceList" :value="province">{{ province }}</option>
			</select>
			<select class="form-control input-width-select" v-model="postData.areaCode">
				<option value="">--市--</option>
				<option v-for="city in cityList" :value="city.areaCode">{{ city.city}}</option>
			</select>
			<span class="text-danger">*</span>
			<span v-if="postData.areaCode">当前区号: {{postData.areaCode}}</span>
		</div>
		<div class="form-group">
			<label class="control-label">呼入主叫前缀 : </label>
			<input type="text" class="form-control" placeholder="" v-model="postData.fromPrefix">
			呼入时，线路提供商在主叫号码前增加的前缀（选填）
		</div>
		<div class="form-group">
			<label class="control-label">线路类型 : </label>
			<div class="sub_form_group">
				<input type="radio" value="sip" v-model="postData.lineType"> SIP
				<div class="">
					<label class="control-label">IP+端口 : </label>
					<input type="text" class="form-control" placeholder="" v-model="postData.sipProviderIp">
					<span class="text-danger">*</span>
				</div>
				<div class="">
					<label class="control-label">域名+端口 : </label>
					<input type="text" class="form-control" placeholder="" v-model="postData.sipProviderDomain">
					<span class="text-danger">*</span>
				</div>
				<div class="">
					<label class="control-label">鉴权方式 : </label>
					<input type="radio" class="" placeholder="" v-model="postData.sipAuthType" value="1"> 用户名密码
					<input type="radio" class="" placeholder="" v-model="postData.sipAuthType" value="2"> IP地址
					<span class="text-danger">*</span>
				</div>
				<div class="" v-if="postData.sipAuthType === '1'">
					<label class="control-label">用户名 : </label>
					<input type="text" class="form-control" placeholder="" v-model="postData.sipAuthAccount">
					<span class="text-danger">*</span>
				</div>
				<div class="" v-if="postData.sipAuthType === '1'">
					<label class="control-label">密码 : </label>
					<input type="text" class="form-control" placeholder="" v-model="postData.sipAuthPassword">
					<span class="text-danger">*</span>
				</div>
				<div class="" v-if="postData.sipAuthType === '2'">
					<label class="control-label">IP : </label>
					<input type="text" class="form-control" placeholder="" v-model="postData.sipAuthIp">
					<span class="text-danger">*</span>
				</div>
			</div>
		</div>
		<div class="form-group">
			<label class="control-label">区号规则 : </label>
			<div class="sub_form_group">
				<div class="">
					<label class="control-label">手机 : </label>
					<div class="input-width radio-group">
						<input type="radio" class="" placeholder="" v-model="postData.mobileAreaRule" value="0">全部加0 <br/>
						<input type="radio" class="" placeholder="" v-model="postData.mobileAreaRule" value="1">全部不加0 <br/>
						<input type="radio" class="" placeholder="" v-model="postData.mobileAreaRule" value="2">被叫归属地与线路归属地不一致，加0
					</div>
					<span class="text-danger">*</span>
				</div>
				<div class="">
					<label class="control-label">固话 : </label>
					<div class="input-width radio-group">
						<input type="radio" class="" placeholder="" v-model="postData.telAreaRule" value="0">一律加区号 <br/>
						<input type="radio" class="" placeholder="" v-model="postData.telAreaRule" value="2">非与线路属于同一个归属地加区号
					</div>
					<span class="text-danger">*</span>
				</div>
			</div>
		</div>
		<div class="form-group">
			<label class="control-label">成本价 : </label>
			<input type="" class="form-control" placeholder="" v-model="postData.linePrice">
			元/分钟
			<span class="text-danger">*</span>
		</div>
		<div class="form-group">
			<label class="control-label">支持透传 : </label>
			<input type="radio" class="" placeholder="" v-model="postData.isThrough" value="1"> 是
			<input type="radio" class="" placeholder="" v-model="postData.isThrough" value="0"> 否
			<span class="text-danger">*</span>
		</div>

		<div class="form-group">
			<label class="control-label">质量 : </label>
			<div class="input-width">
				<slider :value.sync="postData.quality" :min="1" :max="5" :step="1" :uuid="'quality'"></slider>
			</div>
			&nbsp; {{ postData.quality }}
			<span class="text-danger">*</span>
		</div>
<!--	<div class="form-group">
			<label class="control-label">质量 : </label>
			<div class="input-width">
				<slider :value.sync="postData.quality" :min="1" :max="5" :step="1"></slider>.
			</div>
			&nbsp; {{ postData.quality }}
			<span class="text-danger">*</span>
		</div>-->
		<div class="form-group">
			<label class="control-label">并发容量 : </label>
			<input type="text" class="form-control" placeholder="" v-model="postData.capacity">
			并发容量为线路同一时间内能够容纳的最多的在线通话数量（范围：1~1000）
			<span class="text-danger">*</span>
		</div>
	</form>
</template>
<script>
	export default {
		props: {
			formValue: {},
		},
		data(){
			return {
				postData: {
					lineNumber: '', // 线路标识
					operator: '', // 运营商
					areaId: '', // 区域编号, 区域绑定
					areaCode: '', // 归属地区号
					fromPrefix: '', // 呼入主叫前缀
					lineType: 'sip', // 线路类型
					sipProviderIp: '', // ip + 端口
					sipProviderDomain: '', // domain + 端口
					sipAuthType: '1', // 鉴权
					sipAuthAccount: '', // 鉴权账号
					sipAuthPassword: '', // 鉴权密码
					sipAuthIp: '', // ip地址
					telAreaRule: 2, // 固话罪有应得区号规则 0 一律加 1一律不 2 非
					mobileAreaRule: 2, // 手机, 同上
					linePrice: 0, // 成本价
					isThrough: 0, // 是否透传
					quality: 1,  // 质量
					capacity: 100, // 并发容量
				},
				areaList: [],
				provinceList: [],
				cityList: [],
				selected: {
					province: '',
					operator: []
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
		methods: {
			fetchAreaList(){
				$.get('/config/area/list').then((e)=>{
					this.areaList = e.data
				})
			},
			fetchProvinceList(){
				$.get('/config/attribution/province/list').then((e)=>{
					this.provinceList = e.data
				})
			},
			fetchCityList(province){
				$.get('/config/attribution/city/list/'+province).then((e)=>{
					this.cityList = e.data
					this.postData.areaCode = e.data[0].areaCode
				})
			}
		},
		components: {
			slider: require('ui/slider.vue'),
		},
		ready(){
			console.log(this.$route.params.lid)

			console.log(this.$refs)

			this.fetchAreaList()
			this.fetchProvinceList()
/*			//编辑状态
			if(this.$route.params.lid){
				console.log(this.postData)
			}*/

		}
	}
</script>
