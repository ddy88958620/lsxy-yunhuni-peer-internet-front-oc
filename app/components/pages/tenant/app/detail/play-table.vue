<template>
  <div>
    <div class="flex search-box bg-section-margin remove-margin-bottom">
      <div class="select-box">
        <search  placeholder='搜索文件名' :value.sync='searchName' :action="search"></search>
      </div>
    </div>

    <div class="admin-table">
      <div class="table-total flex flex-1 justify-content-e float-r">
        <!--共<span  class="green">{{ capacity.fileTotalSize | fileSize }}</span>MB,
        已使用<span class="text-danger">{{((capacity.fileRemainSize || 0)/1024/1024).toFixed(2)}}</span>MB,-->
        共<span class="text-danger">{{ page.total || 0 }}</span>条
      </div>
      <table class="table ">
        <thead>
        <tr>
          <th class="text-align-c">审核时间</th>
          <th>文件名</th>
          <th>大小</th>
          <th>关联子账号</th>
          <th class="text-align-c">备注</th>
          <th class="text-align-c">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='play in plays'>
          <td class="message-time text-align-c">{{ play.checkTime | totalDate }}</td>
          <td>{{play.name}}</td>
          <td>{{ play.size | fileSize}}</td>
          <td>{{ play.subaccountId }}</td>
          <td class="text-align-c">{{play.remark}}</td>
          <td class="text-align-c">
            <span><a @click="playAudio($index)">试听</a></span>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="more">
        <a v-show='page.loading'>正在加载</a>
        <a v-show='!page.loading && !page.hasMore'>加载完毕</a>
        <a @click="query('')" class="text-none" v-show='!page.loading && page.hasMore'>加载更多<i
          class="icon iconfont icon-oc-dropdown"></i></a>
      </div>
    </div>

    <modal :show.sync="audioModal.show" title="播放" :action="hideAudioModal" classname="small">
      <div slot="header">
        播放
      </div>
      <div slot="body">
        <div class="flex">
          <audio class="audio inline-block float-l" :src="audioURI" controls="" autoplay></audio>
        </div>
      </div>
      <div slot="footer">
        <div class="modal-footer inline-block float-r" >
          <button class="btn btn-default" @click="hideAudioModal">关闭</button>
        </div>
      </div>
    </modal>
  </div>

</template>


<script>
  import domain from '../../../../../config/domain'
	export default{

		components:{
			'search': require('ui/search-input.vue'),
      'modal' : require('ui/modal.vue')
		},
		data(){
			return{
				plays :[],
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
				},
        audioModal:{
          show:false,
          uri: '',
        },
				searchName:''
			}
		},
		methods: {
			fileCapacity(){
				let self = this;
				$.get('/tenant/tenants/'+this.$route.params.uid+'/file/totalSize').then((res)=> {
					return res.data && (self.capacity = res.data)
				})
			},
      playAudio(index){
        this.audioModal.show = true
        this.audioModal.uri = domain.API_ROOT_AUDIO + '?uri='+this.plays[index].fileKey
      },
      hideAudioModal(){
        this.audioModal.show = false
        this.audioModal.uri = ''
      },
			search(){
				this.query(true)
			},
			query(init){
				let self = this
				let pageNo = (init && 1) || self.page.query.pageNo + 1
				self.page.query.name = self.searchName
				let params = $.extend(true, {}, self.page.query);
				params.pageNo = pageNo;
				params.pageSize = 20;
				self.page.loading = true
				if(init){
					self.plays = [];
				}
				$.get('/tenant/tenants/'+this.$route.params.uid+'/apps/'+this.$route.params.appid+'/plays', params).then((res)=> {
					self.page.loading = false
					if (res.data && res.data.result) {
						if (init) {
							self.plays = res.data.result
						} else {
							self.plays = self.plays.concat(res.data.result)
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
