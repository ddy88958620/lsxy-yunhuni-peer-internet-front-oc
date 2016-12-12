<template>
    <span class='datetime-picker-label padding-right-20'>选择应用 : </span>
    <select class="form-control flex select-box padding-right-20" v-model='app' >
      <option v-for="app in appList"  value="{{app.id}}">{{app.name}} </option>
    </select>
    <span class='datetime-picker-label padding-right-20 padding-left-20'>时间 : </span>
    <datetime-picker :uuid="'sessionDate'"  :type="'day'" :value.sync="time"></datetime-picker>
</template>
<script>
  import DATE from 'utils/date'
  export default {
    components: {
      'datetime-picker': require('ui/datetimepicker.vue')
    },
    props: {
      servicetype: {
        type: String
      },
      app: {
        type: String,
        twoWays: true,
        default: ''
      },
      time: {
        type: String,
        twoWays: true,
        default: ''
      },
    },
    data () {
      return {
        appList: []
      }
    },
    methods: {
      getApp () {
        let param = { serviceType : this.servicetype }
        $.get('/app/list/' + this.$route.params.uid, param).then((res) => {
          if (res.data.length > 0) {
            this.appList = res.data
            this.app = res.data[0].id
          }
        })
      }
    },
    ready () {
      this.time =  DATE.todayString('day')
      this.getApp()
    }
  }
</script>
