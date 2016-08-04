<template>
	<div class="flex search-box bg-section-margin">
		<div class="select-box">
			<search></search>
		</div>
		<button class="btn btn-primary admin-button-margin">批量下载</button>
	</div>
	<div class="admin-table table-responsive">
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





</template>


<script>
	export default{
		components:{
			'search': require('../../../../ui/search-input.vue')
		},
		data(){
			return{
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
