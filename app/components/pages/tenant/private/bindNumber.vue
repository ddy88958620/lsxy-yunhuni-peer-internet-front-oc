<template>
	<modal :classname="'table'" :show.sync="show.self" title="新增透传号码" :action="closeModal">
		<div slot="body">
			<div class="form-group">
				<div class="select-box inline-block">
					<search
						:value.sync="search"
						:action="query"
						placeholder="模糊查询"
					></search>
				</div>
				&nbsp;
				<label class="">运营商 : </label>
				<select class="form-control input-width-select" v-model='type'>
					<option value=1>活动消息</option>
					<option value=0>用户消息</option>
				</select>
				&nbsp;
				<label class="">号码功能 : </label>
				<select class="form-control input-width-select" v-model='type'>
					<option value=1>活动消息</option>
					<option value=0>用户消息</option>
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
						<th>号码</th>
						<th>可主叫</th>
						<th>可被叫</th>
						<th>号码来源</th>
						<th>运营商</th>
						<th>归属地</th>
						<th>归属线路</th>
					</tr>
					</thead>
					<tbody>
					<tr v-for='message in messagesList'>
						<td><input type="checkbox"></td>
						<td class="message-time text-align-c">{{message.lineTime | totalDate}}</td>
						<td>23424324</td>
						<td>✔</td>
						<td>✘</td>
						<td>租户自带</td>
						<td>电信</td>
						<td>10000</td>
						<td>无</td>
					</tr>
					</tbody>
				</table>
			</div>
			<div class="admin-table">
				<div class="more">
					<a
						v-show='messages.totalPageCount >= messages.currentPageNo'>加载完毕</a>
					<a @click="query('more')" class="text-none"
					   v-show='messages.totalPageCount!=messages.currentPageNo && messages.totalPageCount!=0'>加载更多<i
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
							<th>号码</th>
							<th>可主叫</th>
							<th>可被叫</th>
							<th>号码来源</th>
							<th>运营商</th>
							<th>归属地</th>
							<th>归属线路</th>
						</tr>
						</thead>
						<tbody>
						<tr v-for='message in messagesList'>
							<td>&nbsp;<button @click="deleteBindNumberSelected($index)" type="button" class="close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button></td>
							<td class="message-time text-align-c">{{message.lineTime | totalDate}}</td>
							<td>23424324</td>
							<td>✔</td>
							<td>✘</td>
							<td>租户自带</td>
							<td>电信</td>
							<td>10000</td>
							<td>无</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
	</modal>
</template>
<script>
	export default {
		data(){
			return {
				show: {
					self: false
				},
				bindNumber: {
					list: []
				},
				messages: [],
				messagesList: []
			}
		},
		components: {
			'modal': require('ui/modal.vue'),
			'search': require('ui/search-input.vue'),
		},
		methods: {
			query(type){
				let params = {}
				
				
				if(type === 'more') {
					params.pageNo = this.messages.currentPageNo + 1
					
				}
				
				let self = this
				$.get('/message/list', params).then((res) => {
					self.messages = res.data
					
					if(type=='more')
						self.messagesList = self.messagesList.concat(res.data.result)
					else
						self.messagesList = res.data.result
				})
			},
		},
		ready(){
			this.query()
		}
	}
</script>