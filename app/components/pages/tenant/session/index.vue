<template>
	<div class="headbox flex flex-1 align-items-c bg-section-margin ">
		<span class="padding-right-20">选择应用</span>
		<select class="form-control flex select-box" v-model='seletedApp' >
			<option v-for="app in apps"  value="{{app.id}}" selected >{{app.name}} </option>
		</select>
	</div>
	<div class="flex flex-1 bg-section-margin ">
		<div class="admin-toolbar flex normal-font-size small-font-color cursor" >
			<span type="button" class="toolbar first-toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/'+this.seletedApp+'/call'" >语音呼叫{{selectedApp}}</span>
			<span type="button" class="toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/'+this.seletedApp+'/callback'" >语音回拨</span>
			<span type="button" class="toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/'+this.seletedApp+'/meeting'" >会话服务</span>
			<span type="button" class="toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/'+this.seletedApp+'/verification'" >语音验证码</span>
			<span type="button" class="toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/'+this.seletedApp+'/record'">录音服务</span>
			<span type="button" class="toolbar remove-border-right last-toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/'+this.seletedApp+'/ivr'" >IVR定制服务</span>
		</div>
	</div>
	<router-view></router-view>
</template>
<script>
	export default{
		data(){
			return{
				apps:[
				
				],
				seletedApp:'',
			}
		},
		ready(){
			$.get('/app/list/'+this.$route.params.uid).then((res) => {
				if(res.data.length>0){
					this.apps = res.data
				}
			})
		}
	}
</script>

