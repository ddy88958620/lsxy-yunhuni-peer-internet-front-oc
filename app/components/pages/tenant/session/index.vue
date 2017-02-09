<template>
	<div>
		<div class=" bg-section-margin inline-block remove-margin-bottom">
			<div class="admin-toolbar small-font-color cursor">
				<span type="button" class="toolbar first-toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/call'" >语音通知</span>
				<span type="button" class="toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/callback'" >语音回拨</span>
				<span type="button" class="toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/meeting'" >语音会议</span>
				<span type="button" class="toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/verification'" >语音验证码</span>
				<span type="button" class="toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/record'">通话录音</span>
				<span type="button" class="toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/ivr'" >自定义IVR</span>
				<span type="button" class="toolbar  remove-border-right last-toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/callcenter'">呼叫中心</span>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>
<style lang="sass">
	.headbox{
		padding: 10px;
		font-size: 1.4rem;
	}
</style>
