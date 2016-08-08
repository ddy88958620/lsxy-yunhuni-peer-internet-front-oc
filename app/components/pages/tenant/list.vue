<template>
	<div>
		<div class="flex flex-direction-column admin-table-header">
			<h4>会员列表</h4>
			<div class="flex align-items-c bg-section-margin  remove-margin-bottom">
				<span class='datetime-picker-label clear-padding-left'>注册时间:</span>
				<datetime-picker></datetime-picker>
				<span class='datetime-picker-label'>至</span>
				<datetime-picker></datetime-picker>
				<span class='datetime-picker-label'>认证状态: </span>
				<select class="form-control">
					<option>全部</option>
					<option>认证</option>
					<option>未认证</option>
				</select>
				<span class='datetime-picker-label'>账号状态: </span>
				<select class="form-control">
					<option>全部</option>
					<option>启用</option>
					<option>禁用</option>
				</select>
				<button class="btn btn-primary admin-button-margin">查询</button>

			</div>
		</div>
		<div class="admin-table table-responsive ">
			<div class="table-total flex flex-1 justify-content-e">
				共<span class="text-danger">20</span>条
			</div>
			<table class="table">
				<thead>
				<tr>
					<th class="text-align-c">注册时间</th>
					<th>会员名称</th>
					<th class="text-align-c">应用数</th>
					<th>认证状态</th>
					<th>余额</th>
					<th>消费额</th>
					<th>充值金额</th>
					<th>会话量</th>
					<th>话务量</th>
					<th>发布标题</th>
					<th>账号状态</th>
					<th class="text-align-c">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='message in messages'>
					<td class="message-time text-align-c">{{message.date}}</td>
					<td>{{message.author}}</td>
					<td>{{message.app_count}}</td>
					<td class="{{ message.status ? 'text-danger' : ''}}">{{message.status ? '未上线' : '已上线'}}</td>
					<td>{{message.remain}}</td>
					<td>{{message.cost}}</td>
					<td>{{message.cost}}</td>
					<td>{{message.cost}}</td>
					<td>{{message.cost}}</td>
					<td>{{message.cost}}</td>
					<td class="{{ message.account_status ? 'text-danger' : ''}}">{{message.account_status ? '禁用' : '启用' }}</td>
					<td class="text-align-c">
						<span><a v-link="'/admin/tenant/detail/1'">查看</a></span>
						<span><a href="#">禁用</a></span>
					</td>
				</tr>
				</tbody>
			</table>
			<div class="more"><a @click="moreMessage" class="text-none">加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
			</div>
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
						id:1,
						date: '2016-06-06 16:00',
						author: 'CPHJY2',
						app_count: 2,
						status: false,
						remain: 123132,
						cost: 123123,
						account_status: false,
					},
					{
						id:2,
						date: '2016-06-06 16:00',
						author: 'CPHJY22',
						app_count: 2,
						status: true,
						remain: 123132,
						cost: 123123,
						account_status: true,
					},
				]
			}
		},
		methods: {
			moreMessage(){
				this.messages.push(
					{
						id:3,
						date: '2016-06-06 16:00',
						author: 'CPHJY22',
						app_count: 2,
						status: true,
						remain: 123132,
						cost: 123123,
						account_status: true,
					},
					{
						id:4,
						date: '2016-06-06 16:00',
						author: 'CPHJY22',
						app_count: 2,
						status: true,
						remain: 123132,
						cost: 123123,
						account_status: true,
					}
				)
			}
		}
	}

</script>
