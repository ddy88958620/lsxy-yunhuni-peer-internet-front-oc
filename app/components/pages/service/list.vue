<style lang="sass" scoped>
</style>
<template>
	<div>
		<div class="flex flex-direction-column admin-table-header">
			<h4>反馈意见</h4>
			<div class="flex align-items-c bg-section-margin remove-margin-bottom">
				<span class='datetime-picker-label clear-padding-left'>提交时间:</span>
				<datetime-picker uuid='starttime' type='day' ></datetime-picker>
				<span class='datetime-picker-label'>至</span>
				<datetime-picker uuid='endtime' type='day' ></datetime-picker>
				<span class='datetime-picker-label'>状态: </span>
				<select class="form-control">
					<option value="2">全部</option>
					<option value="1">已读</option>
					<option value="0">未读</option>
				</select>

				<a class="btn btn-primary admin-button-margin" >查询</a>

				<a class="btn btn-primary " v-link="'/admin/service'">全部标记为已读</a>
			</div>
		</div>
		<div class="admin-table table-responsive">
			<div class="table-total flex flex-1 justify-content-e">
				共<span class="text-danger">{{service.totalCount}}</span>条
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
				<tr v-for='message in service.result'>
					<td :class="[message.status===0 ? 'text-danger' : '', 'text-align-c']">{{message.status===0 ? '未读' : '已读'}}</td>
					<td>{{message.account.tenant.tenantName}}</td>
					<td class="message-time text-align-c">{{message.createTime}}</td>
					<td>{{message.content}}</td>
					<td class="text-align-c">
						<span><a >已阅</a></span>
					</td>
				</tr>
				</tbody>
			</table>
				<div class="more">
				<a v-show='this.service.totalPageCount==this.service.currentPageNo || this.service.totalPageCount==0'>加载完毕</a>
				<a @click="moreMessage" class="text-none" v-show='this.service.totalPageCount!=this.service.currentPageNo && this.service.totalPageCount!=0' >加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
			</div>
		</div>
</template>
<script>
	import {getServiceList,getMoreService} from '../../../vuex/actions'
	export default {
		vuex: {
			getters: {
				service: ({service}) =>service.list
			},
			actions: {
				getServiceList,
				getMoreService
			}
		},
		components: {
			'datetime-picker': require('../../ui/datetimepicker.vue')
		},
		data(){
			return {
				status:2
			}
		},
		methods: {
			moreMessage(){
				let nextPage = this.service.currentPageNo+1
				let params = {};
				params.pageNo = nextPage
				this.getMoreService(params)
				
			}
		},
		ready(){
			this.getServiceList()
		}

	}

</script>