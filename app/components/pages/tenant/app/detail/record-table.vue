<template>
	<div class="flex search-box bg-section-margin remove-margin-bottom">
		<div class="select-box">
			<search  placeholder='请输入关键字' :value.sync='page.query.name' :action="query(true)"></search>
		</div>
		<button class="btn btn-primary admin-button-margin " @click="showModal=true">批量下载</button>
	</div>
	<div class="admin-table table-responsive">
		<div class="table-total flex flex-1 justify-content-e">
			录音文件总计占用<span class="text-danger">0</span>b
		</div>
		<table class="table remove-margin-bottom">
			<thead>
			<tr>
				<th class="text-align-c">时间</th>
				<th>录音文件名</th>
				<th>大小</th>
				<th class="text-align-c">时长(秒)</th>
				<th class="text-align-c">操作</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for='record in records'>
				<td class="message-time text-align-c">{{record.createTime | totalDate}}</td>
				<td><a class="text-none">{{record.name}}</a></td>
				<td>{{record.size | fileSize}}</td>
				<td class="text-align-c">{{record.duration}}</td>
				<td class="text-align-c"><a @click="download(record.url)">下载</a></td>
			</tr>
			</tbody>
		</table>
		<div class="more">
			<a v-show='page.loading'>正在加载</a>
			<a v-show='!page.loading && !page.hasMore'>加载完毕</a>
			<a @click="query()" class="text-none" v-show='!page.loading && page.hasMore'>加载更多<i
				class="icon iconfont icon-oc-dropdown"></i></a>
		</div>
	</div>

	<modal :show.sync="showModal">
		<div slot="body">
			<div class="flex flex-1 modal-padding-bottom">批量下载3天范围内的录音文件</div>
			<div class="flex flex-1 align-items-c modal-padding-bottom">
				<datetime-picker></datetime-picker>
				<span class='modal-label'>至</span>
				<datetime-picker></datetime-picker>
			</div>
			<div class="flex flex-1 ">
				<textarea  rows="5" class="form-control"></textarea>
			</div>
		</div>
		<div slot="footer"></div>
	</modal>
</template>


<script>
	export default{
		components:{
			'search': require('../../../../ui/search-input.vue'),
			'modal' : require('../../../../ui/modal.vue'),
			'datetime-picker': require('../../../../ui/datetimepicker.vue')
		},
		data(){
			return{
				showModal: false,
				records :[],
				capacity:{},
				page: {
					query: {
						name: '',
						pageNo: 0,
						pageSize: 10
					},
					loading: true,
					hasMore: true,
					total:0
				}
			}
		},
		methods: {
			fileCapacity(){
				let self = this;
				$.get('/tenant/tenants/'+this.$route.params.uid+'/file/totalSize').then((res)=> {
					return res.data && (self.capacity = res.data)
				})
			},
			download(url){
				console.log('下载',url);
			},
			query(init){
				let self = this
				let pageNo = (init && 1) || self.page.query.pageNo + 1
				let params = $.extend(true, {}, self.page.query);
				params.pageNo = pageNo;
				self.page.loading = true
				if(init){
					self.records = [];
				}
				$.get('/tenant/tenants/'+this.$route.params.uid+'/apps/'+this.$route.params.appid+'/records', params).then((res)=> {
					self.page.loading = false
					if (res.data && res.data.result) {
						if (init) {
							self.records = res.data.result
						} else {
							self.records = self.records.concat(res.data.result)
						}
						self.page.query.pageNo = pageNo
					}
					self.page.hasMore = res.data && ((res.data.totalPageCount || 0 ) > self.page.query.pageNo)
					self.page.total = (res.data && res.data.totalCount) || 0
				})
			}
		},
		ready(){
			this.query(true)
			this.fileCapacity()
		}
	}
</script>
<style lang="sass">
</style>
