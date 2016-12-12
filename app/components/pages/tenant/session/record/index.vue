<template>
  <div>
    <div class="headbox flex flex-1 align-items-c bg-section-margin whilebg">
      <serach :servicetype="serach.type" :app.sync="serach.app" :time.sync="serach.time"></serach>
      <span class='datetime-picker-label padding-right-20 padding-left-20'>产品类型 : </span>
      <select class="form-control flex select-box padding-right-20" v-model="serach.producttype">
        <option value="">全部</option>
        <option value="{{val}}" v-for="val in proData.types">{{ val }}</option>
      </select>
    </div>

    <!-- 表格 -->
    <div class="admin-table">
      <div class="table-total flex flex-1 justify-content-e float-r">
        总消费金额: <span class="brown">{{ proData.sessionTotal ? proData.sessionTotal.toFixed(3) : '0.000' }}</span>元&nbsp;&nbsp;
        存储容量:<span class="brown">{{proData.sessionSize  }}</span> &nbsp;&nbsp;共<span class="text-danger">{{session.totalCount ? proData.session.totalCount : 0 }}</span>条
      </div>
      <table class="table">
        <thead>
        <tr>
          <th class="text-align-c">呼叫时间</th>
          <th>产品类型</th>
          <th>时长(秒)</th>
          <th class="text-align-c">大小</th>
          <th class="text-align-r"><span class="padding-right-20">消费金额</span></th>
          <th class="text-align-c">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='message in sessionList'>
          <td class="message-time text-align-c">{{message.time | totalDate}}</td>
          <td>{{message.type}}</td>
          <td>{{message.costTimeLong}}</td>
          <td class="text-align-c">{{message.size }}</td>
          <td class="text-align-r"><span class="padding-right-20">￥{{ message.cost ? message.cost.toFixed(3) : '0.000' }}</span>
          <td class="text-align-c"><a id="download{{ $index }}" @click=" this.$children[1].download($index,message.id)" data-status="1">录音下载</a></td>
          </td>
        </tr>

        </tbody>
      </table>
      <div class="more">
        <a v-show='proData.session.currentPageNo==proData.session.totalPageCount || proData.session.totalPageCount==0'>加载完毕</a>
        <a @click="query('more')" class="text-none"
           v-show='proData.session.totalPageCount!=proData.session.currentPageNo && proData.session.totalPageCount!=0'>加载更多<i
          class="icon iconfont icon-oc-dropdown"></i></a>
      </div>
      <download></download>
    </div>
  </div>
</template>
<script>
  export default {
    components: {
      'serach': require('../serach.vue'),
      'download': require('../download.vue')
    },
    data () {
      return {
        serach: {
          time: '',
          app: '',
          type: '',
          producttype:''
        },
        proData: {
          types: [],
          session: {},
          sessionTotal: 0,
          sessionSize: 0,
          sessionList: []
        },
        session: {},
        sessionTotal: 0,
        sessionSize: 0,
        sessionList: []
      }
    },
    watch: {
      'serach.app': function () {
        this.query()
      },
      'serach.time': function () {
        this.query()
      },
      'serach.producttype': function () {
        this.query()
      }
    },
    methods: {
      query (more) {
        let params = { type: this.serach.producttype, appId: this.serach.app, time: this.serach.time }
        if (!this.serach.app) return
        if (more) {
          let pageNo = this.session.currentPageNo + 1
          params.pageNo = pageNo
        }
        let self = this

        $.get('/tenant/' + this.$route.params.uid + '/session/voice_recording', params).then((res) => {

          if (res.data.page.totalCount >= 0) {
            self.serach.producttype = ''
            self.proData.types = res.data.types
            self.proData.sessionTotal = res.data.total.cost
            self.proData.sessionSize = res.data.total.size
            self.proData.session = res.data.page
            if (more) {
              self.proData.sessionList = self.sessionList.concat(res.data.page.result)
            } else {
              self.proData.sessionList = res.data.page.result
            }
          }
        })
      }
    },
    ready(){
      var num = 100
      console.log(num.toFixed(3))


    }
  }

</script>
