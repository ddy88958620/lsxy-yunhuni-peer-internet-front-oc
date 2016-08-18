
<template>
	<div>
		<div class="flex flex-direction-column admin-table-header">
			<h4>放音文件审核</h4>
			<div class="flex flex-1 admin-main-tab">
				<div class="tab"><a class="flex"  v-link="'/admin/demand/voice/list/await'">待审核</a></div>
				<div class="tab"><a class="flex"  v-link="'/admin/demand/voice/list/auditing'">已审核</a></div>
			<!-- 	<div class="tab"><a class="flex"  v-link="'/admin/demand/voice/list/unauth'">审核不通过</a></div> -->
			</div>
		</div>
		<router-view></router-view>
	</div>

	<!-- <modal :show.sync="showModal">
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
	</modal> -->

</template>
<script>
	export default {
		data(){
			return{
				showModal: false
			}
		}
	}
</script>
