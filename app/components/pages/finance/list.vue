<style lang="sass" scoped>
</style>
<template>
	<div>
		<div class="admin-table-header">
			<h4>反馈意见</h4>
			<div class="remove-margin-bottom">
				<span class='datetime-picker-label clear-padding-left'>提交时间:</span>
				<datetime-picker></datetime-picker>
				<span class='datetime-picker-label'>至</span>
				<datetime-picker></datetime-picker>
				<span class='datetime-picker-label'>状态: </span>
				<select class="form-control">
					<option>全部</option>
					<option>已上线</option>
					<option>未上线</option>
				</select>
				<a class="btn btn-primary admin-button-margin" >查询</a>
				<a class="btn btn-primary " v-link="'/admin/service'">全部标记为已读</a>
			</div>
		</div>
		<div class="admin-table">
			<div class="table-total flex flex-1 justify-content-e float-r">
				共<span class="text-danger">100</span>条
			</div>
			<table class="table">
				<thead>
				<tr>
					<th class="text-align-c">状态</th>
					<th>会员名称</th>
					<th class="text-align-c">提交时间</th>
					<th>反馈内容</th>
					<th class="text-align-c">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='message in messages'>
					<td :class="[message.status ? 'text-danger' : '', 'text-align-c']">{{message.status ? '未上线' : '已上线'}}</td>
					<td>{{message.author}}</td>
					<td class="message-time text-align-c">{{message.date}}</td>
					<td>{{message.title}}</td>
					<td class="text-align-c">
						<span><a href="#">已阅</a></span>
					</td>
				</tr>
				</tbody>
			</table>
			<div class="more"><a @click="moreMessage" class="text-none">加载更多<i class="icon iconfont icon-oc-dropdown" ></i></a></div>
			</div>
		</div>
</template>
<script>
	export default {
		components: {
			'datetime-picker': require('../../ui/datetimepicker.vue')
		},
		data(){
			return {
				messages: [
					{
						date: '2016-06-06 16:00',
						author: 'CPHJY',
						status: false,
						title: '云呼你有新的讯息，新的活动，市场活动，滚动播出-----点击查看详情'
					},
					{
						date: '2016-06-06 16:00',
						author: 'CPHJY',
						status: false,
						title: '云呼你有新的讯息，新的活动，市场活动，滚动播出-----点击查看详情'
					},
					{
						date: '2016-06-06 16:00',
						author: 'CPHJY',
						status: true,
						title: '云呼你有新的讯息，新的活动，市场活动，滚动播出-----点击查看详情'
					},
					{
						date: '2016-06-06 16:00',
						author: 'CPHJY',
						status: false,
						title: '云呼你有新的讯息，新的活动，市场活动，滚动播出-----点击查看详情'
					},
				]
			}
		},
		methods: {
			moreMessage(){
				this.messages.push(
					{
						date: '2016-06-06 16:00',
						author: 'CPHJY',
						status: false,
						title: '云呼你有新的讯息，新的活动，市场活动，滚动播出-----点击查看详情'
					}
				)
			}
		}
	}

</script>