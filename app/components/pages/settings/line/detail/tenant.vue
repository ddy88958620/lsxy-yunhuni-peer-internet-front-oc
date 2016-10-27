<template>
	<div>
		<div class="admin-table-header">
			<div class="remove-margin-bottom">
				<div class="select-box inline-block">
					<search
						:value.sync="search"
						:action="query"
						placeholder="请输入会员名称"
					></search>
				</div>
			</div>
		</div>
		<div class="admin-table">
			<div class="table-total flex flex-1 justify-content-e float-r">
				共<span class="text-danger">{{messages.totalCount ? messages.totalCount : 0}}</span>条
			</div>
			<table class="table">
				<thead>
				<tr>
					<th>绑定时间</th>
					<th>绑定会员</th>
					<th>绑定应用</th>
					<th>绑定号码</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='message in messagesList'>
					<td class="message-time">2016-12-21</td>
					<td>流水行动</td>
					<td>飞飞语音</td>
					<td>15915465846 13954658458</td>
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
