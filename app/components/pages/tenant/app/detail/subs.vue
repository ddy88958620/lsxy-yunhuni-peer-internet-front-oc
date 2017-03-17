<template>
	<div>

    <div class="flex search-box bg-section-margin remove-margin-bottom">
      <div class="select-box">
        <search  placeholder='鉴权账号' :value.sync='postData.subs.subId' :action="query"></search>
      </div>
    </div>
		<div class="admin-table">
			<div class="table-total flex flex-1 justify-content-e float-r">
				共<span class="text-danger">{{origin.subs_res.totalCount ? origin.subs_res.totalCount : 0}}</span>条
			</div>
			<table class="table">
				<thead>
				<tr>
					<th class='text-center'>子账号(ID)</th>
					<th>鉴权账号</th>
					<th>密钥</th>
					<th v-if="serviceType=='voice' || serviceType =='call_center'" class="text-align-c">语音用量 /总量（分钟）</th>
          <th v-if="serviceType =='call_center'" class="text-align-c">坐席用量 /总量（分钟）</th>
          <th v-if="serviceType =='msg'" class="text-align-c">闪印用量 /配额（条）</th>
          <th v-if="serviceType =='msg'" class="text-align-c">短信用量/配额（条）</th>
					<th>状态</th>
          <th>详情</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='subs in origin.subs_list'>
          <td>{{ subs.id }}</td>
          <td>{{ subs.certId }}</td>
          <td>{{ subs.secretKey }}</td>
          <td v-if="serviceType=='voice' || serviceType =='call_center'" class="text-align-c">{{ subs.voiceNum }}</td>
          <td v-if="serviceType =='call_center'" class="text-align-c">{{ subs.seatNum }}</td>
          <td v-if="serviceType =='msg'" class="text-align-c">{{ subs.smsNum }}</td>
          <td v-if="serviceType =='msg'" class="text-align-c">{{ subs.ussdNum }}</td>
          <td>
             <span class="text-danger" v-if="subs.enabled==0">禁止</span>
             <span class="darkgreen" v-if="subs.enabled==1">启动</span>
          </td>
          <td><a @click="detail(subs.id)">详情</a></td>
				</tr>
				</tbody>
			</table>
			<div class="more">
				<a v-if='origin.subs_res.currentPageNo >= origin.subs_res.totalPageCount'>加载完毕</a>
				<a @click="query('more')" class="text-none" v-else>加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
			</div>
		</div>

    <subs-detail v-ref:subdetail></subs-detail>

	</div>
</template>
<script>
	import {showMsg} from 'actions'
	export default {
		vuex:{ actions: { showMsg } },
    components:{
      'search': require('ui/search-input.vue'),
      'subsDetail': require('./subsDetail.vue')
    },
		data(){
			return {
				show: {
					newNumber: false
				},
        serviceType : this.$route.params.serviceType,
				postData: {
					subs: {
						pageNo: 1,
            subId:'',
					},
				},
				origin: {
          subs_list: {},
          subs_res: {},
				}
			}
		},
		methods: {
			query(type){
				let params = this.postData.subs
				if(type === 'more') {
					params.pageNo = this.originData.number.currentPageNo + 1
				}
				$.get('tenant/tenants/'+ this.$route.params.uid + '/apps/' + this.$route.params.appid + '/subs', params).then((res) => {
				  if(res.success){
            this.origin.subs_res = res.data
            this.origin.subs_list = type === 'more' ? this.origin.subs_list.concat(res.data.result) : res.data.result
          }
				})
			},
      detail(subId){
        this.$refs.subdetail.show = true
        this.$refs.subdetail.subId = subId
      }
		},
		ready(){
      this.query()
		}
	}
</script>
<style lang="sass" scoped>
</style>
