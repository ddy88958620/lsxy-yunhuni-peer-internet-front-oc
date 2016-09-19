<style lang="sass" scoped>
</style>
<template>
	<div>
		<div class="flex flex-direction-column admin-table-header">
			<h4>消息列表</h4>
			<div class="flex align-items-c  remove-margin-bottom">
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
<!-- 				<span class='datetime-picker-label'>消息类型: </span>
				<select class="form-control"  v-model='type'>
					<option value=1 >活动消息</option>
					<option value=0 >用户消息</option>
				</select> -->

				<button class="btn btn-primary admin-button-margin" @click="query" >查询</button>
				<a class="btn btn-primary " v-link="{path: '/admin/message/new', exact: true}">发布新消息</a>
			</div>
		</div>
		<div class="admin-table table-responsive ">
			<div class="table-total flex flex-1 justify-content-e">
				共<span class="text-danger">{{messages.totalCount ? messages.totalCount : 0}}</span>条
			</div>
			<table class="table">
				<thead>
				<tr>
					<th class="text-align-c">发布时间</th>
					<th>发布人</th>
					<th>发布状态</th>
					<th style="width:50%">发布标题</th>
					<!-- <th>消息类型</th> -->
					<th class="text-align-c">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='message in messagesList'>
					<td class="message-time text-align-c">{{message.lineTime | totalDate}}</td>
					<td>{{message.name}}</td>

					<td v-if='message.status==-1' >已下线</td>
					<td v-if='message.status==0 || message.status==null' class='text-danger'>未上线</td>
					<td v-if='message.status==1' class="text-success" >已上线</td>

					<td style="width:50%"><a @click="showConent(message.title)" >{{ message.title | subStr}}</a></td>
					<!-- <td>{{message.type ? '活动消息' : '用户消息'　}}</td> -->
					<td class="text-align-c">
						<span v-if="message.status == 0 " ><a v-link="'/admin/message/edit/'+message.id">编辑</a></span>
						<span><a  v-link="'/admin/message/detail/'+message.id">查看</a></span>
						<span v-if='message.status==0 || message.status==null' @click="changeStatus($index, 'up')"><a>上线</a></span>
						<span v-if='message.status==1'  @click="changeStatus($index, 'down')"><a>下线</a></span>
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
	import {getMessageList,showMsg} from '../../../vuex/actions'

	export default {
		vuex:{
			getter:{

			},
			actions:{
				showMsg
			}
		},
		components: {
			'datetime-picker': require('../../ui/datetimepicker.vue'),
			'modal': require('../../ui/modal.vue')
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
