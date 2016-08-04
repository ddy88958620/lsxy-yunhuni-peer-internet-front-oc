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
					<th>手机号</th>
					<th>邮箱</th>
					<th>认证类型</th>
					<th class="text-align-c">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='message in messages'>
					<td class="message-time text-align-c">{{message.date}}</td>
					<td>{{message.name}}</td>
					<td>{{message.mobile}}</td>
					<td>{{message.email}}</td>
					<td>{{message.type}}</td>
					<td >
						<span><a @click="audit(message.id)">审核</a></span>
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
		data(){
			return {
				messages: [],
				total: 100
			}
		},
		methods: {

			audit(id){
				console.log(this);
				console.log(id);
			},
			moreMessage(){
				this.messages.push(
					{
						id: 4,
						date: '2016-06-06 16:00',
						name: '流水行云科技有限公司',
						mobile: '1155945658462',
						email: '475647150@qq.com',
						type: '个人'
					}
				)
			}
		},
		route: {
			data(){
				let id = this.$route.params.tabid;
				let wait_array = [
					{
						id: 1,
						date: '2016-06-06 16:00',
						name: '流水行云科技有限公司',
						mobile: '1155945658462',
						email: '475647150@qq.com',
						type: '个人'
					},
					{
						id: 2,
						date: '2016-06-06 16:00',
						name: '流水行云科技有限公司',
						mobile: '1155945658462',
						email: '475647150@qq.com',
						type: '公司'
					},
					{
						id: 3,
						date: '2016-06-06 16:00',
						name: '流水行云科技有限公司',
						mobile: '1155945658462',
						email: '475647150@qq.com',
						type: '个人'
					},
					{
						id: 4,
						date: '2016-06-06 16:00',
						name: '流水行云科技有限公司',
						mobile: '1155945658462',
						email: '475647150@qq.com',
						type: '个人'
					},
				]

				this.total = 100;
				this.messages = wait_array;

			}
		},
		ready(){

		}

	}

</script>
