<template>
	<div class="section_right">
		<h4>开票申请</h4>
		<div class="admin-panel flex-1">
			<div class="panel-heading flex flex-1 ">
				<span class="flex flex-1">开票信息</span>
				<a class="flex" @click="showModal = true">消费详情</a>
			</div>
			<div class="panel-body">
				<ul class="list-none-style">
					<li>开具发票金额：{{detail.amount}}元</li>
					<li>开票时间：{{ detail.start | date }}  至  {{ detail.end | date}}</li>
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
						<img :src="detail.qualificationUrl | img" class="padding-right-10" width="400" height="100%"  data-action="zoom">
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
						<button class="btn btn-default" >取消</button>
					</li>
				</ul>


			</div>
		</div>
		
	</div>


	<modal :show.sync="showModal" :title=''>
		<div slot="body" class="flex flex-1 flex-direction-column">

			<div class="flex flex-direction-column admin-table-header">
				<div class="flex align-items-c">
					<span class='datetime-picker-label clear-padding-left'>提交时间:</span>
					<datetime-picker disable="disable"></datetime-picker>
					<span class='datetime-picker-label'>至</span>
					<datetime-picker></datetime-picker>
				</div>
			</div>

			<div class="admin-table table-responsive flex-1 flex flex-direction-column">
				<div class="table-total flex flex-1 justify-content-e">
					消费总金额：<span class="brown">2400</span>元 共<span class="text-danger">20</span>条
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
						<tr v-for='message in messages'>
							<td class="message-time text-align-c">{{message.date}}</td>
							<td>{{message.money}}</td>
							<td>{{message.type}}</td>
							<td>{{message.remark}}</td>
						</tr>
						</tbody>
					</table>
				</div>
				<div class="more"><a @click="moreMessage" class="text-none">加载更多<i class="icon iconfont icon-oc-dropdown" ></i></a></div>
			</div>
		</div>

	</modal>
</template>
<script>

	import {getInvoiceDetail} from '../../../../vuex/actions.js'
	export default {
		vuex:{
	       getters: {
	       	  detail: ({finance}) => finance.invoice
	       },
	       actions: {
		      getInvoiceDetail
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
				this.messages.push(
					{
						date: '2016-06-06 16:00',
						money: '100元',
						type: '套餐加油包',
						remark: '100分钟语音加油包'
					})
			},
			send(){
			
		       	let params = {}
				 //异常处理
				let id = this.$route.params.id
				params.expressCom = this.expressCom
				params.expressNo = this.expressNo
				params.status =1

 				$.put('/finance/invoice/edit/send'+id,params).then((res)=>{
		           	this.abnormalModal = false
		           	this.getInvoiceDetail({id:id})
		        })


		       
				params.status = 2
				$.put('/finance/invoice/edit/'+id, params).then((res) => {
					
				
				})

			}
		},
		data(){
			return {
				show: [],
				showModal: false,
				passModal: false,
				abnormalModal: false,
				expressCom:'',
				expressNo:'',
				messages: [
					{
						date: '2016-06-06 16:00',
						money: '100元',
						type: '套餐加油包',
						remark: '100分钟语音加油包'
					},
					{
						date: '2016-06-06 16:00',
						money: '100元',
						type: '会议',
						remark: '回拨扣费0.02/6s 10min'
					},
					{
						date: '2016-06-06 16:00',
						money: '100元',
						type: '套餐加油包',
						remark: '100分钟语音加油包'
					},
					{
						date: '2016-06-06 16:00',
						money: '100元',
						type: '套餐加油包',
						remark: '100分钟语音加油包'
					},
				]
			}
		},
		ready(){
			let params = {}
			params.id = this.$route.params.id
			
			this.getInvoiceDetail(params)
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
</style>