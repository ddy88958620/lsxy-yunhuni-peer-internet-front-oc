<template>
	<div>
		<!--<div class="alert alert-success" role="alert">-->
			<!--禁止红名单号码作为被叫号码使用，禁止黑名单号码作为主叫号使用-->
		<!--</div>-->
		<div class="admin-table">
			<div class="table-total flex flex-1 justify-content-e float-r">
				共<span class="text-danger">{{originData.number.totalCount ? originData.number.totalCount : 0}}</span>条
			</div>
			<table class="table">
				<thead>
				<tr>
					<th class=" text-align-c">创建时间</th>
					<th>计费项</th>
					<th>计费标识</th>
					<th>归属产品</th>
					<th>价格</th>
					<th>计价单位</th>
					<th class=" text-align-c">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='l in list.number'>
					<td class="message-time text-align-c">{{l.createTime | totalDate}}</td>
					<td>语音通知</td>
					<td>{{l.type }}</td>
					<td>语音通知</td>
					<td>￥0.045</td>
					<td>60秒</td>
					<td class="text-align-c">
						<a v-link="'/admin/settings/product/list/price/edit'">编辑</a>
					</td>
				</tr>
				</tbody>
			</table>
			<div class="more">
				<a v-if='originData.number.currentPageNo >= originData.number.totalPageCount'>加载完毕</a>
				<a @click="query('more')" class="text-none" v-if='originData.number.currentPageNo < originData.number.totalPageCount' >加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
			</div>
		</div>
	</div>
</template>
<script>
	import {showMsg} from 'actions'
	export default {
		vuex:{
			actions:{ showMsg }
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
				postData: {
					type: '',
					pageNo: 1,
					newNumber: {
						type: 1,
						number: '',
					}
				},
				list: {
					number: []
				},
				originData: {
					number: {}
				}
			}
		},
		methods: {
			query(type){
				let params = this.postData
				if(type === 'more') {
					params.pageNo = this.originData.number.currentPageNo + 1
				}
				$.get('config/redblank/plist', params).then((res) => {
					this.originData.number = res.data
					this.list.number = type === 'more' ? this.list.number.concat(res.data.result) : res.data.result
				})
			}
		},
		ready(){
			this.query()
		}
	}
</script>
<style lang="sass" scoped>
</style>
