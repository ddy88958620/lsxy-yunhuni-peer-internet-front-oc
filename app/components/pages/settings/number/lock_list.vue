<style lang="sass" scoped>
</style>
<template>
	<div>
		<div class="alert alert-danger" role="alert">
			禁止红名单号码作为被叫号码使用，禁止黑名单号码作为主叫号使用
		</div>
		<div class="admin-table-header">
			<div class="remove-margin-bottom">
				<span class='datetime-picker-label'>呼叫类型: </span>
				<select class="form-control" v-model='status' >
					<option value=''>全部</option>
					<option value=1 >已上线</option>
					<option value=0 >未上线</option>
					<option value=-1>已下线</option>
				</select>
				<button class="btn btn-primary admin-button-margin" @click="query" >查询</button>
				<a class="btn btn-primary" @click="show.newNumber = true">新增号码</a>
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
					<th>号码类型</th>
					<th>状态</th>
					<th class=" text-align-c">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='message in messagesList'>
					<td class="message-time text-align-c">{{message.lineTime | totalDate}}</td>
					<td>23424324</td>
					<td>红名单</td>
					<td v-if='message.status==-1' >启用</td>
					<td v-if='message.status==0 || message.status==null' class='text-danger'>禁用</td>
					<td v-if='message.status==1' class="text-success" >已上线</td>
					<td class="text-align-c">
						<span @click="deleteMsg($index)"><a>禁用</a></span>
						<span @click="deleteMsg($index)"><a>删除</a></span>
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
	
	<modal :show.sync="show.newNumber" title="新增线路号码" :action="closeModal">
		<div slot="body">
			<input type="radio"> 可主叫 &nbsp;
			<input type="radio"> 可被叫
			<br/>
			<br/>
			<div class="form-group">
				<label class="control-label">新增号码 : </label>
				<input type="text" class="form-control input-width" placeholder="">
			</div>
		</div>
	</modal>
	
</template>
<script>
	import {showMsg} from 'actions'
	
	export default {
		vuex:{
			getter:{},
			actions:{
				showMsg
			}
		},
		components: {
			'datetime-picker': require('ui/datetimepicker.vue'),
			'modal': require('ui/modal.vue')
		},
		data(){
			return {
				show: {
					newNumber: false
				},
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
