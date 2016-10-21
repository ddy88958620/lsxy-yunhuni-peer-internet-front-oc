<template>
	<div class="admin-table">
		<div class="table-total flex flex-1 justify-content-e float-r">
			共<span class="text-danger">{{ account_res.totalCount }}</span>条
		</div>
		<table class="table">
			<thead>
			<tr>
				<th class="text-align-c">注册时间</th>
				<th>会员名称</th>
				<th>手机号</th>
				<th>邮箱</th>
				<th class="text-align-c">操作</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for='data in account_list'>
				<td class="message-time text-align-c">{{ data.createTime | totalDate }}</td>
				<td>{{ data.userName }}</a></td>
				<td>{{ data.mobile }}</td>
				<td>{{ data.email }}</td>
				<td class="text-align-c">
					<span><a @click="active(data.id)">发送激活链接</a></span>
					<span><a @click="resetPassConfirm(data.id)">发送随机密码到邮箱</a></span>
					<span><a @click="loseConfirm($index, data.id)">释放</a></span>
				</td>
			</tr>
			</tbody>
		</table>
		<div class="more">
			<a v-if='account_res.currentPageNo >= account_res.totalPageCount'>加载完毕</a>
			<a @click="query('more')" class="text-none" v-else>
				加载更多 <i class="icon iconfont icon-oc-dropdown"></i>
			</a>
		</div>
		<modal :show.sync="loseConfirmInfo.show" title="" :action="lose"></modal>
		<modal :show.sync="showModal" title="" :action="resetPass"></modal>
	</div>
</template>
<script>
	import {showMsg} from 'actions'
	export default {
		vuex: {
			actions: {
				showMsg
			}
		},
		components: {
			'modal': require('ui/modal.vue')
		},
		data(){
			return ({
				page: {
					pageNo: 1
				},
				account_list: [],
				account_res: {},
				currentAccountId: '',
				showModal: false,
				resetPassAccountId: '',
				loseConfirmInfo: {
					id: null,
					index: null,
					show: false
				},
			})
		},
		methods: {
			loseConfirm(index,id){
				this.loseConfirmInfo = {
					id,
					index,
					show: true
				}
			},
			lose(){
				let self = this
				$.delete('acount/opt/expire/' + this.loseConfirmInfo.id).then((res) => {
					self.showMsg({content: '释放成功', type: 'success'})
					self.account_list.splice(self.loseConfirmInfo.index, 1)
				}, (res)=> {
					this.showMsg({content: '释放失败', type: 'error'})
				})
			},
			resetPassConfirm(id){
				this.showModal = true
				this.resetPassAccountId = id
			},
			resetPass(){
				let self = this
				$.put('acount/send/password/' + this.resetPassAccountId).then((res) => {
					self.showMsg({content: '发送成功', type: 'success'})
				})
			},
			active(id){
				let self = this
				$.put('acount/send/active/' + id).then((res) => {
					self.showMsg({content: '发送成功', type: 'success'})
				})
			},
			query(type){
				if (type === 'more') {
					this.page.pageNo = this.account_res.currentPageNo + 1
				}
				let params = {}
				let self = this
				params.pageNo = this.page.pageNo
				$.get('acount/not_active/list', params).then((res) => {
					self.account_res = res.data
					self.account_list = type === 'more' ? self.account_list.concat(res.data.result) : res.data.result
				})
			},
		},
		ready(){
			this.query()
		}
	}
</script>