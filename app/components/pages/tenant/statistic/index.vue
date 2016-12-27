<template>
	<div class="inline-block bg-section-margin remove-margin-bottom " >
		<div class="admin-toolbar small-font-color cursor" >
			<span class="toolbar first-toolbar" v-link="'/admin/tenant/detail/'+$route.params.uid+'/statistic/consume'" >消费统计</span>
			<span class="toolbar" v-link="'/admin/tenant/detail/'+$route.params.uid+'/statistic/recharge'" >充值明细</span>
			<span class="toolbar" v-link="'/admin/tenant/detail/'+$route.params.uid+'/statistic/conversation'" >会话统计</span>
			<span class="toolbar" v-link="'/admin/tenant/detail/'+$route.params.uid+'/statistic/interface'" >API调用统计</span>
			<span class="toolbar" v-link="'/admin/tenant/detail/'+$route.params.uid+'/statistic/line'" >线路负载量</span>
			<span class="toolbar remove-border-right last-toolbar {{ module=='callcenter' || module=='calldetail' ? 'active': ''}}" v-link="'/admin/tenant/detail/'+$route.params.uid+'/statistic/callcenter'" >呼叫中心统计</span>
		</div>
	</div>

<!--	<div class="headbox flex flex-1 align-items-c bg-section-margin whilebg"  v-if="this.module !='recharge' && this.module !='line' " >
		<div>
			<span class='datetime-picker-label padding-right-20'>选择应用: </span>
			<select class="form-control flex select-box" v-model='seletedApp'  >
				<option value="all">全部</option>
				<option v-for="app in apps"  value="{{app.id}}">{{app.name}} </option>
			</select>
		</div>
	</div>	-->
	<router-view></router-view>
</template>

<script>
	export default{
		data(){
			return{
				apps:[
				],
				seletedApp:'all',
				module:'consume'
			}
		},
		watch:{
			'seletedApp': function(){
				let self = this
				let params = self.$route.params
				self.$route.router.go('/admin/tenant/detail/'+params.uid+'/statistic/'+this.seletedApp+'/'+params.module+'/'+params.module)
			}
		},
		route: {
			data(){
				this.module = this.$route.params.module
				$.get('/app/list/'+this.$route.params.uid).then((res) => {
					if(res.data.length>0){
						this.apps = res.data
					}
				})
			}
		}
	}
</script>

<style lang="sass">
	.headbox{
		padding: 10px;
		font-size: 1.4rem;
	}
</style>
