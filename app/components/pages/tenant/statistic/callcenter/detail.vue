<template>
  <div>
    <div class="headbox flex flex-1 align-items-c  ">
      <span class='datetime-picker-label padding-right-20 '>时间:</span>
      <datetime-picker :uuid="'sessionDate'"  :type.sync="startdate.type" :value.sync="startdate.value"></datetime-picker>

      <span class='datetime-picker-label padding-right-20 padding-left-20'>坐席: </span>
      <input type="text" class="form-control flex select-box padding-right-20" />

      <span class='datetime-picker-label padding-right-20 padding-left-20'>呼叫号码: </span>
      <input type="text" class="form-control flex select-box padding-right-20" />

      <span class='datetime-picker-label padding-right-20 padding-left-20'>呼叫类型: </span>
      <select class="form-control flex select-box padding-right-20" v-model='seletedApp' >
        <option value="">呼入</option>
        <option value="">呼出</option>
      </select>

    </div>

    <div class="admin-table">
      <div class="table-total flex flex-1 justify-content-e float-r">
        共<span class="text-danger">{{session.totalCount ? session.totalCount : 0 }}</span>条
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
        </tr>
        </thead>
        <tbody>
        <tr v-for='message in sessionList'>

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
    components:{
      'datetime-picker' :require('ui/datetimepicker.vue'),
    },
    data(){
      return {
        startdate:{
          type:'',
          value:''
        },
        session:{},
        sessionTotal : 0,
        sessionList: [],
        messages:[],
        total: 100
      }
    },
    methods: {
      query(more){

        return true
        //notify_call.语音呼叫,duo_call.双向回拨,conf_call.会议服务,ivr_call.IVR定制服务,captcha_call.语音验证码,voice_recording.录音服务
        let uid = this.$route.params.uid
        let type = 'notify_call'
        let appId = this.$route.params.aid
        let time = this.$route.params.day
        let params = {type:type,appId:appId,time:time}
        if(more){
          let pageNo = this.session.currentPageNo + 1
          params.pageNo = pageNo
        }
        let self = this
        $.get('/tenant/'+uid+'/session', params).then((res) => {
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
        this.query()
      }
    }

  }

</script>
