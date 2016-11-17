<template>
	<form class="form-horizontal form" role="form">
		<div class="form-group">
			<label class="control-label">角色名称 : </label>
			<input type="text" class="form-control" placeholder="">
			<span class="text-danger">*</span>
		</div>
		<div class="form-group">
			<label class="control-label">权限分配 : </label>
			<input type="checkbox" placeholder=""> 全选
			<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
				<div class="panel panel-default">
					<div class="panel-heading" role="tab" id="headingOne">
						<h4 class="panel-title">租户中心</h4>
					</div>
					<div class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
						<div class="panel-body">
							<div class="permission-list">
								<span>租户列表: </span>
								<ul>
									<li> <input type="checkbox"> 查看 </li>
									<li> <input type="checkbox"> 查看详情 </li>
									<li> <input type="checkbox"> 操作 </li>
								</ul>
							</div>
							<div class="permission-list">
								<span>租户详情: </span>
								<ul>
									<li> <input type="checkbox"> 充值 </li>
									<li> <input type="checkbox"> 平账 </li>
									<li> <input type="checkbox"> 密码重置 </li>
								</ul>
								<ul>
									<li> <input type="checkbox"> 功能开关 </li>
									<li> <input type="checkbox"> 价格配置 </li>
									<li> <input type="checkbox"> 绑定私有线路 </li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="panel panel-default">
					<div class="panel-heading" role="tab" id="headingOne">
						<h4 class="panel-title">配置中心</h4>
					</div>
					<div class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
						<div class="panel-body">
							<div class="permission-list">
								<span>租户列表: </span>
								<ul>
									<li> <input type="checkbox"> 查看 </li>
									<li> <input type="checkbox"> 查看详情 </li>
									<li> <input type="checkbox"> 操作 </li>
								</ul>
							</div>
							<div class="permission-list">
								<span>租户详情: </span>
								<ul>
									<li> <input type="checkbox"> 充值 </li>
									<li> <input type="checkbox"> 平账 </li>
									<li> <input type="checkbox"> 密码重置 </li>
								</ul>
								<ul>
									<li> <input type="checkbox"> 功能开关 </li>
									<li> <input type="checkbox"> 价格配置 </li>
									<li> <input type="checkbox"> 绑定私有线路 </li>
								</ul>
							</div>
						</div>
					</div>
				</div
			</div>
		</div>
	</form>
</template>
<style lang="sass" rel="stylesheet/scss" scoped>
	.panel-group {
		padding: 20px 30px;
		.panel {
			margin-top: 15px !important;
		}
	}
	.permission-list {
		display: inline-block;
		padding: 10px;
		margin-left: 20px;
		span {
			vertical-align: top;
			font-size: 16px;
			font-weight: 400;
			padding-bottom: 10px;
		}
		
		ul {
			vertical-align: top;
			list-style: none;
			padding: 0 15px;
			display: inline-block;
			margin: 0 0 0 10px;
		}
		
		li {
			padding: 5px;
		}
	}
</style>
