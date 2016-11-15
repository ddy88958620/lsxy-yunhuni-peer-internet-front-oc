<template>
	<div class="app-main-content flex flex-1 flex-direction-r">
		<ul class='app-main-left'>
			<li class="wrapper"><span></span>业务配置</li>
			<li>
				<a v-link="'/admin/settings/line'">线路管理</a>
			</li>
			<li>
				<a v-link="'/admin/settings/number'">号码管理</a>
			</li>
			
			<!--<li>-->
				<!--<a v-link="'/admin/settings/product'">产品管理</a>-->
			<!--</li>-->
			
			<!--<li class="wrapper"><span></span>参数配置</li>-->
			<!--<li>-->
				<!--<a>线路管理</a>-->
			<!--</li>-->
			
			<!--<li class="wrapper"><span></span>用户管理配置</li>-->
			<!--<li>-->
				<!--<a>角色列表</a>-->
			<!--</li>-->
			<!--<li>-->
				<!--<a>操作列表</a>-->
			<!--</li>-->
		</ul>
		<div class="app-main-right">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
	export default {
		route: {
			data(){
			}
		},
		ready(){
			
		}
	}
</script>