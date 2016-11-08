<template>
	<div>
		<div class="alert alert-success" role="alert">
			1、通过“导入线路号码”与“新增线路号码”导入的号码一般是线路的采购号码，号码的运营商属性必须与归属线路的运营商属性一致。<br/>
			2、一个号码最多只能有一条归属线路，透传线路可有多个。
		</div>
		<div class="admin-table-header">
			<div class="remove-margin-bottom">
				<div class="select-box inline-block middle">
					<search
						:value.sync="postData.lineParams.number"
						:action="query"
						placeholder="请输入号码"
					></search>
				</div>
				<span class='datetime-picker-label'>支持主叫: </span>
				<select class="form-control middle" v-model='postData.lineParams.type'>
					<option value=''>全部</option>
					<option value='1'>可主叫</option>
					<option value='2'>可被叫</option>
					<option value='3'>可透传</option>
				</select>
				<button class="btn btn-primary admin-margin-l" @click="query">查询</button>
				<button class="btn btn-primary" @click="$refs.uploadnumber.show = true">导入线路号码</button>
				<button class="btn btn-primary" @click="$refs.newline.show = true">新增线路号码</button>
				<button class="btn btn-primary" @click="$refs.through.show = true">新增透传</button>
				<a class="btn btn-primary" @click="deleteNumber">删除号码</a>
			</div>
		</div>
		<div class="admin-table position-layout">
			<div class="table-total flex flex-1 justify-content-e float-r">
				共<span class="text-danger">{{originData.number.totalCount ? originData.number.totalCount : 0}}</span>条
			</div>
			<table class="table text-align-c">
				<thead>
				<tr>
					<th>全选 <input v-model="allChecked" :true-value="1" :false-value='0' type="checkbox"></th>
					<th>创建时间</th>
					<th>号码</th>
					<th>支持主叫</th>
					<th>支持被叫</th>
					<th>支持透传</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='l in list.number'>
					<td><input type="checkbox" v-model="selected.deleteNumber" value="{{l.id}}"></td>
					<td class="message-time text-align-c">{{ l.createTime | totalDate }}</td>
					<td>{{ l.telNumber }}</td>
					<td><input type="checkbox" @change="changeDialing($index, 0)" :checked="l.isDialing === '1'"></td>
					<td><input type="checkbox" @change="changeDialing($index, 1)" :checked="l.isCalled==='1'"></td>
					<td><input type="checkbox" @change="changeDialing($index, 2)" :checked="l.isThrough==='1'"></td>
				</tr>
				</tbody>
			</table>
			<div class="table-wrap position-layout" v-show="show.tableLoading">
				<img :src="loadinggif" class="position-center" alt="">
			</div>
			<div class="more">
				<a v-if='originData.number.currentPageNo >= originData.number.totalPageCount'>加载完毕</a>
				<a @click="query('more')" class="text-none"
				   v-show='originData.number.currentPageNo < originData.number.totalPageCount'>加载更多<i
					class="icon iconfont icon-oc-dropdown"></i></a>
			</div>
		</div>
		<new-line v-ref:newline></new-line>
		<upload-number v-ref:uploadnumber></upload-number>
		<new-through v-ref:through></new-through>
	</div>
</template>
<script>
	import {showMsg} from 'actions'
	
	export default {
		vuex: {
			getter: {},
			actions: {
				showMsg
			}
		},
		components: {
			'modal': require('ui/modal.vue'),
			'search': require('ui/search-input.vue'),
			'newLine': require('./telnum/newLineNumber.vue'),
			'uploadNumber': require('./telnum/uploadFileNumber.vue'),
			'newThrough': require('./telnum/newThroughNumber.vue'),
		},
		data(){
			return {
				loadinggif: require('assets/images/loading.gif'),
				numberList: [],
				show: {
					upload: false,
					newline: false,
					newpassline: false,
					tableLoading: false,
				},
				list: {
					number: []
				},
				selected: {
					deleteNumber: [],
				},
				postData: {
					lineParams: {
						pageNo: 1,
						number: '',
						type: '', // 1 可主叫， 2 可被叫 3 可透传
					}
				},
				originData: {
					number: {}
				}
			}
		},
		computed: {
			allChecked: {
				set(value){
					if (value === 0) {
						// 不全选
						this.selected.deleteNumber = []
					} else {
						// 全选
						this.selected.deleteNumber = this.list.number.map((obj)=> {
							return obj.id
						})
					}
				}
			}
		},
		methods: {
			deleteNumber(){
				$.delete('config/line/telnum/' + this.$route.params.lid, {ids: this.selected.deleteNumber}).then((e) => {
					if (e.errorMsg) {
						this.showMsg({content: e.errorMsg, type: 'danger'})
						return
					}
					this.showMsg({content: '新建成功', type: 'success'})
					this.query()
					this.show = false
				})
			},
			changeDialing(index, type){
				let number = this.list.number[index]
				let params = {telnums: []}
				
				switch (type) {
					case 0:
						number.isDialing = number.isDialing === '1' ? '0' : '1'
						break;
					case 1:
						number.isCalled = number.isCalled === '1' ? '0' : '1'
						break;
					case 2:
						number.isThrough = number.isThrough === '1' ? '0' : '1'
						break;
				}
				
				params.telnums.push(number)
				
				this.show.tableLoading = true
				$.put('/config/line/telnum/edit/' + this.$route.params.lid, params).then((e)=> {
					this.show.tableLoading = false
				})
			},
			query(type){
				let params = this.postData.lineParams
				if (type === 'more') {
					this.postData.lineParams.pageNo = this.originData.number.currentPageNo += 1
				}
				$.get('config/line/telnum/plist/' + this.$route.params.lid, params).then((res) => {
					this.originData.number = res.data
					this.list.number = type === 'more' ? this.list.number.concat(res.data.result) : res.data.result
				})
			},
		},
		route: {
			data(){
				this.query()
			}
		},
	}
</script>
<style lang="sass" rel="stylesheet/scss">
	input[type=file] {
		display: inline-block;
	}
	
	.pass_number_result {
		height: 200px;
		padding: 30px 20px;
		overflow-y: scroll;
	}
	
	.pass_number_selected {
		margin-top: 20px;
		.selected_box {
			margin-left: 5px;
			border: 1px solid rgba(159, 199, 163, 0.8);
			padding: 3px;
		}
	}
	
	.table-wrap {
		position: absolute;
		top: 0;
		bottom: 0;
		background: rgba(128, 128, 128, 0.2);
		width: 100%;
	}
	
	.admin-table table.text-align-c tr th {
		text-align: center;
	}
	
	.control-label {
		width: 100px;
	}
</style>
