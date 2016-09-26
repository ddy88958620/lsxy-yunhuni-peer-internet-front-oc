<template>


	<div class=" bg-section-margin inline-block">
		<div class="admin-toolbar small-font-color cursor" >
			<span type="button" class="toolbar first-toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/'+this.seletedApp+'/'+this.startdate.value+'/call/call'" >语音通知</span>
			<span type="button" class="toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/'+this.seletedApp+'/'+this.startdate.value+'/callback/callback'" >语音回拨</span>
			<span type="button" class="toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/'+this.seletedApp+'/'+this.startdate.value+'/meeting/meeting'" >语音会议</span>
			<span type="button" class="toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/'+this.seletedApp+'/'+this.startdate.value+'/verification/verification'" >语音验证码</span>
			<span type="button" class="toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/'+this.seletedApp+'/'+this.startdate.value+'/record/record'">通话录音</span>
			<span type="button" class="toolbar remove-border-right last-toolbar"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/session/'+this.seletedApp+'/'+this.startdate.value+'/ivr/ivr'" >自定义IVR</span>
		</div>
	</div>

	<div class="headbox flex flex-1 align-items-c bg-section-margin whilebg">
		<span class='datetime-picker-label padding-right-20'>选择应用: </span>
		
		<select class="form-control flex select-box padding-right-20" v-model='seletedApp' >
			<option v-for="app in apps"  value="{{app.id}}">{{app.name}} </option>
		</select>

		<span class='datetime-picker-label padding-right-20 padding-left-20'>时间:</span>
		<datetime-picker :uuid="'sessionDate'"  :type.sync="startdate.type" :value.sync="startdate.value"></datetime-picker>
	</div>

	<router-view></router-view>
</template>
<script>
	import DATE from '../../../../utils/date'
	export default{
		components: {
			'datetime-picker': require('../../../ui/datetimepicker.vue')
		},
		data(){
			return{
				apps:[
				
				],
				seletedApp:'all',
				startdate :{
					type:'day',
					value:DATE.todayString('day'),
				}
			}
		},
		watch: {
			'startdate.value':function(){
				this.go()	

			},
			'seletedApp':function(){
				this.go()
			}
		},
		methods:{
			go(){
				let self = this 
				let params = self.$route.params
				if(this.startdate.value==''){
					this.startdate.value = DATE.todayString('day')
				}
				self.$route.router.go('/admin/tenant/detail/'+params.uid+'/session/'+this.seletedApp+'/'+this.startdate.value+'/'+params.module+'/'+params.module)

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

<style lang="sass">
	.headbox{
		padding: 10px;
		font-size: 1.4rem;
	}
</style>


