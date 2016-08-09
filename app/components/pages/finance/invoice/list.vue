<style lang="sass" scoped>

</style>
<template>
	<div class="flex flex-direction-column admin-table-header">
		<p class="bg-section-margin">票审核说明：开票审核由财务审核完成后，确认没有问题，审核通过，开出发票，此后开票申请标记为已通过状态，申请表单自动进入发票
			邮寄列表，由工作人员统一寄出发票后，填写快递公司及快递单号信息，流程结束
		</p>
		<div class="flex flex-1 admin-main-tab">
			<div class="tab"><a class="flex" v-link="'/admin/finance/invoice/list/pending'">待处理</a></div>
			<div class="tab"><a class="flex" v-link="'/admin/finance/invoice/list/passed'">已通过</a></div>
			<div class="tab"><a class="flex" v-link="'/admin/finance/invoice/list/abnormal'">异常</a></div>
		</div>
		<div class="flex align-items-c bg-section-margin remove-margin-bottom  ">
			<div class="select-box">
				<search
					placeholder="请输入关键字,如真是姓名、会员名称"
				></search>
			</div>
			<span class='datetime-picker-label'>发票类型: </span>
			<select class="form-control">
				<option>全部</option>
				<option>个人增值税普通发票</option>
				<option>企业增值税普通票</option>
				<option>企业增值税专用票</option>
			</select>
			<button class="btn btn-primary admin-button-margin">查询</button>
		</div>
	</div>
	<router-view></router-view>
</template>
<script>
	export default {
		components: {
			'datetime-picker': require('../../../ui/datetimepicker.vue'),
			'search': require('../../../ui/search-input.vue')
		},
		ready(){
		}
	}
</script>
