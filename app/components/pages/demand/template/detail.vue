<template>
  <div class="section_right">
    <h4 >查看详情</h4>
    <div class="admin-panel">
      <div class="panel-heading flex flex-1 ">
        <span class="inline-block ">会员信息</span>
        <a class="inline-block float-r" v-link="'/admin/tenant/detail/'+template.tenantId">查看</a>
      </div>
    </div>

    <div class="admin-panel">
      <div class="panel-heading">模板内容</div>
      <div class="panel-body">
        <ul class="list-none-style">
          <li><span class=" padding-right-10">会员名称 : </span>{{ template.tenantName}}</li>
          <li><span class=" padding-right-10">应用名称 : </span> <a v-link="'/admin/tenant/detail/'+template.tenantId+'/app/detail/'+template.appId" >{{ template.appName}}</a></li>
          <li><span class=" padding-right-10">模板编号 : </span>{{ template.tempId}}</li>
          <li><span class=" padding-right-10">模板类型 : </span>{{ template.type==='msg_sms' ? '短信' : '闪印'}}</li>
          <li><span class=" padding-right-10">模板名称 : </span>{{ template.name}}</li>
          <li><span class=" padding-right-10">模板内容 : </span>{{ template.content}}</li>
          <li><span class=" padding-right-10">使用场景 : </span>{{ template.remark}}</li>
        </ul>
      </div>
    </div>

    <div class="admin-panel" v-if="template.status === 0" >
      <div class="panel-heading">申请</div>
      <div class="panel-body">
        <ul class="list-none-style">
          <li>
            <button class="btn btn-primary" @click="pass">通过</button>
            <button class="btn btn-primary" @click="showModal = true">不通过</button>
            <button class="btn btn-default" v-link="'/admin/demand/template/list/await'">取消</button>
          </li>
        </ul>
      </div>
    </div>

    <div class="admin-panel" v-if="template.status === -1 || template.status===1" >
      <div class="panel-heading">审核详情</div>
      <div class="panel-body">
        <ul class="list-none-style">
          <li><span class=" padding-right-10">审核时间 : </span>{{ template.lastTime | totalDate}}</li>
          <li v-if="template.status === 1">
            <span class=" padding-right-10" >供应商 : </span>

          </li>  <span v-for="tem in template.list">
              {{ tem.msgSupplierName }}
            </span>

          <li v-if="template.status === -1"><span class=" padding-right-10" >不通过原因 : </span>{{ template.reason}}</li>
        </ul>
      </div>
    </div>

    <!-- 通过 -->
    <modal :show.sync="passModal.show" title="审核" :action="success">
      <div slot="body" class="flex">
        <div class="flex flex-1 modal-nopass" >
          <span class="flex float-l title line-height-32">供应商</span>
          <span class="flex admin-button-margin flaot-l" >
            <select class="form-control textarea" v-model="passModal.data.id">
              <option value="">请选择供应商</option>
              <option v-for="supplier in passModal.supplier_list" value="{{ supplier.id }}">{{ supplier.supplierName }}</option>
            </select>
          </span>
        </div>
      </div>
    </modal>

    <modal :show.sync="showModal" title="模板审核" :action="fail">
      <div slot="body" class="flex">
        <div class="flex flex-1 modal-nopass" v-reset-form="postData">
          <span class="flex float-l title">不通过原因</span>
          <span class="flex admin-button-margin flaot-l"><textarea class="form-control textarea" v-model="postData.reason"
                                                                   maxlength="50"></textarea></span>
          <span class="flex float-r numbertips">50字以内</span>
        </div>
      </div>
    </modal>

  </div>
</template>

<script>
  import {showMsg,getMessageNum} from 'actions'
  export default {
    vuex: {
      getters: {},
      actions: {
        showMsg,
        getMessageNum
      }
    },
    data(){
      return {
        showModal: false,
        passModal: {
          show : false,
          supplier_list:[],
          data:{
            id: '',
            tempId: '',
          }
        },
        template: {},
        postData:{
          reason : ''
        }
      }
    },
    components: {
      'modal': require('ui/modal.vue')
    },
    methods: {
      pass(){
        $.get('/demand/member/msgtemplate/supplier/list').then((res) => {
          if (res.success === 'false') {
            this.showMsg({content: res.errorMsg, type: 'danger'})
            return
          }
          this.passModal = {
            show:true,
            supplier_list: res.data,
            data: {
              id : '',
              tempId: this.template.tempId
            }
          }
        })

      },
      nopass(){
        this.showModal = true
        this.postData.reason = ''
      },
      success(){
        if(this.passModal.data.id == ''){
          this.showMsg({content: '请选择供应商', type: 'danger'})
          return
        }
        let params = { ids : [ this.passModal.data]}
        let self = this
        $.put('/demand/member/msgtemplate/pass/' + this.$route.params.templateid ,params).then((res) => {
          if (res.success) {
            this.passModal.show = false
            this.getMessageNum()
            this.showMsg({content: '审核通过', type: 'success'})
            setTimeout(function () {
              self.$route.router.go({path: '/admin/demand/template/list/await'})
            }, 3000)
            return
          }
          this.showMsg({content: res.errorMsg, type: 'danger'})

        })
      },
      fail(){
        let params = this.postData
        $.put('/demand/member/msgtemplate/nopass/' + this.$route.params.templateid ,params).then((res) => {
          if (res.success === 'false') {
            this.showMsg({content: res.errorMsg, type: 'danger'})
            return
          }
          this.getMessageNum()
          this.showModal = false
          this.showMsg({content: '审核不通过成功', type: 'success'})
          setTimeout(function () {
            self.$route.router.go({path: '/admin/demand/template/list/await'})
          }, 3000)
          return
        })
      },
      detail() {
        $.get('/demand/member/msgtemplate/detail/' + this.$route.params.templateid).then((res) => {
          this.template = res.data
        })
      }
    },
    ready(){
      this.detail()
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
  .title-time {
    width: 15%;
  }
  .title-type {
    width: 15%;
  }
  .table-detail {
    border-top: 1px solid #e9edf4;
  }
  .title-reason {
    width: 68%;
  }
  .detail {
    padding: 0 0 0 5px;
    li {
      padding-top: 10px;
      padding-bottom: 0px;
    }
  }

</style>
