<style lang="sass" scoped>

</style>
<template>
	<div class="flex flex-direction-column admin-table-header">

		<div class="flex flex-1 admin-main-tab">
			<div class="tab"><a class="flex" v-link="'/admin/finance/delivery/list/unsend'">待寄出</a></div>
			<div class="tab"><a class="flex" v-link="'/admin/finance/delivery/list/send'">已寄出</a></div>
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
			<button class="btn btn-primary admin-button-margin" >查询</button>

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
