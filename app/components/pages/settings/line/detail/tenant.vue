<template>
	<div>
		<div class="admin-table-header">
			<div class="remove-margin-bottom">
				<div class="select-box inline-block">
					<search
						:value.sync="postData.search"
						:action="query"
						placeholder="请输入会员名称"
					></search>
				</div>
			</div>
		</div>
		<div class="admin-table">
			<div class="table-total float-r">
				共<span class="text-danger">{{originData.list.totalCount ? originData.list.totalCount : 0}}</span>条
			</div>
			<table class="table">
				<thead>
				<tr>
					<th class="text-align-c">绑定会员</th>
					<th>绑定号码</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='l in list'>
					<td class="text-align-c">流水行动</td>
					<td>15915465846 13954658458</td>
				</tr>
				</tbody>
			</table>
			<div class="more">
				<a v-show='originData.list.currentPageNo >= originData.list.totalPageNo'>加载完毕</a>
				<a @click="query('more')" class="text-none" v-show='originData.list.currentPageNo < originData.list.totalPageNo' >加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
			</div>
		</div>
	</div>

</template>
<script>
	export default {
		components: {
			'search': require('ui/search-input.vue')
		},
		data(){
			return {
				list: [],
				postData: {
					listParams: {
						pageNo: 1
					}
				},
				originData: {
					list: {}
				}
			}
		},
		methods: {
			query(type){
				let params = this.postData.listParams
				if(type === 'more') {
					 this.postData.listParams.pageNo = this.originData.list.currentPageNo += 1
				}
				$.get('/message/list', params).then((res) => {
					this.originData.list = res.data
					this.list = type === 'more' ? this.list.concat(res.data.result) : res.data.result
				})
			}
		},
		ready(){
			this.query()
		}
	}
</script>
