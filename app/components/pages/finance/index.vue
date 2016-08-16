<template>
	<div class="app-main-content flex flex-1 flex-direction-r">
		<ul class='app-main-left'>
			<li class="wrapper"><span></span>发票管理</li>
			<li>
				<a v-link="'/admin/finance/invoice'">发票审核<span class="app-menu-count">12</span></a>
			</li>
			<li>
				<a v-link="'/admin/finance/delivery'">发票邮寄</a>
			</li>
		</ul>
		<div class=" admin-padding app-main-right">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
	export default {
		route: {
			data(){}
		}
	}
</script>