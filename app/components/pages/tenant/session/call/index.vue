<template>
	<div>
		<div class="admin-table table-responsive">
			<div class="table-total flex flex-1 justify-content-e">
				消费金额: <span class="brown">{{sessionTotal}}</span>元 共<span class="text-danger">{{session.totalCount ? session.totalCount : 0 }}</span>条
			</div>
			<table class="table">
				<thead>
				<tr>
					<th class="text-align-c">呼叫时间</th>
					<th>主叫</th>
					<th>被叫</th>
					<th>时长(秒)</th>
					<th>消费金额(元)</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='message in sessionList'>
					<td class="message-time text-align-c">{{message.callStartDt | totalDate}}</td>
					<td>{{ message.fromNum }}</td>
					<td>{{ message.toNum }}</td>
					<td>{{ message.callTimeLong }}</td>
					<td>{{ message.cost }}</td>
				</tr>
				</tbody>
			</table>
			<div class="more">
				<a v-show='session.totalPageCount==session.currentPageNo || session.totalPageCount==0'>加载完毕</a>
				<a @click="query('more')" class="text-none" v-show='session.totalPageCount!=session.currentPageNo && session.totalPageCount!=0' >加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
			</div>	
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				session:{},
				sessionTotal : 0,
				sessionList: [],
				messages:[],
				total: 100
			}
		},
		methods: {
			query(more){
				//1.语音呼叫2.双向回拨3.会议服务4.IVR定制服务5.语音验证码6.录音服务
				let uid = this.$route.params.uid
				let type = 1
				let appId = this.$route.params.aid
				let time = this.$route.params.day
				let params = {type:type,appId:appId,time:time}
				if(more){
					let pageNo = this.session.currentPageNo + 1
					params.pageNo = pageNo
				}
				let self = this
				$.get('/tenant/'+uid+'/session', params).then((res) => {
					 if(res.data.page.totalCount>0){
			            self.sessionTotal =res.data.total
			            self.session = res.data.page
			            if(more)
			              self.sessionList = self.sessionList.concat(res.data.page.result)
			            else
			              self.sessionList = res.data.page.result
			          }
				})
			}
		},
		route: {
			data(){
        this.query()
      }
		}

	}

</script>
