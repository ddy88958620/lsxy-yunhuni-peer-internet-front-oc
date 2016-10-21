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
			</tr>
			</thead>
			<tbody>
			<tr v-for='data in account_list'>
				<td class="message-time text-align-c">{{ data.createTime | totalDate }}</td>
				<td>{{ data.userName }}</a></td>
				<td>{{ data.mobile }}</td>
				<td>{{ data.email }}</td>
			</tr>
			</tbody>
		</table>
		<div class="more">
			<a v-if='account_res.currentPageNo >= account_res.totalPageCount'>加载完毕</a>
			<a @click="query('more')" class="text-none" v-else>
				加载更多 <i class="icon iconfont icon-oc-dropdown"></i>
			</a>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return ({
				page: {
					pageNo: 1
				},
				account_list: [],
				account_res: {}
			})
		},
		methods: {
			query(type){
				if (type === 'more') {
					this.page.pageNo =  this.account_res.currentPageNo + 1
				}
				let params = {}
				let self = this
				params.pageNo  = this.page.pageNo
				$.get('acount/expire/list', params).then((res) => {
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
