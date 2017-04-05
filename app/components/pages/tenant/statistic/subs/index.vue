<template>
  <div>
    <!--搜索-->
    <div class="headbox flex flex-1 align-items-c bg-section-margin whilebg">
      <span class='datetime-picker-label padding-right-20'>选择应用: </span>
      <select class="form-control flex select-box padding-right-20" v-model='search.appIndex'>
        <option value="-1">请选择应用</option>
        <option v-for="app in search.apps" value="{{ $index }}">{{app.name}}</option>
      </select>
    </div>
    <!--图表-->
    <div class="flex flex-1 flex-direction-column section-right whilebg admin-padding admin-border bg-section-margin">
      <div class="app-chart-header flex align-items-c">
        <input name='app-chart-type' @click="changeDate('day')" type="radio" value="day" v-model="page.type"  checked=checked />
        <label>日统计</label>
        <input name='app-chart-type'  @click="changeDate('month')" type="radio" value="month" v-model="page.type"  />
        <label>月统计</label>
        <div class="datepicker-wrap inline-block">
          <datetime-picker :uuid="'subsStartTime'" :type.sync="page.type" :value.sync="page.startTime"></datetime-picker>
        </div>
        <span class="datepicker-wrap">至</span>
        <div class="datepicker-wrap inline-block">
          <datetime-picker :uuid="'subsendTime'" :type.sync="page.type" :value.sync="page.endTime"></datetime-picker>
        </div>
        <span class="datepicker-wrap">
          <button class="btn btn-primary" @click="query">查询</button>
        </span>
        <download :params="page"></download> 
      </div>
      <div class="flex-1">
        <div class="admin-table">
          <div class="table-total flex flex-1 justify-content-e float-r">
            共<span class="text-danger">{{origin.subs_res.totalCount ? origin.subs_res.totalCount : 0}}</span>条
          </div>
          <table class="table">
            <thead>
            <tr>
              <th>鉴权账号</th>
              <th>密钥</th>
              <th v-if="serviceType=='voice' || serviceType=='call_center'" class="text-align-c">话务量（分钟）</th>
              <th v-if="serviceType=='msg'" class="text-align-c">发送数（条）</th>
              <th>消费金额</th>
              <th v-if="serviceType=='voice' || serviceType=='call_center'">语音总用量 /配额（分钟）</th>
              <th v-if="serviceType=='msg'">闪印总用量 /配额（条）</th>
              <th v-if="serviceType=='msg'">短信总用量 /配额（条）</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for='subs in origin.subs_list'>
              <td>{{ subs.certId }}</td>
              <td>{{ subs.secretKey }}</td>
              <td v-if="serviceType=='voice' || serviceType=='call_center'" class="text-align-c">{{ subs.amongDuration }}</td>
              <td v-if="serviceType=='msg'" class="text-align-c">{{ subs.amongMsg }}</td>
              <td>{{ subs.amongAmount }}</td>
              <td  v-if="serviceType=='voice' || serviceType=='call_center'">{{ subs.voiceNum }}</td>
              <td  v-if="serviceType=='msg'">{{ subs.ussdNum }}</td>
              <td  v-if="serviceType=='msg'">{{ subs.smsNum }}</td>
            </tr>
            </tbody>
          </table>
          <div class="more">
            <a v-if='origin.subs_res.currentPageNo >= origin.subs_res.totalPageCount'>加载完毕</a>
            <a @click="query('more')" class="text-none" v-else>加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<style>

</style>
<script>
  import DATE from 'utils/date'
  export default{
    data(){
      return {
        search: {
          apps: [],
          appIndex: -1,
        },
        page:{
          startTime:DATE.todayString('day'),
          endTime:DATE.todayString('day'),
          type:'day',
          pageNo:1
        },
        origin:{
          subs_res:{},
          subs_list:[]
        },
        serviceType:'voice'
      }
    },
    components:{
      'datetime-picker' :require('ui/datetimepicker.vue'),
      'download' :require('./download.vue')
    },
    watch: {
      'search.appIndex': function () {
        this.changeDate(this.page.type)
      }
    },
    methods: {
      //获取应用
      getApp(){
        let self = this
        $.get('app/list/' + this.$route.params.uid, {serviceType: ''}).then((res) => {
          if (res.data.length > 0) {
            self.search.apps = res.data
          }
          this.changeDate(this.page.type)
        })
      },
      query(type){
        let params = this.page
        if(this.search.appIndex >=0){
          params.appId = this.search.apps[this.search.appIndex].appId
          this.serviceType = this.search.apps[this.search.appIndex].serviceType
        }

        if (type === 'more') {
          this.page.pageNo =  this.origin.subs_res.currentPageNo + 1
        }
        $.get('tenant/tenants/'+this.$route.params.uid+'/sub/statistic/' + this.page.type + '/plist',params).then((res) => {
          if(res.success){
            this.origin.subs_res = res.data.page
            this.origin.subs_list = type === 'more' ? this.origin.subs_list.concat(res.data.page.result) : res.data.page.result
          }
        })
      },
      changeDate(type){
        this.page.type = type
        this.page.startTime = DATE.todayString(type)
        this.page.endTime = DATE.todayString(type)
        this.query()
      }
    },
    route:{
       data(){
          this.getApp()
       }
    }
  }
</script>
