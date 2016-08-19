<style lang="sass" scoped>
</style>
<template>
	<div>
		<div class="flex flex-direction-column admin-table-header">
			<h4>反馈意见</h4>
			<div class="flex align-items-c bg-section-margin remove-margin-bottom">
				<span class='datetime-picker-label clear-padding-left'>提交时间:</span>
				<datetime-picker :uuid="'serverStartDate'"  :type.sync="startdate.type" :value.sync="startdate.value"></datetime-picker>
				<span class='datetime-picker-label'>至</span>
				<datetime-picker :uuid="'serveEndStartDate'"  :type.sync="enddate.type" :value.sync="enddate.value"></datetime-picker>
				<span class='datetime-picker-label'>状态: </span>
				<select class="form-control" v-model='status'>
					<option value=''>全部</option>
					<option value=1>已读</option>
					<option value=0>未读</option>
				</select>

				<a class="btn btn-primary admin-button-margin" @click="query" >查询</a>

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
				<tr v-for='message in serviceList'>
					<td :class="[message.status===0 ? 'text-danger' : '', 'text-align-c']">{{message.status===0 ? '未读' : '已读'}}</td>
					<td>{{message.account.tenant.tenantName}}</td>
					<td class="message-time text-align-c">{{message.createTime | totalDate }}</td>
					<td>{{message.content}}</td>
					<td class="text-align-c">
						<span><a >已阅</a></span>
					</td>
				</tr>
				</tbody>
			</table>
				<div class="more">
				<a v-show='service.totalPageCount==service.currentPageNo || service.totalPageCount==0'>加载完毕</a>
				<a @click="query" class="text-none" v-show='service.totalPageCount!=service.currentPageNo && service.totalPageCount!=0' >加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
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
				service: null,
				serviceList: [],
				status: '',
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
		methods: {
			query(){
				let params = {}
				params.startTime = this.startdate.value
				params.endTime = this.enddate.value
				params.status = this.status
				
				// more
				console.log(typeof this.service)
				if(this.service !== null){
					let pageNo = this.service.currentPageNo + 1
					console.log(pageNo)
					params.pageNo = pageNo
				}
				
				let self = this
				$.get('/service/list', params).then((res)=>{
					console.log(res)
					self.service = res.data
					self.serviceList = self.serviceList.concat(res.data.result)
				})
			}
		},
		ready(){
			this.query()
		}
	}

</script>