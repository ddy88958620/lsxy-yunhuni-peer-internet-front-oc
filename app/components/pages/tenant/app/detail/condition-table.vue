<template>

  <div class="flex search-box bg-section-margin remove-margin-bottom">
    <div class="select-box inline-block">
      <search  placeholder='关联子账号' :value.sync='page.query.subId' :action="search"></search>
    </div>
    <!--<div class="select-box inline-block">
      <search  placeholder='排队条件ID' :value.sync='page.query.queueId' :action="search"></search>
    </div>-->

	</div>

	<div class="admin-table">
		<div class="table-total flex flex-1 justify-content-e float-r">
			共<span class="text-danger">{{page.total || 0}}</span>条
		</div>
		<table class="table ">
			<thead>
			<tr>
				<th>条件选择表达式</th>
				<th>排序表达式</th>
				<th>优先级</th>
				<th class="text-align-c">等待超时时间（秒）</th>
				<th class="text-align-c">接听超时时间（秒）</th>
				<th>关联子账号</th>
				<th>备注</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for='play in plays'>
				<td>{{ play.whereExpression }}</td>
				<td>{{ play.sortExpression }}</td>
				<td>{{ play.priority }}</td>
				<td class="text-align-c">{{ play.queue_timeout || 0 }}</td>
				<td class="text-align-c">{{ play.fetch_timeout || 0 }}</td>
				<td>{{ play.certId  }}</td>
				<td>{{ play.remark  }}</td>
			</tr>
			</tbody>
		</table>
		<div class="more">
			<a v-show='page.loading'>正在加载</a>
			<a v-show='!page.loading && !page.hasMore'>加载完毕</a>
			<a @click="query('')" class="text-none" v-show='!page.loading && page.hasMore'>加载更多<i
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
            queueId: '',
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
			search(){
				this.query(true)
			},
			query(init){
				let self = this
				let pageNo = (init && 1) || self.page.query.pageNo + 1
				self.page.query.name = self.searchName
				let params = $.extend(true, {}, self.page.query);
				params.pageNo = pageNo;
				params.pageSize = 20;
				self.page.loading = true
				if(init){
					self.plays = [];
				}
				$.get('/tenant/tenants/'+this.$route.params.uid+'/apps/' + this.$route.params.appid + '/callcenter/queue/', params).then((res)=> {
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
		}
	}
</script>
<style lang="sass">
</style>
