<template>
	<div class="app-main-content">
		<ul class='app-main-left'>
			<li class="wrapper"><span></span>发票管理</li>
			<li>
				<a v-link="'/admin/finance/invoice'">发票审核<span class="app-menu-count" v-if="num.awaitInvoiceApply!=0">{{num.awaitInvoiceApply}}</span></a>
			</li>
			<li>
				<a v-link="'/admin/finance/delivery'">发票邮寄<span class="app-menu-count" v-if="num.awaitInvoiceApplySend!=0">{{num.awaitInvoiceApplySend}}</span></a>
			</li>
		</ul>
		<div class=" admin-padding app-main-right">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
	export default {
		vuex:{
			getters: {
				num: ({message}) => message.num
			}
		}
	}
</script>