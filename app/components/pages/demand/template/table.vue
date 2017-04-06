<template>
	<div class="admin-table-header">
		<div class="bg-section-margin remove-margin-bottom ">
			<div class="select-box inline-block" ><search
				:value.sync = 'page.name'
				:action="queryName"
				placeholder="请输入会员名称"
			></search></div>
			<span class='datetime-picker-label '>申请时间:</span>
			<datetime-picker :uuid="'demandAppStartDate'"  :type.sync="'day'" :value.sync="page.startTime"></datetime-picker>
			<span class='datetime-picker-label'>至</span>
			<datetime-picker :uuid="'demandAppEndDate'"  :type.sync="'day'" :value.sync="page.endTime"></datetime-picker>
			<button class="btn btn-primary admin-button-margin" @click="queryName">查询</button>
		</div>
	</div>
	<div>
		<div class="admin-table">
			<div class="table-total flex flex-1 justify-content-e float-r">
				共<span class="text-danger">{{ template_res.totalCount ? template_res.totalCount : 0 }}</span>条
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
              <span v-if="template.type=='msg_ussd'">闪印</span>
              <span v-if="template.type=='msg_sms'">短信</span>
          </td>
          <td>{{ template.certId }}</td>
          <td v-if="page.type=='unauth'" class="text-over over-width" title="{{ template.reason }}">{{ template.reason }}</td>
          <td v-if="page.type=='auditing'">
              <span v-for="tem in template.list">
              {{ tem.msgSupplierName }}
            </span>
          </td>
          <td class="message-time" v-if="page.type=='auditing' || page.type=='unauth'">{{ template.lastTime | totalDate }}</td>
          <td class="text-align-c">
            <a v-link="'/admin/demand/template/detail/'+template.id">详情</a>
            <a v-if="page.type == 'await'" @click="pass(template.id,template.tempId,$index)" >通过</a>
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

    <!-- 通过 -->
    <modal :show.sync="passModal.show" title="审核" :action="success">
      <div slot="body" class="flex">
        <div class="flex flex-1 modal-nopass" >
          <span class="flex float-l title">供应商：</span>
          <span class="flex admin-button-margin flaot-l" >
            <span v-for="supplier in passModal.supplier_list">
              <input type="checkbox" value="{{ supplier.id }}" v-model="passModal.ids" />{{ supplier.supplierName }}
            </span>
          </span>
        </div>
      </div>
    </modal>

    <!-- 不通过 -->
    <modal :show.sync="nopassModal.show" title="审核" :action="fail">
      <div slot="body" class="flex">
        <div class="flex flex-1 modal-nopass" >
          <span class="flex float-l title ">不通过原因</span>
          <span class="flex admin-button-margin flaot-l" ><textarea class="form-control textarea" v-model="nopassModal.data.reason"  maxlength="50" ></textarea></span>
          <span class="flex float-r numbertips">50字以内</span>
        </div>
      </div>
    </modal>


    <!--<page v-ref:page :async="false" :data="lists" :lens="lenArr" :page-len="pageLen" :param="param"></page>-->

	</div>
</template>
<script>
  import {showMsg,getMessageNum} from 'actions'
	export default {
    vuex: {
      actions: {
        showMsg,
        getMessageNum
      }
    },
		components: {
			'datetime-picker': require('ui/datetimepicker.vue'),
			'search' : require('ui/search-input.vue'),
      'modal' : require('ui/modal.vue'),
      'page' : require('ui/pager.vue'),
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
          show: false,
          supplier_list: []
        },
        nopassModal:{
          show: false
        },
        template_list: [],
        template_res: {},
			}
		},
		methods: {
      queryName(){
        this.page.pageNo = 1
        this.query()
      },
      query(type){
        this.page.type = this.$route.params.type
        let params = this.page
        if (type === 'more') {
          this.page.pageNo =  this.template_res.currentPageNo + 1
        }
        $.get('demand/member/msgtemplate/'+this.$route.params.type+'/list', params).then((res) => {
          if(res.success){
            this.template_res = res.data
            this.template_list = type === 'more' ? this.template_list.concat(res.data.result) : res.data.result
          }
        })
      },
      pass(id,tempId,index){
        $.get('/demand/member/msgtemplate/supplier/list').then((res) => {
          if (res.success === 'false') {
            this.showMsg({content: res.errorMsg, type: 'danger'})
            return
          }
          this.getMessageNum()
          this.passModal = {
            show:true,
            supplier_list: res.data,
            ids:[],
            data: {
              id : '',
              index : index,
              tempId: id,
              template_id : id,
            }
          }
        })
      },
      nopass(id,index){
        this.nopassModal = {
          show:true,
          data: {
            id : id,
            index : index,
            reason: ''
          }
        }
      },
      success(){

        if(this.passModal.ids.length ==0){
          this.showMsg({content: '请选择供应商', type: 'danger'})
          return
        }
        let data = this.passModal.data
        let params = { ids:[]}
        this.passModal.ids.forEach(function (val) {
          params.ids = params.ids.concat({tempId:data.tempId,id:val})
        })

        $.put('/demand/member/msgtemplate/pass/' + this.passModal.data.template_id ,params).then((res) => {
          if (res.success === 'false') {
            this.showMsg({content: res.errorMsg, type: 'danger'})
            return
          }
          this.template_res.totalCount = this.template_res.totalCount -1
          this.getMessageNum()
          this.template_list.splice(this.passModal.data.index,1)
          this.passModal.show = false
          this.showMsg({content: '审核通过', type: 'success'})
        })
      },
      fail(){
        let params = { reason: this.nopassModal.data.reason };
        $.put('/demand/member/msgtemplate/nopass/' + this.nopassModal.data.id ,params).then((res) => {
          if (res.success === 'false') {
            this.showMsg({content: res.errorMsg, type: 'danger'})
            return
          }
          this.template_res.totalCount = this.template_res.totalCount -1
          this.getMessageNum()
          this.template_list.splice(this.nopassModal.data.index,1)
          this.nopassModal.show = false
          this.showMsg({content: '审核不通过成功', type: 'success'})
        })
      }

      },
    watch:{
      '$route.params.type': function () {
        this.page = {
          pageNo: 1,
          name:'',
          startTime:'',
          endTime:'',
          type:''
        };
        this.query()
      }
    },
    ready(){
		  this.query()
    }
	}

</script>
