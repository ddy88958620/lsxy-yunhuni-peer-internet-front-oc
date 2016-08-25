<template>
		<div class="app-main-content flex flex-1 flex-direction-r">
			<ul class='app-main-left'>
				<li class="wrapper"><span></span>审核管理</li>
				<li>
					<a v-link="'/admin/demand/member'">会员认证<span class="app-menu-count" v-if="num.tenant!=0" >{{num.tenant}}</span></a>
				</li>
				<li>
					<a v-link="'/admin/demand/voice'">放音文件<span class="app-menu-count" v-if="num.voiceFilePlay!=0" >{{num.voiceFilePlay}}</span></a>
				</li>
			</ul>
			<div class=" admin-padding app-main-right">
				<router-view></router-view>
			</div>
		</div>
</template>
<script>
	export default {
		data(){
			return{
				num:{
					voiceFilePlay:0,
					tenant:0
				}
			}
		},
		route: {
			data(){}
		},
		ready(){
			let self = this
		   $.get('/demand/await/num').then((res) => {
		   		if(res.success){
		   			self.num = res.data
		   		}
		   })
		}
	}
</script>