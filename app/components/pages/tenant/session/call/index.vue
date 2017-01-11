<template>
  <div>

    <div class="headbox flex flex-1 align-items-c bg-section-margin whilebg">
      <serach :servicetype="serach.type" :app.sync="serach.app" :time.sync="serach.time"></serach>
    </div>

    <div class="admin-table">
      <div class="table-total flex flex-1 justify-content-e float-r">
        消费金额: <span class="brown">{{ sessionTotal ? sessionTotal.toFixed(3) : '0.000' }}</span>元 共<span
        class="text-danger">{{session.totalCount ? session.totalCount : 0 }}</span>条
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
        <tr v-for='message in sessionList'>
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
        <a v-if='session.currentPageNo >= session.totalPageCount'>加载完毕</a>
        <a @click="query('more')" class="text-none" v-else>加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
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
        session: {},
        sessionTotal: 0,
        sessionList: [],
      }
    },
    watch: {
      'serach.app': function () {
        this.query()
      },
      'serach.time': function () {
        this.query()
      }
    },
    methods: {
      query(more){
        //notify_call.语音通知,duo_call.语音回拨,conf_call.会议服务,ivr_call.IVR服务,captcha_call.语音验证码,voice_recording.录音服务
        let params = {type: 'notify_call', appId: this.serach.app, time: this.serach.time}
        if (!this.serach.app) return
        if (more) {
          let pageNo = this.session.currentPageNo + 1
          params.pageNo = pageNo
        }
        $.get('/tenant/' + this.$route.params.uid + '/session', params).then((res) => {
          if (res.data.page.totalCount >= 0) {
            this.sessionTotal = res.data.total
            this.session = res.data.page
            if (more)
              this.sessionList = this.sessionList.concat(res.data.page.result)
            else
              this.sessionList = res.data.page.result
            }
        })
      }
    }
  }
</script>
