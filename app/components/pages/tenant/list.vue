<template>
	<div>
		<div class="flex flex-direction-column admin-table-header">
			<h4>会员列表</h4>
			<div class="flex align-items-c bg-section-margin  remove-margin-bottom">
				<div class="select-box">
					<search placeholder="请输入关键字,如会员名称" v-on="get-name" ></search>
				</div>
				<span class='datetime-picker-label'>注册时间:</span>
				<datetime-picker uuid="begintime" type='month' ></datetime-picker>
				<span class='datetime-picker-label'>至</span>
				<datetime-picker uuid="endtime"  type='month' ></datetime-picker>
				<span class='datetime-picker-label'>认证状态: </span>
				<select class="form-control" v-model='authStatus' >
					<option value=2 >全部</option>
					<option value=1>认证</option>
					<option value=0>未认证</option>
				</select>
				<span class='datetime-picker-label'>账号状态: </span>
				<select class="form-control" v-model='accStatus' >
					<option value=0 >全部</option>
					<option value=2 >启用</option>
					<option value=1 >禁用</option>
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
					<th class="text-align-c">余额</th>
					<th class="text-align-c">消费额</th>
					<th class="text-align-c">充值金额</th>
					<th class="text-align-c">会话量</th>
					<th class="text-align-c">话务量</th>
					<th>账号状态</th>
					<th class="text-align-c">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='message in tenant.result'>
					<td class="message-time text-align-c">{{message.registe_date}}</td>
					<td>{{message.name}}</td>
					<td class="text-align-c">{{message.app_count ? message.app_count: 0 }}</td>
					<td class="{{ message.status ? 'text-danger' : ''}}">{{message.auth_status ? '未上线' : '已上线'}}</td>
					<td class="text-align-c">{{message.remain_coin ? message.remain_coin : 0}}</td>
					<td class="text-align-c">{{message.cost_coin ? message.cost_coin : 0 }}</td>
					<td class="text-align-c">{{message.total_coin ? message.total_coin : 0 }}</td>
					<td class="text-align-c">{{message.session_count ? message.session_count : 0 }}</td>
					<td class="text-align-c">{{message.session_time ? message.session_time : 0 }}</td>
					<td v-if="message.account_status == 2">启用</td>
					<td v-else class="text-danger">禁用</td>
					<td class="text-align-c">
						<span><a v-link="'/admin/tenant/detail/'+message.uid">查看</a></span>
						<span><a >禁用</a></span>
					</td>
				</tr>
				</tbody>
			</table>
			<div class="more">
				<a v-show='this.tenant.totalPageCount==this.tenant.currentPageNo || this.tenant.totalPageCount==0'>加载完毕</a>
				<a @click="moreMessage" class="text-none" v-show='this.tenant.totalPageCount!=this.tenant.currentPageNo && this.tenant.totalPageCount!=0' >加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
			</div>

		</div>
	</div>
</template>
<script>
	import {getTenantList,getMoreTenant} from '../../../vuex/actions' 
	export default {
		vuex :{
			getters: {
			   tenant :({tenant}) =>tenant.list
			},
			actions: {
				getTenantList,
				getMoreTenant
			}
		},
		components: {
			'datetime-picker': require('../../ui/datetimepicker.vue'),
			'search': require('../../ui/search-input.vue')
		},
		data(){
			return {
				name: '',
				begintime: '2016-06',
				endtime:'2016-08',
				authStatus: 2,
				accStatus: 0,
				more:true
			}
		},
		methods: {
			moreMessage(){
				let nextPage = this.tenant.currentPageNo+1
				let params = {};
				params.pageNo = nextPage
				this.getMoreTenant(params)
			},
			query(){
				let params = {name:this.name,begin:this.begintime,end:this.endtime,accStatus:this.accStatus}
				/*params.name =this.name*/
				/*params.name =111111
				params.begin = ''
				params.end = ''*/
				//params.authStatus = this.authStatus
				//params.accStatus = this.accStatus
			    console.log(params)
			    
				this.getTenantList(params)
			},
			switch(val){
				console.log(val)
			},
			getName(){
			   console.log(this.name)
			}
		},
		events:{
		  'search-content': function(cnt) {
		  	 this.name = cnt
		  	 let params = {};
			 params.name = this.name
			 this.getTenantList(params)
		  },
		  'search-keyup': function(cnt){
 			 this.name = cnt
		  },
		  'date-time': function(time,uid) {
		  	if(uid=='starttime'){
		  		this.begintime = time
		  	}else{
		  		this.endtime = time
		  	}
		  }
		},
		ready(){
			this.getTenantList()
		}

	}

</script>
