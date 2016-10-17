<style lang="sass" scoped>
</style>
<template>
	<div>
		<div class="admin-table">
			<table class="table">
				<thead>
				<tr>
					<th class="text-align-r" width="300">功能</th>
					<th class="text-align-c">状态</th>
					<th class="text-align-c">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td class="text-align-r" >语音通知</td>
					<td class="{{ switchs.isVoiceDirectly === 0 ? 'text-danger' : 'darkgreen'}} text-align-c" >{{ switchs.isVoiceDirectly === 0 ? '关闭' : '开启'}}</td>
					<td class="text-align-c">
						<a @click="edit('isVoiceDirectly')">{{ switchs.isVoiceDirectly ? '关闭' : '开启'}}</a>
					</td>
				</tr>
				<tr>
					<td class="text-align-r" >语音回拨</td>
					<td class="{{ switchs.isVoiceCallback === 0 ? 'text-danger' : 'darkgreen'}} text-align-c">{{ switchs.isVoiceCallback ===0 ? '关闭' : '开启'}}</td>
					<td class="text-align-c">
						<a @click="edit('isVoiceCallback')">{{ switchs.isVoiceCallback ? '关闭' : '开启'}}</a>
					</td>
				</tr>
				<tr>
					<td class="text-align-r" >语音会议</td>
					<td class="{{ switchs.isSessionService === 0 ? 'text-danger' : 'darkgreen'}} text-align-c" >{{ switchs.isSessionService ===0 ? '关闭' : '开启'}}</td>
					<td class="text-align-c">
						<a @click="edit('isSessionService')">{{ switchs.isSessionService ? '关闭' : '开启'}}</a>
					</td>
				</tr>
				<tr>
					<td class="text-align-r" >语音验证码</td>
					<td class="{{ switchs.isVoiceValidate === 0 ? 'text-danger' : 'darkgreen'}} text-align-c" >{{ switchs.isVoiceValidate ===0 ? '关闭' : '开启'}}</td>
					<td class="text-align-c">
						<a @click="edit('isVoiceValidate')">{{ switchs.isVoiceValidate ? '关闭' : '开启'}}</a>
					</td>
				</tr>
				<tr>
					<td class="text-align-r" >通话录音</td>
					<td class="{{ switchs.isRecording === 0 ? 'text-danger' : 'darkgreen'}} text-align-c" >{{ switchs.isRecording ===0 ? '关闭' : '开启'}}</td>
					<td class="text-align-c">
						<a @click="edit('isRecording')">{{ switchs.isRecording ? '关闭' : '开启'}}</a>
					</td>
				</tr>
				<tr>
					<td class="text-align-r" >自定义IVR</td>
					<td class="{{ switchs.isIvrService === 0 ? 'text-danger' : 'darkgreen'}} text-align-c" >{{ switchs.isIvrService ===0 ? '关闭' : '开启'}}</td>
					<td class="text-align-c">
						<a @click="edit('isIvrService')">{{ switchs.isIvrService ? '关闭' : '开启'}}</a>
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
			}
		},
		methods: {
			edit(type){
			switch(type){
				case 'isVoiceDirectly':
					this.switchs.isVoiceDirectly = this.switchs.isVoiceDirectly===0 ? 1:0
					break;
				case 'isVoiceCallback':
					this.switchs.isVoiceCallback = this.switchs.isVoiceCallback===0  ? 1:0
					break;
				case 'isSessionService':
					this.switchs.isSessionService = this.switchs.isSessionService===0  ? 1:0
					break;
				case 'isRecording':
					this.switchs.isRecording = this.switchs.isRecording===0 ? 1:0
					break;
				case 'isVoiceValidate':
					this.switchs.isVoiceValidate = this.switchs.isVoiceValidate===0  ? 1:0
					break;
				case 'isIvrService':
					this.switchs.isIvrService = this.switchs.isIvrService===0  ? 1:0
					break;					
			}
			let uid = this.$route.params.uid
			let params = {}
			params =  this.switchs
			$.put('/tenant/tenants/'+uid+'/switch',params).then((res) => {
				if(res.success){
					//修改成功提示
				}
			})

				
			}
		},
		ready(){
			let self = this
			let uid = this.$route.params.uid
			$.get('/tenant/tenants/'+uid+'/switchs').then((res) => {
				self.switchs.isIvrService = res.data.isIvrService
				self.switchs.isRecording = res.data.isRecording
				self.switchs.isSessionService = res.data.isSessionService
				self.switchs.isVoiceDirectly = res.data.isVoiceDirectly
				self.switchs.isVoiceValidate = res.data.isVoiceValidate
				self.switchs.isVoiceCallback = res.data.isVoiceCallback
			})

		}
	}

</script>
