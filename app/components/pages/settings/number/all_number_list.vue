<style lang="sass" scoped>
</style>
<template>
	<div>
		<div class="admin-table-header">
			<div class="remove-margin-bottom">
				<div class="select-box inline-block">
					<search
						:value.sync="search"
						:action="query"
						placeholder="模糊查询"
					></search>
				</div>
				<span class='datetime-picker-label'>运营商: </span>
				<select class="form-control" v-model='status' >
					<option value=''>全部</option>
					<option value=1 >已上线</option>
					<option value=0 >未上线</option>
					<option value=-1>已下线</option>
				</select>
				<span class='datetime-picker-label'>支持透传: </span>
				<select class="form-control"  v-model='type'>
					<option value=1 >活动消息</option>
					<option value=0 >用户消息</option>
				</select>
				<span class='datetime-picker-label'>状态: </span>
				<select class="form-control"  v-model='type'>
					<option value=1 >活动消息</option>
					<option value=0 >用户消息</option>
				</select>
				<button class="btn btn-primary admin-button-margin" @click="query" >查询</button>
				<a class="btn btn-primary " v-link="{path: '/admin/settings/number/new', exact: true}">新增号码</a>
			</div>
		</div>
		<div class="admin-table ">
			<div class="table-total flex flex-1 justify-content-e float-r">
				共<span class="text-danger">{{messages.totalCount ? messages.totalCount : 0}}</span>条
			</div>
			<table class="table">
				<thead>
				<tr>
					<th class=" text-align-c">创建时间</th>
					<th>号码</th>
					<th>可主叫</th>
					<th>可被叫</th>
					<th>可透传</th>
					<th>号码来源</th>
					<th>运营商</th>
					<th>归属地</th>
					<th>归属线路</th>
					<th>绑定租户</th>
					<th>状态</th>
					<th class="text-align-c">操作</th>
				</tr>
				</thead>
				<tbody>
					<tr v-for='message in messagesList'>
						<td class="message-time text-align-c">{{message.lineTime | totalDate}}</td>
						<td>23424324</td>
						<td>✔</td>
						<td>✘</td>
						<td>✘</td>
						<td>租户自带</td>
						<td>电信</td>
						<td>10000</td>
						<td>无</td>
						<td>流水行云</td>
						<td v-if='message.status==-1' >启用</td>
						<td v-if='message.status==0 || message.status==null' class='text-danger'>禁用</td>
						<td v-if='message.status==1' class="text-success" >已上线</td>
						<td class="text-align-c">
							<span><a v-link="'/admin/settings/number/detail/1'">详情</a></span>
							<span v-if='message.status!=1' @click="deleteMsg($index)"><a>禁用</a></span>
							<span v-if='message.status!=1' @click="deleteMsg($index)"><a>删除</a></span>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="more">
				<a v-show='this.messages.totalPageCount==this.messages.currentPageNo || this.messages.totalPageCount==0'>加载完毕</a>
				<a @click="query('more')" class="text-none" v-show='this.messages.totalPageCount!=this.messages.currentPageNo && this.messages.totalPageCount!=0' >加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
			</div>
		</div>
	</div>
	<modal :show.sync="content.showModal" title="发布标题" :action="closeModal" >
		<div slot="body">
			<div class="flex flex-1 word-break">{{content.text}}</div>
		</div>
	</modal>
</template>
<script>
	import {showMsg} from 'actions'
	
	export default {
		vuex:{
			getter:{
				
			},
			actions:{
				showMsg
			}
		},
		components: {
			'datetime-picker': require('ui/datetimepicker.vue'),
			'modal': require('ui/modal.vue'),
			'search': require('ui/search-input.vue')
		},
		data(){
			return {
				messagesList: [],
				messages: {
					totalCount : 0,
					totalPageCount : 0
				},
				startTime: '',
				endTime: '',
				type: 1,
				status: '',
				total: '',
				startdate: {
					type:'day',
					value:''
				},
				enddate: {
					type:'day',
					value:''
				},
				content :{
					showModal:false,
					text:''
				}
			}
		},
		methods: {
			deleteMessage(index){
				this.messages.splice(index, 1)
			},
			showConent(txt){
				this.content.showModal= true
				this.content.text = txt
			},
			closeModal(){
				this.content.showModal= false
			},
			query(type){
				let params = {}
				params.startTime = this.startdate.value
				params.endTime = this.enddate.value
				params.type = this.type
				params.status = this.status
				if(type === 'more') {
					params.pageNo = this.messages.currentPageNo + 1
				}
				let self = this
				$.get('/message/list', params).then((res) => {
					self.messages = res.data
					if(type=='more')
						self.messagesList = self.messagesList.concat(res.data.result)
					else
						self.messagesList = res.data.result
				})
			},
			changeStatus(index, type){
				let params = {}
				if( type === 'up') {
					params.status = 1
				}
				else if( type === 'down'){
					params.status = -1
				}
				let messageObj = this.messagesList[index]
				let self = this
				
				$.put('/message/edit/'+messageObj.id, params).then((res) => {
					if( res.success === 'false'){
						this.showMsg({content: res.errorMsg, type: 'danger'})
						return
					}
					if(type === 'up'){
						this.showMsg({content: '上线成功', type: 'success'})
					}
					if(type === 'down' ){
						this.showMsg({content: '下线成功', type: 'success'})
					}
					self.messagesList.$set(index, res.data)
				})
			},
			deleteMsg(index){
				let messageObj = this.messagesList[index]
				let self = this
				
				$.delete('/message/'+messageObj.id).then((res) => {
					
					if( res.success === 'false'){
						this.showMsg({content: res.errorMsg, type: 'danger'})
						return
					}
					self.messagesList.splice(index,1)
					self.messages.totalCount = self.messages.totalCount -1
					
					
					this.showMsg({content: '删除成功', type: 'success'})
					
					/*if( res.success === 'false'){
					 this.showMsg({content: res.errorMsg, type: 'danger'})
					 return
					 }
					 if(type === 'up'){
					 this.showMsg({content: '上线成功', type: 'success'})
					 }
					 if(type === 'down' ){
					 this.showMsg({content: '下线成功', type: 'success'})
					 }
					 self.messagesList.$set(index, res.data)*/
				})
				console.log(index)
			}
		},
		ready(){
			this.query()
		}
		
	}
</script>
