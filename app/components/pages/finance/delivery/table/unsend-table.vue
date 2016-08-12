<template>
	<div>
		<div class="admin-table table-responsive">
			<div class="table-total flex flex-1 justify-content-e">
				共<span class="text-danger">20</span>条
			</div>
			<table class="table">
				<thead>
				<tr>
					<th class="text-align-c">申请时间</th>
					<th>会员名称</th>
					<th>开票金额</th>
					<th>发票类型</th>
					<th>发票抬头</th>
					<th>收件人</th>
					<th class="text-align-c">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='message in messages'>
					<td class="message-time text-align-c">{{message.date}}</td>
					<td><a>{{message.name}}</a></td>
					<td>{{message.money}}</td>
					<td>{{message.type}}</td>
					<td>{{message.supports}}</td>
					<td>{{message.recipient}}</td>
					<td class="text-align-c">
						<a v-link="'/admin/finance/delivery/detail/'+message.id"  >查看详情</a>
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
		compontens:{
			
		},
		data(){
			return {
				messages: [],
				total: 100
			}
		},
		methods: {
			moreMessage(){
				this.messages.push(
					{
						id: 4,
						date: '2016-06-06 16:00',
						money:'110',
						name: 'cpcxm',
						supports: '流水行云',
						recipient:'小明',
						type:'企业增值税专用票'
					}
				)
			}
		},
		route: {
			data(){
				let wait_array = 	[
					{
						id: 1,
						date: '2016-06-06 16:00',
						money:'110',
						name: 'cpcxm',
						supports: '流水行云',
						recipient:'小明',
						type:'企业增值税专用票'
					},
					{
						id: 2,
						date: '2016-06-06 16:00',
						money:'110',
						name: 'cpcxm',
						supports: '流水行云',
						recipient:'小明',
						type:'企业增值税专用票'
					},
					{
						id: 3,
						date: '2016-06-06 16:00',
						money:'110',
						name: 'cpcxm',
						supports: '流水行云',
						recipient:'小明',
						type:'企业增值税普通票'
					},
					{
						id: 4,
						date: '2016-06-06 16:00',
						money:'110',
						name: 'cpcxm',
						supports: '流水行云',
						recipient:'小明',
						type:'个人增值税普通票'
					},
				]
				this.messages=wait_array;
			}
		},
		ready(){

		}

	}

</script>
