<template>
	<div>
		<div class="admin-table-header">
			<div class="remove-margin-bottom">
				<div class="select-box inline-block middle">
					<search
						:value.sync="search"
						:action="query"
						placeholder="模糊查询"
					></search>
				</div>
				<span class='datetime-picker-label'>支持主叫: </span>
				<select class="form-control middle" v-model='type'>
					<option value=1>活动消息</option>
					<option value=0>用户消息</option>
				</select>
				<button class="btn btn-primary admin-margin-l" @click="query">查询</button>
				<button class="btn btn-primary" @click="show.upload = true">导入线路号码</button>
				<button class="btn btn-primary" @click="show.newline = true">新增线路号码</button>
				<button class="btn btn-primary" @click="show.newpassline = true">新增透传</button>
				<a class="btn btn-primary" v-link="{path: '/admin/settings/line/new', exact: true}">删除号码</a>
			</div>
		</div>
		<div class="admin-table position-layout">
			<div class="table-total flex flex-1 justify-content-e float-r">
				共<span class="text-danger">{{messages.totalCount ? messages.totalCount : 0}}</span>条
			</div>
			<table class="table text-align-c">
				<thead>
				<tr>
					<th>全选</th>
					<th>号码</th>
					<th>应用绑定</th>
					<th>支持主叫</th>
					<th>支持被叫</th>
					<th>支持透传</th>
				</tr> </thead>
				<tbody>
				<tr v-for='message in messagesList'>
					<td class="message-time"><input type="checkbox"></td>
					<td>1234122223</td>
					<td>否</td>
					<td><input type="checkbox" @change="toggle"></td>
					<td><input type="checkbox" @change="toggle"></td>
					<td><input type="checkbox" @change="toggle"></td>
				</tr>
				</tbody>
			</table>
			<div class="table-wrap position-layout" v-show="show.tableWrap">
				<img :src="loadinggif" class="position-center" alt="">
			</div>
			<div class="more">
				<a
					v-show='this.messages.totalPageCount==this.messages.currentPageNo || this.messages.totalPageCount==0'>加载完毕</a>
				<a @click="query('more')" class="text-none"
				   v-show='this.messages.totalPageCount!=this.messages.currentPageNo && this.messages.totalPageCount!=0'>加载更多<i
					class="icon iconfont icon-oc-dropdown"></i></a>
			</div>
		</div>
	</div>
	
	<modal :show.sync="show.upload" title="导入线路号码" :action="closeModal">
		<div slot="body">
			<input type="file"/> 请上传文件
			<p class="text-success margin-top-20">
				请按照模板格式填写后上传（只支持Excel文件） <a href="">下载模板</a>
			</p>
		</div>
	</modal>
	<modal :show.sync="show.newline" title="新增线路号码" :action="closeModal">
		<div slot="body">
			<div class="form-group">
				<label class="control-label">新增号码 : </label>
				<input type="text" class="form-control input-width" placeholder="">
			</div>
			<br/>
			<div class="form-group">
				<label class='datetime-picker-label control-label'>运营商 : </label>
				<select class="form-control middle input-width" v-model='type'>
					<option value=1>活动消息</option>
					<option value=0>用户消息</option>
				</select>
			</div>
			<br/>
			<div class="form-group">
				<label class="control-label">归属地 : </label>
				<input type="text" class="form-control input-width" placeholder="">
				请填写归属地的区号
			</div>
			<br/>
			<div class="form-group">
				<label class="control-label">呼叫URI : </label>
				<input type="text" class="form-control input-width" placeholder="">
			</div>
			<br/>
			<div class="form-group">
				<label class="control-label">资源占用费 : </label>
				<input type="text" class="form-control input-width" placeholder="">
			</div>
			<br/>
			<p class="text-danger">*每个号码的使用费需要手动配置*</p>
			<input type="radio"> 可主叫
			<input type="radio"> 可被叫
		</div>
	</modal>
	<modal :show.sync="show.newpassline" title="新增透传号码" :action="closeModal">
		<div slot="body">
			<div class="form-group">
				<label class="">运营商 : </label>
				<select class="form-control input-width-select" v-model='type'>
					<option value=1>活动消息</option>
					<option value=0>用户消息</option>
				</select>
				&nbsp;
				&nbsp;
				<label class="">模糊查询 : </label>
				<div class="select-box inline-block">
					<search
						:value.sync="search"
						:action="query"
						placeholder="模糊查询"
					></search>
				</div>
			</div>
			<div class="pass_number_result">
				<input type="checkbox" v-model="passNumber.list" value="12414"> 15002010123 <br/>
				<input type="checkbox" v-model="passNumber.list" value="234234"> 15002010123 <br/>
				<input type="checkbox" v-model="passNumber.list" value="234235"> 15002010123 <br/>
			</div>
			<div class="admin-table">
				<div class="more">
					<a
						v-show='this.messages.totalPageCount==this.messages.currentPageNo || this.messages.totalPageCount==0'>加载完毕</a>
					<a @click="query('more')" class="text-none"
					   v-show='this.messages.totalPageCount!=this.messages.currentPageNo && this.messages.totalPageCount!=0'>加载更多<i
						class="icon iconfont icon-oc-dropdown"></i></a>
				</div>
			</div>
			<div class="pass_number_selected">
				<span class="selected_box bg-success" v-for="number in passNumber.list">
					{{number}} &nbsp;<button @click="deletePassNumberSelected($index)" type="button" class="close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
				</span>
			</div>
		</div>
	</modal>

