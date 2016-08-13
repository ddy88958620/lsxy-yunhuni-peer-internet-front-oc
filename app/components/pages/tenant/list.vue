<template>
	<div>
		<div class="flex flex-direction-column admin-table-header">
			<h4>会员列表</h4>
			<div class="flex align-items-c bg-section-margin  remove-margin-bottom">
				<span class='datetime-picker-label clear-padding-left'>注册时间:</span>
				<datetime-picker v-model='begintime'></datetime-picker>
				<span class='datetime-picker-label'>至</span>
				<datetime-picker></datetime-picker>
				<span class='datetime-picker-label'>认证状态: </span>
				<select class="form-control" v-model='authStatus' >
					<option value="2" >全部</option>
					<option value="1">认证</option>
					<option value="0">未认证</option>
				</select>
				<span class='datetime-picker-label'>账号状态: </span>
				<select class="form-control" v-model='accStatus' >
					<option value="0">全部</option>
					<option value="2" >启用</option>
					<option value="1">禁用</option>
				</select>
				<button class="btn btn-primary admin-button-margin" @click="query" >查询</button>

			</div>
		</div>
		<div class="admin-table table-responsive ">
			<div class="table-total flex flex-1 justify-content-e">
				共<span class="text-danger">{{tenant.totalCount}}</span>条
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
					<th>账号状态</th>
					<th class="text-align-c">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='message in tenant.result'>
					<td class="message-time text-align-c">{{message.registe_date}}</td>
					<td>{{message.name}}</td>
					<td>{{message.app_count}}</td>
					<td class="{{ message.status ? 'text-danger' : ''}}">{{message.auth_status ? '未上线' : '已上线'}}</td>
					<td>{{message.total_coin}}</td>
					<td>{{message.cost_coin}}</td>
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
	import {getTenantList} from '../../../vuex/actions' 
	export default {
		vuex :{
			getters: {
			   tenant :({tenant}) =>tenant.list
			 
			},
			actions: {
				getTenantList
			}
		},
		components: {
			'datetime-picker': require('../../ui/datetimepicker.vue')
		},
		data(){
			return {
				name: '',
				begintime: '2016-06',
				endtime:'2016-08',
				authStatus: 2,
				accStatus: 0
			}
		},
		methods: {
			moreMessage(){
				this.messages.push(
				   
				)
			},
			query(){
				let params = {};
				params.name ='111111'
				/*params.begin = ''
				params.end = ''*/
				/*params.authStatus =2*/
				params.accStatus =0

			    console.log(params)

			    //let params = {name:'111111'}
				this.getTenantList(params)
			
			}
		},
		ready(){
			this.getTenantList()
		}

	}

</script>
