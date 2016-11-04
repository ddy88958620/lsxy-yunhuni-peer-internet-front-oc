<template>
	<div class="section_right">
		<h4 v-if="messages.realname.status==0" >会员审核认证</h4>
		<h4 v-else>查看详情</h4>
		<div class="admin-panel">
			<div class="panel-heading flex flex-1 ">
				<span class="inline-block ">会员信息</span>
				<a class="inline-block float-r"  v-link="'/admin/tenant/detail/'+messages.realname.tenant.id" >查看</a>
			</div>
		</div>
		<div class="admin-panel flex-1">
			<div class="panel-heading">认证信息</div>
			<div class="panel-body">
				<ul class="list-none-style" v-if="this.type==0">
					<!--个人认证-->
					<li  >真实姓名: {{ messages.realname.name}}</li>
					<li >证件类型: <span v-if="messages.realname.idType==0">身份证</span><span v-if="messages.realname.idType==1" >护照</span></li>
					<li >证件号码: {{messages.realname.idNumber}}</li>
					<li class="flex  flex-direction-row ">
						<span class=" padding-right-10">持证照片: </span>
						<img :src="messages.realname.idPhoto | img" class="padding-right-10" height="200"  data-action="zoom" >
					</li>
				</ul>
				<ul class="list-none-style" v-if="this.type==1" >
					<!--企业认证-->
					<li>公司名称:{{messages.realname.name}}</li>
					<li>公司地址:{{messages.realname.addr}}</li>
					<li>所属行业:{{messages.realname.industry}}</li>
					<li>申请人：{{messages.realname.proposer}}</li>
					<li>证件类型: 
						<span v-if="messages.realname.authType==0">三证合一（一照一码）</span>
						<span v-if="messages.realname.authType==1">三证合一 </span>
						<span v-if="messages.realname.authType==2">三证分离</span>
					</li>
					<li v-if="messages.realname.authType==0">统一社会信用代码：{{messages.realname.type01Prop02 }}</li>
					<li class="flex  flex-direction-row " v-if="messages.realname.authType==0" >
						<span class=" padding-right-10">营业执照: </span>
						<img :src="messages.realname.type01Prop01 | img" class="padding-right-10" height="200"  data-action="zoom" >

						<!-- <div>
							{{ messages.realname.type01Prop01 | createImg | html }}
						</div> -->

						<!-- <img :src="messages.realname.type01Prop01 | img" class="padding-right-10" width="400" height="100%"  data-action="zoom" > -->
					</li>

					<li v-if="messages.realname.authType==1">注册号:{{messages.realname.type02Prop01}} </li>
					<li v-if="messages.realname.authType==1">税务登记号:{{messages.realname.type02Prop02}} </li>
					<li class="flex  flex-direction-row " v-if="messages.realname.authType==1">
						<span class=" padding-right-10">营业执照: </span>
						<img :src="messages.realname.type02Prop03 | img" class="padding-right-10" height="200"  data-action="zoom">
					</li>
				
					<li v-if="messages.realname.authType==2">税务登记号:{{messages.realname.type03Prop01}} </li>

					<!-- <li v-if="messages.realname.authType==2">税务登记证:{{messages.realname.type03Prop02}} </li> -->
					<li class="flex  flex-direction-row " v-if="messages.realname.authType==2">
						<span class=" padding-right-10">税务登记证: </span>
						<img :src="messages.realname.type03Prop02 | img" class="padding-right-10" height="200" data-action="zoom" >
					</li>


					<li v-if="messages.realname.authType==2">营业执照号:{{messages.realname.type03Prop03}} </li>
					<li class="flex  flex-direction-row " v-if="messages.realname.authType==2">
						<span class=" padding-right-10">营业执照: </span>
						<img :src="messages.realname.type03Prop04 | img" class="padding-right-10" height="200" data-action="zoom">
					</li>

				</ul>
				<ul class="list-none-style" v-if="messages.realname.status==0" >
					<li>
						<button class="btn btn-primary" @click="pass" >通过</button>
						<button class="btn btn-primary" @click="showModal = true">不通过</button>
						<button class="btn btn-default" v-link="'/admin/demand/member/list/await'" >取消</button>
					</li>
				</ul>


			</div>
		</div>

		<div class="admin-panel"  v-if="messages.realname.status!=0" >
			<div class="panel-heading">认证信息</div>
			<div class="panel-body">
				<ul class="list-none-style" >
					<li>审核结果: 
						<span v-if="messages.realname.status==1 || messages.realname.status==2" class="darkgreen">通过</span>
						<span v-if="messages.realname.status==-1 || messages.realname.status==-2" class="text-danger">不通过</span>
					</li>
					<li>
						审核时间：{{messages.realname.lastTime | totalDate }}
					</li>
					<li  v-if="messages.realname.status==-1 || messages.realname.status==-2">
						不通过原因:
						<span v-if="messages.realname.status==-1 || messages.realname.status==-2">{{messages.realname.reason}}</span>
					</li>
				</ul>
			</div>	
		</div>

		<div class="panel panel-default flex-1" v-if="messages.list.length!==0 && messages.list[0].status!=0 ">
			<div class="panel-heading">历史认证信息</div>
			<div class="panel-body  admin-bg flex-1">
				<div class="admin-table  remove-border">
					<table class="table remove-margin-bottom remove-border">
						<thead>
						<tr>
							<th colspan="3">
								<div class="">
									<div class="title-time inline-block">
										申请时间
									</div>
									<div class="title-type inline-block">
										认证类型
									</div>
									<div class="title-reason inline-block text-align-c">
										审核结果
									</div>
								</div>
							</th>
						</tr>
						</thead>
						<tbody>
					<!-- 	date: '2016-06-06 16:00',
						type: '个人认证',
						result: '审核不通过',
						reason: '（原因 ：上传的身份证照片不清晰）' -->
						<tr v-for='message in messages.list' v-if="message.status!=0" >
							{{message | json }}
							<td colspan="3">
								<div class="">
									<div class="title-time inline-block">
										{{message.createTime | totalDate }}
									</div>
									<div class="title-type inline-block">
										<span v-if="message.status==-1 || message.status==1" >个人认证</span>
										<span v-if="message.status==-2 || message.status==2" >公司认证</span>
									</div>
									<div class="title-reason inline-block text-align-c ">
										<div class="inline-block ">
											<span v-if="message.status==-1 || message.status==-2" >审核不通过</span>
											<span v-if="message.status==1 || message.status==2" class="darkgreen" >通过</span>
											<span v-if="(message.status==-1 || message.status==-2) && message.reason!=null && message.reason!='' " class="text-danger" >({{message.reason}})</span>
										</div>
										<div class="inline-block float-r"><span @click="showDetail($index)" class="cursor"><i class="icon iconfont icon-oc-dropdown"></i></span></div>
									</div>
								</div>
								<div class="flex flex-1 table-detail" v-show="show[$index]">
									
									<ul class="list-none-style" v-if="message.status==-1 || message.status==1" >
										<!--个人认证-->
										<li  >真实姓名: {{ message.name}}</li>
										<li >证件类型: <span v-if="message.idType==0">身份证</span><span v-if="message.idType==1" >护照</span></li>
										<li >证件号码: {{message.idNumber}}</li>
										<li class="flex  flex-direction-row ">
											<span class=" padding-right-10">持证照片: </span>
											<img :src="message.idPhoto | img" class="padding-right-10" height="200"  data-action="zoom" >
										</li>
									</ul>
									<ul class="list-none-style" v-if="message.status==-2 || message.status==2" >
										<!--企业认证-->
										<li>公司名称:{{message.name}}</li>
										<li>公司地址:{{message.addr}}</li>
										<li>所属行业:{{message.industry}}</li>
										<li>申请人：{{message.proposer}}</li>
										<li>证件类型: 
											<span v-if="message.authType==0">三证合一（一照一码）</span>
											<span v-if="message.authType==1">三证合一 </span>
											<span v-if="message.authType==2">三证分离</span>
										</li>
										<li v-if="message.authType==0">统一社会信用代码：{{message.type01Prop02 }}</li>
										<li class="flex  flex-direction-row " v-if="message.authType==0">
											<span class=" padding-right-10">营业执照: </span>
											<img :src="message.type01Prop01 | img" class="padding-right-10" height="200" data-action="zoom" >
										</li>

										<li v-if="message.authType==1">注册号:{{message.type02Prop01}} </li>
										<li v-if="message.authType==1">税务登记号:{{message.type02Prop02}} </li>
										<li class="flex  flex-direction-row " v-if="message.authType==1">
											<span class=" padding-right-10">营业执照: </span>
											<img :src="message.type02Prop03 | img" class="padding-right-10" height="200"  data-action="zoom" >
										</li>
										

										<li v-if="message.authType==2">税务登记号:{{message.type03Prop01}} </li>

										<li class="flex  flex-direction-row " v-if="message.authType==2">
											<span class=" padding-right-10">税务登记证: </span>
											<img :src="message.type03Prop02 | img" class="padding-right-10" height="200"  data-action="zoom" >
										</li>
										<li v-if="message.authType==2">营业执照号:{{message.type03Prop03}} </li>
										<li class="flex  flex-direction-row " v-if="message.authType==2">
											<span class=" padding-right-10">营业执照: </span>
											<img :src="message.type03Prop04 | img" class="padding-right-10" height="200"  data-action="zoom" >
										</li>
									</ul>
								</div>
							</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

	</div>

	
	<modal :show.sync="showModal" title="审核" :action="fail">
		<div slot="body" class="flex">
			<div class="flex flex-1 modal-nopass" >
				<span class="flex float-l title">不通过原因</span>
				<span class="flex admin-button-margin flaot-l" ><textarea class="form-control textarea"  v-model="reason" maxlength="50" ></textarea></span>
				<span class="flex float-r numbertips">50字以内</span>
			</div>
		</div>
	</modal>

