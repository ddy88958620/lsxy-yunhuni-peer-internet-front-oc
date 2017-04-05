<template>
  <div>
    <div class="headbox flex flex-1 align-items-c bg-section-margin whilebg">
      <div class="">
        <span class='datetime-picker-label padding-right-20 padding-left-20'>产品类型 : </span>
        <select class="form-control flex select-box padding-right-20" v-model="search.type">
          <option value="">全部</option>
          <option value="{{val[0]}}" v-for="val in proData.types">{{ val[1] }}</option>
        </select>
        <span class='datetime-picker-label padding-right-20 padding-left-20'>时间 : </span>
        <datetime-picker :uuid="'sessionDate'"  :type="'day'" :value.sync="search.time"></datetime-picker>
        &nbsp;至&nbsp;
        <datetime-picker :uuid="'sessionDate2'"  :type="'day'" :value.sync="search.time2"></datetime-picker>
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
            <th class="text-align-c">呼叫时间</th>
            <th>产品类型</th>
            <th>时长(秒)</th>
            <th class="text-align-c">大小</th>
            <th class="text-align-r"><span class="padding-right-20">消费金额</span></th>
            <th class="text-align-c">操作</th>
          </tr>
        </thead>
        <tbody>
        <tr v-for='message in proData.sessionList'>
          <td class="message-time text-align-c">{{message.time | totalDate}}</td>
          <td>{{message.type}}</td>
          <td>{{message.costTimeLong}}</td>
          <td class="text-align-c">{{message.size }}</td>
          <td class="text-align-r"><span class="padding-right-20">￥{{ message.cost ? message.cost.toFixed(3) : '0.000' }}</span>
          <td class="text-align-c">
            <download :type="'file'" :message="message"></download>
          </td>
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
      'download': require('../download.vue'),
      'datetime-picker': require('ui/datetimepicker.vue')
    },
    data () {
      return {
        appList: [],
        search: {
          time: '',
          time2: '',
          appId: '',
          type:''
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
          this.search.pageNo = 1
          this.query()
        },
        deep: true
      },
    },
    methods: {
      query (more) {
        let params = this.search
        console.log(params)

        if (more) {
      
          let pageNo = this.proData.session.currentPageNo + 1
          params.pageNo = pageNo
        }


        let self = this
        $.get('/tenant/' + this.$route.params.uid + '/session/voice_recording', params).then((res) => {

          if (res.data.page.totalCount >= 0) {

            console.log(res.data.page)
            self.proData.types = res.data.types
            self.proData.sessionTotal = res.data.total.cost
            self.proData.sessionSize = res.data.total.size
            self.proData.session = res.data.page

            self.proData.sessionList = more ? self.proData.sessionList.concat(res.data.page.result) : res.data.page.result  
            
          }
        })
      }
    },
    ready () {
      this.search.time2 = this.search.time =  DATE.todayString('day')
    }
  }

</script>
