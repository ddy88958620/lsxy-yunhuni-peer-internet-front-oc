<template>
	<div class="flex flex-direction-column admin-table-header">
		<div class="flex align-items-c bg-section-margin remove-margin-bottom ">
			<div class="select-box">
				<search
					:value.sync ='search'
					:action="query"
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
					<td ><a v-link="'/admin/tenant/detail/'+message.tenant.id">{{message.tenant.tenantName}}</a></td>
					<td>{{message.app.name}}</td>
					<td>{{message.name}}</td>
					<td>{{message.size | fileSize }}</td>
					<td class="text-align-c">
						<span><a @click="playAudio(message.id,$index)">试听</a></span>
						<span><a @click="pass(message.id,$index)">通过</a></span>
						<span><a @click="showfail(message.id,$index)">不通过</a></span>
					</td>
				</tr>
				</tbody>
			</table>
			<div class="more">
				<a v-show='this.voice.totalPageCount==this.voice.currentPageNo || this.voice.totalPageCount==0'>加载完毕</a>
				<a @click="moreMessage" class="text-none" v-show='this.voice.totalPageCount!=this.voice.currentPageNo && this.voice.totalPageCount!=0' >加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
			</div>
			<!--放音文件隐藏-->
			
			
		</div>
	</div>

	<modal :show.sync="audioModal.show" title="播放" :action="hideAudioModal">
		<div slot="body">
			<div class="flex flex-1 ">
			
				<audio class="audio flex flex-1" :src="audioURI" controls=""  autoplay></audio>
				<button class="btn btn-primary admin-button-margin" @click="pass(audioModal.id,audioModal.index)">通过</button>
				<button class="btn" @click="showfail(audioModal.id,audioModal.index)">不通过</button>
				<button class="btn admin-button-margin" @click="hideAudioModal">取消</button>
			</div>
		</div>
		<div slot="footer"></div>
	</modal>

	<modal :show.sync="showModal" title="审核" :action="fail">
		<div slot="body" class="flex flex-1">
			<div class="flex flex-1">
				<span class="flex flex-1  justify-content-c">不通过原因</span>
				<span class="flex flex-4 flex-direction-column">
				  <textarea class="form-control"  v-model="del.reason" maxlength="50"></textarea>
					<span class="flex flex-1 small-font-color justify-content-e ">50字以内</span>
				</span>
			</div>
		</div>
	</modal>

</template>

<style lang='sass' scoped>
</style>


<script>
	import { getVoiceList,delVoice,showMsg,getMoreVoiceList,getDemandNum,getMessageNum} from '../../../../../vuex/actions'
	import domain from '../../../../../config/domain'
	export default {
		vuex: {
			getters:{
				voice: ({demand}) => demand.voicelist.await,
			},
			actions: {
				getVoiceList,
				delVoice,
				showMsg,
				getMoreVoiceList,
				getDemandNum,
				getMessageNum,
			}
		},
		components: {
			'datetime-picker': require('../../../../ui/datetimepicker.vue'),
			'search' : require('../../../../ui/search-input.vue'),
			'modal' : require('../../../../ui/modal.vue')
		},
		data(){
			return {
				messages: [],
				search: '',
				total: 0,
				type : 'await',
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
				showModal: false,
				audioModal:{
					show:false,
					id:'',
					index:'',
				},
				del:{
					id:'',
					reason:'',
					index:''
				}
				
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
			playAudio(id,index){
				this.audioModal = {
					show:true,
					index:index,
					id:id,
				}
				//console.log(this.voice.result[index].fileKey)
				this.audioURI = domain.API_ROOT_AUDIO + '?uri='+this.voice.result[index].fileKey
			},
			testAudio(index){
				var audio = document.querySelector('.audio')
				audio.play()
				
			},
			hideAudioModal(){
				this.audioModal = {
					show:false,
					index:'',
					id:'',
				}
			},
			//暂停
			pauseAudio(index){
				//let audio = document.getElementById('audio')
				var audio = document.querySelector('.audio')
				audio.pause()
			},
			//通过
			pass(id,index){
				let self = this 
				let params = {} 
				params.status = 1
				params.reason=''
				$.put('/demand/member/voice/edit/'+id,params).then((res)=>{
					if(res.success === 'false'){
						this.showMsg({content: res.errorMsg, type: 'danger'})
						return
					}
					if(res.data){

						this.hideAudioModal()
						this.delVoice(index)
						this.getDemandNum()
						this.getMessageNum()
						this.showMsg({content: '审核通过', type: 'success'})
					}
					//this.todos.splice(index, 1)
				})	

			},
			//不通过
			fail(){
				let self = this 
				let params = {} 
				params.status = -1
				params.reason = this.del.reason
				$.put('/demand/member/voice/edit/'+this.del.id,params).then((res)=>{
					if(res.success === 'false'){
						this.showMsg({content: res.errorMsg, type: 'danger'})
						return
					}
					if(res.data){
						this.delVoice(self.del.index)
						self.del = {reason:'',id:'',index:''}
						this.hideAudioModal()
						this.showModal = false 
						this.getDemandNum()
						this.getMessageNum()
						this.showMsg({content: '审核不通过', type: 'success'})
						
					}
				})	
			},
			showfail(id,index){
				this.del.index = index
				this.del.id = id
				this.showModal = true 
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
