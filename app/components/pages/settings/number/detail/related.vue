<template>
	<div class="admin-table margin-top-20">
		<h4>归属线路</h4>
		<table class="table">
			<thead>
			<tr>
				<th class=" text-align-c">创建时间</th>
				<th>线路标识</th>
				<th class="table-operator">运营商</th>
				<th>归属地</th>
				<th>支持透传</th>
				<th>质量</th>
				<th>并发容量</th>
			</tr>
			</thead>
			<tbody>
			<tr v-if="list.l.lineGateway">
				<td class="message-time text-align-c">{{list.l.lineGateway.createTime | totalDate}}</td>
				<td>{{ list.l.lineGateway.lineNumber}}</td>
				<td>{{ list.l.lineGateway.operator }}</td>
				<td>{{ list.l.lineGateway.areaCode }}</td>
				<td>{{ list.l.isThrough === '1' ?  '是' : '否'}}</td>
				<td>{{ list.l.lineGateway.quality }}</td>
				<td>{{ list.l.lineGateway.capacity }}</td>
			</tr>
			</tbody>
		</table>
		<h4 class="margin-top-20">透传线路</h4>
		<table class="table">
			<thead>
			<tr>
				<th class=" text-align-c">创建时间</th>
				<th>线路标识</th>
				<th class="table-operator">运营商</th>
				<th>归属地</th>
				<th>支持透传</th>
				<th>质量</th>
				<th>并发容量</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="l in list.more">
				<td class="message-time text-align-c">{{l.lineGateway.createTime | totalDate}}</td>
				<td>{{ l.lineGateway.lineNumber}}</td>
				<td>{{ l.lineGateway.operator }}</td>
				<td>{{ l.lineGateway.areaCode }}</td>
				<td>{{ l.isThrough === '1' ?  '是' : '否'}}</td>
				<td>{{ l.lineGateway.quality }}</td>
				<td>{{ l.lineGateway.capacity }}</td>
			</tr>
			</tbody>
		</table>
		<div class="more">
			<a v-if='origin.more.currentPageNo >= origin.more.totalPageCount'>加载完毕</a>
			<a @click="query('more')" class="text-none" v-if='origin.more.currentPageNo < origin.more.totalPageCount' >加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				list: {
					l: {},
					more: []
				},
				pageNo: 1,
				origin: {
					more: {}
				}
			}
		},
		methods: {
			// 归属线路
			fetchOne(){
				$.get('config/telnum/line/one/'+this.$route.params.nid).then((e)=>{
					this.list.l = e.data
				})
			},
			fetchMore(type){
				if(type === 'more') {
					this.pageNo = this.origin.more.currentPageNo + 1
				}
				$.get('config/telnum/line/plist/'+this.$route.params.nid).then((res)=>{
					this.origin.more = res.data
					this.list.more = type === 'more' ? this.list.more.concat(res.data.result) : res.data.result
				})
			},
		},
		ready(){
			this.fetchOne()
			this.fetchMore()
		}
	}
</script>
<style>
	.table-operator {
		width: 200px;
	}
	
</style>
