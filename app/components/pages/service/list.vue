<style lang="sass" scoped>
</style>
<template>
	<div>
		<div class="flex flex-direction-column admin-table-header">
			<h4>反馈意见</h4>
			<div class="flex align-items-c remove-margin-bottom">
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

				<a class="btn btn-primary admin-button-margin" @click="query()" >查询</a>

				<a class="btn btn-primary " @click="readedAll">全部标记为已读</a>
			</div>
		</div>
		<div class="admin-table">
			<div class="table-total flex flex-1 justify-content-e float-r">
				共<span class="text-danger">{{service.totalCount}}</span>条
			</div>
			<table class="table">
				<thead>
				<tr>
					<th class="text-align-c">状态</th>
					<th>会员名称</th>
					<th class="text-align-c">提交时间</th>
					<th style="width:50%">反馈内容</th>
					<th class="text-align-c">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='message in serviceList'>
					<td :class="[message.status===0 ? 'text-danger' : '', 'text-align-c']">{{message.status===0 ? '未读' : '已读'}}</td>
					<td ><a v-link="'/admin/tenant/detail/'+message.account.tenant.id" >{{message.account.tenant.tenantName}}</a></td>	
					<td class="message-time text-align-c">{{message.createTime | totalDate }}</td>
					<td style="width:50%" ><a @click="showConent(message.content)">{{ message.content | subStr}}</a></td>
					<td class="text-align-c">
						<span><a v-if="message.status === 0" @click="readed($index, message.id)">已阅</a></span>
						<span v-if="message.status !== 0" >已阅</span>
					</td>
				</tr>
				</tbody>
			</table>
				<div class="more">
				<a v-show='service.totalPageCount==service.currentPageNo || service.totalPageCount==0'>加载完毕</a>
				<a @click="query('more')" class="text-none" v-show='service.totalPageCount!=service.currentPageNo && service.totalPageCount!=0' >加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
			</div>
		</div>

		<modal :show.sync="content.showModal" title="反馈内容" :action="closeModal" >
			<div slot="body">
				<div class="flex flex-1">{{content.text}}</div>
			</div>
		</modal>

</template>
<script>
	import {getMessageNum} from '../../../vuex/actions'
	export default {
		vuex:{
			actions:{
				getMessageNum
			}
		},
		components: {
			'datetime-picker': require('../../ui/datetimepicker.vue'),
			'modal': require('../../ui/modal.vue')
		},
		data(){
			return {
				service: {
					totalPageCount:0,
					currentPageNo:0
				},
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
				content :{
					showModal:false,
					text:''
				}
			}
		},
		methods: {
			query(type){
				let params = {}
				params.startTime = this.startdate.value
				params.endTime = this.enddate.value
				params.status = this.status
				//console.log(typeof this.service)
				if(type=='more'){
					let pageNo = this.service.currentPageNo + 1
					//console.log(pageNo)
					params.pageNo = pageNo
				}
				let self = this
				$.get('/service/list', params).then((res)=>{
					self.service = res.data
					console.log(res.data)
					if(type=='more')
						self.serviceList = self.serviceList.concat(res.data.result)
					else
						self.serviceList = res.data.result
				
				})
			},
			showConent(txt){
				this.content.showModal= true
				this.content.text = txt
			},
			closeModal(){
				this.content.showModal= false
				this.content.text = ''
			},
			readed(index, mid){
				let self = this
				$.patch('/service/edit/' + mid).then((res) => {
					if(res.success){
						self.getMessageNum()
						self.serviceList.$set(index, res.data)
					}

				})
			},
			readedAll(){
				let ids = this.serviceList.map((e)=> {
					return e.id
				})
				let self = this
				$.put('/service/edit', {ids: ids}).then((res) => {
					self.getMessageNum()
					self.serviceList.map(function(e, index){
						e.status =  1
					})
				})
			}
		},
		ready(){
			this.query()
		}
	}

</script>