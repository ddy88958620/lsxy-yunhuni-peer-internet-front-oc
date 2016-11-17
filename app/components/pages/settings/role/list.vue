<template>
	<div>
		<h4>号码管理</h4>
		<div class="admin-table-header">
			<div class="remove-margin-bottom margin-top-20">
				<a class="btn btn-primary" v-link="'/admin/settings/role/new'">新增角色</a>
			</div>
		</div>
		<div class="admin-table">
			<div class="table-total flex flex-1 justify-content-e float-r">
				共<span class="text-danger">{{originData.line.totalCount ? originData.line.totalCount : 0}}</span>条
			</div>
			<table class="table">
				<thead>
				<tr>
					<th class=" text-align-c">序号</th>
					<th class=" text-align-c">角色名称</th>
					<th>操作员数量</th>
					<th>状态</th>
					<th class=" text-align-c">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td class="text-align-c">1</td>
					<td class="message-time text-align-c">运营</td>
					<td>4</td>
					<td>启用</td>
					<!--<td v-if=" l.lineGateway.status === '1'" class="text-success">启用</td>-->
					<!--<td v-if=" l.lineGateway.status !== '1'" class="text-danger">禁用</td>-->
					<td class="text-align-c">
						<span @click="deleteLine($index, l.id)"><a>禁用</a></span>
						<span><a v-link="'/admin/settings/line/detail/'+l.lineGateway.id+'/base'">编辑</a></span>
						<span @click="confirmDeleteLine($index, l.id)"><a>删除</a></span>
					</td>
				</tr>
				</tbody>
			</table>
			<div class="more">
				<a v-if='originData.line.currentPageNo >= originData.line.totalPageCount'>加载完毕</a>
				<a @click="query('more')" class="text-none" v-if='originData.line.currentPageNo < originData.line.totalPageCount' >加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
			</div>
		</div>
		<confirm v-ref:dialog></confirm>
	</div>
</template>
<script>
	export default {
		vuex:{
			actions: {showMsg: require('actions').showMsg}
		},
		components: {
			'datetime-picker': require('ui/datetimepicker.vue'),
			'confirm': require('ui/confirm.vue'),
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
			confirmDeleteNumber(index, id){
				this.$refs.dialog.confirm().then(() => {
					// 点击确定按钮的回调处理
					this.$refs.dialog.show = false;
				}).catch(() => {
					// 点击取消按钮的回调处理
					console.log('delete')
				});
			},
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
</script
<style lang="sass" rel="stylesheet/scss">
</style>
