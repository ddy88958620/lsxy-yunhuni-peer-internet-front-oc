<template>
	<div class="admin-table-header">
		<div class="bg-section-margin remove-margin-bottom ">
			<div class="select-box inline-block" ><search
				:value.sync = 'page.name'
				:action="query"
				placeholder="请输入会员名称"
			></search></div>
			<span class='datetime-picker-label '>申请时间:</span>
			<datetime-picker :uuid="'demandAppStartDate'"  :type.sync="'day'" :value.sync="page.startTime"></datetime-picker>
			<span class='datetime-picker-label'>至</span>
			<datetime-picker :uuid="'demandAppEndDate'"  :type.sync="'day'" :value.sync="page.endTime"></datetime-picker>
			<button class="btn btn-primary admin-button-margin" @click="query">查询</button>
		</div>
	</div>
	<div>
		<div class="admin-table">
			<div class="table-total flex flex-1 justify-content-e float-r">
				共<span class="text-danger">{{ template_res.totalCount }}</span>条
			</div>
			<table class="table">
				<thead>
				<tr>
          <th class="text-align-c">申请时间</th>
          <th>会员名称</th>
          <th>应用名称</th>
          <th>模板编号</th>
          <th>模板名称</th>
          <th>模板类型</th>
          <th>关联子账号</th>
          <th v-if="page.type=='unauth'">原因</th>
          <th v-if="page.type=='auditing'">供应商</th>
          <th v-if="page.type=='auditing' || page.type=='unauth'">审核时间</th>
          <th class="text-align-c">操作</th>
				</tr>
				</thead>
				<tbody>
        <tr v-for='template in template_list'>
          <td class="message-time text-align-c">{{template.createTime | totalDate }}</td>
          <td ><a v-link="'/admin/tenant/detail/'+template.tenantId">{{template.tenantName}}</a></td>
          <td>{{template.appName}}</td>
          <td>{{template.tempId}}</td>
          <td>{{template.name}}</td>
          <td>
              <span v-if="template.type=='ussd'">闪印</span>
              <span v-if="template.type=='sms'">短信</span>
          </td>
          <td>{{ template.subaccountId }}</td>
          <td v-if="page.type=='unauth'">{{ template.reason }}</td>
          <td v-if="page.type=='auditing'"></td>
          <td class="message-time" v-if="page.type=='auditing' || page.type=='unauth'">{{ template.lastTime | totalDate }}</td>
          <td class="text-align-c">
            <a v-link="'/admin/demand/template/detail/'+template.id">详情</a>
            <a v-if="page.type == 'await'" @click="pass(template.id,$index)" >通过</a>
            <a v-if="page.type == 'await'" @click="nopass(template.id,$index)">不通过</a>
          </td>
        </tr>
				</tbody>
			</table>
			<div class="more">
        <a v-if='template_res.currentPageNo >= template_res.totalPageCount'>加载完毕</a>
        <a @click="query('more')" class="text-none" v-else>
          加载更多 <i class="icon iconfont icon-oc-dropdown"></i>
        </a>
      </div>
		</div>

    <!-- modal -->
    <modal :show.sync="passModal.show" title="审核" :action="fail">
      <div slot="body" class="flex">
        <div class="flex flex-1 modal-nopass" >
          <span class="flex float-l title">不通过原因</span>
          <span class="flex admin-button-margin flaot-l" ><textarea class="form-control textarea" v-model="passModal.data.reason"  maxlength="50" ></textarea></span>
          <span class="flex float-r numbertips">50字以内</span>
        </div>
      </div>
    </modal>

	</div>
</template>
<script>
  import {showMsg} from 'actions'
	export default {
    vuex: {
      actions: {
        showMsg
      }
    },
		components: {
			'datetime-picker': require('ui/datetimepicker.vue'),
			'search' : require('ui/search-input.vue'),
      'modal' : require('ui/modal.vue')
		},
		data(){
			return {
        page: {
          pageNo: 1,
          name:'',
          startTime:'',
          endTime:'',
          type:''
        },
        passModal:{
          show: false
        },
        template_list: [],
        template_res: {},
			}
		},
		methods: {
      query(type){
        this.page.type = this.$route.params.type
        let params = this.page
        if (type === 'more') {
          this.page.pageNo =  this.app_res.currentPageNo + 1
        }
        $.get('demand/member/msgtemplate/'+this.$route.params.type+'/list', params).then((res) => {
          if(res.success){
            this.template_res = res.data
            this.template_list = type === 'more' ? this.app_list.concat(res.data.result) : res.data.result
          }
        })
      },
      pass(id,index){
        $.put('/demand/member/msgtemplate/pass/' + id).then((res) => {
          if (res.success === 'false') {
            this.showMsg({content: res.errorMsg, type: 'danger'})
            return
          }
          this.app_list.splice(index,1)
          this.showMsg({content: '审核通过', type: 'success'})
        })
      },
      nopass(id,index){
        this.passModal = {
          show:true,
          data: {
            id : id,
            index : index,
            reason: ''
          }
        }
      },
      fail(){
        let params = { reason: this.passModal.data.reason };
        console.log(params);
        $.put('/demand/member/msgtemplate/nopass/' + this.passModal.data.id ,params).then((res) => {
          if (res.success === 'false') {
            this.showMsg({content: res.errorMsg, type: 'danger'})
            return
          }
          this.app_list.splice(this.passModal.data.index,1)
          this.passModal = { show:false ,data :{ reason :''}}
          this.showMsg({content: '审核不通过成功', type: 'success'})
        })
      }

      },
    watch:{
      '$route.params.type':'query'
    },
    ready(){
		  this.query()
    }
	}

</script>
