<template>
	<div>

<!-- 		<div class="flex search-box bg-section-margin remove-margin-bottom">
	    <div class="select-box inline-block">
	      <search  placeholder='关联子账号' :value.sync='postData.number.subId' :action="queryName"></search>
	    </div>
	 </div> -->
		<div class="admin-table ">
			<div class="table-total flex flex-1 justify-content-e float-r">
				共<span class="text-danger">{{originData.number.totalCount ? originData.number.totalCount : 0}}</span>条
			</div>
			<table class="table">
				<thead>
				<tr>
					<th class='text-center'>坐席名称(ID)</th>
					<th>技能组</th>
					<th>绑定分机</th>
          <th>关联子账号</th>
					<th>状态</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='l in list.number'>
					<td class='text-center'>{{l.name}}</td>
					<td>
					  <span v-for="s in l.skills">{{s.name}}&nbsp;</span>
					</td>
					<td>{{l.extension}}</td>
          <td class="">{{ l.certId }}</td>
          <td>{{l.state}}</td>
				</tr>
				</tbody>
			</table>
			<div class="more">
				<a v-if='originData.number.currentPageNo >= originData.number.totalPageCount'>加载完毕</a>
				<a @click="query('more')" class="text-none" v-else>加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
			</div>
		</div>
	</div>
</template>
<script>
	import {showMsg} from 'actions'
	export default {
		vuex:{ actions: { showMsg } },
		components:{
			'search': require('ui/search-input.vue')
		},
		data(){
			return {
				show: {
					newNumber: false
				},
				postData: {
					number: {
						pageNo: 1,
						subId:''
					},
				},
				list: {
					number: [],
					bindNumber: []
				},
				originData: {
					number: {},
					bindNumber: {}
				}
			}
		},
		methods: {
			query(type){
				let params = this.postData.number
				params.pageNo = type==='more' ? this.originData.number.currentPageNo + 1 : 1
				$.get('tenant/tenants/'+ this.$route.params.uid + '/app/' + this.$route.params.appid + '/callcenter/agent', params).then((res) => {
					this.originData.number = res.data
					this.list.number = type === 'more' ? this.list.number.concat(res.data.result) : res.data.result
				})
			},
			queryName(){
				this.postData.number.pageNo = 1
				this.query()
			},
      init() {
  			this.query()
      }
		},
		ready(){
      this.init()
		}
	}
</script>
<style lang="sass" scoped>
</style>
