<style lang="sass" scoped>
</style>
<template>
	<div>
		<div class="alert alert-success" role="alert">
			禁止红名单号码作为被叫号码使用，禁止黑名单号码作为主叫号使用
		</div>
		<div class="admin-table-header">
			<div class="remove-margin-bottom">
				<span class='datetime-picker-label'>号码类型: </span>
				<select class="form-control" v-model='postData.type' >
					<option value=''>全部</option>
					<option value=1 >红名单</option>
					<option value=2 >黑名单</option>
				</select>
				<button class="btn btn-primary admin-button-margin" @click="query" >查询</button>
				<a class="btn btn-primary" @click="show.newNumber = true">新增号码</a>
			</div>
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
					<th>号码类型</th>
					<th>状态</th>
					<th class=" text-align-c">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='l in list.number'>
					<td class="message-time text-align-c">{{l.createTime | totalDate}}</td>
					<td>{{l.number}}</td>
					<td>{{l.type === 1 ? '红名单' : '黑名单'}}</td>
					<td v-if='l.status===1' class="text-success">启用</td>
					<td class="text-danger" v-else >禁用</td>
					<td class="text-align-c">
						<span @click="disabled($index, l.id)" v-if='l.status===1'><a>禁用</a></span>
						<span @click="enabled($index, l.id)" v-else><a>启用</a></span>
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
	
	<modal :show.sync="show.newNumber" title="新增线路号码" :action="new">
		<div slot="body">
			<input type="radio" v-model="postData.newNumber.type" value="1" number> 红名单 &nbsp;
			<input type="radio" v-model="postData.newNumber.type" value="2" number> 黑名单
			<br/>
			<br/>
			<form v-reset-form="postData">
				<div class="form-group">
					<label class="control-label">新增号码 : </label>
					<input type="text" class="form-control input-width" placeholder="" :value="postData.newNumber.number" v-model="postData.newNumber.number">
				</div>
			</form>
		</div>
	</modal>
	<confirm v-ref:dialog></confirm>

</template>
<script>
	import {showMsg} from 'actions'
	
	export default {
		vuex:{
			getter:{},
			actions:{
				showMsg
			}
		},
		components: {
			'datetime-picker': require('ui/datetimepicker.vue'),
			'modal': require('ui/modal.vue'),
			'confirm': require('ui/confirm.vue'),
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
				$.delete('/config/redblank/'+id).then(()=>{
					this.list.number.splice(index, 1)
					this.originData.number.totalCount -= 1
					this.showMsg({content: '删除成功', type: 'success'})
				})
			},
			enabled(index, id) {
				$.put('config/redblank/enabled/'+id).then(()=>{
					let temp = this.list.number[index]
					temp.status = 1
					this.list.number.$set(index, temp)
					this.showMsg({content: '启用成功', type: 'success'})
				})
			},
			disabled(index, id) {
				$.put('/config/redblank/disabled/'+id).then(()=>{
					let temp = this.list.number[index]
					temp.status = 0
					this.list.number.$set(index, temp)
					this.showMsg({content: '禁用成功', type: 'success'})
				})
			},
			query(type){
				let params = this.postData
				if(type === 'more') {
					params.pageNo = this.originData.number.currentPageNo + 1
				}
				$.get('config/redblank/plist', params).then((res) => {
					this.originData.number = res.data
					this.list.number = type === 'more' ? this.list.number.concat(res.data.result) : res.data.result
				})
			},
			new(){
				$.post('config/redblank/new', this.postData.newNumber).then((e)=> {
					if(e.errorMsg){
						this.showMsg({content: e.errorMsg, type: 'danger'})
						return
					}
					this.showMsg({content: '新建成功', type: 'success'})
					this.query()
					this.show.newNumber = false
				})
			},
		},
		ready(){
			this.query()
		}
		
	}
</script>
