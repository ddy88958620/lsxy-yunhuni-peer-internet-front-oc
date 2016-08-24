<template>

	<div class="flex flex-1 bg-section-margin ">
		<div class="flex flex-1 padding-right-10">
			<div class="flex flex-1" >
				<div class="panel panel-base flex flex-direction-column flex-1">
					<div class="panel-heading panel-base-heading flex flex-1 justify-content-b"><span class="flex">基础信息</span><a @click="showModal=true" >密码重置</a></div>
					<div class="panel-body admin-bg flex-1">
						<ul class="list-none-style">
							<li>会员名称:{{info.tenantName}}</li>
							<li>账号:{{info.userName}}</li>
							<li>注册时间:{{info.createTime | totalDate}}</li>
							<li>绑定手机号:{{info.mobile}}</li>
							<li>邮箱绑定:{{info.email}}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-1 padding-left-10">
			<div class="flex flex-1" >
				<div class="panel panel-base flex flex-direction-column flex-1">
					<div class="panel-heading panel-base-heading">业务信息</div>
					<div class="panel-body admin-bg flex-1">
						<ul class="list-none-style">
							<li>所属行业: {{info.industry}}</li>
							<li>主营业务: {{info.business}}</li>
							<li>网站: {{info.url}}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="flex flex-1 bg-section-margin ">
		<div class="flex flex-1 padding-right-10">
			<div class="flex flex-1" >
				<div class="panel panel-base flex flex-direction-column flex-1">
					<div class="panel-heading panel-base-heading ">联系信息</div>
					<div class="panel-body admin-bg flex-1">
						<ul class="list-none-style">
							<li>所在地区: {{info.province}}{{info.city}}</li>
							<li>通讯地址: {{info.address}}</li>
							<li>联系号码: {{info.phone}}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-1 padding-left-10">
			<div class="flex flex-1" >
				<div class="panel panel-base flex flex-direction-column flex-1">
					<div class="panel-heading panel-base-heading">认证信息</div>
					<div class="panel-body admin-bg flex-1">
						<ul class="list-none-style">
							<li>认证状态:
								<span class="text-danger padding-right-10" >{{authinfo.status}}</span> <a class="btn btn-primary" v-if="authinfo.status === '未审核'" v-link="'/admin/demand/member/list/await'">去审核</a>
							</li>
							<li>认证类型: {{authinfo.type}}</li>
							<template v-if="authinfo.type === '公司'">
								<li>公司名称: {{authinfo.name}}</li>
								<li>公司地址: {{authinfo.addr}}</li>
								<li>所属行业: {{authinfo.industry}}</li>
								<li>证件类型:
									<span v-if="authinfo.authType == '0'">三证合一（一照一码）</span>
									<span v-if="authinfo.authType == '1'">三证合一</span>
									<span v-if="authinfo.authType == '2'">三证分离</span>
								</li>
								<template v-if="authinfo.authType == '0'">
									<li>统一社会信用代码：{{authinfo.type01Prop02}}</li>
									<li class="flex  flex-direction-row ">
										<span class=" padding-right-10">营业执照: </span>
										<img :src="authinfo.type01Prop01 | img" alt="" class="padding-right-10"  width="250" height="100%">
									</li>
								</template>
								<template v-if="authinfo.authType == '1'">
									<li>注册号：{{authinfo.type02Prop01}}</li>
									<li>税务登记号：{{authinfo.type02Prop02}}</li>
									<li class="flex  flex-direction-row ">
										<span class=" padding-right-10">营业执照: </span>
										<img :src="authinfo.type02Prop03 | img" alt="" class="padding-right-10" width="250" height="100%" >
									</li>
								</template>
								<template v-if="authinfo.authType == '2'">
									<li>税务登记号：{{authinfo.type03Prop01}}</li>
									<li>营业执照号：{{authinfo.type03Prop03}}</li>
									<li class="flex  flex-direction-row ">
										<span class=" padding-right-10">营业执照: </span>
										<img :src="authinfo.type03_prop04 | img" alt="" class="padding-right-10" width="250" height="100%" >
									</li>
								</template>
							</template>
							<template v-else>
								<li>真实姓名：{{authinfo.name}}</li>
								<li>证件类型：
									<span class="padding-right-10" v-if="authinfo.idType ==='0'">身份证</span>
									<span class="padding-right-10" v-if="authinfo.idType ==='1'">护照</span>
								</li>
								<li>证件号码：{{authinfo.idNumber}}</li>
								<li class="flex  flex-direction-row ">
									<span class=" padding-right-10">证件照: </span>
									<img :src="authinfo.idPhoto | img" alt="" width="230" height="200" class="padding-right-10" width="250" height="100%" >
								</li>
							</template>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>

	<modal :action="resetPass" :show.sync="showModal" title="密码重置">
		  <div slot="body">系统将会发送一条重置密码的链接发送到会员的邮箱里，请确认您此次的操作</div>
	</modal>
</template>

<script>
	import {getTenantInfo,getTenantAuthInfo} from '../../../../vuex/actions.js' 
	export default{
		vuex: {
			getters: {
				info: ({tenant}) =>tenant.base.info,
				authinfo: ({tenant}) =>tenant.base.authinfo
			},
			actions: {
				getTenantInfo,
				getTenantAuthInfo
			}
		},
		components:{
			'modal': require('../../../ui/modal.vue'),
			'single': require('./single.vue')
		},
		data(){
			return {
				showModal : false
			}
		},
		methods:{
			resetPass(){
				let self = this;
				$.patch('/tenant/tenants/' + this.$route.params.uid + '/resetPass').then((res) => {
				});
				self.showModal = false
			}
		},
		ready(){
			let params = {}
			params.id = this.$route.params.uid
			this.getTenantAuthInfo(params)
			this.getTenantInfo(params)
		}
	}
</script>



<style lang="sass" scoped>
	.down-btn{
		height: 35px;
	}

	ul {
		padding: 15px 15px 0 15px;
		font-size: 1.4rem;
		li {
			padding-bottom: 25px;
		}
	}
</style>

