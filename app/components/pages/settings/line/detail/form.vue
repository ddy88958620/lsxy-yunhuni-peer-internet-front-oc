<template>
	<form class="form-horizontal line_form" role="form">
		<div class="form-group">
			<label class="control-label">线路标识 : </label>
			<input type="text" class="form-control" placeholder="">
		</div>
		<div class="form-group">
			<label class="control-label">运营商 : </label>
			<input type="checkbox" placeholder=""> 电信 &nbsp;
			<input type="checkbox" placeholder=""> 移动 &nbsp;
			<input type="checkbox" placeholder=""> 联通 &nbsp;
		</div>
		<div class="form-group">
			<label class="control-label">区域绑定 : </label>
			<select class="form-control">
				<option selected="selected">请选区域</option>
				<option value=1>活动消息</option>
				<option value=2>活动消息</option>
			</select>
		</div>
		<div class="form-group">
			<label class="control-label">归属地 : </label>
			<input type="password" class="form-control" placeholder="">
			请填写归属地的区号，如广东广州：020
		</div>
		<div class="form-group">
			<label class="control-label">呼入前主叫前缀 : </label>
			<input type="text" class="form-control" placeholder="">
		</div>
		<div class="form-group">
			<label class="control-label">线路类型 : </label>
			<div class="sub_form_group">
				<input type="radio"> SIP
				<div class="">
					<label class="control-label">IP : </label>
					<input type="password" class="form-control" placeholder="">
				</div>
				<div class="">
					<label class="control-label">端口 : </label>
					<input type="password" class="form-control" placeholder="">
				</div>
				<div class="">
					<label class="control-label">Domain名称 : </label>
					<input type="password" class="form-control" placeholder="">
				</div>
				<div class="">
					<label class="control-label">鉴权方式 : </label>
					<input type="radio" class="" placeholder=""> 用户名密码
					<input type="radio" class="" placeholder=""> IP地址
				</div>
				<div class="">
					<label class="control-label">用户名 : </label>
					<input type="password" class="form-control" placeholder="">
				</div>
				<div class="">
					<label class="control-label">密码 : </label>
					<input type="password" class="form-control" placeholder="">
				</div>
			</div>
		</div>
		<div class="form-group">
			<label class="control-label">区号规则 : </label>
			<div class="sub_form_group">
				<div class="">
					<label class="control-label">手机 : </label>
					<div class="input-width radio-group">
						<input type="radio" class="" placeholder="">全部加0 <br/>
						<input type="radio" class="" placeholder="">全部不加0 <br/>
						<input type="radio" class="" placeholder="">被叫归属地与线路归属地不一致，加0
					</div>
				</div>
				<div class="">
					<label class="control-label">固话 : </label>
					<div class="input-width radio-group">
						<input type="radio" class="" placeholder="">一律加区号 <br/>
						<input type="radio" class="" placeholder="">一律不加区号 <br/>
						<input type="radio" class="" placeholder="">非与线路属于同一个归属地加区号
					</div>
				</div>
			</div>
		</div>
		<div class="form-group">
			<label class="control-label">成本价 : </label>
			<input type="password" class="form-control" placeholder="">
			元/分钟
		</div>
		<div class="form-group">
			<label class="control-label">支持透传 : </label>
			<input type="radio" class="" placeholder=""> 是
			<input type="radio" class="" placeholder=""> 否
		</div>
		<div class="form-group">
			<label class="control-label">质量 : </label>
			<div class="input-width">
				<slider :value.sync="test" :min="0" :max="5" :step="1"></slider>
			</div>
			&nbsp; {{ test }}
		</div>
		<div class="form-group">
			<label class="control-label">并发容量 : </label>
			<input type="text" class="form-control" placeholder="">
			并发容量为线路同一时间内能够容纳的最多的在线通话数量
		</div>
	</form>
</template>
<script>
	export default {
		props: {
			formValue: {},
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
		font-weight: normal;
		font-size: 1.4rem;
		color: #333;
		.form-group {
			margin-bottom: 0;
		}
		
		.control-label {
			display: inline-block;
			width: 110px;
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
