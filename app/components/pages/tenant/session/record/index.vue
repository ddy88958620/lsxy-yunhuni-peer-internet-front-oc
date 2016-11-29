<template>
  <div>
    <serach :servicetype="serach.type" :app.sync="serach.app" :time.sync="serach.time"></serach>
    <!--表格-->
    <div class="admin-table">
      <div class="table-total flex flex-1 justify-content-e float-r">
        总消费金额: <span class="brown">{{ sessionTotal ? sessionTotal.toFixed(3) : '0.000' }}</span>元&nbsp;&nbsp;存储容量:<span class="brown">{{sessionSize ? sessionSize | fileSize : '0.0M' }}</span> &nbsp;&nbsp;共<span class="text-danger">{{session.totalCount ? session.totalCount : 0 }}</span>条
      </div>
      <table class="table">
        <thead>
        <tr>
          <th class="text-align-c">呼叫时间</th>
          <th>主叫</th>
          <th>被叫</th>
          <th>时长(秒)</th>
          <th class="text-align-c">大小</th>
          <th class="text-align-r"><span class="padding-right-20">消费金额</span></th>
          <th class="text-align-c">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='message in sessionList'>
          <td class="message-time text-align-c">{{message.callStartDt | totalDate}}</td>
          <td >{{message.fromNum}}</td>
          <td >{{message.toNum}}</td>
          <td >{{message.costTimeLong}}</td>
          <td class="text-align-c">{{message.recordSize ? message.recordSize | fileSize : ''}}</td>
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
        sessionSize:0,
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
         //voice_call.语音呼叫,duo_call.双向回拨,conf_call.会议服务,ivr_call.IVR定制服务,captcha_call.语音验证码,voice_recording.录音服务
        let params = {type:'voice_recording',appId:this.serach.app,time:this.serach.time}
        if (!this.serach.app) return
        if(more){
          let pageNo = this.session.currentPageNo + 1
          params.pageNo = pageNo
        }
        let self = this
        $.get('/tenant/'+this.$route.params.uid+'/session', params).then((res) => {
          if(res.data.page.totalCount>=0){
            self.sessionTotal =res.data.total
            self.sessionSize = res.data.size
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
