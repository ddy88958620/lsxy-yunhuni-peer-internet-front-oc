<template>
	<div class="section_right">
		<h4>查看详情</h4>
		<div class="admin-panel">
			<div class="panel-heading">会员信息</div>
		</div>
		<div class="admin-panel flex-1">
			<div class="panel-heading">认证信息</div>
			<div class="panel-body">
				<ul class="list-none-style" v-if="this.type==0">
					<!--个人认证-->
					<li  >真实姓名: {{ messages.realname.name}}</li>
					<li >证件类型: <span v-if="messages.realname.idType==0">身份证</span><span v-if="messages.realname.idType==1" >护照</span></li>
					<li >证件号码: {{messages.realname.idNumber}}</li>
					<li >持证照片:
						
					</li>
					<li>
						<button class="btn btn-primary">通过</button>
						<button class="btn btn-primary" @click="showModal = true">不通过</button>
						<button class="btn btn-default" >取消</button>
					</li>
				</ul>
				<ul class="list-none-style" v-if="this.type==1" >
					<!--企业认证-->
					<li>公司名称:{{messages.realname.name}}</li>
					<li>公司地址:{{messages.realname.addr}}</li>
					<li>所属行业:{{messages.realname.industry}}</li>
					<li>证件类型: 
						<span v-if="messages.realname.authType==0">三证合一（一照一码）</span>
						<span v-if="messages.realname.authType==1">三证合一 </span>
						<span v-if="messages.realname.authType==2">三证分离</span>
					</li>
					<li v-if="messages.realname.authType==0">统一社会信用代码：{{messages.realname.type01Prop01 }}</li>
					<li v-if="messages.realname.authType==0">统一社会信用代码：{{messages.realname.type01Prop02}}</li>


					<li v-if="messages.realname.authType==1">注册号:{{messages.realname.type02Prop01}} </li>
					<li v-if="messages.realname.authType==1">税务登记号:{{messages.realname.type02Prop02}} </li>
					<li v-if="messages.realname.authType==1">
						营业执照:
						<img :src="messages.realname.type02Prop03 | img">

					</li>
					<!-- <li class="flex  flex-direction-row ">
						<span class=" padding-right-10">营业执照: </span>
						<img src="../../../../assets/images/businesses.png" alt="" class="padding-right-10" >
						<div class="flex ">
							<button class="btn btn-primary down-btn">下载</button>
						</div>
					</li> -->


					<li v-if="messages.realname.authType==2">税务登记号:{{messages.realname.type03Prop01}} </li>
					<li v-if="messages.realname.authType==2">税务登记证:{{messages.realname.type03Prop02}} </li>
					<li v-if="messages.realname.authType==2">营业执照号:{{messages.realname.type03Prop03}} </li>
					<li v-if="messages.realname.authType==2">营业执照:{{messages.realname.type03Prop04}}</li>
					
					<li>
						<button class="btn btn-primary">通过</button>
						<button class="btn btn-primary" @click="showModal = true">不通过</button>
						<button class="btn btn-default" >取消</button>
					</li>
				</ul>



			</div>
		</div>

		<div class="panel panel-default flex-1">
			<div class="panel-heading">历史认证信息</div>
			<div class="panel-body  admin-bg flex-1">
				<div class="admin-table table-responsive remove-border">
					<table class="table remove-margin-bottom remove-border">
						<thead>
						<tr>
							<th colspan="3">
								<div class="flex flex-1 flex-direction-row">
									<div class="flex title-time justify-content-c">
										申请时间
									</div>
									<div class="flex title-type justify-content-c">
										认证类型
									</div>
									<div class="flex flex-1 justify-content-c">
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
						<tr v-for='message in messages.list'>
							<td colspan="3">
								<div class="flex flex-1 flex-direction-row">
									<div class="flex title-time justify-content-c">
										{{message.createTime | date }}
									</div>
									<div class="flex title-type justify-content-c">
										{{ this.type==0 ? '个人认证' : '企业认证' }} 
									</div>
									<div class="flex flex-1 ">
										<div class="flex flex-1 justify-content-c">
											{{message.result}}审核不通过
											{{message.reason}}
										</div>
										<div class="flex"><span @click="showDetail($index)" class="cursor"><i class="icon iconfont icon-oc-dropdown"></i></span></div>
									</div>
								</div>
								<div class="flex flex-1 table-detail" v-show="show[$index]">
									<ul class="list-none-style detail">
										<li><label>详情信息</label></li>
										<li>真实姓名: {{message.name}}</li>
										<li>证件类型: 身份证</li>
										<li>证件号码: {{message.idNumber}}</li>
										<li>持证照片: </li>
										<li>
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
		<div slot="body">
			<div class="flex flex-1 ">
				<span class="flex flex-1 align-items-c justify-content-c">不通过原因</span>
				<span class="flex flex-2 "><input type="text" class="form-control "/></span>
			</div>
		</div>
	</modal>
</template>

<script>
	export default {
		components: {
			'modal': require('../../../ui/modal.vue')
		},
		methods:{
			showDetail:function(index){
				this.show.$set(index, !this.show[index])
			},
			fail(){
				let params = {}

				let type = this.$route.params.type

				 params.authVo = {uid:this.$route.params.id,type:type,status:2}

				console.log(params)


				$.post('/demand/member/edit',params).then((res)=>{
 					console.log(res.data)



		        })

				this.showModal = false
			}
		},
		data(){
			return {
				show: [],
				showModal: false,
				type: 0,
				messages:{
					list:[],
					realname:{}
				},
				message: [
					{
						date: '2016-06-06 16:00',
						type: '个人认证',
						result: '审核不通过',
						reason: '（原因 ：上传的身份证照片不清晰）'
					},
					{
						date: '2016-06-06 16:00',
						type: '个人认证',
						result: '审核不通过',
						reason: '（原因 ：上传的身份证照片不清晰）'
					},
					{
						date: '2016-06-06 16:00',
						type: '个人认证',
						result: '审核不通过',
						reason: '（原因 ：上传的身份证照片不清晰）'
					}
				]
			}
		},
		ready(){

				let arr = []
				Array.from(this.messages, function(i, index){
					arr.push(false)
				})
				this.show = arr

		 		let uid = this.$route.params.id
		 		this.type = this.$route.params.type 

		 	

		        let self = this
		       
 				$.get('/demand/member/detail/'+uid,{type:this.type}).then((res)=>{
 					console.log(res.data)
 					this.messages.list = res.data.list
 					this.messages.realname = res.data.realname
		           	
		        })


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
		width: 200px;
	}

	.title-type{
		width: 200px;
	}

	.table-detail{

		border-top:1px solid #e9edf4;
	}

	.detail{
		padding: 0 0 0 5px;
		li {
			padding-top: 10px;
			padding-bottom: 0px;
		}
	}

</style>