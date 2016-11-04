<template>
	<div class="bg-section-margin">
		<button class="btn btn-primary" v-link="'/admin/tenant/detail/'+$route.params.uid+'/app/list'">返回应用列表</button>
	</div>

	<div class="bg-section-margin no-wrap base-section">
		<div class="inline-block width-50 ofh padding-right-10 vertical-align-top">
			<div class="panel panel-base">
				<div class="panel-heading panel-base-heading flex flex-1 justify-content-b">
					<span class="inline-block">基础信息</span>
				</div>
				<div class="panel-body admin-bg flex-1">
					<ul class="list-none-style">
						<li>应用名称: {{app.name}}</li>
						<li>应用描述: {{app.description || '这家伙很懒，什么都没留下'}}</li>
						<li>应用类型: {{app.type}}</li>
						<li>所属行业: {{app.industry}}</li>
						<li>选择服务: <span v-if="app.serviceType ==='voice'">语音</span><span	 v-if="app.serviceType==='call_center'">呼叫中心</span> </li>
						<li>应用状态: <span class="text-danger"  v-if="app.status == 1">已上线</span><span class="text-danger"  v-else>未上线</span></li>
					</ul>
				</div>
			</div>
		</div>
		<div class="inline-block width-50 ofh padding-left-10 vertical-align-top">
			<div class="panel panel-base">
				<div class="panel-heading panel-base-heading">开发者信息</div>
				<div class="panel-body admin-bg flex-1">
					<ul class="list-none-style">
						<li>服务器白名单: {{app.whiteList}}</li>
						<li>回调URL: {{app.url}}</li>
						<li>监听通知:<span  v-if="app.isAuth == 1">启用监听 启用鉴权</span><span> 没有启用监听</span></li>
						<li>绑定测试号: {{app.testPhone}}</li>
						<li v-if="app.serviceType=='call_center'">分机接入信息: {{app.sipRegistrar}}</li>
						<!--<li v-if="app.serviceType=='call_center'">租用号码:{{app.testPhone}} </li>-->
					</ul>
				</div>
			</div>
		</div>
	</div>

	<div class="bg-section-margin">
		<div class="flex   ">
			<div class="admin-toolbar inline-block normal-font-size small-font-color cursor" >
				<span type="button" class="toolbar first-toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/app/detail/'+$route.params.appid+'/play'" >放音媒体库</span>
				<span type="button" class="toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/app/detail/'+$route.params.appid+'/record'" >录音文件</span>
				<span type="button" class="toolbar remove-border-right last-toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/app/detail/'+$route.params.appid+'/extension'" >分机</span>
			</div>
		</div>
		<router-view></router-view>
	</div>





</template>
<style lang="sass" scoped>
	.base-section {
		min-height: 320px;
		width:100%;
		.panel-body {
			min-height: 320px;
		}
	}
	ul {
		padding: 15px;
		font-size: 1.4rem;
	  li {
		  padding-bottom: 25px;
	  }
	}
	.btn-group .v-link-active {
		background-color: #f6f6f6;
	}
	.toolbar{
		padding: 9px 10px;
	}


</style>
<script>
	export default {
		components: {
			'modal': require('../../../../ui/modal.vue')
		},
		data(){
			return {
				app:{}
			}
		},
		ready(){
			let uid = this.$route.params.uid;
			let appId = this.$route.params.appid;
			let self = this;
			$.get('/tenant/tenants/'+uid+'/apps/'+ appId).then((res)=> {
				return res.data && (self.app = res.data);
			})
		}
	}
</script>
