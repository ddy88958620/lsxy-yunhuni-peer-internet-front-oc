<template>
		<div class="app-main-content flex flex-1 flex-direction-r">
			<ul class='app-main-left'>
				<li class="wrapper"><span></span>审核管理</li>
				<li>
					<a v-link="'/admin/demand/member'">会员认证<span class="app-menu-count" style="display:none">100</span></a>
				</li>
				<li>
					<a v-link="'/admin/demand/voice'">放音文件</a>
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