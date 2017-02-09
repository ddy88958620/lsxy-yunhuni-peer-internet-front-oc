<template>
  <div>
    <div class="headbox flex flex-1 align-items-c bg-section-margin whilebg">
      <search v-ref:search :servicetype="'call_center'" :type="'call_center'"></search>
    </div>

    <!--表格-->
    <div class="admin-table">
      <div class="table-total flex flex-1 justify-content-e float-r">
        消费金额: <span class="brown">{{ $refs.search.origin.total ? $refs.search.origin.total.toFixed(3) : '0.000'}}</span>元 共
        <span class="text-danger">{{$refs.search.origin.page.totalCount ? $refs.search.origin.page.totalCount : 0 }}</span>条
      </div>
      <table class="table">
        <thead>
        <tr>
          <th class="text-align-c">呼叫时间</th>
          <th>呼叫类型</th>
          <th>主叫</th>
          <th>被叫</th>
          <th>时长(秒)</th>
          <th class="text-align-r"><span class="padding-right-20">消费金额</span></th>
          <th class="text-align-c">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='message in $refs.search.list'>
          <td class="message-time text-align-c">{{message.callStartDt | totalDate}}</td>
          <td>
            <span  v-if="message.ivrType==1">呼入</span>
            <span  v-if="message.ivrType==2">呼出</span>
          </td>
          <td>{{ message.fromNum }}</td>
          <td>{{ message.toNum }}</td>
          <td>{{ message.costTimeLong }}</td>
          <td class="text-align-r"><span class="padding-right-20">￥{{ message.cost ? message.cost.toFixed(3) : '0.000' }}</span></td>
          <td class="text-align-c">
            <download :type="'cdr'" :message="message"></download>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="more">
        <a v-if='$refs.search.origin.page.currentPageNo >= $refs.search.origin.page.totalPageCount'>加载完毕</a>
        <a @click="$refs.search.query('more')" class="text-none" v-else>加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {
      'search': require('../search.vue'),
      'download': require('../download.vue')
    }
  }
</script>
