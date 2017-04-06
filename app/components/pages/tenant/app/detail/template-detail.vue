<template>
  <modal :show.sync="show"  title="模板详情" :reset="reset">
    <div slot="body">
      <div class="form-group">
        <label class="control-label">模板编号: </label>
        <span>{{ detail.tempId}}</span>
      </div>
      <div class="form-group">
        <label class="control-label">模板类型 : </label>
        <span v-if="detail.type=='msg_sms'">短信</span>
        <span v-if="detail.type=='msg_ussd'">闪印</span>
      </div>
       <div class="form-group">
        <label class="control-label">审核状态 : </label>
        <span v-if="detail.state==1" class="darkgreen">审核通过</span>
        <span v-if="detail.state==0">待审核</span>
        <span v-if="detail.state==-1" class="text-danger">审核失败</span>
      </div>
      <div class="form-group">
        <label class="control-label">模板名称 : </label>
        <span>{{ detail.name }}</span>
      </div>
      <div class="form-group">
        <label class="control-label vertical-align-top">模板内容 : </label>
        <span class="inline-block over-width">{{ detail.content }}</span>
      </div>
      <div class="form-group" v-if="detail.state==-1">
        <label class="control-label vertical-align-top">模板原因 : </label>
        <span class="inline-block over-width">{{ detail.null }}</span>
      </div>
      <div class="form-group" v-if="detail.certId">
        <label class="control-label vertical-align-top">关联子账号 : </label>
        <span class="inline-block">{{ detail.certId }}</span>
      </div>
      <div class="form-group">
        <label class="control-label vertical-align-top">备注 : </label>
        <span class="inline-block over-width">
            {{ detail.remark }}
          </span>  
      </div>
    </div>
    <div  slot="footer">
        <button class="btn btn-default" @click="reset">关闭</button>
    </div>
  </modal>

</template>
<script>
  export default {
    data(){
      return {
        show: false,
        detail:'',
      }
    },
    components: {
      'modal': require('ui/modal.vue'),
    },
    methods: {
      reset(){
        this.show = false
      }
    },
  }
</script>

<style lang="sass" scoped>
  .control-label{
    width: 100px;
    text-align: right;
    padding-right: 10px;
  }
  .form-group{
    margin-bottom: 10px;
  }
</style>
