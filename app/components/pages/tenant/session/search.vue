<template>
    <span class='datetime-picker-label padding-right-20'>选择应用 : </span>
    <select class="form-control flex select-box padding-right-20" v-model='search.appId' >
      <option value="all" selected="selected">全部应用</option>
      <option v-for="app in appList"  value="{{app.id}}">{{app.name}} </option>
    </select>
    <span class='datetime-picker-label padding-right-20 padding-left-20'>时间 : </span>
    <datetime-picker :uuid="'sessionDate'"  :type="'day'" :value.sync="search.time"></datetime-picker>
    &nbsp;至&nbsp;
    <datetime-picker :uuid="'sessionDate2'"  :type="'day'" :value.sync="search.time2"></datetime-picker>
</template>
<script>
  import DATE from 'utils/date'
  export default {
    components: {
      'datetime-picker': require('ui/datetimepicker.vue')
    },
    data() {
      return {
        search: {
          appId: '',
          time: '',
          time2: '',
        },
        appList: [],
        list: [],
        origin: {}
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
    props: {
      servicetype: {
        type: String
      },
      result: {
        type: Object
      },
      type: {
        type: String
      }
    },
    methods: {
      getApp () {
        let param = { serviceType : this.servicetype }
        $.get('/app/list/' + this.$route.params.uid, param).then((res) => {
          if (res.data.length > 0) {
            this.appList = res.data
          }
        })
      },
      query(more){
        //notify_call.语音通知,duo_call.语音回拨,conf_call.会议服务,ivr_call.IVR服务,captcha_call.语音验证码,voice_recording.录音服务
        let params = Object.assign(this.search, {type: this.type})
        if (more) {
          let pageNo = this.origin.page.currentPageNo + 1
          params.pageNo = pageNo
        }
        $.get('/tenant/' + this.$route.params.uid + '/session', params).then((res) => {
          if (res.data.page.totalCount >= 0) {
            // this.$refs.search.origin.page = res.data.total
            // this.session = res.data.page
            this.origin = res.data
            if (more)
              this.list = this.list.concat(res.data.page.result)
            else
              this.list = res.data.page.result
            }
        })
      }
    },
    ready () {
      this.search.time2 = this.search.time =  DATE.todayString('day')
      this.getApp()
    }
  }
</script>
