<template>
	<div class="bg-section-margin">
		<div class="admin-panel flex-1">
			<div class="panel-body">
				<ul class="list-none-style">
					<li>
						<button class="btn btn-primary" v-link="'/admin/tenant/detail/'+$route.params.uid+'/app/list'">返回应用列表
						</button>
					</li>
					<li>应用名称: {{app.name}}</li>
					<li>应用类型: {{app.type}}</li>
					<li>应用描述: {{app.description || '这家伙很懒，什么都没留下'}}</li>
					<li>所属行业: {{app.industry}}</li>
					<li>服务器白名单: {{app.whiteList}}</li>
					<li>回调URL {{app.url}}</li>
					<li v-if="app.isAuth == 1">监听通知: 启用监听 启用鉴权</li>
					<li v-else>监听通知: 没有启用监听</li>
					<li>绑定测试号: {{app.testPhone}}</li>
					<li v-if="app.status == 1">应用状态: <span class="text-danger">已上线</span></li>
					<li v-else>应用状态: <span class="text-danger">未上线</span></li>
				</ul>

				<div class="flex   ">
					<div class="admin-toolbar flex normal-font-size small-font-color cursor" >
						<span type="button" class="toolbar first-toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/app/detail/'+$route.params.appid+'/play'" >放音媒体库</span>
						<span type="button" class="toolbar remove-border-right last-toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/app/detail/'+$route.params.appid+'/record'" >录音文件</span>
					</div>
				</div>

			</div>
		</div>
		<router-view></router-view>
	</div>



</template>
<style lang="sass" scoped>
	ul {
		padding: 0 15px 0 15px;
		font-size: 1.4rem;
	  li {
		  padding-bottom: 25px;
	  }
	}

	.btn-group .v-link-active {
		background-color: #f6f6f6;
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
