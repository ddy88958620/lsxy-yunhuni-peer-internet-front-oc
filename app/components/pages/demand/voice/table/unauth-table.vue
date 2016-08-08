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
					<th>应用名称</th>
					<th>标题</th>
					<th>大小</th>
					<th class="text-align-c">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='message in messages'>
					<td class="message-time text-align-c">{{message.date}}</td>
					<td><a>{{message.name}}</a></td>
					<td>{{message.mobile}}</td>
					<td>{{message.email}}</td>
					<td>{{message.type}}</td>
					<td class="text-align-c">
						<span><a @click="showModal=true" >试听</a></span>
						<span><a>通过</a></span>
						<span><a>不通过</a></span>
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
						name: '流水行云科技有限公司',
						mobile: '1155945658462',
						email: '475647150@qq.com',
						type:'个人'
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
						name: '流水行云科技有限公司',
						mobile: '1155945658462',
						email: '475647150@qq.com',
						type:'个人'
					},
					{
						id: 2,
						date: '2016-06-06 16:00',
						name: '流水行云科技有限公司',
						mobile: '1155945658462',
						email: '475647150@qq.com',
						type:'个人'
					},
					{
						id: 3,
						date: '2016-06-06 16:00',
						name: '流水行云科技有限公司',
						mobile: '1155945658462',
						email: '475647150@qq.com',
						type:'个人'
					},
					{
						id: 4,
						date: '2016-06-06 16:00',
						name: '流水行云科技有限公司',
						mobile: '1155945658462',
						email: '475647150@qq.com',
						type:'个人'
					},
				]




				this.messages=wait_array;

			}
		},
		ready(){

		}

	}

</script>
