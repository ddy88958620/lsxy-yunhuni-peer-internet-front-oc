<template>

	<div class="headbox flex flex-1 align-items-c ">
		<span class="padding-right-20">选择应用</span>
		<select class="form-control flex selcet-box">
			<option value="">飞飞应用</option>
		</select>
	</div>


	<div class="admin-panel">
		<div class="panel-heading flex-direction-row flex align-items-c justify-content-b ">
			<span class="flex ">消费月结账单</span>
			<span class="flex "><datetime-picker></datetime-picker></span>
		</div>
		<div class="admin-table table-responsive  flex flex-1">
			<table class="table">
				<tr>
					<td>单向外呼 <span>120元</span></td>
					<td>双向呼叫 <span>102元</span></td>
				</tr>
				<tr>
					<td>电话会议 <span>100元</span></td>
					<td>电话接入IVR <span>102元</span></td>
				</tr>
				<tr>
					<td>IVR外呼放音 <span>100元</span></td>
					<td>短信 <span>102元</span></td>
				</tr>
				<tr>
					<td>电话通知 <span>100元</span></td>
					<td>录音通知 <span>102元</span></td>
				</tr>
				<tr>
					<td>IVR功能费 <span>100元</span></td>
					<td>IVR号码租用费 <span>102元</span></td>
				</tr>
				<tr>
					<td>录音文件存储 <span>100元</span></td>
					<td></td>
				</tr>
			</table>
		</div>
	</div>

	<div class="flex flex-1 flex-direction-column whilebg admin-padding">
		<div class="app-chart-header flex align-items-c">
			<input name='app-chart-type' type="radio" checked=checked/>
			<label for="">日统计</label>
			<input name='app-chart-type' type="radio"/>
			<label for="">月统计</label>
			<div class="datepicker-wrap">
				<datetime-picker></datetime-picker>
			</div>
		</div>

		<chart :uuid="'realtime-app-chart1'" :label="['1']" :color="['#deef70']" :title="['消费额统计','消费额(元)']"></chart>
	</div>


</template>
<style lang="sass" scoped>

</style>
<script>
	export default{
		components: {
			'datetime-picker': require('../../../../ui/datetimepicker.vue'),
			'chart': require('../../../../ui/realtime-chart.vue')
		}
	}
</script>
