<template>
  <div>
    <div class="headbox flex flex-1 align-items-c bg-section-margin whilebg">
      <search v-ref:search :servicetype="'voice'" :type="'notify_call'"></search>
    </div>
    <div class="admin-table">
      <div class="table-total flex flex-1 justify-content-e float-r">
        消费金额: <span class="brown">{{ $refs.search.origin.total ? $refs.search.origin.total.toFixed(3) : '0.000' }}</span>元 共<span
        class="text-danger">{{$refs.search.origin.page ? $refs.search.origin.page.totalCount : 0 }}</span>条
      </div>
      <table class="table">
        <thead>
          <tr>
            <th class="text-align-c">呼叫时间</th>
            <th>主叫</th>
            <th>被叫</th>
            <th>时长(秒)</th>
            <th class="text-align-r"><span class="padding-right-20">消费金额</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='message in $refs.search.list'>
            <td class="message-time text-align-c">{{message.callStartDt | totalDate}}</td>
            <td>{{ message.fromNum }}</td>
            <td>{{ message.toNum }}</td>
            <td>{{ message.costTimeLong }}</td>
            <td class="text-align-r"><span class="padding-right-20">￥{{ message.cost ? message.cost.toFixed(3) : '0.000' }}</span>
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
      'search': require('../search.vue')
    },
    ready() {
      console.log(this)
    }
  }
</script>
