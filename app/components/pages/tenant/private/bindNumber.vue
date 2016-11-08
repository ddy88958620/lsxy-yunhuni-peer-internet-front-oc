<template>
	<modal :classname="'table-big'" :show.sync="show.self" title="新增透传号码" :action="add">
		<div slot="body">
			<div class="form-group">
				<div class="select-box inline-block">
					<search
						:value.sync="post.line.lineNumber"
						:action="query"
						placeholder="模糊查询"
					></search>
				</div>
				&nbsp;
				<label class="">运营商 : </label>
				<select class="form-control input-width-select" v-model='post.line.operator'>
					<option value=''>全部</option>
					<option value='中国移动'>中国移动</option>
					<option value='中国联通'>中国联通</option>
					<option value='中国电信'>中国电信</option>
				</select>
				&nbsp;
				<button class="btn btn-primary admin-margin-l" @click="query">查询</button>
			</div>
			<div class="admin-table bind_number_result">
				<table class="table">
					<thead>
					<tr>
						<td>选择</td>
						<th class=" text-align-c">创建时间</th>
						<th>线路标识</th>
						<th>运营商</th>
						<th>区域</th>
						<th>归属地</th>
						<th>支持透传</th>
						<th>质量</th>
						<th>并发容量</th>
					</tr>
					</thead>
					<tbody>
					<tr v-for='l in list.line'>
						<td><input type="checkbox" v-model="lineIndex" value="{{$index}}"></td>
						<td class="message-time text-align-c">{{l.createTime | totalDate}}</td>
						<td>{{ l.lineNumber}}</td>
						<td>{{ l.operator }}</td>
						<td>{{ l.areaId }}</td>
						<td>{{ l.areaCode }}</td>
						<td>{{ l.isThrough === '1' ? '✔' : '✘'}}</td>
						<td>{{ l.quality }}</td>
						<td>{{ l.capacity }}</td>
					</tr>
					</tbody>
				</table>
			</div>
			<div class="admin-table">
				<div class="more">
					<a
						v-show='origin.line.totalPageCount >= origin.line.currentPageNo'>加载完毕</a>
					<a @click="query('more')" class="text-none"
					   v-show='origin.line.totalPageCount < origin.line.currentPageNo'>加载更多<i
						class="icon iconfont icon-oc-dropdown"></i></a>
				</div>
			</div>
			<div class="pass_number_selected margin-top-20">
				<label for="" class="">您选择了以下线路 : </label>
				<div class="admin-table bind_number_result">
					<table class="table">
						<thead>
						<tr>
							<td>选择</td>
							<th class=" text-align-c">创建时间</th>
							<th>线路标识</th>
							<th>运营商</th>
							<th>区域</th>
							<th>归属地</th>
							<th>支持透传</th>
							<th>质量</th>
							<th>并发容量</th>
						</tr>
						</thead>
						<tbody>
						<tr v-for='l in selected.line' v-if="selected.line.length !== 0">
							<td>
								&nbsp;
								<button @click="deleteLine(l.k)" type="button" class="close"><span aria-hidden="true">&times;</span>
									<span class="sr-only">Close</span></button>
							</td>
							<td class="message-time text-align-c">{{l.v.createTime | totalDate}}</td>
							<td>{{ l.v.lineNumber}}</td>
							<td>{{ l.v.operator }}</td>
							<td>{{ l.v.areaId }}</td>
							<td>{{ l.v.areaCode }}</td>
							<td>{{ l.v.isThrough === '1' ? '✔' : '✘'}}</td>
							<td>{{ l.v.quality }}</td>
							<td>{{ l.v.capacity }}</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
	</modal>
</template>
<script>
	export default {
		vuex: {
			actions: {showMsg: require('actions').showMsg}
		},
		data(){
			return {
				show: {
					self: false
				},
				list: {
					line: []
				},
				post: {
					line: {
						pageNo: 1,
						lineNumber: '',
					}
				},
				origin: {
					line: {}
				},
				selected: {
					line: [],
				},
				lineIndex: []
			}
		},
		watch: {
			lineIndex: {
				handler: function (e) {
					this.selected.line = this.lineIndex.map((item)=> {
						return {k: item, v: this.list.line[item]}
					})
				},
				deep: true
			},
			show: {
				handler: function(e) {
					this.query()
				},
				deep: true
			}
		},
		components: {
			'modal': require('ui/modal.vue'),
			'search': require('ui/search-input.vue'),
		},
		methods: {
			query(type){
				let params = this.post.line
				if (type === 'more') {
					params.pageNo = this.origin.line.currentPageNo + 1
				}
				$.get('/config/tenant/line/plist/' + this.$route.params.uid, params).then((res) => {
					this.origin.line = res.data
					this.list.line = type === 'more' ? this.list.line.concat(res.data.result) : res.data.result
				})
			},
			deleteLine(value){
				this.lineIndex.splice(this.lineIndex.indexOf(value), 1)
			},
			add(){
				let ids = this.selected.line.map((item)=> {
					return item.v.id
				})
				$.post('config/tenant/add/' + this.$route.params.uid, {ids: ids}).then((e)=> {
					if (e.errorMsg) {
						this.showMsg({content: e.errorMsg, type: 'danger'})
						return
					}
					this.showMsg({content: '更新成功', type: 'success'})
					this.query()
					this.show.self = false
					this.lineIndex = []
					this.$route.router.replace({
						path: this.$route.path,
						query: {t: new Date()}
					})
				})
			}
		},
		ready(){
			this.query()
		}
	}
</script>