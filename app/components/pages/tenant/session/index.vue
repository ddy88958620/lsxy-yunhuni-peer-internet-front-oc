<template>
	<div class="headbox flex flex-1 align-items-c bg-section-margin ">
		<span class='datetime-picker-label padding-right-20'>选择应用: </span>
		
		<select class="form-control flex select-box padding-right-20" v-model='seletedApp' >
			<option v-for="app in apps"  value="{{app.id}}">{{app.name}} </option>
		</select>

		<span class='datetime-picker-label padding-right-20 padding-left-20'>时间:</span>
		<datetime-picker :uuid="'sessionDate'"  :type.sync="startdate.type" :value.sync="startdate.value"></datetime-picker>
	</div>
	<div class="flex flex-1 bg-section-margin ">
		<div class="admin-toolbar flex normal-font-size small-font-color cursor" >
			<span type="button" class="toolbar first-toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/'+this.seletedApp+'/'+this.startdate.value+'/call'" >语音呼叫{{selectedApp}}</span>
			<span type="button" class="toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/'+this.seletedApp+'/'+this.startdate.value+'/callback'" >语音回拨</span>
			<span type="button" class="toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/'+this.seletedApp+'/'+this.startdate.value+'/meeting'" >会话服务</span>
			<span type="button" class="toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/'+this.seletedApp+'/'+this.startdate.value+'/verification'" >语音验证码</span>
			<span type="button" class="toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/'+this.seletedApp+'/'+this.startdate.value+'/record'">录音服务</span>
			<span type="button" class="toolbar remove-border-right last-toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/'+this.seletedApp+'/'+this.startdate.value+'/ivr'" >IVR定制服务</span>
		</div>
	</div>
	<router-view></router-view>
</template>
<script>

	export default{
		components: {
			'datetime-picker': require('../../../ui/datetimepicker.vue')
		},
		data(){
			return{
				apps:[
				
				],
				seletedApp:'4028b88155e262f40155e2d19b0e0004',
				startdate :{
					type:'day',
					value:'2016-08-17',
				}
			}
		},
		ready(){
			$.get('/app/list/'+this.$route.params.uid).then((res) => {
				if(res.data.length>0){
					this.apps = res.data
					this.seletedApp =res.data[0].id
				}
			})
		}
	}
</script>

