<template>
  <div>
    <div class="admin-table-header">
      <h4>会员列表</h4>
      <div class="remove-margin-bottom">
        <div class="select-box inline-block">
          <search placeholder="请输入会员名称" :value.sync='page.query.name' :action="query" ></search>
        </div>
        <span class='datetime-picker-label'>注册时间:</span>
        <datetime-picker :uuid="'datetimepicker3'" :type.sync="'day'"
                         :value.sync="page.query.begin"></datetime-picker>
        <span class='datetime-picker-label'>至</span>
        <datetime-picker :uuid="'datetimepicker2'" :type.sync="'day'" :value.sync="page.query.end"></datetime-picker>
        <span class='datetime-picker-label'>认证状态: </span>
        <select class="form-control" v-model='page.query.authStatus'>
          <option value="">全部</option>
          <option value="1">已认证</option>
          <option value="0">未认证</option>
        </select>
        <span class='datetime-picker-label'>账号状态: </span>
        <select class="form-control" v-model='page.query.accStatus'>
          <option value="">全部</option>
          <option value="2">启用</option>
          <option value="1">禁用</option>
        </select>
        <button class="btn btn-primary admin-button-margin" @click="query(true)">查询</button>
      </div>
    </div>
    <div class="admin-table ">
      <div class="table-total flex flex-1 justify-content-e float-r">

        共<span class="text-danger">{{page.total}}</span>条
      </div>
      <table class="table">
        <thead>
        <tr>
          <th class="text-align-c">注册时间</th>
          <th>会员名称</th>
          <th class="text-align-c">应用数(个)</th>
          <th>认证状态</th>
          <th class="text-align-r">余额</th>
          <th class="text-align-r">消费额</th>
          <th class="text-align-r">充值金额</th>
          <th class="text-align-c">会话量(次)</th>
          <th class="text-align-c">话务量(分钟)</th>
          <th>账号状态</th>
          <th class="text-align-c">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='tenant in tenants'>
          <td class="tenant-time text-align-c">{{tenant.registe_date | totalDate}}</td>
          <td><a v-link="'/admin/tenant/detail/'+tenant.uid" >{{tenant.name}}</a></td>
          <td class="text-align-c">{{tenant.app_count ? tenant.app_count: 0 }}</td>
          <td class="{{tenant.auth_status.toString() === '1' ? '' : 'text-danger'}}">{{tenant.auth_status.toString() === '1' ? '已认证' : '未认证'}}</td>
          <td class="text-align-r">￥{{ tenant.remain_coin>=0 ? tenant.remain_coin>0 ?  tenant.remain_coin.toFixed(3) : '0.000' : '欠费'+-tenant.remain_coin }}</td>
          <td class="text-align-r">￥{{tenant.cost_coin>0 ? tenant.cost_coin.toFixed(3) : '0.000' }}</td>
          <td class="text-align-r">￥{{tenant.total_coin>0 ? tenant.total_coin.toFixed(3) : '0.000' }}</td>
          <td class="text-align-c">{{tenant.session_count ? tenant.session_count : 0 }}</td>
          <td class="text-align-c">{{tenant.session_time ? tenant.session_time : 0 }}</td>
          <td v-if="tenant.account_status == 2" class="darkgreen">启用</td>
          <td v-else class="text-danger">禁用</td>
          <td class="text-align-c">
            <span><a v-link="'/admin/tenant/detail/'+tenant.uid">查看</a></span>
            <span v-if="tenant.account_status == 2"><a @click="toggleStatus($index,tenant.uid,1)">禁用</a></span>
            <span v-else><a @click="toggleStatus($index,tenant.uid,2)">启用</a></span>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="more">
        <a v-show='page.loading'>正在加载</a>
        <a v-show='!page.loading && !page.hasMore'>加载完毕</a>
        <a @click="query()" class="text-none" v-show='!page.loading && page.hasMore'>加载更多<i
          class="icon iconfont icon-oc-dropdown"></i></a>
      </div>
    </div>
  </div>
</template>
<script>
  import {showMsg} from '../../../vuex/actions'
 
  export default {
    vuex:{
      actions:{
        showMsg
      }
    },
    components: {
      'datetime-picker': require('../../ui/datetimepicker.vue'),
      'search': require('../../ui/search-input.vue')
    },
    data(){
      return {
        tenants: [],
        page: {
          query: {
            name: '',
            begin: '',
            end: '',
            authStatus: '',
            accStatus: '',
            pageNo: 0,
            pageSize: 20
          },
          loading: true,
          hasMore: true,
          total:0
        }
      }
    },
    methods: {
      query(init){
        let self = this
        let pageNo = (init && 1) || self.page.query.pageNo + 1
        let params = $.extend(true, {}, self.page.query);
        params.pageNo = pageNo;
        self.page.loading = true
        if(init){
          self.tenants = [];
        }
        $.get('/tenant/tenants', params).then((res)=> {
          if(res.success===false){
            showMsg({dispatch}, {type:'danger', content: (res && res.errorMsg) || '未知错误'})
            return
          }

          self.page.loading = false
          if (res.data && res.data.result) {
            if (init) {
              self.tenants = res.data.result
            } else {
              self.tenants = self.tenants.concat(res.data.result)
            }
            self.page.query.pageNo = pageNo
          }
          self.page.hasMore = res.data && ((res.data.totalPageCount || 0 ) > self.page.query.pageNo)
          self.page.total = (res.data && res.data.totalCount) || 0
        })
      },
      toggleStatus(index, id, status){
        let self = this;
        $.patch('/tenant/tenants/' + id + '?status=' + status).then((res)=> {
          return res.data && (self.tenants[index].account_status = status);
        })
      }
    },
    route: {
      data(){
				this.page.query.name = this.$route.query.searchName
        this.query(true)
      }
    }
  }
</script>
<style lang="sass">
</style>
