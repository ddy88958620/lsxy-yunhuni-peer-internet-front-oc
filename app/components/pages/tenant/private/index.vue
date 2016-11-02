<template>
	<div class="margin-top-20">
		<div class="alert alert-danger" role="alert">
			私有线路一般情况下为租户自带的线路，需要运营人员手动为租户进行绑定，可绑定的线路从线路注册列表获取。
		</div>
		<div class="admin-table-header">
			<div class="remove-margin-bottom">
				<a class="btn btn-primary" @click="$refs.bindnumber.show.self = true">立即绑定</a>
			</div>
		</div>
		<div class="admin-table ">
			<div class="table-total flex flex-1 justify-content-e float-r">
				共<span class="text-danger">{{messages.totalCount ? messages.totalCount : 0}}</span>条
			</div>
			<table class="table">
				<thead>
				<tr>
					<th class=" text-align-c">序号</th>
					<th class=" text-align-c">绑定时间</th>
					<th>线路标识</th>
					<th>运营商</th>
					<th>区域</th>
					<th>归属地</th>
					<th>支持透传</th>
					<th>质量</th>
					<th>并发容量</th>
					<th>状态</th>
					<th class=" text-align-c">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='message in messagesList'>
					<td class=" text-align-c">1</td>
					<td class="message-time text-align-c">{{message.lineTime | totalDate}}</td>
					<td>23424324</td>
					<td>电信</td>
					<td>1</td>
					<td>020</td>
					<td>支持</td>
					<td>1</td>
					<td>1000</td>
					<td>启用</td>
					<td class="text-align-c">
						<span @click="deleteMsg($index)"><a>禁用</a></span>
						<span @click="deleteMsg($index)"><a>解除绑定</a></span>
						<span @click="deleteMsg($index)"><a>上移</a></span>
						<span @click="deleteMsg($index)"><a>下移</a></span>
					</td>
				</tr>
				</tbody>
			</table>
			<div class="more">
				<a v-show='messages.currentPageNo >= messages.totalPageCount'>加载完毕</a>
				<a @click="query('more')" class="text-none" v-show='this.messages.totalPageCount!=this.messages.currentPageNo && this.messages.totalPageCount!=0' >加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
			</div>
		</div>
		<bind-number-modal v-ref:bindnumber></bind-number-modal>
	</div>
</template>
<script>
	import {showMsg} from 'actions'
	
	export default {
		vuex:{
			actions:{ showMsg }
		},
		components: {
			bindNumberModal: require('./bindNumber.vue')
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
				})
				console.log(index)
			}
		},
		ready(){
			this.query()
		}
	}
</script>
<style lang="sass" rel="stylesheet/scss">
	.bind_number_result {
		margin-top: 20px;
		height: 200px;
		overflow-y: scroll;
	}
</style>
