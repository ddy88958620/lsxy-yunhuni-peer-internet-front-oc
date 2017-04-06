<template>
	<div>
		<div class="admin-table-header margin-top-20">
				<button class="btn btn-primary" @click="confirmDisableAll" >全部解除绑定</button>
				<a v-if="$route.query.appstatus != 2" class="btn btn-primary" @click="show.newNumber = true">绑定号码</a>
		</div>
		<div class="admin-table ">
			<div class="table-total flex flex-1 justify-content-e float-r">
				共<span class="text-danger">{{originData.number.totalCount ? originData.number.totalCount : 0}}</span>条
			</div>
			<table class="table">
				<thead>
				<tr>
					<th>号码</th>
					<th>状态</th>
					<th>可呼入</th>
					<th>可呼出</th>
					<th>归属地</th>
					<th>有效期</th>
					<th>关联子账号</th>
					<th class="">操作</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for='l in list.number'>
					<td>{{l.num}}</td>
					<td v-if="l.status == 1" class="text-success">正常</td>
					<td class="text-danger" v-else></td>
					<td class="" v-if="l.isCalled == 1">✔</td>
					<td class="" v-else>✘</td>
          <td class="" v-if="l.isDialing == 1">✔</td>
          <td class="" v-else>✘</td>
					<td class="">{{ l.areaCode }}</td>
					<td class="">{{ l.expireTime | totalDate }}</td>
					<td class="">{{ l.certId }}</td>
					<td class=""> <a @click='disabled($index, l.rentId)'>解除绑定</a></td>
				</tr>
				</tbody>
			</table>
			<div class="more">
				<a v-if='originData.number.currentPageNo >= originData.number.totalPageCount'>加载完毕</a>
				<a @click="query('more')" class="text-none" v-else>加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
			</div>
		</div>
	</div>

	<modal :show.sync="show.newNumber" title="绑定号码" :action="bindNumber" :reset="reset">
		<div slot="body">
		<div class="admin-table position-layout"  >
			<div class="table-total flex flex-1 justify-content-e float-r">
				共<span class="text-danger">{{originData.bindNumber.totalCount ? originData.bindNumber.totalCount : 0}}</span>条
			</div>
			<table class="table table-scroll" >
				<thead>
				<tr>
					<th width="5%"></th>
					<th class="center">号码</th>
					<th class="center" class="text-align-c">可呼入</th>
					<th class="center">可呼出</th>
					<th class="center">归属地</th>
				</tr>
				</thead>
				<tbody>
        <tr v-for='l in list.bindNumber'>
          <td><input type="checkbox" name='l.num' v-model="l.checked" /></td>
          <td class="center">{{l.num}}</td>
          <td class="center">
            <span  v-if="l.isCalled == 1">✔</span>
            <span v-else>✘</span>
          </td>
          <td class="center">
            <span class="" v-if="l.isDialing == 1">✔</span>
            <span class="" v-else>✘</span>
          </td>
          <td class="center">{{ l.areaCode }}</td>
        </tr>
				</tbody>
			</table>
			<div class="more">
				<a v-if='originData.bindNumber.currentPageNo >= originData.bindNumber.totalPageCount'>加载完毕</a>
				<a @click="fetchBindNums('more')" class="text-none" v-else>加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
			</div>
		</div>
		</div>
	</modal>
	<confirm v-ref:dialog></confirm>

</template>
<script>
	import {showMsg} from 'actions'

	export default {
		vuex:{ actions: { showMsg } },
		components: {
			'datetime-picker': require('ui/datetimepicker.vue'),
			'modal': require('ui/modal.vue'),
			'confirm': require('ui/confirm.vue'),
		},
		data(){
			return {
				show: {
					newNumber: false
				},
				postData: {
					number: {
						type: '',
						pageNo: 1,
					},
					bindNumber: {
						type: '',
						pageNo: 1,
					}
				},
				list: {
					number: [],
					bindNumber: []
				},
				originData: {
					number: {},
					bindNumber: {}
				}
			}
		},
		methods: {
			checkeAll() {
				let numbers = this.list.bindNumber
				for (let [index, item] of Object.entries(numbers)) {
					console.log(index, item);
					item.checked = true
					numbers.$set(index, item)
				}
        console.log(this.list.bindNumber);
			},
      bindNumber() {
        let nums = []
				let numbers = this.list.bindNumber
				for (let [index, item] of Object.entries(numbers)) {
          if(item.checked) {
            nums.push(item.num)
          }
				}

        $.post('tenant/tenants/'+ this.$route.params.uid + '/res_rent/num/bind/app/' + this.$route.params.appid, { nums }).then((d) => {
					if(d.success) {
						this.showMsg({content: '绑定成功', type: 'success'})
	          this.init()
					} else {
						this.showMsg({content: d.errorMsg, type: 'danger'})
					}
          this.show.newNumber = false
        })
      },
			disabled(index, id) {
				$.delete('tenant/tenants/'+ this.$route.params.uid + '/res_rent/app/' + this.$route.params.appid + '/unbind/'+id).then(()=>{
					let temp = this.list.number[index]
					temp.status = 0
					this.list.number.splice(index, 1)
					this.showMsg({content: '解除绑定成功', type: 'success'})
					this.init()
				})
			},
			confirmDisableAll(index, id){
				this.$refs.dialog.confirm().then(() => {
					// 点击确定按钮的回调处理
					this.disabledAll()
					this.$refs.dialog.show = false;
				}).catch(() => {
					// 点击取消按钮的回调处理
					console.log('delete')
				});
			},
			disabledAll() {
				$.delete('tenant/tenants/'+ this.$route.params.uid + '/res_rent/app/' + this.$route.params.appid + '/unbind_all').then(()=>{
					this.list.number = []
					this.showMsg({content: '解除绑定成功', type: 'success'})
          this.init()
				})
			},
			fetchBindNums(type){
				let params = this.postData.bindNumber
				if(type === 'more') {
					params.pageNo = this.originData.bindNumber.currentPageNo + 1
				}
				$.get('tenant/tenants/'+ this.$route.params.uid + '/res_rent/num/unused/app/' + this.$route.params.appid,params ).then((res) => {
					this.originData.bindNumber = res.data
					this.list.bindNumber = type === 'more' ? this.list.bindNumber.concat(res.data.result) : res.data.result
				})
			},
			query(type){
				let params = this.postData.number
				if(type === 'more') {
					params.pageNo = this.originData.number.currentPageNo + 1
				}
				$.get('tenant/tenants/'+ this.$route.params.uid + '/res_rent/app/' + this.$route.params.appid + '/res_rent/list', params).then((res) => {
					this.originData.number = res.data
					this.list.number = type === 'more' ? this.list.number.concat(res.data.result) : res.data.result
				})
			},
      reset(){
        this.postData.bindNumber.pageNo = 1
      },
      init() {
  			this.query()
  			this.fetchBindNums()
      }
		},
		ready(){
      this.init()
		}
	}
</script>
<style lang="sass" scoped>
  .table-scroll {
    tbody{
      height: 200px;
      display: block;
      overflow-y: scroll;
    }
    thead > tr{
      display: block;
    }
  }
  .center{
    width: 160px;
  }

</style>
