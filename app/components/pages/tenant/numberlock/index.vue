<template>
	<div class="margin-top-20">
		<div class="alert alert-danger" role="alert">
			1、运营人员可手动为租户绑定号码，绑定的号码启用后会自动出现在租户的号码列表内。<br/>
			2、运营人员需要在号码管理中，为租户绑定号码。
		</div>
		<div class="admin-table ">
			<div class="table-total flex flex-1 justify-content-e float-r">
				共<span class="text-danger">{{messages.totalCount ? messages.totalCount : 0}}</span>条
			</div>
			<table class="table">
				<thead>
				<tr>
					<th class=" text-align-c">绑定时间</th>
					<th>号码</th>
					<th>可主叫</th>
					<th>可被叫</th>
					<th>关联应用</th>
					<th>号码来源</th>
					<th>运营商</th>
					<th>归属地</th>
					<th>归属线路</th>
					<th>状态</th>
					<th class=" text-align-c">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='message in messagesList'>
					<td class="message-time text-align-c">{{message.lineTime | totalDate}}</td>
					<td>15001203124</td>
					<td>✔</td>
					<td>✘</td>
					<td>无</td>
					<td>租户自带</td>
					<td>电信</td>
					<td>020</td>
					<td>线路1</td>
					<td v-if='message.status===-1' >启用</td>
					<td v-if='message.status===1 || message.status==null' class='text-danger'>禁用</td>
					<td class="text-align-c">
						<span @click="deleteMsg($index)"><a>启用</a></span>
						<span @click="deleteMsg($index)"><a>解除绑定</a></span>
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
