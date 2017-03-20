<template>
  <div>
    <!--搜索-->
    <div class="headbox flex flex-1 align-items-c bg-section-margin whilebg">
      <span class='datetime-picker-label padding-right-20'>选择应用: </span>
      <select class="form-control flex select-box padding-right-20" v-model='serach.selectApp'>
        <option value="all">全部</option>
        <option v-for="app in serach.apps" value="{{app.id}}">{{app.name}}</option>
      </select>
    </div>
    <!--图表-->
    <div class="flex flex-1 flex-direction-column section-right whilebg admin-padding admin-border bg-section-margin">
      <div class="app-chart-header flex align-items-c">
        <input name='app-chart-type' @click="changeDate('day')" type="radio" value="day" v-model="radioDates"  checked=checked />
        <label for="">日统计</label>
        <input name='app-chart-type'  @click="changeDate('month')" type="radio" value="month" v-model="radioDates"  />
        <label for="">月统计</label>
        <div class="datepicker-wrap inline-block">
          <datetime-picker :uuid="'subsStartTime'" :type.sync="radioDates" :value.sync="page.startTime"></datetime-picker>
        </div>
        <span class="datepicker-wrap">至</span>
        <div class="datepicker-wrap inline-block">
          <datetime-picker :uuid="'subsendTime'" :type.sync="radioDates" :value.sync="page.endTime"></datetime-picker>
        </div>
        <span class="datepicker-wrap">
          <button class="btn btn-primary" @click="query">查询</button>
        </span>
      </div>
      <div class="flex-1">
        <div class="admin-table">
          <div class="table-total flex flex-1 justify-content-e float-r">
            共<span class="text-danger">{{origin.subs_res.totalCount ? origin.subs_res.totalCount : 0}}</span>条
          </div>
          <table class="table">
            <thead>
            <tr>
              <th class='text-center'>鉴权账号</th>
              <th>密钥</th>
              <th>所属应用</th>
              <th>话务量（分钟）</th>
              <th>消费金额</th>
              <th>语音总用量 /配额（分钟）</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for='subs in origin.subs_list'>
              <td>{{ subs.certId }}</td>
              <td>{{ subs.secretKey }}</td>
              <td>{{ subs.appName }}</td>
              <td>{{ subs.amongDuration }}</td>
              <td>{{ subs.amongAmount }}</td>
              <td>{{ subs.voiceNum }}</td>
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
  import DATE from '../../../../../utils/date'
  export default{
    data(){
      return {
        serach: {
          apps: [],
          selectApp: 'all',
        },
        page:{
          startTime:DATE.todayString('day'),
          endTime:DATE.todayString('day'),
          pageNo:1
        },
        origin:{
          subs_res:{},
          subs_list:[]
        },
        radioDates:'day',
      }
    },
    components:{
      'datetime-picker' :require('ui/datetimepicker.vue')
    },
    watch: {
      'serach.selectApp': function () {
        this.changeDate(this.radioDates)
      }
    },
    methods: {
      //获取应用
      getApp(){
        $.get('app/list/' + this.$route.params.uid, {serviceType: ''}).then((res) => {
          if (res.data.length > 0) {
            this.serach.apps = res.data
          }
          this.changeDate(this.radioDates)
        })
      },
      query(type){
        let params = this.page
        if (this.serach.selectApp != 'all') {
          params.appId = this.serach.selectApp
        }
        if (type === 'more') {
          this.page.pageNo =  this.origin.subs_res.currentPageNo + 1
        }
        $.get('tenant/tenants/'+this.$route.params.uid+'/sub/statistic/' + this.radioDates + '/plist',params).then((res) => {
          if(res.success){
            this.origin.subs_res = res.data.page
            this.origin.subs_list = type === 'more' ? this.origin.subs_list.concat(res.data.page.result) : res.data.page.result
          }
        })
      },
      changeDate(type){
        this.radioDates = type
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
