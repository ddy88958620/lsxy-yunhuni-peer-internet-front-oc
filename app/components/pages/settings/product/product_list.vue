<template>
	<div>
		<!--<div class="alert alert-success" role="alert">-->
			<!--新增的号码默认为禁用状态，需要手动启用。号码一旦启用，即可被租户所使用-->
		<!--</div>-->
		<div class="admin-table ">
			<div class="table-total flex flex-1 justify-content-e float-r">
				共<span class="text-danger">{{originData.number.totalCount ? originData.number.totalCount : 0}}</span>条
			</div>
			<table class="table">
				<thead>
				<tr>
					<th class="text-align-c">产品名称</th>
					<th>状态</th>
					<th>操作</th>
				</tr>
				</thead>
				<tbody>
					<tr>
						<td class="text-align-c">语音通知</td>
						<td v-if="1" class="text-success">启用</td>
						<td v-else class="text-danger">禁用</td>
						<td>
							<span v-if="1"  @click="disabled($index, l.id)"><a>禁用</a></span>
							<span v-if="0"  @click="enabled($index, l.id)"><a>启用</a></span>
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
			actions: { showMsg }
		},
		components: {
			'search': require('ui/search-input.vue')
		},
		data(){
			return {
				list: {
					number: []
				},
				postData: {
					lineParams: {
						pageNo: 1,
//						pageSize: 1,
						operator: '', // 运营商
						isThrough: '', // 是否透传
						status: '', // 1 可用
						number: '',
//						order: '', // quality:1 按质量降序1， 按质量升序0
					}
				},
				originData: {
					number: {}
				}
			}
		},
		methods: {
			enabled(index, id) {
				$.put('config/telnum/enabled/'+id).then(()=>{
					let temp = this.list.number[index]
					temp.usable = '1'
					this.list.number.$set(index, temp)
					this.showMsg({content: '启用成功', type: 'success'})
				})
			},
			disabled(index, id) {
				$.put('/config/telnum/disabled/'+id).then(()=>{
					let temp = this.list.number[index]
					temp.usable = '0'
					this.list.number.$set(index, temp)
					this.showMsg({content: '禁用成功', type: 'success'})
				})
			},
			query(type){
				let params = this.postData.lineParams
				if(type === 'more') {
					params.pageNo = this.originData.number.currentPageNo + 1
				}
				$.get('config/telnum/plist', params).then((res) => {
					this.originData.number = res.data
					this.list.number = type === 'more' ? this.list.number.concat(res.data.result) : res.data.result
				})
			},
		},
		ready(){
			this.query()
		}
	}
</script>