</template>

<script>
	import { showMsg,getMessageNum } from '../../../../vuex/actions'
	export default {
		vuex: {
			getters:{
				
			},
			actions: {
				showMsg,
				getMessageNum
			}
		},
		components: {
			'modal': require('../../../ui/modal.vue')
		},
		methods:{
			showDetail:function(index){
				this.show.$set(index, !this.show[index])
			},
			pass(){
				let self = this 
				let params = {}
				let id = this.$route.params.id
				// type 0 个人认证 1实名认证
				let type = this.$route.params.type
				//个人认证成功
				if(type==0){
					params.status=1
				}
				//企业认证成功
				if(type==1){
					params.status=2
				}
				params.type = type
		
				$.put('/demand/member/edit/'+id,params).then((res)=>{
					if(res.success === 'false'){
						self.showMsg({content: res.errorMsg, type: 'danger'})
						return
					}
				  self.showMsg({content: '审核通过', type: 'success'})
				  self.getMessageNum()
				  setTimeout(function(){
						self.$route.router.go({path:'/admin/demand/member/list/await'})
					},3000)
					
		    })
			},
			fail(){
				let self = this 	
				let params = {}
				let id = this.$route.params.id
				// type 0 个人认证 1实名认证
				let type = this.$route.params.type
				//个人认证成功
				if(type==0){
					params.status=-1
				}
				//企业认证成功
				if(type==1){
					params.status=-2
				}
				params.type = type
				params.reason = self.reason
				$.put('/demand/member/edit/'+id,params).then((res)=>{
					self.reason = ''
					if(res.success === 'false'){
						self.showMsg({content: res.errorMsg, type: 'danger'})
						return
					}
					self.showModal = false
				  self.showMsg({content: '审核不通过', type: 'success'})
				  self.getMessageNum()
				  setTimeout(function(){
						self.$route.router.go({path:'/admin/demand/member/list/await'})	
					},3000)
		    })
			},
			detail(){
				let uid = this.$route.params.id
		 		this.type = this.$route.params.type 
		    let self = this
 				$.get('/demand/member/detail/'+uid,{type:this.type}).then((res)=>{
 					this.messages.list = res.data.list
 					this.messages.realname = res.data.realname
		    })

 
			}
		},
		data(){
			return {
				show: [],
				showModal: false,
				type: 0,
				messages:{
					list:[],
					realname:{},
				},
				reason:'',
				authStatus:''
			}
		},
		ready(){

				let arr = []
				Array.from(this.messages, function(i, index){
					arr.push(false)
				})
				this.show = arr
		 		this.detail()

		       /* $.get('/tenant/tenants/'+uid+'/session/statistic', self.chartApiDate).then((res)=>{
		          self.chartApiValue = res.data
		        })*/
		}
	}
</script>



<style lang="sass" scoped>
	ul {
		padding: 15px 15px 0 15px;
		font-size: 1.4rem;
		li {
			padding-bottom: 25px;
		}
	}

	.title-time{
		width: 15%;
	}

	.title-type{
		width: 15%;
	}

	.table-detail{
		border-top:1px solid #e9edf4;
	}
	.title-reason{
		width: 68%;
	}

	.detail{
		padding: 0 0 0 5px;
		li {
			padding-top: 10px;
			padding-bottom: 0px;
		}
	}

</style>