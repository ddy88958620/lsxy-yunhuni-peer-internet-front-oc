<template>
	<!--新增透传-->
	<modal :show.sync="show" title="新增透传号码" :action="new">
		<div slot="body">
			<div class="form-group">
				<label class="">运营商 : </label>
				<select class="form-control input-width-select" v-model='postData.number.operator'>
					<option value=''>全部</option>
					<option value='中国移动'>中国移动</option>
					<option value='中国联通'>中国联通</option>
					<option value='中国电信'>中国电信</option>
				</select>
				&nbsp;
				<label class="">模糊查询 : </label>
				<div class="select-box inline-block">
					<search
						:value.sync="postData.number.number"
						:action="query"
						placeholder="模糊查询"
					></search>
				</div>
				&nbsp;
				<button class="btn btn-primary" @click="query">查询</button>
			</div>
			<div class="pass_number_result margin-top-20">
				<div v-for="l in list.number">
					<input type="checkbox" v-model="selected.number" value="{{l.telNumber}}">
					&nbsp;
					{{l.telNumber}}
				</div>
			</div>
			<div class="admin-table">
				<div class="more">
					<a v-if='origin.number.currentPageNo >= origin.number.totalPageCount'>加载完毕</a>
					<a @click="query('more')" class="text-none" v-if='origin.number.currentPageNo < origin.number.totalPageCount' >加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
				</div>
			</div>
			<div class="pass_number_selected">
				<span class="selected_box bg-success" v-for="number in selected.number">
					{{number}} &nbsp;<button @click="deleteNum($index)" type="button" class="close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
				</span>
			</div>
		</div>
	</modal>
</template>
<script>
	export default {
		vuex: {
			actions: {showMsg: require('actions').showMsg}
		},
		watch: {
			show: function(){
				this.selected.number = []
				this.query()
			}
		},
		data(){
			return {
				show: false,
				selected: {
					number: [],
				},
				postData: {
					number: {
						operator: '',
						number: ''
					}
				},
				list: {
					number: []
				},
				origin: {
					number: {}
				},
			}
		},
		components: {
			'modal': require('ui/modal.vue'),
			'search': require('ui/search-input.vue'),
		},
		methods: {
			deleteNum(index){
				this.selected.number.splice(index, 1)
//				this.list.number.forEach((obj, i)=>{
//					let bool = Array.prototype.includes.call(this.selected.number,obj.telNumber)
//					if(bool){
////						this.list.number.splice(i, 1)
//					}
//				})
			},
			query(type){
				let params = this.postData.number
				if(type === 'more') {
					params.pageNo = this.origin.number.currentPageNo + 1
				}
				$.get('config/telnum/notline/plist/'+ this.$route.params.lid, params).then((res) => {
					this.origin.number = res.data
					this.list.number = type === 'more' ? this.list.number.concat(res.data.result) : res.data.result
				})
			},
			new(){
				$.post('/config/line/telnum/through/new/'+this.$route.params.lid, {ids: this.selected.number}).then((e)=>{
					if(e.errorMsg){
						this.showMsg({content: e.errorMsg, type: 'danger'})
						return
					}
					this.showMsg({content: '新建成功', type: 'success'})
					this.$route.router.replace({name: 'telnum', query: {t: new Date()}})
					this.show = false
				})
			},
		},
		ready(){
			this.query()
		}
	}
</script>
