<template>
	<div class="section_right">
		<h4>开票申请</h4>
		<div class="admin-panel flex-1">
			<div class="panel-heading flex flex-1 ">
				<span class="flex flex-1">开票信息</span>
				<a class="flex" @click="showDetailModal = true">消费详情</a>
			</div>
			<div class="panel-body">
				<ul class="list-none-style">
					<li>开具发票金额：{{detail.amount}}元</li>
					<li>开票时间：{{ detail.start | month }}  至  {{ detail.end | month}}</li>
					<li>申请时间： {{detail.applyTime | date }}</li>
				</ul>
			</div>
		</div>
		<div class="admin-panel flex-1">
			<div class="panel-heading">发票信息</div>
			<div class="panel-body">
				<ul class="list-none-style" v-if='detail.type==1 || detail.type==2 '>
					<li>发票类型：
						<span v-if='detail.type==1'>个人增值税普通发票</span>
						<span v-if='detail.type==2'>企业增值税普通票</span>
					</li>
					<li>发票抬头：{{ detail.title }}</li>
				</ul>
				<ul class="list-none-style" v-if='detail.type==3'>
					<li>发票类型：
						<span v-if='detail.type==1'>个人增值税普通发票</span>
						<span v-if='detail.type==2'>企业增值税普通票</span>
						<span v-if='detail.type==3'>企业增值税专用票</span>
					</li>
					<li>发票抬头：{{ detail.title }}</li>
					<li>纳税人识别号: {{detail.taxpayerNum}}</li>
					<li>银行账户：{{detail.bankAccount}}</li>
					<li>开户行：{{ detail.taxpayerNum}}</li>
					<li>注册地址：{{detail.regAddress}}</li>
					<li>企业电话：{{detail.phone}}</li>
					<li class="flex  flex-direction-row " >
						<span class=" padding-right-10">一般纳税人认证资格证书: </span>
						<img :src="detail.qualificationUrl | img" class="padding-right-10" height="200" data-action="zoom" >
					</li>
				</ul>
			</div>
		</div>
		<div class="admin-panel flex-1">
			<div class="panel-heading">邮寄信息</div>
			<div class="panel-body">
				<ul class="list-none-style">
					<li>收取地址：{{ detail.receiveAddress }}</li>
					<li>收件人：{{ detail.receivePeople }}</li>
					<li>手机号码: {{ detail.receiveMobile }}</li>
					<li v-if="detail.status==0">
						<button class="btn btn-primary" @click="abnormalModal = true">异常</button>
						<button class="btn btn-primary" @click="passModal = true">通过</button>
						<button class="btn btn-default" v-link="'/admin/finance/invoice'" >取消</button>
					</li>
				</ul>
			</div>
		</div>

		<div class="admin-panel flex-1">
			<div class="panel-heading">处理结果 </div>
			<div class="panel-body">
				<ul class="list-none-style" v-if="detail.expressNo!=null" >
					<li >状态：处理完成,发票已寄出</li>
					<li >快递公司：{{detail.expressCom}}</li>
					<li >快递单号：{{detail.expressNo}}</li>
				</ul>
				<ul class="list-none-style" v-if="detail.expressNo==null">
					<li >状态:审核已通过，等待寄出</li>
					<li>快递公司：<input type="text" class="form-control select-box" v-model="expressCom" /></li>
					<li>快递单号：<input type="text" class="form-control select-box" v-model="expressNo" /></li>
					<li>
						<button class="btn btn-primary" @click="send">确认寄出</button>
						<button class="btn btn-default"   v-link="'/admin/finance/delivery/list/unsend'"  >取消</button>
					</li>
				</ul>


			</div>
		</div>
		
	</div>


	<modal :show.sync="abnormalModal" title='操作' :action="abnormal">
		<div slot="body" class="flex flex-1 flex-direction-column">
			<div class="flex flex-direction admin-table-header">
				<div class="flex align-items-c ">
					<span class=''>异常原因:</span>
				</div>
				<div class="flex flex-1">
					<input type="text" class="form-control flex flex-1" v-model='reason'  >
				</div>
			</div>
		</div>
	</modal>


	<modal :show.sync="showModal" title='消费详情' :action="hideModal">
		<div slot="body" class="flex flex-1 flex-direction-column">

			<div class="flex flex-direction-column admin-table-header">
				<div class="flex align-items-c">
					<span class='datetime-picker-label clear-padding-left'>提交时间:</span>
					{{ detail.start | month }}   
					<span class='datetime-picker-label'>至</span>
					{{ detail.end | month}}
				</div>
			</div>
			<div class="admin-table table-responsive flex-1 flex flex-direction-column">
				<div class="table-total flex flex-1 justify-content-e">
					消费总金额：<span class="brown">{{invoice.sum!==0 ? invoice.sum :  '' }}</span>元 共<span class="text-danger">{{invoice.list.totalCount }}</span>条
				</div>
				<div class="flex modal-table" >
					<table class="table">
						<thead>
						<tr>
							<th class="text-align-c">消费时间</th>
							<th>消费金额</th>
							<th>消费类型</th>
							<th>备注</th>
						</tr>
						</thead>
						<tbody >
						<tr v-for='message in invoiceList'>
							<td class="message-time text-align-c">{{message.createTime | date}}</td>
				            <td>{{message.amount}}</td>
				            <td>{{message.type}}</td>
				            <td>{{message.remark}}</td>
						</tr>
						</tbody>
					</table>
				</div>
				<div class="more">
					<a v-show='invoice.list.totalPageCount==invoice.list.currentPageNo || invoice.list.totalPageCount==0'>加载完毕</a>
					<a @click="query('more')" class="text-none" v-show='invoice.list.totalPageCount!=invoice.list.currentPageNo && invoice.list.totalPageCount!=0' >加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
				</div>	
				
			</div>
		</div>

	</modal>


		<!--消费统计 发票版本-->
	<modal :show.sync="showDetailModal" title='消费详情' :action="hideDetailModal" >
		<div slot="body" class="flex flex-1 flex-direction-column">
			<div class="flex flex-direction-column admin-table-header">
				<div class="flex align-items-c">
					<span class='datetime-picker-label clear-padding-left'>提交时间:</span>
					{{ detail.start | month }}  
					<span class='datetime-picker-label'>至</span>
					{{ detail.end | month}} 
				</div>
			</div>
			<div class="admin-table flex-1 flex flex-direction-column">
				<div class="table-total flex flex-1 justify-content-e">
					消费总金额：<span class="brown">{{invoice.sum!==0 ? invoice.sum :  '' }}</span>元 共<span class="text-danger">{{invoice.list.totalCount }}</span>条
				</div>

				<div class="flex modal-table" >
					
					<table class="table remove-margin-bottom remove-border">
						<thead>
						<tr>
							<th colspan="3">
								<div class="flex flex-1 flex-direction-row">
									<div class="flex title-time justify-content-c">
										消费时间
									</div>
									<div class="flex title-type justify-content-c">
										消费金额
									</div>
									<div class="flex flex-1 justify-content-e">
										操作
									</div>
								</div>
							</th>
						</tr>
						</thead>
						<tbody>
						<tr v-for='message in invoiceList'  >
							
							<td colspan="3">
								<div class="flex flex-1 flex-direction-row">
									<div class="flex title-time justify-content-c">
										{{message.dt | date }}
									</div>
									<div class="flex title-type justify-content-c">
										{{message.amongAmount}}
									</div>
									<div class="flex flex-1 justify-content-e ">
										<div class="flex"><span @click="showDetail($index,message.dt)" class="cursor"><i class="icon iconfont icon-oc-dropdown"></i></span></div>
									</div>
								</div>
								<div class="flex flex-1 table-detail" v-show="show[$index]">
									<div class="flex flex-1 flex-wrap " >

										<div class="codedetail width-50" v-for="detail in invoiceDetail[$index]" >
											<div class="flex ">
												<span class="width-50">{{detail.type}}</span>
												<span class="width-50">{{detail.amongAmount}}</span>
											</div>
										</div>

									</div>
								</div>
							</td>
						</tr>
						</tbody>
					</table>
				</div>
				<div class="more">
					<a v-show='invoice.list.totalPageCount==invoice.list.currentPageNo || invoice.list.totalPageCount==0'>加载完毕</a>
					<a @click="query('more')" class="text-none" v-show='invoice.list.totalPageCount!=invoice.list.currentPageNo && invoice.list.totalPageCount!=0' >加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
				</div>	
				
			</div>
		</div>

	</modal>


