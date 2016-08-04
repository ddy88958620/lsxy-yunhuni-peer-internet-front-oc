
<template>
	<div>
		<div class="flex flex-direction-column admin-table-header">
			<h4>放音文件审核</h4>
			<div class="flex flex-1 admin-main-tab">
				<div class="tab"><a class="flex"  v-link="'/admin/demand/voice/list/await'">待审核</a></div>
				<div class="tab"><a class="flex"  v-link="'/admin/demand/voice/list/auditing'">已审核</a></div>
				<div class="tab"><a class="flex"  v-link="'/admin/demand/voice/list/noauditing'">审核不通过</a></div>
			</div>

			<div class="query-box flex align-items-c  ">
				<div><search></search></div>
				<span class='datetime-picker-label '>申请时间:</span>
				<datetime-picker></datetime-picker>
				<span class='datetime-picker-label'>至</span>
				<datetime-picker></datetime-picker>
				<span class='datetime-picker-label'>认证类型: </span>
				<select class="form-control">
					<option>全部</option>
					<option>已上线</option>
					<option>未上线</option>
				</select>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
	export default {
		components: {
			'datetime-picker': require('../../../ui/datetimepicker.vue'),
			'search' : require('../../../ui/search-input.vue')
		},
	}
</script>
