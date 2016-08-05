<template>
	<div class="flex flex-1 bg-section-margin ">
		<div class="admin-toolbar flex normal-font-size small-font-color cursor" >
			<span type="button" class="toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/call'" >语音呼叫</span>
			<span type="button" class="toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/callback'" >语音回拨</span>
			<span type="button" class="toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/meeting'" >会话服务</span>
			<span type="button" class="toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/verification'" >语音验证码</span>
			<span type="button" class="toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/record'">录音服务</span>
			<span type="button" class="toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/ivr'" >IVR定制服务</span>
		</div>
	</div>
	<div class="headbox flex flex-1 align-items-c bg-section-margin ">
		<span class="padding-right-20">选择应用</span>
		<select class="form-control flex selcet-box">
			<option value="">全部</option>
			<option value="">飞飞应用</option>
		</select>
	</div>
	<router-view></router-view>
</template>
<script>
	export default{
	}
</script>