</template>
<script>
	import DATE from '../../../../utils/date'
	import {getInvoiceDetail,showMsg} from '../../../../vuex/actions.js'
	export default {
		vuex:{
	       getters: {
	       	  detail: ({finance}) => finance.invoice
	       },
	       actions: {
		      getInvoiceDetail,
		      showMsg
	       }
		},
		components: {
			'datetime-picker': require('../../../ui/datetimepicker.vue'),
			'modal': require('../../../ui/modal.vue')
		},
		methods:{
			showDetail:function(index){
				this.show.$set(index, !this.show[index])
			},
			moreMessage: function(){
			},
			hideDetailModal(){
				this.showDetailModal = false
			},
			showDetail:function(index,time){
				
				//获取当日数据
				let self = this 
				let id = self.$route.params.id
				let params = {}


				params.id = id
				params.time = DATE.date(time)
				//GET /finance/invoice/detail/list/{id}/detail
				$.get('/finance/invoice/detail/list/'+id+'/detail',params).then((res) => {
					 if(res.data.length>0){
					 		self.invoiceDetail.$set(index, res.data)
					 }
				})

				this.show.$set(index, !this.show[index])
			},
			send(){
		       	let params = {}
		       	let self = this
				 //确认寄出
				let id = this.$route.params.id
				params.expressCom = this.expressCom
				params.expressNo = this.expressNo
				params.status =1
 				$.put('/finance/invoice/edit/send/'+id,params).then((res)=>{
		           	this.abnormalModal = false
					if( res.success === false){
						this.showMsg({content: res.errorMsg, type: 'danger'})
						return
					}
					//成功处理
					this.getInvoiceDetail({id:id})
					
					this.showMsg({content: '寄出成功', type: 'success'})
					
					setTimeout(function(){
						self.$route.router.go({path:'/admin/finance/delivery/list/send'})
					},3000)


		        })
			},
			unsend(){
				let params = {}
				let self = this
				 //异常处理
				let id = this.$route.params.id
				params.status =2
				params.reason = this.reason
 				$.put('/finance/invoice/edit/send'+id,params).then((res)=>{
		           	this.abnormalModal = false
					if( res.success === 'false'){
						this.showMsg({content: res.errorMsg, type: 'danger'})
						return
					}
					//成功处理
					this.getInvoiceDetail({id:id})
					this.showMsg({content: '异常处理成功', type: 'success'})
					setTimeout(function(){
						self.$route.router.go({path:'/admin/finance/delivery/list/unsend'})
					},3000)

		        })
			},
			query(more){
				let params = {} 
				params.id = this.$route.params.id
				if(more){
					let pageNo = this.invoice.list.currentPageNo + 1
					params.pageNo = pageNo
				}
				let self = this
				$.get('/finance/invoice/detail/list/'+this.$route.params.id,params).then((res)=>{
					console.log(res)
					if(res){
			            self.invoice = res.data
			            if(more)
			              self.invoiceList = self.invoiceList.concat(res.data.list.result)
			            else
			              self.invoiceList = res.data.list.result
			        }
				})
			}
		},
		data(){
			return {
				show: [],
				showModal: false,
				passModal: false,
				abnormalModal: false,
				showDetailModal: false,
				expressCom:'',
				expressNo:'',
				reason:'',
				messages: [],
				invoiceList:[],
				invoiceDetail:[],
			}
		},
		ready(){
			let params = {}
			params.id = this.$route.params.id
			
			this.getInvoiceDetail(params)
			//消费记录
			this.query()


			let arr = []
			Array.from(this.messages, function(i, index){
				arr.push(false)
			})
			this.show = arr
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
	.modal-table{
		height: 400px;
		overflow-y: scroll;
		margin-bottom: 10px;
	}
	.title-time{
		width: 150px;
	}

	.title-type{
		width: 250px;
	}

	.table-detail{
		border-top:1px dashed #c5c5c5;
		padding: 10px 0;
	}

	.width-50{
		width: 50%;
	}

	.codedetail{

		padding:  3px 0;
	}
</style>