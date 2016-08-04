<template>

	<div class="flex search-box bg-section-margin">
		<div class="select-box">
			<search></search>
		</div>
	</div>

	<div class="admin-table table-responsive">
		<div class="table-total flex flex-1 justify-content-e">
			共<span class="text-danger">20</span>条
		</div>
		<table class="table remove-margin-bottom">
			<thead>
			<tr>
				<th class="text-align-c">审核时间</th>
				<th>文件</th>
				<th>大小</th>
				<th class="text-align-c">备注</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for='message in messages'>
				<td class="message-time text-align-c">{{message.date}}</td>
				<td>{{message.type}}</td>
				<td>{{message.size}}</td>
				<td class="text-align-c">{{message.remark}}</td>
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
						type: '1.wav',
						size: '1.1',
						remark: '语音通知推文件'
					},
					{
						date: '2016-06-06',
						type: '1.wav',
						size: '1.1',
						remark: '语音通知推文件'
					}
				]
			}
		}
	}
</script>


<style lang="sass">

</style>
