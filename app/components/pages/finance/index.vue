<template>
	<div class="app-main-content">
		<ul class='app-main-left'>
			<li class="wrapper"><span></span>发票管理</li>
			<li>
				<a v-link="'/admin/finance/invoice'">发票审核<span class="app-menu-count" v-if="num.await!=0">{{num.await}}</span></a>
			</li>
			<li>
				<a v-link="'/admin/finance/delivery'">发票邮寄<span class="app-menu-count" v-if="num.awaitSend!=0">{{num.awaitSend}}</span></a>
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
					await:0,
					awaitSend:0
				}
			}
		},
		route: {
			data(){}
		},
		ready(){
			let self = this
		   $.get('/finance/invoice/await/num').then((res) => {
		   		if(res.success){
		   			self.num = res.data
		   		}
		   })
		}

	}
</script>