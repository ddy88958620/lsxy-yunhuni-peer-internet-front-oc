<template>
	<div class="admin-table">
		<div class="table-total flex flex-1 justify-content-e float-r">
			共<span class="text-danger">{{ demand.totalCount }}</span>条
		</div>
		<table class="table">
			<thead>
			<tr>
				<th class="text-align-c">注册时间</th>
				<th>会员名称</th>
				<th>手机号</th>
				<th>邮箱</th>
				<th class="text-align-c">操作</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for='message in demand.result'>
				<td class="message-time text-align-c">{{message.date | totalDate}}</td>
				<td><a v-link="'/admin/tenant/detail/'+message.tenantId" >{{message.name}}</a></td>
				<td>{{message.phone}}</td>
				<td>{{message.email}}</td>
				<td v-if="message.type==0">个人认证</td>
				<td v-if="message.type==1">公司认证</td>
				<td class="text-align-c">
					<span><a v-link="'/admin/demand/member/detail/await/'+message.uid+'/'+message.type">审核</a></span>
				</td>
			</tr>
			</tbody>
		</table>
		<div class="more">
			<a v-show='this.demand.totalPageCount==this.demand.currentPageNo || this.demand.totalPageCount==0'>加载完毕</a>
			<a @click="moreMessage" class="text-none" v-show='this.demand.totalPageCount!=this.demand.currentPageNo && this.demand.totalPageCount!=0' >加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
		</div>
	</div>
</template>
<script>
	export default {
		
	}
</script>