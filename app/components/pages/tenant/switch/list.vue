<style lang="sass" scoped>
</style>
<template>
	<div>
		<div class="admin-table table-responsive">
			<table class="table">
				<thead>
				<tr>
					<th class="text-align-c">功能</th>
					<th>状态</th>
					<th class="text-align-c">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td class="text-align-c" >语音呼叫</td>
					<td>{{ switchs.isVoiceDirectly ? '关闭' : '开启'}}</td>
					<td class="text-align-c">
						<a @click="edit('isVoiceDirectly')">{{ !switchs.isVoiceDirectly ? '关闭' : '开启'}}</a>
					</td>
				</tr>
				<tr>
					<td class="text-align-c" >语音回拨</td>
					<td>{{ switchs.isVoiceCallback ? '关闭' : '开启'}}</td>
					<td class="text-align-c">
						<a @click="edit('isVoiceCallback ')">{{ !switchs.isVoiceCallback ? '关闭' : '开启'}}</a>
					</td>
				</tr>
				<tr>
					<td class="text-align-c" >会议服务</td>
					<td>{{ switchs.isSessionService ? '关闭' : '开启'}}</td>
					<td class="text-align-c">
						<a @click="edit('isSessionService')">{{ !switchs.isSessionService ? '关闭' : '开启'}}</a>
					</td>
				</tr>
				<tr>
					<td class="text-align-c" >语音验证码</td>
					<td>{{ switchs.isRecording ? '关闭' : '开启'}}</td>
					<td class="text-align-c">
						<a @click="edit('isRecording')">{{ !switchs.isRecording ? '关闭' : '开启'}}</a>
					</td>
				</tr>
				<tr>
					<td class="text-align-c" >录音服务</td>
					<td>{{ switchs.isVoiceValidate ? '关闭' : '开启'}}</td>
					<td class="text-align-c">
						<a @click="edit('isVoiceValidate')">{{ !switchs.isVoiceValidate ? '关闭' : '开启'}}</a>
					</td>
				</tr>
				<tr>
					<td class="text-align-c" >IVR定制服务</td>
					<td>{{ switchs.isIvrService ? '关闭' : '开启'}}</td>
					<td class="text-align-c">
						<a @click="edit('isIvrService')">{{ !switchs.isIvrService ? '关闭' : '开启'}}</a>
					</td>
				</tr>
			
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
	import {} from '../../../../vuex/actions'
	export default {
		data(){
			return {
				switchs:{
					isVoiceDirectly:0,
					isVoiceCallback:0,
					isSessionService:0,
					isRecording:0,
					isVoiceValidate:0,
					isIvrService:0
				},
				messages: [
					{
						name: '语音呼叫',
						status: false,
					},
					{
						name: '语音回拨',
						status: false,
					},
					{
						name: '会议服务',
						status: false,
					},
					{
						name: '语音验证码',
						status: false,
					},
					{
						name: '录音服务',
						status: true,
					},
					{
						name: 'IVR定制服务',
						status: true,
					},
					{
						name: '语音呼叫',
						status: true,
					},
				]
			}
		},
		methods: {
			moreMessage(){

			}
		},
		ready(){
			let self = this
			let uid = this.$route.params.uid
			$.get('/tenant/tenants/'+uid+'/switchs').then((res) => {

				this.switchs = res.data
				console.log(res.data)
			})

			/**
			 "isVoiceDirectly": 1,
		    "isVoiceCallback": 1,
		    "isSessionService": 1,
		    "isRecording": 1,
		    "isVoiceValidate": 0,
		    "isIvrService": 0
		    **/


		


		}
	}

</script>
