<template>
	<div class="section_right">
		<h4>查看详情</h4>
		<div class="admin-panel">
			<div class="panel-heading">会员信息</div>
		</div>
		<div class="admin-panel flex-1">
			<div class="panel-heading">认证信息</div>
			<div class="panel-body">
				<ul class="list-none-style">
					<li>真实姓名: 成小米</li>
					<li>证件类型: 身份证</li>
					<li>证件号码: 441283199310256245</li>
					<li>持证照片:</li>
					<li>公司名称:成小米网络科技有限公司</li>
					<li>公司地址:广州天河</li>
					<li>所属行业:互联网金融</li>
					<li>证件类型:三证分离</li>
					<li>税务登记号:12312354</li>
					<li>营业执照号::995555</li>
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
						<tr v-for='message in messages'>
							<td colspan="3">
								<div class="flex flex-1 flex-direction-row">
									<div class="flex title-time justify-content-c">
										{{message.date}}
									</div>
									<div class="flex title-type justify-content-c">
										{{message.type}}
									</div>
									<div class="flex flex-1 ">
										<div class="flex flex-1 justify-content-c">
											{{message.result}}
											{{message.reason}}
										</div>
										<div class="flex"><span @click="showDetail($index)" class="cursor"><i class="icon iconfont icon-oc-dropdown"></i></span></div>
									</div>
								</div>
								<div class="flex flex-1 table-detail" v-show="show[$index]">
									<ul class="list-none-style detail">
										<li><label>详情信息</label></li>
										<li>真实姓名: 成小米</li>
										<li>证件类型: 身份证</li>
										<li>证件号码: 441283199310256245</li>
										<li>持证照片:</li>
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

	<modal :show.sync="showModal" title="审核" >
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
			}
		},
		data(){
			return {
				show: [],
				showModal: false,
				messages: [
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

		 		let uid = this.$route.params.uid
		        let self = this
		        if (this.chartApiDate === null){
		          this.chartApiDate = DATE.totalDate()
		        }
		        $.get('/tenant/tenants/'+uid+'/session/statistic', self.chartApiDate).then((res)=>{
		          self.chartApiValue = res.data
		        })
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