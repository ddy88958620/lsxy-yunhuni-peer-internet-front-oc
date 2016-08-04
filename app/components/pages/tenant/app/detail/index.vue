<template>
	<div class="bg-section-margin">

		<div class="admin-panel flex-1">
			<div class="panel-body">
				<ul class="list-none-style">
					<li>
						<button class="btn btn-primary" v-link="'/admin/tenant/detail/'+$route.params.uid+'/app/list'">返回应用列表
						</button>
					</li>
					<li>应用名称: 飞飞语22333音</li>
					<li>应用类型: 网页</li>
					<li>应用描述: 这家伙很懒什么都没留下</li>
					<li>所属行业: 金融</li>
					<li>服务器白名单: 192.168.1.1</li>
					<li>回调URL http://www.bibi.com/callback</li>
					<li>监听通知: 启用监听 启用鉴权</li>
					<li>绑定测试号: 1477777552 1477777552 1477777552 1477777552 1477777552 1477777552</li>
					<li>应用状态: 未上线</li>
				</ul>
				<div class="btn-group">
					<button type="button" class="btn btn-default"
					        v-link="'/admin/tenant/detail/'+$route.params.uid+'/app/detail/play'">放音媒体库
					</button>
					<button type="button" class="btn btn-default"
					        v-link="'/admin/tenant/detail/'+$route.params.uid+'/app/detail/record'">录音文件
					</button>
				</div>
			</div>
		</div>




		<router-view></router-view>


	</div>


	<modal :show.sync="showModal">
		<div slot="body">
			<div class="flex flex-1 ">
				<span class="flex flex-1 align-items-c justify-content-c">不通过原因</span>
				<span class="flex flex-2 "><input type="text" class="form-control "/></span>
			</div>
		</div>
	</modal>
</template>
<style lang="sass" scoped>
	ul {
		padding: 0 15px 0 15px;
		font-size: 1.4rem;

	li {
		padding-bottom: 25px;
	}

	}

</style>
<script>
	export default {
		components: {
			'modal': require('../../../../ui/modal.vue')
		},
		data(){
			return {
				showModal: false,
				messages: [
					{
						date: '2016-06-06',
						type: '1.wav',
						size: '1.1',
						remark: '语音通知推文件'
					},
					{
						date: '2016-06-06',
						type: '1.wav',
						size: '1.1',
						remark: '语音通知推文件'
					}
				]
			}
		}
	}
</script>
