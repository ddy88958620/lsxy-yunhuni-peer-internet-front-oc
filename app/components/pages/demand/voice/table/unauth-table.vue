<template>
	<div class="admin-table-header">
		<div class="bg-section-margin remove-margin-bottom ">
			<div class="select-box inline-block">
				<search
					:value.sync ='search'
					:action="query"
					placeholder="请输入会员名称"
			></search></div>
			<span class='datetime-picker-label '>申请时间:</span>
			<datetime-picker :uuid="'demandVoiceStartDate'"  :type.sync="startdate.type" :value.sync="startdate.value"></datetime-picker>
			<span class='datetime-picker-label'>至</span>
			<datetime-picker :uuid="'demandVoiceEndDate'"  :type.sync="enddate.type" :value.sync="enddate.value"></datetime-picker>
			<button class="btn btn-primary admin-button-margin" @click="query">查询</button>
		</div>
	</div>
	<div>
		<div class="admin-table">
			<div class="table-total flex flex-1 justify-content-e float-r">
				共<span class="text-danger">{{voice.totalCount}}</span>条
			</div>
			<table class="table">
				<thead>
				<tr>
					<th class="text-align-c">申请时间</th>
					<th>会员名称</th>
					<th>应用名称</th>
					<th>文件名</th>
					<th>大小</th>
					<th>原因</th>
					<td>审核人</td>
					<th class="text-align-c">审核时间</th>
					<th class="text-align-c">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='message in voice.result'>
					<td class="message-time text-align-c">{{message.createTime | totalDate}}</td>
					<td><a v-link="'/admin/tenant/detail/'+message.tenant.id" >{{message.tenant.tenantName}}</a></td>
					<td>{{message.app.name}}</td>
					<td>{{message.name}}</td>
					<td>{{message.size | fileSize }}</td>
					<td class="text-over over-width" title="{{ message.reason }}">{{message.reason}}</td>
					<td>管理员</td>
					<td class="message-time text-align-c">{{message.checkTime | totalDate}}</td>
					<td class="text-align-c">
						<span><a @click="playAudio($index)">试听</a></span>
					</td>
				</tr>
				</tbody>
			</table>
			<div class="more">
				<a v-show='this.voice.totalPageCount==this.voice.currentPageNo || this.voice.totalPageCount==0'>加载完毕</a>
				<a @click="moreMessage" class="text-none" v-show='this.voice.totalPageCount!=this.voice.currentPageNo && this.voice.totalPageCount!=0' >加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
			</div>

			<modal :show.sync="audioModal" title="播放" :action="hideAudioModal" classname="small">
				<div slot="header">
					播放
				</div>
				<div slot="body">
					<div class="flex">
						<audio class="audio inline-block float-l" :src="audioURI" controls="" autoplay></audio>
					</div>
				</div>
				<div slot="footer">
					<div class="modal-footer inline-block float-r" >
						<button class="btn btn-default" @click="hideAudioModal">关闭</button>
					</div>
				</div>
			</modal>


		</div>
	</div>
</template>
<script>
	import { getVoiceList,getMoreVoiceList } from '../../../../../vuex/actions'
	import domain from '../../../../../config/domain'
	export default {
		vuex: {
			getters:{
				voice: ({demand}) => demand.voicelist.unauth,
			},
			actions: {
				getVoiceList,
				getMoreVoiceList
			}
		},
		components: {
			'datetime-picker': require('../../../../ui/datetimepicker.vue'),
			'search' : require('../../../../ui/search-input.vue'),
			'modal' : require('../../../../ui/modal.vue'),
		},
		data(){
			return {
				messages: [],
				search: '',
				total: 0,
				type : 'unauth',
				name:'',
				startdate :{
					type:'day',
					value:'',
				},
				enddate :{
					type:'day',
					value:'',
				},
				audioModal:false,
				audioURI: '',
			}
		},
		methods: {
			query(){
				let params = {}
				if(this.name!=''){
					params.name = this.name
				}
				params.type =  this.type
				params.startTime = this.startdate.value
				params.endTime = this.enddate.value
				params.name = this.search
				this.getVoiceList(params)
			},
			moreMessage(){
				let params = {}
				let nextPage = this.voice.currentPageNo+1
				if(this.name!=''){
					params.name = this.name
				}
				params.type =  this.type
				params.startTime = this.startdate.value
				params.endTime = this.enddate.value
				params.name = this.search

				params.pageNo = nextPage
				this.getMoreVoiceList(params)
			},
			playAudio(index){
				this.audioModal = true
//				console.log(this.voice.result[index].fileKey)
				this.audioURI = domain.API_ROOT_AUDIO + '?uri='+this.voice.result[index].fileKey
			},
			hideAudioModal(){
				this.audioURI = ''
				this.audioModal = false
			}
		},
		route: {
		},
		ready(){
			let params = {}
			params.type = this.type
			this.getVoiceList(params)
		}

	}

</script>
