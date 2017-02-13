<template>
	<div class="bg-section-margin no-wrap base-section">
		<div class="inline-block width-50 ofh padding-right-10">
			<div class="panel panel-base">
					<div class="panel-heading panel-base-heading flex flex-1 justify-content-b">
						<span class="inline-block">基础信息</span>
						<a @click="showModal=true" class="float-r ofh">密码重置</a></div>
					<div class="panel-body admin-bg flex-1">
						<ul class="list-none-style">
							<li><span class="small-font-color">会员名称 : </span>{{info.tenantName}}</li>
							<li><span class="small-font-color">账号ID : </span>{{info.userName}}</li>
							<li><span class="small-font-color">注册时间 : </span>{{info.createTime | totalDate}}</li>
							<li><span class="small-font-color">绑定手机号 : </span>{{info.mobile}}</li>
							<li><span class="small-font-color">邮箱绑定 : </span>{{info.email}}</li>
						</ul>
					</div>
				</div>
		</div>
		<div class="inline-block width-50 ofh padding-left-10">
			<div class="panel panel-base">
				<div class="panel-heading panel-base-heading">业务信息</div>
				<div class="panel-body admin-bg flex-1">
					<ul class="list-none-style">
						<li><span class="small-font-color">应用行业 : </span>{{info.industry}}</li>
						<li><span class="small-font-color">主营业务 : </span>{{info.business}}</li>
						<li><span class="small-font-color">网站 : </span>{{info.url}}</li>
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
							<li><span class="small-font-color">所在地区 : </span>{{info.province}}{{info.city}}</li>
							<li><span class="small-font-color">通讯地址 : </span>{{info.address}}</li>
							<li><span class="small-font-color">联系号码 : </span>{{info.phone}}</li>
						</ul>
					</div>
				</div>
		</div>
		<div class="inline-block width-50 ofh padding-left-10 " >
			<div class="panel panel-base">
					<div class="panel-heading panel-base-heading">认证信息</div>
					<div class="panel-body admin-bg flex-1 authbox">

            <ul class="list-none-style remove-padding-bottom">
              <li><strong>个人认证</strong></li>
              <li>
                  <span class="small-font-color">认证状态 : </span>
                	<span class="padding-right-10" v-if="authinfo.realnamePrivate.status == 1 && authinfo.realnamePrivate !== null">认证成功</span>
                  <span v-else>未认证</span>
              </li>
              <div v-if="authinfo.realnamePrivate.status == 1 && authinfo.realnamePrivate !== null">
                <li><span class="small-font-color">真实姓名 : </span>{{authinfo.realnamePrivate.name}}</li>
                <li><span class="small-font-color">证件类型 : </span>
                  <span class="padding-right-10" v-if="authinfo.realnamePrivate.idType ==='0'">身份证</span>
                  <span class="padding-right-10" v-if="authinfo.realnamePrivate.idType ==='1'">护照</span>
                </li>
                <li><span class="small-font-color">证件号码 : </span>{{authinfo.realnamePrivate.idNumber}}</li>
                <li class="flex  flex-direction-row">
                  <span class="small-font-color padding-right-15">证件照 : </span>
                  <img :src="authinfo.realnamePrivate.idPhoto | img"  class="padding-right-10" height="200" data-action="zoom">
                </li>
              </div>
            </ul>

            <ul class="list-none-style remove-padding-bottom">
              <li><strong>企业认证</strong></li>
              <li>
                <span class="small-font-color">认证状态 : </span>
                <span class="padding-right-15" v-if="authinfo.realnameCorp.status == 2 && authinfo.realnameCorp !== null">认证成功</span>
                <span v-else>未认证</span>
              </li>
              <div v-if="authinfo.realnameCorp.status == 2 && authinfo.realnameCorp !== null">
                <li><span class="small-font-color">公司名称 : </span>{{authinfo.realnameCorp.name}}</li>
                <li><span class="small-font-color">公司地址 : </span>{{authinfo.realnameCorp.addr}}</li>
                <li><span class="small-font-color">所属行业 : </span>{{authinfo.realnameCorp.industry}}</li>
                <li><span class="small-font-color">申请人 : </span>{{authinfo.realnameCorp.proposer}}</li>
                <li><span class="small-font-color">证件类型 : </span>
                  <span v-if="authinfo.realnameCorp.authType == '0'">三证合一（一照一码）</span>
                  <span v-if="authinfo.realnameCorp.authType == '1'">三证合一</span>
                  <span v-if="authinfo.realnameCorp.authType == '2'">三证分离</span>
                </li>
                <div v-if="authinfo.realnameCorp.authType == '0'">
                  <li><span class="small-font-color">统一社会信用代码 : </span>{{authinfo.realnameCorp.type01Prop02}}</li>
                  <li class="flex  flex-direction-row ">
                    <span class="small-font-color padding-right-15">营业执照: </span>
                    <img :src="authinfo.realnameCorp.type01Prop01 | img" alt="" class="padding-right-10"   height="200" data-action="zoom"  >
                  </li>
                </div>
                <div v-if="authinfo.realnameCorp.authType == '1'">
                  <li><span class="small-font-color">注册号 : </span>{{authinfo.realnameCorp.type02Prop01}}</li>
                  <li><span class="small-font-color">税务登记号 : </span>{{authinfo.realnameCorp.type02Prop02}}</li>
                  <li class="flex  flex-direction-row ">
                    <span class="small-font-color padding-right-15">营业执照 : </span>
                    <img :src="authinfo.realnameCorp.type02Prop03 | img" alt="" class="padding-right-10"  height="200" data-action="zoom" >
                  </li>
                </div>
                <div v-if="authinfo.realnameCorp.authType == '2'">
                  <li><span class="small-font-color">税务登记号 : </span>{{authinfo.realnameCorp.type03Prop01}}</li>
                  <li class="flex  flex-direction-row ">
                    <span class="small-font-color padding-right-15">税务登记证: </span>
                    <img :src="authinfo.realnameCorp.type03Prop02 | img" alt="" class="padding-right-10"  height="200" data-action="zoom" >
                  </li>
                  <li><span class="small-font-color">营业执照号 : </span>{{authinfo.realnameCorp.type03Prop03}}</li>
                  <li class="flex  flex-direction-row ">
                    <span class="small-font-color padding-right-15">营业执照 : </span>
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
	import {getTenantInfo, getTenantAuthInfo} from '../../../../vuex/actions.js'
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
		},
		data(){
			return {
				showModal : false,
				authradio:'private',
			}
		},
		methods: {
			resetPass() {
				let self = this;
				$.patch('/tenant/tenants/' + this.$route.params.uid + '/resetPass').then((res) => {
				});
				self.showModal = false
			},
			autoheight(num){
				if(num!==500)num=100
				 setTimeout(function(){
					var h = $('.authbox').height()
					$('.contactbox').css('height',h+'px')
				},num);
			}

		},
		ready() {
			let params = {}
			params.id = this.$route.params.uid
			this.getTenantAuthInfo(params)
			this.getTenantInfo(params)
			this.autoheight(500)
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
