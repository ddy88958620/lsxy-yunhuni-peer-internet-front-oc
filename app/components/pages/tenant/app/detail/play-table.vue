<template>

	<div class="flex search-box bg-section-margin remove-margin-bottom">
		<div class="select-box">
			<search   placeholder='请输入关键字' ></search>
		</div>
	</div>

	<div class="admin-table table-responsive">
		<div class="table-total flex flex-1 justify-content-e">
			共<span class="text-danger">2222220</span>条
		</div>
		<table class="table remove-margin-bottom">
			<thead>
			<tr>
				<th class="text-align-c">审核时间</th>
				<th>文件</th>
				<th>大小</th>
				<th class="text-align-c">备注</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for='play in plays'>
				<td class="message-time text-align-c">{{play.date}}</td>
				<td>{{play.type}}</td>
				<td>{{play.size}}</td>
				<td class="text-align-c">{{play.remark}}</td>
			</tr>
			</tbody>
		</table>
	</div>
</template>


<script>
	export default{
		components:{
			'search': require('../../../../ui/search-input.vue')
		},
		data(){
			return{
				app:{},
				plays :[
					{
						date: '2016-06-06',
						type: '1.wav',
						size: '1.1',
						remark: '语音通知推文件'
					},
					{
						date: '2016-06-06',
						type: '1.wav',
						size: '1.1',
						remark: '语音通知推文件'
					}
				]
			}
		},
		ready(){
			let uid = this.$route.params.uid;
			let appId = this.$route.params.appid;
			$.get('/tenant/tenants/'+uid+'/apps/'+ appId).then((res)=> {
				return res.data && (self.app = res.data);
			})
		}
	}
</script>


<style lang="sass">

</style>
