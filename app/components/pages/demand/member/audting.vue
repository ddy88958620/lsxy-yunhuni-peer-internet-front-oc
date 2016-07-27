<template>
	<div>
		<div class="admin-table table-responsive">
			<table class="table">
				<thead>
				<tr>
					<th class="text-align-c">发布时间</th>
					<th>发布人</th>
					<th>发布状态</th>
					<th>发布标题</th>
					<th class="text-align-c">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='message in messages'>
					<td class="message-time text-align-c">{{message.date}}</td>
					<td>{{message.author}}</td>
					<td class="{{ message.status ? 'text-danger' : ''}}">{{message.status ? '未上线' : '已上线'}}</td>
					<td>{{message.title}}</td>
					<td class="text-align-c">
						<span><a href="#">编辑</a></span>
						<span><a href="#">上线</a></span>
						<span><a href="#">删除</a></span>
					</td>
				</tr>
				</tbody>
			</table>
			<div class="more"><a @click="moreMessage">加载更多</a></divcjk>
			</div>
		</div>
</template>
<script>
	export default {
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
		},
		route: {
			data(){
				console.log(this.$route.params.tabid)
			}
		}
	}

</script>
