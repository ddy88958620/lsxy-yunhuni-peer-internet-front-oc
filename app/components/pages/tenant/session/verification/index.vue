<template>
  <div>
    <!--搜索-->
    <div class="headbox flex flex-1 align-items-c bg-section-margin whilebg">
      <span class='datetime-picker-label padding-right-20'>选择应用: </span>
      <select class="form-control flex select-box padding-right-20" v-model='serach.selectApp' >
        <option v-for="app in serach.apps"  value="{{app.id}}">{{app.name}} </option>
      </select>
      <span class='datetime-picker-label padding-right-20 padding-left-20'>时间:</span>
      <datetime-picker :uuid="'sessionDate'"  :type.sync="serach.time.type" :value.sync="serach.time.value"></datetime-picker>
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
  import DATE from '../../../../../utils/date'
  export default {
    components: {
      'datetime-picker': require('ui/datetimepicker.vue'),
    },
    data(){
      return {
        serach :{
          time:{
            type:'day',
            value:DATE.todayString('day'),
          },
          apps:[],
          selectApp:'',
        },
        session:{},
        sessionTotal : 0,
        sessionList: [],
        messages:[],
        total: 100
      }
    },
    watch:{
      'serach.selectApp': function(){ this.query()},
      'serach.time.value': function(){ this.query()}
    },
    methods: {
      getApp(){
        let param = { serviceType : 'voice'}
        $.get('/app/list/'+this.$route.params.uid ,param).then((res) => {
          if(res.data.length>0){
            this.serach.apps = res.data
            this.serach.selectApp =res.data[0].id
            this.query()
          }
        })
      },
      query(more){
        //voice_call.语音呼叫,duo_call.双向回拨,conf_call.会议服务,ivr_call.IVR定制服务,captcha_call.语音验证码,voice_recording.录音服务
        let params = {type:'captcha_call',appId:this.serach.selectApp,time:this.serach.time.value}
        if(more){
          let pageNo = this.session.currentPageNo + 1
          params.pageNo = pageNo
        }
        let self = this
        $.get('/tenant/'+this.$route.params.uid+'/session', params).then((res) => {
          console.log(res)
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
    },
    route: {
      data(){
        this.getApp()
      }
    }
  }

</script>
