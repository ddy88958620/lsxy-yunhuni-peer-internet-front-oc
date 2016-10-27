<template>
	<form class="form-horizontal line_form" role="form">
		<div class="form-group">
			<label class="control-label">号码来源 : </label>
			<input type="radio" class="" placeholder="" value="0" v-model="numberType" number> 租户自带
			<input type="radio" class="" placeholder="" value="1" v-model="numberType" number> 采购线路
		</div>
		<div class="form-group">
			<label class="control-label">线路绑定 : </label>
			<select class="form-control" >
				<option selected="selected">请选区域</option>
				<option value=1>活动消息</option>
				<option value=2>活动消息</option>
			</select>
		</div>
		<div class="form-group">
			<label class="control-label">运营商 : </label>
			<select class="form-control">
				<option selected="selected">请选择运营商</option>
				<option value=1>活动消息</option>
				<option value=2>活动消息</option>
			</select>
		</div>
		<div class="form-group">
			<label class="control-label">归属地 : </label>
			<input type="text" class="form-control" placeholder="">
			呼出时作为来电显示，呼入时作为被叫号码
		</div>
		<div class="form-group">
			<label class="control-label">号码属性 : </label>
			<input type="radio" class="" placeholder=""> 可主叫
			<input type="radio" class="" placeholder=""> 可被叫
			<input type="radio" class="" placeholder="" v-if="numberType === 0"> <span v-if="numberType === 0">可透传</span>
		</div>
		<div class="form-group">
			<label class="control-label">呼出URI : </label>
			<input type="text" class="form-control" placeholder="">
			作主叫呼出号码时使用
		</div>
		<div class="form-group">
			<label class="control-label">真实号码 : </label>
			<input type="text" class="form-control" placeholder="">
			呼出时作为来电显示，呼入时作为被叫号码
		</div>
		<div class="form-group" v-if="numberType===1">
			<label class="control-label">号码占用费 : </label>
			<input type="text" class="form-control" placeholder="">
			元
		</div>
	</form>
</template>
<script>
	export default {
		props: {
			formValue: {},
		},
		data(){
			return {
				numberType: 0,
			}
		},
		components: {
			slider: require('ui/slider.vue')
		},
	}
</script>

<style lang="sass" rel="stylesheet/scss">
	.line_form {
		width: 907px;
		margin-left: 20px;
		$input-width: 300px;
		font-size: 1.4rem;
	
	.form-group {
		margin-bottom: 0;
	}
	
	.control-label {
		display: inline-block;
		width: 95px;
		margin: 10px 20px 10px 0px;
	}
	
	.form-control {
		width: $input-width;
	}
	
	.input-width {
		display: inline-block;
		width: $input-width;
	}
	
	.sub_form_group {
		display: inline-block;
		vertical-align: text-top;
	}
	.radio-group {
		vertical-align: text-top;
		line-height: 25px;
	}
	}

</style>
