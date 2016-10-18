<template>
  <div>

    <div class="flex flex-direction-column admin-table-header">
      <div class="flex align-items-c remove-margin-bottom">
        <span class='datetime-picker-label clear-padding-left'>充值渠道:</span>
        <select class="form-control" v-model='type'>
          <option value=''>全部</option>
          <option value='UNIONPAY'>银联</option>
          <option value='ALIPAY'>支付宝</option>
          <option value='RENGONG'>运营充值</option>
        </select>
        <span class='datetime-picker-label'  v-if="type=='RENGONG' || type==''">充值类型: </span>
        <select class="form-control" v-model='source' v-if="type=='RENGONG' || type==''">
          <option value=''>全部</option>
          <option value='MANUAL_ACTIVITY' >手工-活动赠送</option>
          <option value='MANUAL_BUSINESS'>手工-线下商务</option>
          <option vaule='MANUAL_OTHER' >手工-其他</option>
          <option vaule='MANUAL_TEST' >手工-测试</option>
        </select>
        <a class="btn btn-primary admin-button-margin" @click="query()" >查询</a>
      </div>
    </div>

    <div class="admin-table">
      <div class="table-total flex flex-1 justify-content-e float-r">
        共<span class="text-danger">{{recharge.totalCount}}</span>条
      </div>
      <table class="table">
        <thead>
        <tr>
          <th class="text-align-c">充值时间</th>
          <th>充值额（元）</th>
          <th>充值渠道</th>
          <th>充值类型</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='message in rechargeList'>
          <td class="message-time text-align-c">{{message.createTime | totalDate}}</td>
          <td>{{message.amount}}</td>
          <td>
            <span v-if="message.type==='UNIONPAY' || message.type==='ALIPAY'">自助充值</span>
            <span v-else>人工充值</span>
          </td>
          <td>
            <span v-if="message.source==='USER'">用户自充</span>
            <span v-if="message.source==='MANUAL_ACTIVITY'">手工-活动赠送</span>
            <span v-if="message.source==='MANUAL_BUSINESS'">手工-线下商务</span>
            <span v-if="message.source==='MANUAL_OTHER'">手工-其他</span>
            <span v-if="message.source==='MANUAL_TEST'">手工-测试</span>
          </td>
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
        source:'',
        type:''
      }
    },
    methods: {
      query(more){

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
