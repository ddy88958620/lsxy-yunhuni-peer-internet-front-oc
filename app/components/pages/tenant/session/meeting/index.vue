<template>
  <div>
    <div class="headbox flex flex-1 align-items-c bg-section-margin whilebg">
        <search v-ref:search :servicetype="'voice'" :type="'sys_conf'"></search>
    </div>
    <!--表格-->
    <div class="admin-table">
      <div class="table-total flex flex-1 justify-content-e float-r">
        消费金额: <span class="brown">{{ $refs.search.origin.total ? $refs.search.origin.total.toFixed(3) : '0.000' }}</span>元
        共<span class="text-danger">{{$refs.search.origin.page.totalCount ? $refs.search.origin.page.totalCount : 0 }}</span>条
      </div>
      <table class="table">
        <thead>
        <tr>
          <th class="text-align-c">会议标识ID</th>
          <th>呼叫时间</th>
          <th>参与者</th>
          <th>参与类型</th>
          <th>时长(秒)</th>
          <th class="text-align-r"><span class="padding-right-20">消费金额</span></th>
          <th class="text-align-c">操作</th>
        </tr>
        </thead>
        <tbody  v-if="$refs.search">
        <tr v-for='message in $refs.search.origin.list' v-if="$refs.search.list.length > 0">
          <td class="text-align-c">{{message.$refs.search.origin.pageId}}</td>
          <td class="message-time ">{{message.callStartDt | totalDate}}</td>
          <td>
            <span v-if="message.joinType==0">{{message.fromNum}}</span>
            <span v-if="message.joinType==1">{{message.toNum}}</span>
            <span v-if="message.joinType==2">{{message.fromNum}} </span>
          </td>
          <td>
            <span v-if="message.joinType==0">创建</span>
            <span v-if="message.joinType==1">邀请加入</span>
            <span v-if="message.joinType==2">呼入加入</span>
          </td>
          <td>{{ message.costTimeLong }}</td>
          <td class="text-align-r"><span class="padding-right-20">￥{{ message.cost ? message.cost.toFixed(3) : '0.000' }}</span></td>
          <td class="text-align-c">
            <download :type="'cdr'" :message="message"></download>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="more" v-if="$refs.search">
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
    },
  }
</script>
