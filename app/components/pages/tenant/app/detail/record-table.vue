<template>
	<div class="flex search-box bg-section-margin remove-margin-bottom">
		<div class="select-box">
			<search  placeholder='请输入关键字'></search>
		</div>
		<button class="btn btn-primary admin-button-margin " @click="showModal=true">批量下载</button>
	</div>
	<div class="admin-table table-responsive">
		<div class="table-total flex flex-1 justify-content-e">
			共<span class="text-danger">20</span>条
		</div>
		<table class="table remove-margin-bottom">
			<thead>
			<tr>
				<th class="text-align-c">时间</th>
				<th>录音文件名</th>
				<th>大小(MB)</th>
				<th class="text-align-c">时长(秒)</th>
				<th class="text-align-c">操作</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for='message in messages'>
				<td class="message-time text-align-c">{{message.date}}</td>
				<td><a class="text-none">{{message.filename}}</a></td>
				<td>{{message.size}}</td>
				<td class="text-align-c">{{message.time}}</td>
				<td class="text-align-c"><a>下载</a></td>
			</tr>
			</tbody>
		</table>
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
				<textarea  rows="5" class="form-control"></textarea>
			</div>
		</div>
		<div slot="footer"></div>
	</modal>
</template>


<script>
	export default{
		components:{
			'search': require('../../../../ui/search-input.vue'),
			'modal' : require('../../../../ui/modal.vue'),
			'datetime-picker': require('../../../../ui/datetimepicker.vue')
		},
		data(){
			return{
				showModal: false,
				messages :[
					{
						date: '2016-06-06',
						filename: '20160606122333-[sessionid]',
						size: '1.1',
						time: '30',
						remark: '语音通知推文件'
					},
					{
						date: '2016-06-06',
						filename: '20160606122333-[sessionid]',
						size: '1.1',
						time: '30',
						remark: '语音通知推文件'
					}
				]
			}
		}
	}
</script>


<style lang="sass">

</style>
