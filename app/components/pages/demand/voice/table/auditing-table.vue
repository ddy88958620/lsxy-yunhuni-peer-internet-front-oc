<template>
	<div class="flex flex-direction-column admin-table-header">
		<div class="flex align-items-c bg-section-margin remove-margin-bottom ">
			<div class="select-box" ><search
				:value.sync = 'search'
				placeholder="请输入会员名称"
			></search></div>
			<span class='datetime-picker-label '>申请时间:</span>
			<datetime-picker :uuid="'demandVoiceStartDate'"  :type.sync="startdate.type" :value.sync="startdate.value"></datetime-picker>
			<span class='datetime-picker-label'>至</span>
			<datetime-picker :uuid="'demandVoiceEndDate'"  :type.sync="enddate.type" :value.sync="enddate.value"></datetime-picker>
			<!-- <span class='datetime-picker-label'>认证类型: </span>
			<select class="form-control">
				<option>全部</option>
				<option>已上线</option>
				<option>未上线</option>
			</select> -->
			<button class="btn btn-primary admin-button-margin" @click="query">查询</button>
		</div>
	</div>
	<div>
		<div class="admin-table table-responsive">
			<div class="table-total flex flex-1 justify-content-e">
				共<span class="text-danger">{{voice.totalCount}}</span>条
			</div>
			<table class="table">
				<thead>
				<tr>
					<th class="text-align-c">申请时间</th>
					<th>会员名称</th>
					<th>应用名称</th>
					<th>标题</th>
					<th>大小</th>
					<th class="text-align-c">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='message in voice.result'>
					<td class="message-time text-align-c">{{message.createTime | totalDate}}</td>
					<td><a>{{message.tenant.tenantName}}</a></td>
					<td>{{message.app.name}}</td>
					<td>{{message.name}}</td>
					<td>{{message.size | fileSize }}</td>
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
			<!--放音文件隐藏-->
			<audio :src="audioURI"></audio>

		</div>
	</div>
</template>
<script>
	import { getVoiceList } from '../../../../../vuex/actions'
	import domain from '../../../../../config/domain'
	export default {
		vuex: {
			getters:{
				voice: ({demand}) => demand.voicelist.auditing,
			},
			actions: {
				getVoiceList
			}
		},
		components: {
			'datetime-picker': require('../../../../ui/datetimepicker.vue'),
			'search' : require('../../../../ui/search-input.vue')
		},
		data(){
			return {
				messages: [],
				total: 0,
				search: '',
				type : 'auditing',
				name:'',
				startdate :{
					type:'day',
					value:'',
				},
				enddate :{
					type:'day',
					value:'',
				},
				audioURI: '',
			}
		},
		methods: {
			query(){
				let params = {}
				params.type =  this.type
				params.startTime = this.startdate.value
				params.endTime = this.enddate.value
				params.search = this.search
				this.getVoiceList(params)
			},
			moreMessage(){},
			playAudio(index){
//				console.log(this.voice.result[index].fileKey)
				this.audioURI = domain.API_ROOT_AUDIO + '?uri='+this.voice.result[index].fileKey
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
