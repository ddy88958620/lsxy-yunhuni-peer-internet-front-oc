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

        <div v-if="search.isMass==0" class="inline-block">
          <span class='datetime-picker-label padding-right-20 padding-left-20' >手机号码 : </span>
          <input type="text" class="form-control flex select-box" v-model="search.mobile" />
        </div>
      
      </div>
    </div>

    <!-- 表格 -->
    <div class="admin-table">
      <div class="table-total flex flex-1 justify-content-e float-r">
        共<span class="text-danger">{{proData.session.totalCount ? proData.session.totalCount : 0 }}</span>条
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
          <th class="text-align-c" v-if="search.isMass==1">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='message in proData.sessionList' v-if="proData.sessionList.length > 0">
          <td>{{message.msgKey}}</td>
          <td v-if="search.isMass==1">{{ message.taskName }}</td>
          <td v-if="search.isMass==1">
            <span v-if="message.state==0">待处理</span>
            <span v-if="message.state==1" class="darkgreen">任务完成</span>
            <span v-if="message.state==-1" class="text-danger">任务失败</span>
          </td>
          <td class="message-time text-align-c">{{message.sendTime | totalDate}}</td>
          <td class="message-time text-align-c" v-if="message.isMass==1">{{message.lastTime | totalDate}}</td>



          <td v-if="search.isMass==0">{{message.mobile}}</td>
          <td v-if="search.isMass==0" class="text-over">{{message.msg}}</td>
          <td>
            <span v-if="search.isMass==0">
              <span v-if="message.state==1" class="darkgreen">发送成功</span>
              <span v-if="message.state==0">待处理</span>
              <span v-if="message.state==-1" class="text-danger">发送失败</span>
            </span>

            <span v-else>
              总数：{{ message.sumNum + message.invalidNum }}
              &nbsp;成功数：{{ message.succNum ? message.succNum : 0 }}
              &nbsp;失败数：{{ message.failNum ? message.failNum : 0 }}
              &nbsp;待发数：{{ message.pendingNum ? message.pendingNum : 0 }}
              &nbsp;无效号码数：{{ message.invalidNum ? message.invalidNum : 0 }}
            </span>
          </td>
          <td class="text-align-r">
            <span class="padding-right-20">￥{{ message.msgCost ? ((message.sumNum + message.invalidNum) * message.msgCost).toFixed(3)  : '0.000' }}</span>
          </td>
          <td class="text-align-c" v-if="search.isMass==1">
            <download :message="message"></download>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="more">
        <a v-show='proData.session.currentPageNo >= proData.session.totalPageCount'>加载完毕</a>
        <a @click="query('more')" class="text-none" v-else>加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
      </div>
    </div>
  </div>
</template>
<script>
  import DATE from 'utils/date'
  export default {
    components: {
      'download': require('../download-msg.vue'),
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
          appId: ''
        },
        proData: {
          session: {},
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
      '$route' : function () {
        this.query()
      }
    },
    methods: {
      getApp () {
        $.get('/app/list/' + this.$route.params.uid,  { serviceType : 'msg' }).then((res) => {
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
        $.get('/tenant/' + this.$route.params.uid + '/session/msg/'+ this.$route.params.type, params).then((res) => {
          if (res.data.totalCount >= 0) {
            self.proData.session = res.data
            self.proData.sessionList = more ? self.sessionList.concat(res.data.result) : res.data.result
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
