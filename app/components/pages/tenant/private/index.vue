<template>
	<div>
		<div class="admin-table-header">
			<div class="remove-margin-bottom margin-top-20">
				<a class="btn btn-primary" @click="$refs.bindnumber.show.self = true">立即绑定</a>
			</div>
		</div>
		<div class="admin-table ">
			<div class="table-total flex flex-1 justify-content-e float-r">
				共<span class="text-danger">{{originData.line.totalCount ? originData.line.totalCount : 0}}</span>条
			</div>
			<table class="table">
				<thead>
				<tr>
					<th class=" text-align-c">序号</th>
					<th class=" text-align-c">创建时间</th>
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
				<tr v-for='l in list'>
					<td class="text-align-c">{{ l.priority }}</td>
					<td class="message-time text-align-c">{{l.lineGateway.createTime | totalDate}}</td>
					<td>{{ l.lineGateway.lineNumber ? l.lineGateway.lineNumber : '无' }}</td>
					<td>{{ l.lineGateway.operator }}</td>
					<td>{{ l.lineGateway.areaId }}</td>
					<td>{{ l.lineGateway.areaCode }}</td>
					<td>{{ l.lineGateway.isThrough === '1' ? '是' : '否'}}</td>
					<td>{{ l.lineGateway.quality }}</td>
					<td>{{ l.lineGateway.capacity }}</td>
					<td v-if=" l.lineGateway.status === '1'" class="text-success">启用</td>
					<td v-if=" l.lineGateway.status !== '1'" class="text-danger">禁用</td>
					<td class="text-align-c">
						<span><a v-link="'/admin/settings/line/detail/'+l.lineGateway.id+'/base'">详情</a></span>
						<span @click="deleteLine($index, l.id)"><a>解除绑定</a></span>
						<span><a @click="priority($index, l.id, 'up')">上移</a></span>
						<span><a @click="priority($index, l.id, 'down')">下移</a></span>
					</td>
				</tr>
				</tbody>
			</table>
			<div class="more">
				<a v-if='originData.line.currentPageNo >= originData.line.totalPageCount'>加载完毕</a>
				<a @click="query('more')" class="text-none" v-if='originData.line.currentPageNo < originData.line.totalPageCount' >加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
			</div>
		</div>
		<bind-number-modal v-ref:bindnumber></bind-number-modal>
	</div>
</template>
<script>
	export default {
		vuex:{
			actions: {showMsg: require('actions').showMsg}
		},
		components: {
			'datetime-picker': require('ui/datetimepicker.vue'),
			'modal': require('ui/modal.vue'),
			bindNumberModal: require('./bindNumber.vue')
		},
		data(){
			return {
				list: [],
				postData: {
					lineParams: {
						pageNo: 1,
//						pageSize: 1,
						operator: '', // 运营商
						isThrough: '', // 是否透传
						status: '', // 1 可用
//						order: '', // quality:1 按质量降序1， 按质量升序0
					}
				},
				originData: {
					line: {}
				}
			}
		},
		methods: {
			deleteLine(index, lid){
				$.delete('/config/tenant/'+lid).then((e)=>{
					if(!e.success) {
						this.showMsg({content: e.errorMsg, type: 'danger'})
						return
					}
					this.list.splice(index, 1)
					this.showMsg({content: '删除成功', type: 'success'})
					this.query()
				})
			},
			priority(index, lid, type){
				let priority = type === 'up' ? this.list[index].priority - 1 : this.list[index].priority + 1
				console.log(priority)
				$.put('/config/tenant/edit/priority/'+lid, {priority}).then((e)=>{
					if(e.errorMsg) {
						this.showMsg({content: e.errorMsg, type: 'danger'})
						return
					}
					this.showMsg({content: '更新成功', type: 'success'})
					this.query()
				})
			},
			query(type){
				let params = this.postData.lineParams
				if(type === 'more') {
					this.postData.lineParams.pageNo = this.originData.line.currentPageNo + 1
				}
				$.get('/config/tenant/plist/'+this.$route.params.uid, params).then((res) => {
					this.originData.line = res.data
					this.list = type === 'more' ? this.list.concat(res.data.result) : res.data.result
				})
			},
		},
		route:{
			data(){
				this.query()
			}
		}
	}
</script>
