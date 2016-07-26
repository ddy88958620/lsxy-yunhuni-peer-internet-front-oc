<template>
		<div class="app-main-content flex flex-1 flex-direction-r">
			<ul class='app-main-left'>
				<li>
					<a v-link="'/admin/demand/member'">会员认证</a>
				</li>
				<li>
					<a v-link="'/admin/demand/voice'">放音文件</a>
				</li>
			</ul>
			<div class="app-main-right">
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