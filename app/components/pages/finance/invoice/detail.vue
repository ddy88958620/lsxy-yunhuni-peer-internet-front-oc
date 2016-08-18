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
					<li>开具发票金额：2500元</li>
					<li>开票时间：2016-06-06至2016-06-15</li>
					<li>申请时间： 2016-06-30 10：00</li>
				</ul>
			</div>
		</div>
		<div class="admin-panel flex-1">
			<div class="panel-heading">发票信息</div>
			<div class="panel-body">
				<ul class="list-none-style">
					<li>发票类型：企业增值税专用票</li>
					<li>发票抬头：流水行云</li>
					<li>纳税人识别号: 1232421312312312</li>
					<li>银行账户：1241241251251251251</li>
					<li>开户行：广州天河建设银行龙口西支行</li>
					<li>注册地址：广州市天河区羊城创意园</li>
					<li>企业电话：02082354122</li>
					<li>一般纳税人认证资格证书</li>
				</ul>
			</div>
		</div>
		<div class="admin-panel flex-1">
			<div class="panel-heading">邮寄信息</div>
			<div class="panel-body">
				<ul class="list-none-style">
					<li>收取地址：广州天河龙口西</li>
					<li>收件人：成小明</li>
					<li>手机号码: 1595486546</li>
					<li>
						<button class="btn btn-primary">异常</button>
						<button class="btn btn-primary">通过</button>
						<button class="btn btn-default" >取消</button>
					</li>
				</ul>
			</div>
		</div>

		<div class="admin-panel flex-1">
			<div class="panel-heading">处理结果 </div>
			<div class="panel-body">
				<ul class="list-none-style">
					<li>状态：审核已通过，等待寄出</li>
					<li>状态：异常</li>
					<li>异常原因：填写资料有误</li>
					<li>快递公司：<input type="text" class="form-control select-box" /></li>
					<li>快递单号：<input type="text" class="form-control select-box" /></li>

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
					<table class="table"  >
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
<script>
	import {getInvoiceDetail} from '../../../../vuex/actions.js'
	export default {
		vuex:{
	       getters: {

	       },
	       actiosn: {
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
			}
		},
		data(){
			return {
				show: [],
				showModal: false,
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


			let arr = []
			Array.from(this.messages, function(i, index){
				arr.push(false)
			})
			this.show = arr
		}
	}
</script>
