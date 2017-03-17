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
          <li><span class=" padding-right-10">模板类型 : </span>{{ template.type==='sms' ? '短信' : '闪印'}}</li>
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
          <li><span class=" padding-right-10" v-if="template.status === -1">不通过原因 : </span>{{ template.reason}}</li>
        </ul>
      </div>
    </div>

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
  import {showMsg} from 'actions'
  export default {
    vuex: {
      getters: {},
      actions: {
        showMsg
      }
    },
    data(){
      return {
        showModal: false,
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
        $.put('/demand/member/msgtemplate/pass/' + this.$route.params.templateid).then((res) => {
          if (res.success === 'false') {
            this.showMsg({content: res.errorMsg, type: 'danger'})
            return
          }
          this.showMsg({content: '审核通过', type: 'success'})
        })
      },
      nopass(){
        this.showModal = true
        this.postData.reason = ''
      },
      fail(){
        let params = this.postData
        console.log(params);
        $.put('/demand/member/msgtemplate/nopass/' + this.$route.params.templateid ,params).then((res) => {
          if (res.success === 'false') {
            this.showMsg({content: res.errorMsg, type: 'danger'})
            return
          }
          this.showModal = false
          this.showMsg({content: '审核不通过成功', type: 'success'})
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
