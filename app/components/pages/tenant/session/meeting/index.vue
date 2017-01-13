<template>
  <div>
    <div class="headbox flex flex-1 align-items-c bg-section-margin whilebg">
      <serach :servicetype="serach.type" :app.sync="serach.app" :time.sync="serach.time"></serach>
    </div>
    <!--表格-->
    <div class="admin-table">
      <div class="table-total flex flex-1 justify-content-e float-r">
        消费金额: <span class="brown">{{ sessionTotal ? sessionTotal.toFixed(3) : '0.000' }}</span>元 共<span class="text-danger">{{session.totalCount ? session.totalCount : 0 }}</span>条
      </div>
      <table class="table">
        <thead>
        <tr>
          <th class="text-align-c">会议标识ID</th>
          <th>呼叫时间</th>
          <th>参与者</th>
          <th>参与类型</th>
          <th>时长(秒)</th>
          <th class="text-align-r"><span class="padding-right-20">消费金额</span></th>
          <th class="text-align-c">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='message in sessionList'>
          <td class="text-align-c">{{message.sessionId}}</td>
          <td class="message-time ">{{message.callStartDt | totalDate}}</td>
          <td>
            <span v-if="message.joinType==0">{{message.fromNum}}</span>
            <span v-if="message.joinType==1">{{message.toNum}}</span>
            <span v-if="message.joinType==2">{{message.fromNum}} </span>
          </td>
          <td>
            <span v-if="message.joinType==0">创建</span>
            <span v-if="message.joinType==1">邀请加入</span>
            <span v-if="message.joinType==2">呼入加入</span>
          </td>
          <td>{{ message.costTimeLong }}</td>
          <td class="text-align-r"><span class="padding-right-20">￥{{ message.cost ? message.cost.toFixed(3) : '0.000' }}</span></td>
          <td class="text-align-c">
            <a @click="download(message.id)" data-status="1"  v-if="message.cost>0">录音下载</a>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="more">
        <a v-show='session.totalPageCount==session.currentPageNo || session.totalPageCount==0'>加载完毕</a>
        <a @click="query('more')" class="text-none" v-show='session.totalPageCount!=session.currentPageNo && session.totalPageCount!=0' >加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
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
    data(){
      return {
        serach: {
          time: '',
          app: '',
          type: 'voice'
        },
        session:{},
        sessionTotal : 0,
        sessionList: []
      }
    },
    watch:{
      'serach.app': function () {
        this.query()
      },
      'serach.time': function () {
        this.query()
      }
    },
    methods: {
      query(more){
        // let params = {type:'conf_call',appId:this.serach.selectApp,time:this.serach.time.value}
        let params = {type: 'sys_conf',appId:this.serach.app,time:this.serach.time}
        if (!this.serach.app) return
        if(more){
          let pageNo = this.session.currentPageNo + 1
          params.pageNo = pageNo
        }
        let self = this
        $.get('/tenant/'+this.$route.params.uid+'/session', params).then((res) => {
           if(res.data.page.totalCount>=0){
            self.sessionTotal =res.data.total
            self.session = res.data.page
            if(more)
              self.sessionList = self.sessionList.concat(res.data.page.result)
            else
              self.sessionList = res.data.page.result
           }
        })
      },
      download(id) {
        let uid = this.$route.params.uid
        $.get('tenant/' + uid + '/cdr/download/'+id).then((res) => {
          if (res.success && res.data) {
            window.location.href = res.data
          } else if ( res.errorCode === '0401') {
  					this.showMsg( { content: res.errorMsg, type: 'danger' })
          } else {
            console.log(res.errorMsg);
            this.downloadPolling(res.errorMsg)
          }
        })
      },
      downloadPolling(id) {
        this.temp = setInterval(()=> {
          $.get('tenant/polling/'+id).then((res) =>{
            if(res.success && res.data) {
              clearInterval(this.temp)
              window.location.href = res.data
            } else if (errorCode === '0001') {
              clearInterval(this.temp)
    					this.showMsg( { content: res.errorMsg, type: 'danger' })
            }
          })
        }, 1500)
      }
    }
  }

</script>