</template>
<script>
	import {showMsg} from 'actions'
	
	export default {
		vuex: {
			getter: {},
			actions: {
				showMsg
			}
		},
		components: {
			'modal': require('ui/modal.vue'),
			'search': require('ui/search-input.vue')
		},
		data(){
			return {
				loadinggif: require('assets/images/loading.gif'),
				show: {
					upload: false,
					newline: false,
					newpassline: false,
					tableWrap: false,
				},
				passNumber: {
					list: []
				},
				messagesList: [],
				messages: {
					totalCount: 0,
					totalPageCount: 0
				},
				type: 1,
				status: '',
				total: '',
				startdate: {
					type: 'day',
					value: ''
				},
				enddate: {
					type: 'day',
					value: ''
				},
				content: {
					showModal: false,
					text: ''
				}
			}
		},
		methods: {
			toggle(){
				this.show.tableWrap = true
				
				this.showTableWrap = setTimeout(() => {
					this.show.tableWrap = false
					clearTimeout(this.showTableWrap)
				}, 2000)
			},
			deletePassNumberSelected(index){
				this.passNumber.list.splice(index,1)
			},
			deleteMessage(index){
				this.messages.splice(index, 1)
			},
			showConent(txt){
				this.content.showModal = true
				this.content.text = txt
			},
			closeModal(){
				this.content.showModal = false
			},
			query(type){
				let params = {}
				params.startTime = this.startdate.value
				params.endTime = this.enddate.value
				params.type = this.type
				params.status = this.status
				if (type === 'more') {
					params.pageNo = this.messages.currentPageNo + 1
				}
				let self = this
				$.get('/message/list', params).then((res) => {
					self.messages = res.data
					
					if (type == 'more')
						self.messagesList = self.messagesList.concat(res.data.result)
					else
						self.messagesList = res.data.result
				})
			},
			changeStatus(index, type){
				let params = {}
				if (type === 'up') {
					params.status = 1
				}
				else if (type === 'down') {
					params.status = -1
				}
				let messageObj = this.messagesList[index]
				let self = this
				$.put('/message/edit/' + messageObj.id, params).then((res) => {
					if (res.success === 'false') {
						this.showMsg({content: res.errorMsg, type: 'danger'})
						return
					}
					if (type === 'up') {
						this.showMsg({content: '上线成功', type: 'success'})
					}
					if (type === 'down') {
						this.showMsg({content: '下线成功', type: 'success'})
					}
					self.messagesList.$set(index, res.data)
				})
			},
			deleteMsg(index){
				let messageObj = this.messagesList[index]
				let self = this
				$.delete('/message/' + messageObj.id).then((res) => {
					if (res.success === 'false') {
						this.showMsg({content: res.errorMsg, type: 'danger'})
						return
					}
					self.messagesList.splice(index, 1)
					self.messages.totalCount = self.messages.totalCount - 1
					this.showMsg({content: '删除成功', type: 'success'})
				})
			}
		},
		ready(){
			this.query()
		}
	}
</script>
<style lang="sass" rel="stylesheet/scss">
	input[type=file] {
		display: inline-block;
	}
	.pass_number_result {
		height: 200px;
		padding: 30px 20px;
		overflow-y: scroll;
	}
	.pass_number_selected {
		margin-top: 20px;
		.selected_box {
			margin-left: 5px;
			border: 1px solid rgba(159, 199, 163, 0.8);
			padding: 3px;
		}
	}
	.table-wrap {
		position: absolute;
		top: 0;
		bottom: 0;
		background: rgba(128, 128, 128, 0.2);
		width: 100%;
	}
	.admin-table table.text-align-c tr th{
		text-align: center;
	}
	.control-label {
		width: 100px;
	}
</style>
