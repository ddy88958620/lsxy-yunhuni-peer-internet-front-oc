<template>
	<div>
		<div class="admin-table table-responsive">
			<table class="table">
				<thead>
				<tr class="total">
					<th colspan="6" class="text-align-r">共<span class="text-danger">{{ total }}</span>条</th>
				</tr>

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
					<td class="text-align-c" v-if="this.$route.params.tabid==1">
						<span><a href="#">试听</a></span>
						<span><a href="#">通过</a></span>
						<span><a href="#">不通过</a></span>
					</td>
					<td class="text-align-c" v-if="this.$route.params.tabid==2 ||  this.$route.params.tabid==3">
						<span><a href="#">试听</a></span>
					</td>
				</tr>

				</tbody>
			</table>
			<div class="more"><a @click="moreMessage">加载更多</a></div>
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

				let id = this.$route.params.tabid;




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






				//1 待审核 2已审核 3 审核不通过
				switch (id) {
					case "1":
						this.messages=wait_array;
						break;
					case "2":
						this.messages=wait_array;
						break;
					case "3":
						this.messages=wait_array;
						break;

				}

			}
		},
		ready(){

		}

	}

</script>
