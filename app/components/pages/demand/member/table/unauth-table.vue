<template>
	<div class="flex flex-direction-column admin-table-header">
		<div class="flex align-items-c bg-section-margin remove-margin-bottom  ">
			<div class="select-box">
				<search
					placeholder="请输入关键字,如会员名称"
				></search>
			</div>
			<span class='datetime-picker-label '>申请时间:</span>
			<datetime-picker :uuid="'demandMemberStartDate'"  :type.sync="startdate.type" :value.sync="startdate.value"></datetime-picker>
			
			<span class='datetime-picker-label'>至</span>
			<datetime-picker :uuid="'demandMemberEndDate'"  :type.sync="enddate.type" :value.sync="enddate.value"></datetime-picker>
		
			<span class='datetime-picker-label'>认证类型: </span>
			<select class="form-control" v-model='type' >
				<option value="-1">全部</option>
				<option value="0">个人认证</option>
				<option value="1">企业认证</option>
			</select>
			<button class="btn btn-primary admin-button-margin" @click='query'>查询</button>

		</div>
	</div>
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
					<th>手机号</th>
					<th>邮箱</th>
					<th>认证类型</th>
					<th class="text-align-c">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='message in demand.result'>
					<td class="message-time text-align-c">{{message.date}}</td>
					<td><a>{{message.name}}</a></td>
					<td>{{message.mobile}}</td>
					<td>{{message.email}}</td>
					<td v-if="message.type==0">个人认证</td>
					<td v-if="message.type==1">企业认证</td>
					<td class="text-align-c">
						<span><a v-link="'/admin/demand/member/detail/'+message.uid">审核</a></span>
					</td>
				</tr>
				</tbody>
			</table>
			<div class="more">
				<a v-show='this.demand.totalPageCount==this.demand.currentPageNo || this.demand.totalPageCount==0'>加载完毕</a>
				<a @click="moreMessage" class="text-none" v-show='this.demand.totalPageCount!=this.demand.currentPageNo && this.demand.totalPageCount!=0' >加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
			</div>
		</div>
</template>
<script>
	import {getDemandList,getMoreDemandList} from '../../../../../vuex/actions.js'
	export default {
		vuex:{
			getters:{
				demand: ({demand}) => demand.memberlist.unauth
			},
			actions:{
				getDemandList,
				getMoreDemandList
			}
		},
		data(){
			return {
				messages: [],
				total : 0,
				authStatus:'unauth',
				type:'-1',
				startdate :{
					type:'day',
					value:'',
				},
				enddate :{
					type:'day',
					value:'',
				},

			}
		},
		components: {
			'datetime-picker': require('../../../../ui/datetimepicker.vue'),
			'search': require('../../../../ui/search-input.vue')
		},
		methods: {
			moreMessage(){
			
			},
			query(){
				let params = {}
				params.authStatus = this.authStatus
				if(this.type!=-1){
					params.type = this.type
				}
				params.startTime = this.startdate.value
				params.endTime = this.enddate.value
				this.getDemandList(params)
			}
		},
		route: {
				
		},
		ready(){
			let params = {}
			params.authStatus = this.authStatus
			this.getDemandList(params)
		}

	}

</script>
