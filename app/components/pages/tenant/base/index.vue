<template>

	<div class="bg-section-margin no-wrap base-section">
		<div class="inline-block width-50 ofh padding-right-10">
			<div class="panel panel-base">
					<div class="panel-heading panel-base-heading flex flex-1 justify-content-b">
						<span class="inline-block">基础信息</span>
						<a @click="showModal=true" class="float-r ofh">密码重置</a></div>
					<div class="panel-body admin-bg flex-1">
						<ul class="list-none-style">
							<li>会员名称:{{info.tenantName}}</li>
							<li>账号ID:{{info.userName}}</li>
							<li>注册时间:{{info.createTime | totalDate}}</li>
							<li>绑定手机号:{{info.mobile}}</li>
							<li>邮箱绑定:{{info.email}}</li>
						</ul>
					</div>
				</div>
		</div>
		<div class="inline-block width-50 ofh padding-left-10">
			<div class="panel panel-base">
				<div class="panel-heading panel-base-heading">业务信息</div>
				<div class="panel-body admin-bg flex-1">
					<ul class="list-none-style">
						<li>应用行业: {{info.industry}}</li>
						<li>主营业务: {{info.business}}</li>
						<li>网站: {{info.url}}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<div class="bg-section-margin base-section no-wrap inline-block">
		<div class="inline-block width-50 ofh padding-right-10 float-l">
			<div class="panel panel-base">
					<div class="panel-heading panel-base-heading ">联系信息</div>
					<div class="panel-body admin-bg flex-1 contactbox ">
						<ul class="list-none-style">
							<li>所在地区: {{info.province}}{{info.city}}</li>
							<li>通讯地址: {{info.address}}</li>
							<li>联系号码: {{info.phone}}</li>
						</ul>
					</div>
				</div>
		</div>
		<div class="inline-block width-50 ofh padding-left-10 " >
			<div class="panel panel-base">
					<div class="panel-heading panel-base-heading">认证信息</div>
					<div class="panel-body admin-bg flex-1 authbox">
						<ul class="list-none-style remove-padding-bottom">
							<li class="padding-bottom-10">
								 <input type="radio" name="auth-radio" value="private" v-model="authradio" @click="autoheight()" />个人认证
								 <input type="radio" value="corp" name="auth-radio" v-model="authradio" @click="autoheight()" class="authradio" /> 企业认证
							</li>
						</ul>
						<ul class="list-none-style" v-if="authradio == 'private'">
							<li>认证状态:
								<span class="padding-right-10" v-if="authinfo.status==1 || authinfo.status==2 || authinfo.status==3 || authinfo.status==4 || authinfo.status==5 || authinfo.status==-2">认证成功</span>
								<span class="text-danger padding-right-10" v-if="authinfo.status==-1 ">认证失败</span>
								<a class="btn btn-primary" v-if="authinfo.status ===6" v-link="'/admin/demand/member/list/await'">去审核</a>
								<span v-if="authinfo.status==100">未认证</span>
							</li>
							<div v-if="authinfo.status!=100">
								<li>真实姓名：{{authinfo.realnamePrivate.name}}</li>
								<li>证件类型：
									<span class="padding-right-10" v-if="authinfo.realnamePrivate.idType ==='0'">身份证</span>
									<span class="padding-right-10" v-if="authinfo.realnamePrivate.idType ==='1'">护照</span>
								</li>
								<li>证件号码：{{authinfo.realnamePrivate.idNumber}}</li>
								<li class="flex  flex-direction-row ">
									<span class=" padding-right-10">证件照: </span>
									<img :src="authinfo.realnamePrivate.idPhoto | img"  class="padding-right-10" height="200" data-action="zoom">
								</li>
							</div>
						</ul>

						<ul class="list-none-style" id="company"  v-if="this.authradio =='corp'" >
							<li>认证状态:
								<span class="padding-right-10" v-if="authinfo.status==2 || authinfo.status==4">认证成功</span>
								<span class="text-danger padding-right-10" v-if="authinfo.status==-2 || authinfo.status==5">认证失败</span>
								<a class="btn btn-primary" v-if="authinfo.status ===3 || authinfo.status ===0" v-link="'/admin/demand/member/list/await'">去审核</a>
								<span v-if="authinfo.status==100 || authinfo.status==1 || authinfo.status==-1">未认证</span>
							</li>
							<div v-if="authinfo.status !=1 && authinfo.status !=-1 && authinfo.status!=100">
								<li>公司名称: {{authinfo.realnameCorp.name}}</li>
								<li>公司地址: {{authinfo.realnameCorp.addr}}</li>
								<li>所属行业: {{authinfo.realnameCorp.industry}}</li>
								<li>申请人：{{authinfo.realnameCorp.proposer}}</li>
								<li>证件类型:
									<span v-if="authinfo.realnameCorp.authType == '0'">三证合一（一照一码）</span>
									<span v-if="authinfo.realnameCorp.authType == '1'">三证合一</span>
									<span v-if="authinfo.realnameCorp.authType == '2'">三证分离</span>
								</li>
								<div v-if="authinfo.realnameCorp.authType == '0'">
									<li>统一社会信用代码：{{authinfo.realnameCorp.type01Prop02}}</li>
									<li class="flex  flex-direction-row ">
										<span class=" padding-right-10">营业执照: </span>
										<img :src="authinfo.realnameCorp.type01Prop01 | img" alt="" class="padding-right-10"   height="200" data-action="zoom"  >
									</li>
								</div>
								<div v-if="authinfo.realnameCorp.authType == '1'">
									<li>注册号：{{authinfo.realnameCorp.type02Prop01}}</li>
									<li>税务登记号：{{authinfo.realnameCorp.type02Prop02}}</li>
									<li class="flex  flex-direction-row ">
										<span class=" padding-right-10">营业执照: </span>
										<img :src="authinfo.realnameCorp.type02Prop03 | img" alt="" class="padding-right-10"  height="200" data-action="zoom" >
									</li>
								</div>
								<div v-if="authinfo.realnameCorp.authType == '2'">
									<li>税务登记号：{{authinfo.realnameCorp.type03Prop01}}</li>
									<li class="flex  flex-direction-row ">
										<span class=" padding-right-10">税务登记证: </span>
										<img :src="authinfo.realnameCorp.type03Prop02 | img" alt="" class="padding-right-10"  height="200" data-action="zoom" >
									</li>
									<li>营业执照号：{{authinfo.realnameCorp.type03Prop03}}</li>
									<li class="flex  flex-direction-row ">
										<span class=" padding-right-10">营业执照: </span>
										<img :src="authinfo.realnameCorp.type03Prop04 | img"  class="padding-right-10"  height="200"  data-action="zoom" >
									</li>
								</div>
							</div>
						</ul>
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
				showModal : false,
				authradio:'private',
			}
		},
		methods:{
			resetPass(){
				let self = this;
				$.patch('/tenant/tenants/' + this.$route.params.uid + '/resetPass').then((res) => {
				});
				self.showModal = false
			},
			autoheight(){
				var iscount = setInterval(function(){
					var h = $('.authbox').height()
					$('.contactbox').css('height',h+'px')
					clearInterval(iscount)
				},10);
			}

		},
		ready(){
			let params = {}
			params.id = this.$route.params.uid
			this.getTenantAuthInfo(params)
			this.getTenantInfo(params)
			this.autoheight()
		}
	}
</script>



<style lang="sass" scoped>
	.base-section {
		min-height: 300px;
	  width:100%;
		.panel-body {
			min-height: 235px;
		}
	}
	
	ul {
		padding: 15px 15px 0 15px;
		font-size: 1.4rem;
		li {
			padding-bottom: 25px;
		}
	}

	.remove-padding-bottom{
		padding-bottom: 0;
	}
	.padding-bottom-10{
		padding-bottom: 10px;
	}

	.authradio{
		margin-left: 10px;
	}
</style>

