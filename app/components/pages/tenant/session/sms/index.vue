<template>
  <div>
    <div class="headbox flex flex-1 align-items-c bg-section-margin whilebg">
      <div class="">
        <span class='datetime-picker-label padding-right-20'>选择应用 : </span>
        <select class="form-control flex select-box padding-right-20" v-model='search.appId' >
          <option value="" selected="selected">全部应用</option>
          <option v-for="app in appList"  value="{{app.id}}">{{app.name}} </option>
        </select>
        <span class='datetime-picker-label padding-right-20 padding-left-20'>类型 : </span>
        <select class="form-control flex select-small-box padding-right-20" v-model='search.isMass' >
          <option value="0">单发</option>
          <option value="1">群发</option>
        </select>

        <span class='datetime-picker-label padding-right-20 padding-left-20'>时间 : </span>
        <datetime-picker :uuid="'sessionDate'"  :type="'day'" :value.sync="search.time"></datetime-picker>
        &nbsp;至&nbsp;
        <datetime-picker :uuid="'sessionDate2'"  :type="'day'" :value.sync="search.time2"></datetime-picker>

        <span class='datetime-picker-label padding-right-20 padding-left-20'>手机号码 : </span>
        <input type="text" class="form-control flex select-box" v-model="search.mobile" />


      </div>
    </div>

    <!-- 表格 -->
    <div class="admin-table">
      <div class="table-total flex flex-1 justify-content-e float-r">
        总消费金额: <span class="brown">{{ proData.sessionTotal ? proData.sessionTotal.toFixed(3) : '0.000' }}</span>元&nbsp;&nbsp;
        存储容量:<span class="brown">{{proData.sessionSize  }}</span> &nbsp;&nbsp;共<span class="text-danger">{{proData.session.totalCount ? proData.session.totalCount : 0 }}</span>条
      </div>
      <table class="table">
        <thead>
        <tr>
          <th>编号</th>
          <th v-if="search.isMass==1">任务名称</th>
          <th v-if="search.isMass==1">任务状态</th>
          <th class="text-align-c">创建时间</th>
          <th class="text-align-c"  v-if="search.isMass==1">结束时间</th>
          <th v-if="search.isMass==0">手机号码</th>
          <th v-if="search.isMass==0">发送内容</th>
          <th>发送结果</th>
          <th class="text-align-r"><span class="padding-right-20">消费金额</span></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='message in proData.sessionList'>
          <td>{{message.msgKey}}</td>
          <td>{{message.taskName}}</td>
          <td v-if="search.isMass==1">
            <span v-if="massage.state==0">待处理</span>
            <span v-if="massage.state==0">任务完成</span>
          </td>
          <td class="message-time text-align-c">{{message.sendTime | totalDate}}</td>
          <td class="message-time text-align-c" v-if="massage.state==1">{{message.lastTime | totalDate}}</td>
          <td v-if="search.isMass==1">
            <span v-if="massage.state==0">待处理</span>
            <span v-if="massage.state==0">任务完成</span>
          </td>
          <td v-if="search.isMass==0">{{message.mobile}}</td>
          <td v-if="search.isMass==0">{{message.content}}</td>
          <td>
            <span v-if="search.isMass==0">
              <span v-if="massage.state==1">发送成功</span>
              <span v-if="massage.state==0">待处理</span>
              <span v-if="massage.state==-1">发送失败</span>
            </span>
            <span v-else>
              总数：{{ massage.sumNum + massage.invalidNum }}
               &nbsp;成功数：{{ massage.succNum ? massage.succNum : 0 }}
               &nbsp;失败数：{{ massage.failNum ? massage.failNum : 0 }}
               &nbsp;待发数：{{ massage.pendingNum ? massage.pendingNum : 0 }}
               &nbsp;无效号码数：{{ massage.invalidNum ? massage.invalidNum : 0 }}
            </span>
          </td>
          <td class="text-align-r"><span class="padding-right-20">￥{{ message.cost ? message.cost.toFixed(3) : '0.000' }}</span>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="more">
        <a v-show='proData.session.currentPageNo > proData.session.totalPageCount'>加载完毕</a>
        <a @click="query('more')" class="text-none" v-else>加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
      </div>
    </div>
  </div>
</template>
<script>
  import DATE from 'utils/date'
  export default {
    components: {
      'download': require('../download.vue'),
      'datetime-picker': require('ui/datetimepicker.vue')
    },
    data () {
      return {
        appList: [],
        search: {
          time: '',
          time2: '',
          isMass:0,
          taskName:'',
          mobile:'',
          appId: '',
          producttype:''
        },
        proData: {
          types: [],
          session: {},
          sessionTotal: 0,
          sessionSize: 0,
          sessionList: []
        },
      }
    },
    watch: {
      search: {
        handler: function () {
          this.query()
        },
        deep: true
      },
    },
    methods: {
      getApp () {
        let param = { serviceType : 'msg' }
        $.get('/app/list/' + this.$route.params.uid, param).then((res) => {
          if (res.data.length > 0) {
            this.appList = res.data
          }
        })
      },
      query (more) {
        let params = this.search
        if (more) {
          let pageNo = this.session.currentPageNo + 1
          params.pageNo = pageNo
        }
        let self = this
        $.get('/tenant/' + this.$route.params.uid + '/session/msg/msg_sms', params).then((res) => {
          if (res.data.page.totalCount >= 0) {
            self.proData.sessionTotal = res.data.total.cost
            self.proData.sessionSize =0
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
    ready () {
      this.getApp()
      this.search.time2 = this.search.time =  DATE.todayString('day')
    }
  }

</script>
