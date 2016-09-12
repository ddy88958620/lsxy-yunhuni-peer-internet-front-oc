<template>

	<div class="flex search-box bg-section-margin remove-margin-bottom">
		<div class="select-box">
			<search  placeholder='请输入关键字' :value.sync='searchName' :action=""></search>
		</div>
	</div>

	<div class="admin-table table-responsive">
		<div class="table-total flex flex-1 justify-content-e">
			共<span  class="green">{{ capacity.fileTotalSize | fileSize }}</span>MB,
			已使用<span class="text-danger">{{((capacity.fileRemainSize || 0)/1024/1024).toFixed(2)}}</span>MB,
			共<span class="text-danger">{{page.total || 0}}</span>条
		</div>
		<table class="table remove-margin-bottom">
			<thead>
			<tr>
				<th class="text-align-c">审核时间</th>
				<th>文件</th>
				<th>大小</th>
				<th class="text-align-c">备注</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for='play in plays'>
				<td class="message-time text-align-c">{{ play.checkTime | totalDate || '未审核'}}</td>
				<td>{{play.name}}</td>
				<td>{{ play.size | fileSize}}</td>
				<td class="text-align-c">{{play.remark}}</td>
			</tr>
			</tbody>
		</table>
		<div class="more">
			<a v-show='page.loading'>正在加载</a>
			<a v-show='!page.loading && !page.hasMore'>加载完毕</a>
			<a @click="query()" class="text-none" v-show='!page.loading && page.hasMore'>加载更多<i
				class="icon iconfont icon-oc-dropdown"></i></a>
		</div>
	</div>
</template>


<script>
	export default{
		components:{
			'search': require('../../../../ui/search-input.vue')
		},
		data(){
			return{
				plays :[],
				capacity:{},
				page: {
					query: {
						name: '',
						pageNo: 0,
						pageSize: 10
					},
					loading: true,
					hasMore: true,
					total:0
				},
				searchName:''
			}
		},
		methods: {
			fileCapacity(){
				let self = this;
				$.get('/tenant/tenants/'+this.$route.params.uid+'/file/totalSize').then((res)=> {
					return res.data && (self.capacity = res.data)
				})
			},
			query(init){
				let self = this
				let pageNo = (init && 1) || self.page.query.pageNo + 1
				self.page.query.name = self.searchName
				let params = $.extend(true, {}, self.page.query);
				params.pageNo = pageNo;
				self.page.loading = true
				if(init){
					self.plays = [];
				}
				$.get('/tenant/tenants/'+this.$route.params.uid+'/apps/'+this.$route.params.appid+'/plays', params).then((res)=> {
					self.page.loading = false

					if (res.data && res.data.result) {
						if (init) {
							self.plays = res.data.result
						} else {
							self.plays = self.plays.concat(res.data.result)
						}
						self.page.query.pageNo = pageNo
					}
					self.page.hasMore = res.data && ((res.data.totalPageCount || 0 ) > self.page.query.pageNo)
					self.page.total = (res.data && res.data.totalCount) || 0
				})
			}
		},
		ready(){
			this.query(true)
			this.fileCapacity()
		}
	}
</script>
<style lang="sass">
</style>
