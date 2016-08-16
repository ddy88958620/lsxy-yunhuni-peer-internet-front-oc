
<template>
	<div>
		<div class="flex flex-direction-column admin-table-header">
			<h4>放音文件审核</h4>
			<div class="flex flex-1 admin-main-tab">
				<div class="tab"><a class="flex"  v-link="'/admin/demand/voice/list/await'">待审核</a></div>
				<div class="tab"><a class="flex"  v-link="'/admin/demand/voice/list/auditing'">已审核</a></div>
				<div class="tab"><a class="flex"  v-link="'/admin/demand/voice/list/unauth'">审核不通过</a></div>
			</div>

			<div class="flex align-items-c bg-section-margin remove-margin-bottom ">
				<div><search
					placeholder="请输入关键字,如会员名称"
				></search></div>
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
				<button class="btn btn-primary admin-button-margin">查询</button>
			</div>
		</div>
		<router-view></router-view>
	</div>

	<modal :show.sync="showModal">
		<div slot="body">
			<div class="flex flex-1 modal-padding-bottom">批量下载3天范围内的录音文件</div>
			<div class="flex flex-1 align-items-c modal-padding-bottom">
				<datetime-picker></datetime-picker>
				<span class='modal-label'>至</span>
				<datetime-picker></datetime-picker>
			</div>
			<div class="flex flex-1 ">
				<textarea rows="5" class="form-control"></textarea>
			</div>
		</div>
		<div slot="footer"></div>
	</modal>

</template>
<script>
	export default {
		components: {
			'modal': require('../../../ui/modal.vue'),
			'datetime-picker': require('../../../ui/datetimepicker.vue'),
			'search' : require('../../../ui/search-input.vue')
		},
		data(){
			return{
				showModal: false
			}
		}
	}
</script>
