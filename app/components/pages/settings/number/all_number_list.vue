<template>
	<div>
		<div class="alert alert-success" role="alert">
			新增的号码默认为禁用状态，需要手动启用。号码一旦启用，即可被租户所使用
		</div>
		<div class="admin-table-header">
			<div class="remove-margin-bottom">
				<div class="select-box inline-block">
					<search
						:value.sync="postData.lineParams.number"
						:action="query"
						placeholder="请输入号码"
					></search>
				</div>
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
					<option value='0' >禁用</jkoption>
				</select>
				<button class="btn btn-primary admin-button-margin" @click="query" >查询</button>
				<a class="btn btn-primary " v-link="{path: '/admin/settings/number/new', exact: true}">新增号码</a>
			</div
		</div>
		<div class="admin-table ">
			<div class="table-total flex flex-1 justify-content-e float-r">
				共<span class="text-danger">{{originData.number.totalCount ? originData.number.totalCount : 0}}</span>条
			</div>
			<table class="table">
				<thead>
				<tr>
					<th class=" text-align-c">创建时间</th>
					<th>号码</th>
					<th>可主叫</th>
					<th>可被叫</th>
					<th>可透传</th>
					<th>号码来源</th>
					<th>运营商</th>
					<th>归属地</th>
					<th>归属线路</th>
					<th>绑定租户</th>
					<th>状态</th>
					<th class="text-align-c">操作</th>
				</tr>
				</thead>
				<tbody>
					<tr v-for='l in list.number'>
						<td class="message-time text-align-c">{{l.createTime | totalDate}}</td>
            <td>{{ l.telNumber }} <i class="icon iconfont icon-oc-wastage oc-wastage-small" v-if="l.isTestTelnum"></i></td>
						<td>{{ l.isDialing === '1' ? '✔': '✘' }}</td>
						<td>{{ l.isCalled === '1' ? '✔': '✘' }}</td>
						<td>{{ l.isThrough === '1' ? '✔': '✘' }}</td>
						<td>{{ l.type === '0' ? '租户自带' : '采购线路' }}</td>
						<td>{{ l.operator }}</td>
						<td>{{ l.areaCode }}</td>
						<td>{{ l.line ? l.line.lineNumber : '' }}</td>
						<td>{{ l.tenant ? l.tenant.tenantName : '无'}}</td>
						<td v-if="l.usable === '1'" class="text-success">启用</td>
						<td v-else class="text-danger">禁用</td>
						<td class="text-align-c">
							<span><a v-link="'/admin/settings/number/detail/'+l.id">详情</a></span>
							<span v-if=" l.usable === '1'"  @click="disabled($index, l.id)"><a>禁用</a></span>
							<span v-if=" l.usable !== '1'"  @click="enabled($index, l.id)"><a>启用</a></span>
							<span @click="confirmDeleteNumber($index, l.id)"><a>删除</a></span>
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
	<confirm v-ref:dialog></confirm>
</template>
<script>
	import {showMsg} from 'actions'
	export default {
		vuex:{
			actions: { showMsg }
		},
		components: {
			'search': require('ui/search-input.vue'),
			'confirm': require('ui/confirm.vue'),
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
			confirmDeleteNumber(index, id){
				this.$refs.dialog.confirm().then(() => {
					// 点击确定按钮的回调处理
					this.deleteNumber(index, id)
					this.$refs.dialog.show = false;
				}).catch(() => {
					// 点击取消按钮的回调处理
					console.log('delete')
				});
			},
			deleteNumber(index, id){
				$.delete('/config/telnum/'+id).then(()=>{
					this.list.number.splice(index, 1)
					this.originData.number.totalCount -= 1
					this.showMsg({content: '删除成功', type: 'success'})
				})
			},
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
