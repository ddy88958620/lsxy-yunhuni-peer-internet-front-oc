<template>



	<div class="flex flex-1 bg-section-margin">
		<div class="btn-group  " role="group" >
			<button type="button" class="btn btn-default">消费统计</button>
			<button type="button" class="btn btn-default">充值明细</button>
			<button type="button" class="btn btn-default">会话统计</button>
			<button type="button" class="btn btn-default">API调用统计</button>
			<button type="button" class="btn btn-default">线路负载量</button>
		</div>
	</div>

	<div class="admin-panel">
		<div class="panel-heading">消费月结账单</div>
		<div class="admin-table table-responsive">
			<table class="table">
				<tr>
					<td>单向外呼 <span>100元</span></td>
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






</template>

<script>
	export default{

	}
</script>

<style lang="sass" scoped>


</style>
