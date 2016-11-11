<template>
	<div class="margin-top-20">
		<div class="alert alert-success" role="alert">
			1、运营人员可手动为租户绑定号码，绑定的号码启用后会自动出现在租户的号码列表内。<br/>
			2、运营人员需要在号码管理中，为租户绑定号码。
		</div>
		<div class="admin-table ">
			<div class="table-total flex flex-1 justify-content-e float-r">
				共<span class="text-danger">{{origin.number.totalCount}}</span>条
			</div>
			<table class="table">
				<thead>
				<tr>
					<th class=" text-align-c">绑定时间</th>
					<th>号码</th>
					<th>可主叫</th>
					<th>可被叫</th>
					<th>关联应用</th>
					<th>号码来源</th>
					<th>运营商</th>
					<th>归属地</th>
					<th>归属线路</th>
					<th>状态</th>
					<th class=" text-align-c">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='l in list.number'>
					<td class="message-time text-align-c">{{l.createTime | totalDate}}</td>
					<td>{{ l.resourceTelenum.telNumber }}</td>
					<td>{{ l.resourceTelenum.isDialing === '1' ? '✔': '✘' }}</td>
					<td>{{ l.resourceTelenum.isCalled === '1' ? '✔': '✘' }}</td>
					<td>{{ l.resourceTelenum.app.name | fixNull }}</td>
					<td>{{ l.resourceTelenum.type ==='0' ?   '租户自带' : '采购线路' }}</td>
					<td>{{ l.resourceTelenum.operator }}</td>
					<td>{{ l.resourceTelenum.areaCode }}</td>
					<td>{{ l.resourceTelenum.line.lineNumber }}</td>
					<td v-if="l.resourceTelenum.usable === '1'" class="text-success">启用</td>
					<td v-else class="text-danger">禁用</td>
					<td class="text-align-c">
						<span @click="deleteLine($index, l.resourceTelenum.id)"><a>解除绑定</a></span>
					</td>
				</tr>
				</tbody>
			</table>
			<div class="more">
				<a v-show='origin.number.currentPageNo >= origin.number.totalPageCount'>加载完毕</a>
				<a @click="query('more')" class="text-none" v-show='origin.number.currentPageNo < origin.number.totalPageCount' >加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
			</div>
		</div>
	</div>
</template>
<script>
	import {showMsg} from 'actions'
	
	export default {
		vuex:{
			actions:{
				showMsg
			}
		},
		components: {
			'datetime-picker': require('ui/datetimepicker.vue'),
			'modal': require('ui/modal.vue')
		},
		data(){
			return {
				post: {
					number: {
						pageNo: 1
					}
				},
				origin: {
					number: {}
				},
				list: {
					number: []
				}
			}
		},
		methods: {
			query(type){
				let params = this.post.number
				if(type === 'more') {
					params.pageNo = this.origin.number.currentPageNo + 1
				}
				$.get('config/rent/list/'+ this.$route.params.uid, params).then((res) => {
					this.origin.number = res.data
					this.list.number = type === 'more' ? this.list.number.concat(res.data.result) : res.data.result
				})
			},
			deleteLine(index, nid){
				$.put('/config/telnum/release/'+nid).then((e)=>{
					if(e.errorMsg){
						this.showMsg({content: e.errorMsg, type: 'danger'})
						return
					}
					this.list.number.splice(index, 1)
					this.showMsg({content: '释放', type: 'success'})
					this.query()
				})
			},
		},
		ready(){
			this.query()
		}
	}
</script>
