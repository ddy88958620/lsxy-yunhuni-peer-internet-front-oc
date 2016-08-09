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
							<li>会员名称:流水行云科技有限公司</li>
							<li>账号:123456456</li>
							<li>注册时间:2016-06-06 16：00</li>
							<li>绑定手机号:1358564123</li>
							<li>邮箱绑定:4567@qq.com</li>
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
							<li>所属行业: 通讯</li>
							<li>主营业务: 飞飞语音</li>
							<li>网站: www.yunhuni.com</li>
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
							<li>所在地区: 广东广州</li>
							<li>通讯地址: 天河区黄埔大道羊城创意园</li>
							<li>联系号码: 020-86435555</li>
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

							<li>认证类型: 公司</li>
							<li>公司名称: 流水行云科技有限公司</li>
							<li>公司地址: 广州天河</li>
							<li>所属行业: 互联网通信</li>
							<li>证件类型: 三证合一（一证一码）</li>
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
	export default{
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

