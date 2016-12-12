<template>
  <div>
    <div class="headbox flex flex-1 align-items-c bg-section-margin whilebg">
      <serach :servicetype="serach.type" :app.sync="serach.app" :time.sync="serach.time"></serach>
    </div>
    <!--表格-->
    <div class="admin-table">
      <div class="table-total flex flex-1 justify-content-e float-r">
        <!-- 消费金额: <span class="brown">{{sessionTotal}}</span>元 --> 共<span class="text-danger">{{session.totalCount ? session.totalCount : 0 }}</span>条
      </div>
      <table class="table">
        <thead>
        <tr>
          <th class="text-align-c">发送时间</th>
          <th>主叫</th>
          <th>被叫</th>
          <th>挂机时间</th>
          <th class="text-align-c">时长(秒)</th>
          <th class="text-align-r"><span class="padding-right-20">消费金额</span></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='message in sessionList'>
          <td class="message-time text-align-c">{{message.callStartDt | totalDate}}</td>
          <td>{{ message.fromNum }}</td>
          <td>{{ message.toNum }}</td>
          <td>{{ message.callEndDt | totalDate }}</td>
          <td class="test-align-c">{{message.costTimeLong}}</td>
          <td class="text-align-r"><span class="padding-right-20">￥{{ message.cost ? message.cost.toFixed(3) : '0.000' }}</span></td>
        </tr>
        </tbody>
      </table>
      <div class="more">
        <a v-show='session.totalPageCount==session.currentPageNo || session.totalPageCount==0'>加载完毕</a>
        <a @click="query('more')" class="text-none" v-show='session.totalPageCount!=session.currentPageNo && session.totalPageCount!=0' >加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {
      'serach': require('../serach.vue')
    },
    data(){
      return {
        serach: {
          time: '',
          app: '',
          type: 'voice'
        },
        session:{},
        sessionTotal : 0,
        sessionList: []
      }
    },
    watch:{
      'serach.app': function () {
        this.query()
      },
      'serach.time': function () {
        this.query()
      }
    },
    methods: {
      query(more){
        let params = {type:'captcha_call',appId:this.serach.app,time:this.serach.time}
        if (!this.serach.app) return
        if(more){
          let pageNo = this.session.currentPageNo + 1
          params.pageNo = pageNo
        }
        let self = this
        $.get('/tenant/'+this.$route.params.uid+'/session', params).then((res) => {
          if(res.data.page.totalCount>=0){
            self.sessionTotal =res.data.total
            self.session = res.data.page
            if(more)
              self.sessionList = self.sessionList.concat(res.data.page.result)
            else
              self.sessionList = res.data.page.result
          }
        })
      }
    }
  }

</script>
