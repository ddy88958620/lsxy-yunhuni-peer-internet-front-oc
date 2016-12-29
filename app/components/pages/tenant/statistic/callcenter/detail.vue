<template>
  <div>
    <div class="headbox flex flex-1 align-items-c  ">
      <span class='datetime-picker-label padding-right-20 '>开始时间:</span>
      <datetime-picker :uuid="'startDate'" :type.sync="'day'" :value.sync="serach.startTime"></datetime-picker>

      <span class='datetime-picker-label padding-right-20 padding-left-20'>结束时间:</span>
      <datetime-picker :uuid="'endDate'" :type.sync="'day'" :value.sync="serach.endTime"></datetime-picker>

      <span class='datetime-picker-label padding-right-20 padding-left-20'>坐席: </span>
      <input type="text" class="form-control flex select-box padding-right-20" v-model="serach.agent"/>

      <span class='datetime-picker-label padding-right-20 padding-left-20'>呼叫号码: </span>
      <input type="text" class="form-control flex select-box padding-right-20" v-model="serach.callnum"/>

      <span class='datetime-picker-label padding-right-20 padding-left-20'>呼叫类型: </span>
      <select class="form-control flex select-box padding-right-20" v-model='serach.type'>
        <option value="">全部</option>
        <option value="1">呼入</option>
        <option value="2">呼出</option>
      </select>
      <button class="btn btn-primary admin-button-margin vertical-align-top" @click="query('')" >查询</button>


    </div>

    <div class="admin-table">
      <div class="table-total flex flex-1 justify-content-e float-r">
        呼叫个数: <span class="brown">{{ sum.num ? sum.num : 0 }}</span> 个&nbsp; 总消费金额: <span class="brown">{{ sum.cost ? sum.cost.toFixed(3) : '0.000' }}</span>元 &nbsp;共<span class="text-danger">{{session.totalCount ? session.totalCount : 0 }}</span>条
      </div>
      <table class="table">
        <thead>
        <tr>
          <th class="text-align-c">呼叫时间</th>
          <th>呼叫类型</th>
          <th>主叫</th>
          <th>被叫</th>
          <th>坐席</th>
          <th>转接结果</th>
          <th>通话结束原因</th>
          <th class="text-align-c">转人工时间</th>
          <th class="text-align-c">接听时间</th>
          <th class="text-align-c">通过结束时间</th>
          <th>消费金额</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='message in sessionList'>
          <td class="message-time text-align-c">{{message.startTime | totalDate}}</td>
          <td><span v-if="message.type ===1">呼入</span><span v-if="message.type ===2">呼出</span></td>
          <td>{{ message.fromNum}}</td>
          <td>{{ message.toNum}}</td>
          <td>{{ message.agent}}</td>
          <td>
            <span v-if="message.toManualResult ===1">接听</span>
            <span v-if="message.toManualResult ===2">呼叫坐席失败</span>
            <span v-if="message.toManualResult ===3">主动放弃</span>
            <span v-if="message.toManualResult ===4">超时</span>
          </td>
          <td>{{ message.overReason}}</td>
          <td class="message-time text-align-c">
            <span v-if="message.toManualTime">{{ message.toManualTime |totalDate }}</span>
          </td>
          <td class="message-time text-align-c">
            <span v-if="message.answerTime">{{ message.answerTime |totalDate }}</span>
          </td>
          <td class="message-time text-align-c">
            <span v-if="message.endTime">{{ message.endTime |totalDate }}</span>
          </td>
          <td class="text-align-r"><span class="padding-right-20">￥{{ message.cost ? message.cost.toFixed(3) : '0.000' }}</span></td>
        </tr>
        </tbody>
      </table>
      <div class="more">
        <a v-show='session.currentPageNo>=session.totalCount'>加载完毕</a>
        <a @click="query('more')" class="text-none"
           v-show='session.totalPageCount!=session.currentPageNo && session.totalPageCount!=0'>加载更多<i
          class="icon iconfont icon-oc-dropdown"></i></a>
      </div>
    </div>
  </div>
</template>
<script>
  import DATE from '../../../../../utils/date'
  export default {
    components: {
      'datetime-picker': require('ui/datetimepicker.vue'),
    },
    data(){
      return {
        serach: {
          startTime: DATE.todayString('day'),
          endTime: DATE.todayString('day'),
          agent: '',
          callnum: '',
          pageSize: 20,
          type: ""
        },
        session: {},
        sessionList: [],
        sum: {
          num:0,
          cost:0
        }
      }
    },
    methods: {
      query(more){
        let params = this.serach
        if (this.$route.params.appid != 'all') {
          params.appId = this.$route.params.appid
        }
        if (more) {
          let pageNo = this.session.currentPageNo + 1
          params.pageNo = pageNo
        }
        $.get('/tenant/tenants/' + this.$route.params.uid + '/call_center/detail', params).then((res) => {
          if (res.data.page.totalPageCount >= 0) {
            this.sessionTotal = res.data.page.totalCount
            this.session = res.data.page
            this.sum = res.data.sum
            if (more)
              this.sessionList = this.sessionList.concat(res.data.page.result)
            else
              this.sessionList = res.data.page.result

            console.log(res.data.page.result);

          }
        })
      }
    },
    route: {
      data(){
        this.query()
      }
    }
  }

</script>
