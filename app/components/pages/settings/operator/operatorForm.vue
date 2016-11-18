<template>
	<validator  name="validation">
	<form class="form-horizontal form" role="form">
		<div class="form-group margin-top-20 validate-field">
			<label class="control-label">账号 : </label>
			<input type="text" class="form-control" placeholder="" v-validate:password="{maxlength: 12, required: true}">
			用户名示例  “部门名称+姓名”，如“cphjy"
			<span class="text-danger">*</span>
		</div>
		<div class="form-group margin-top-20 validate-field">
			<label class="control-label">密码 : </label>
			<input type="text" class="form-control" placeholder="" v-validate:password="{maxlength: 12, minlength: 6, required: true}">
			6-12位数字或者字母
			<span class="text-danger">*</span>
			<!--<div class="error" v-if="$validation.password.modified">-->
				<!--<span class="text-danger" v-if="$validation.password.required || $validation.password.maxlength || $validation.password.minlength">密码长度为6-12位</span>-->
			<!--</div>-->
		</div>
		<div class="form-group margin-top-20">
			<label class="control-label">所属角色 : </label>
			<input type="checkbox" placeholder=""> 运营
			<input type="checkbox" placeholder=""> 财务
			<input type="checkbox" placeholder=""> 市场
			&nbsp;
			<span class="text-danger">  * 可多选</span>
		</div>
	</form>
	</validator>
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
