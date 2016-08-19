<style lang="sass" scoped>
</style>
<template>
	<div>
		<div class="flex flex-direction-column admin-table-header">
			<h4>消息列表</h4>
			<div class="flex align-items-c bg-section-margin remove-margin-bottom">
				<span class='datetime-picker-label clear-padding-left'>发布时间:</span>
				<datetime-picker :uuid="'messageStartDate'"  :type.sync="startdate.type" :value.sync="startdate.value"></datetime-picker>
				<span class='datetime-picker-label'>至</span>
				<datetime-picker :uuid="'messageEndStartDate'"  :type.sync="enddate.type" :value.sync="enddate.value"></datetime-picker>
				<span class='datetime-picker-label'>发布状态: </span>
				<select class="form-control" v-model='status' >
					<option value=''>全部</option>
					<option value=1 >已上线</option>
					<option value=0 >未上线</option>
					<option value=-1>已下线</option>
				</select>
				<span class='datetime-picker-label'>消息类型: </span>
				<select class="form-control"  v-model='type'>
					<option value=1 >活动消息</option>
					<option value=0 >用户消息</option>
				</select>

				<button class="btn btn-primary admin-button-margin" @click="query" >查询</button>
				<a class="btn btn-primary " v-link="{path: '/admin/message/new', exact: true}">发布新消息</a>
			</div>
		</div>
		<div class="admin-table table-responsive ">
			<div class="table-total flex flex-1 justify-content-e">
				共<span class="text-danger">{{messages.result ? messages.result.length : 0}}</span>条
			</div>
			<table class="table">
				<thead>
				<tr>
					<th class="text-align-c">发布时间</th>
					<th>发布人</th>
					<th>发布状态</th>
					<th>发布标题</th>
					<th>消息类型</th>
					<th class="text-align-c">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='message in messages.result'>
					<td class="message-time text-align-c">{{message.createTime | totalDate}}</td>
					<td>{{message.name}}</td>

					<td v-if='message.status==-1'>已下线</td>
					<td v-if='message.status==0' class='text-danger'>未上线</td>
					<td v-if='message.status==1' >已上线</td>
					<td>{{message.title}}</td>
					<td>{{message.type ? '活动消息' : '用户消息'　}}</td>
					<td class="text-align-c">
						<span><a v-if="message.status != -1">编辑</a></span>
						<span><a v-if="message.status == -1">查看</a></span>
						<span v-if='message.status==0' ><a>上线</a></span>
						<span v-if='message.status==1' ><a>下线</a></span>
					</td>
				</tr>
				</tbody>
			</table>
			<div class="more">
				<a v-show='this.messages.totalPageCount==this.messages.currentPageNo || this.messages.totalPageCount==0'>加载完毕</a>
				<a @click="moreMessage" class="text-none" v-show='this.messages.totalPageCount!=this.messages.currentPageNo && this.messages.totalPageCount!=0' >加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
			</div>
		</div>
	</div>
</template>
<script>
	import {getMessageList} from '../../../vuex/actions'

	export default {
		components: {
			'datetime-picker': require('../../ui/datetimepicker.vue')
		},
		data(){
			return {
				messages: {},
				startTime: '',
				endTime: '',
				type: 1,
				status: '',
				total: '',
				startdate: {
					type:'month',
					value:''
				},
				enddate: {
					type:'month',
					value:''
				}
			}
		},
		methods: {
			moreMessage(){
			},
			deleteMessage(index){
				this.messages.splice(index, 1)
			},
			query(){
				let params = {}
				if(this.status!=2){
					params.status  = this.status 
				}
				params.startTime = this.startdate.value
				params.endTime = this.enddate.value
				params.type = this.type
				params.status = this.status

				console.log(params)
				let self = this
				
				$.get('/message/list', params).then((res) => {
					self.messages = res.data
				})
			}
		},
		ready(){
			this.query()
		}

	}

</script>
