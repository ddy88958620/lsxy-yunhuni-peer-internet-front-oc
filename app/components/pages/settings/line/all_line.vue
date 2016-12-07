<template>
	<div>
		<div class="alert alert-success" role="alert">
			1.新增的线路默认为禁用状态，需要手动启用，会员是否能够租用号码，与号码所属线路的禁用启用无关，与号码的禁用启用有关。<br/>
			2.新增的线路默认为非全局线路，需要手动归入全局。<br/>
			3.平台互联网用户只允许购买全局线路里的号码，非全局线路只能被运营人员手动绑定给用户。
		</div>
		<div class="admin-table-header">
			<div class="remove-margin-bottom">
				<span class='datetime-picker-label'>运营商: </span>
				<select class="form-control" v-model='postData.lineParams.operator' >
					<option value=''>全部</option>
					<option value='中国移动'>中国移动</option>
					<option value='中国联通'>中国联通</option>
					<option value='中国电信'>中国电信</option>
				</select>
				<span class='datetime-picker-label'>支持透传: </span>
				<select class="form-control"  v-model='postData.lineParams.isThrough'>
					<option value=''>全部</option>
					<option value='1' >是</option>
					<option value='0' >否</option>
				</select>
				<span class='datetime-picker-label'>状态: </span>
				<select class="form-control"  v-model='postData.lineParams.status'>
					<option value=''>全部</option>
					<option value='1' >启用</option>
					<option value='0' >禁用</option>
				</select>
				<button class="btn btn-primary admin-button-margin" @click="query" >查询</button>
				<a class="btn btn-primary " v-link="{path: '/admin/settings/line/new', exact: true}">新增线路</a>
			</div>
		</div>
		<div class="admin-table ">
			<div class="table-total flex flex-1 justify-content-e float-r">
				共<span class="text-danger">{{originData.line.totalCount ? originData.line.totalCount : 0}}</span>条
			</div>
			<table class="table">
				<thead>
				<tr>
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
					<td class="message-time text-align-c">{{l.createTime | totalDate}}</td>
					<td>{{ l.lineNumber ? l.lineNumber : '无' }}</td>
					<td>{{ l.operator }}</td>
					<td>{{ l.areaId }}</td>
					<td>{{ l.areaCode }}</td>
					<td>{{ l.isThrough === '1' ? '是' : '否'}}</td>
					<td>{{ l.quality }}</td>
					<td>{{ l.capacity }}</td>
					<td v-if=" l.status === '1'" class="text-success">启用</td>
					<td v-if=" l.status !== '1'" class="text-danger">禁用</td>
					<td class="text-align-c">
						<span><a v-link="'/admin/settings/line/detail/'+l.id+'/base'">详情</a></span>
						<span v-if=" l.status === '1'"  @click="disabledLine($index, l.id)"><a>禁用</a></span>
						<span v-if=" l.status !== '1'"  @click="enabledLine($index, l.id)"><a>启用</a></span>
						<span @click="confirmDelete($index, l.id)"><a>删除</a></span>
						<span v-if=" l.isPublicLine === '0' " @click="addGlobal($index, l.id)"><a>归入全局</a></span>
					</td>
				</tr>
				</tbody>
			</table>
			<div class="more">
				<a v-if='originData.line.currentPageNo >= originData.line.totalPageCount'>加载完毕</a>
				<a @click="query('more')" class="text-none" v-if='originData.line.currentPageNo < originData.line.totalPageCount' >加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
			</div>
		</div>
	</div>
	<confirm v-ref:dialog></confirm>
</template>
<script>
	import {showMsg} from 'actions'

	export default {
		vuex:{
			actions:{ showMsg }
		},
		components: {
			'datetime-picker': require('ui/datetimepicker.vue'),
			'modal': require('ui/modal.vue'),
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
			confirmDelete(index, id){
				this.$refs.dialog.confirm().then(() => {
					// 点击确定按钮的回调处理
					this.deleteLine(index, id)
					this.$refs.dialog.show = false;
				}).catch(() => {
					// 点击取消按钮的回调处理
					console.log('delete')
				});
			},
			deleteLine(index, lid){
				$.delete('/config/line/'+lid).then(()=>{
					this.list.splice(index, 1)
					this.showMsg({content: '删除成功', type: 'success'})
          this.query()
				})
			},
			enabledLine(index, lid) {
				$.put('/config/line/enabled/'+lid).then(()=>{
					let line = this.list[index]
					line.status = '1'
					this.list.$set(index, line)
					this.showMsg({content: '启用成功', type: 'success'})
				})
			},
			disabledLine(index, lid) {
				$.put('/config/line/disabled/'+lid).then(()=>{
					let line = this.list[index]
					line.status = '0'
					this.list.$set(index, line)
					this.showMsg({content: '禁用成功', type: 'success'})
				})
			},
			query(type){
				let params = this.postData.lineParams
				if(type === 'more') {
					this.postData.lineParams.pageNo = this.originData.line.currentPageNo + 1
				}
				$.get('/config/line/plist', params).then((res) => {
					this.originData.line = res.data
					this.list = type === 'more' ? this.list.concat(res.data.result) : res.data.result
				})
			},
			addGlobal(index, lid){
				$.post('/config/public/add/'+lid).then((e)=>{
					if(!e.success) {
						this.showMsg({content: e.errorMsg, type: 'danger'})
						return
					}
					let line = this.list[index]
					line.isPublicLine = '1'
					this.list.$set(index, line)
					this.showMsg({content: '加入全局成功', type: 'success'})
				})
			},
		},
		ready(){
			this.query()
		}
	}
</script>
