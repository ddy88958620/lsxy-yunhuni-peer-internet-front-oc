<template>
  <div>
    <div class="admin-table table-responsive">
      <div class="table-total flex flex-1 justify-content-e">
        共<span class="text-danger">{{recharge.totalCount}}</span>条
      </div>
      <table class="table">
        <thead>
        <tr>
          <th class="text-align-c">充值时间</th>
          <th>充值额（元）</th>
          <th>充值方式</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='message in rechargeList'>
          <td class="message-time text-align-c">{{message.createTime | totalDate}}</td>
          <td>{{message.amount}}</td>
          <td v-if="message.type==='RENGONG'">人工充值</td>
          <td v-if="message.type==='UNIONPAY'">银联</td>
          <td v-if="message.type==='ALIPAY'">支付宝</td>
        </tr>
        </tbody>
      </table>
      <div class="more">
        <a v-show='recharge.totalPageCount==recharge.currentPageNo || recharge.totalPageCount==0'>加载完毕</a>
        <a @click="query('more')" class="text-none" v-show='recharge.totalPageCount!=recharge.currentPageNo && recharge.totalPageCount!=0' >加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
      </div>
    <!--   <div class="more"><a @click="query('mores')" class="text-none">加载更多<i class="icon iconfont icon-oc-dropdown" ></i></a></div> -->
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        recharge:{},
        rechargeTotal : 0,
        rechargeList: [],
       
      }
    },
    methods: {
      query(more){
        //1.语音呼叫2.双向回拨3.会议服务4.IVR定制服务5.语音验证码6.录音服务
        let uid = this.$route.params.uid
        let type = 3
        let appId = this.$route.params.aid
        let time = this.$route.params.day
        let params = {type:type,appId:appId,time:time}
        if(more){
          let pageNo = this.recharge.currentPageNo + 1
          params.pageNo = pageNo
        }
        let self = this
        $.get('/tenant/tenants/'+uid+'/recharges', params).then((res) => {
           if(res.data.totalCount>0){
            self.rechargeTotal =res.data.total
            self.recharge = res.data
            if(more)
              self.rechargeList = self.rechargeList.concat(res.data.result)
            else
              self.rechargeList = res.data.result
          }
        })
      }
    },
    ready(){
      this.query()
    }

  }

</script>
