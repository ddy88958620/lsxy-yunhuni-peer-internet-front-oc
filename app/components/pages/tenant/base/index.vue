<template>
	<!--<div class="flex flex-direction-column bg-section-margin ">
		<div class="flex justify-content-b flex-wrap" >
			<single :messages="sigledata"></single>
		</div>
	</div>-->

	<div class="flex flex-1 bg-section-margin ">
		<div class="flex flex-1 padding-right-10">
			<div class="flex flex-1" >
				<div class="panel panel-base flex flex-direction-column flex-1">
					<div class="panel-heading panel-base-heading flex flex-1 justify-content-b"><span class="flex">基础信息</span><a @click="showModal=true" >密码重置</a></div>
					<div class="panel-body admin-bg flex-1">
						<ul class="list-none-style">
							<li>会员名称:{{info.tenantName}}</li>
							<li>账号:{{info.userName}}</li>
							<li>注册时间:{{info.createTime}}</li>
							<li>绑定手机号:1358564123</li>
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
							<li>网站: </li>
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
							<li>联系号码: {{info.mobile}}</li>
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
							<li>认证状态: <span class="text-danger padding-right-10">未审核</span> <a class="btn btn-primary">去审核</a></li>
							<li>认证类型: {{authinfo.type}}</li>
							<li>公司名称: {{authinfo.name}}</li>
							<li>公司地址: {{authinfo.addr}}</li>
							<li>所属行业: {{authinfo.industry}}互联网通信</li>
							<li>证件类型: {{authinfo.authType}}三证合一（一证一码）</li>
							<li>统一社会信用代码: 135546546465546564465</li>
							<li class="flex  flex-direction-row ">
								<span class=" padding-right-10">营业执照: </span>
								<img src="../../../../assets/images/businesses.png" alt="" class="padding-right-10" >
								<div class="flex ">
									<button class="btn btn-primary down-btn">下载</button>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>

	<modal :show.sync="showModal" title="密码重置">
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
				sigledata:[
					['Hello world','123123','2016-06-06 16:30','13611460986','475647150@qq.com'],
					['通讯','飞飞语音','www.yunhuni.com'],
					['广东广州','天河区黄埔大道羊城创意园','020-86435555'],
					['公司','流水行云科技有限公司','广州天河','互联网通信','三证合一（一证一码）','135546546465546564465','']
				]
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

