<template>
  <div>
    <div class="flex search-box bg-section-margin remove-margin-bottom">
      <div class="select-box">
        <search  placeholder='模板名称' :value.sync='postData.template.name' :action="queryName"></search>
      </div>
    </div>
    <div class="admin-table">
      <div class="table-total flex flex-1 justify-content-e float-r">
        共<span class="text-danger">{{origin.template_res.totalCount ? origin.template_res.totalCount : 0}}</span>条
      </div>
      <table class="table">
        <thead>
        <tr>
          <th class="text-align-c">模板编号</th>
          <th>模板类型</th>
          <th>模板名称</th>
          <th>内容</th>
          <th>关联子帐号</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='template in origin.template_list'>
          <td class="text-align-c">{{ template.tempId }}</td>
          <td>{{ template.type=='msg_sms' ? '短信' : '闪印' }}</td>
          <td>{{ template.name }}</td>
          <td class="text-over over-width">{{ template.content }}</td>
          <td>{{ template.certId }}</td>
          <td>
            <span v-if="template.state==1" class="darkgreen">审核通过</span>
            <span v-if="template.state==-1" class="text-danger">审核不通过</span>
            <span v-if="template.state==0">待审核</span>
          </td>
          <td><a @click="detail($index)">详情</a></td>
        </tr>
        </tbody>
      </table>
      <div class="more">
        <a v-if='origin.template_res.currentPageNo >= origin.template_res.totalPageCount'>加载完毕</a>
        <a @click="query('more')" class="text-none" v-else>加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
      </div>
    </div>

     <template-detail v-ref:tempdetail></template-detail>

  </div>
</template>
<script>
  import {showMsg} from 'actions'
  export default {
    vuex:{ actions: { showMsg } },
    components:{
      'search': require('ui/search-input.vue'),
      'templateDetail': require('./template-detail.vue')
    },
    data(){
      return {
        show: {
          newNumber: false
        },
        serviceType : this.$route.params.serviceType,
        postData: {
          template: {
            pageNo: 1,
            subId:'',
            name:''
          },
        },
        origin: {
          template_list: {},
          template_res: {},
        }
      }
    },
    methods: {
      query(type){
        let params = this.postData.template
        if(type === 'more') {
          params.pageNo = this.origin.template_res.currentPageNo + 1
        }
        $.get('tenant/tenants/'+ this.$route.params.uid + '/apps/' + this.$route.params.appid + '/templates', params).then((res) => {
          if(res.success){
            this.origin.template_res = res.data
            this.origin.template_list = type === 'more' ? this.origin.template_list.concat(res.data.result) : res.data.result
          }
        })
      },
      detail(index){
        this.$refs.tempdetail.show = true
        this.$refs.tempdetail.detail = this.origin.template_list[index]
      },
      queryName(){
        this.postData.pageNo = 1
        this.query()
      }
    },
    ready(){
      this.query()
    }
  }
</script>
<style lang="sass" scoped>
</style>
