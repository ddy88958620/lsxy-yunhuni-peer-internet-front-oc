<template>

  <modal :show.sync="show"  title="群发详情" :reset="reset">
    <div slot="body">
      <div class="form-group">
        <label class="control-label">任务名称 : </label>
        <span>{{ message.taskName }}</span>
      </div>
      <div class="form-group">
        <label class="control-label">任务状态 : </label>
         <span v-if="message.state==1" class="darkgreen">发送成功</span>
         <span v-if="message.state==0">待处理</span>
         <span v-if="message.state==-1" class="text-danger">发送失败</span>
      </div>
      <div class="form-group">
        <label class="control-label">发送结果 : </label>
        <span class="inline-block">
          总数：{{ message.sumNum + message.invalidNum }}
              &nbsp;成功数：{{ message.succNum ? message.succNum : 0 }}
              &nbsp;失败数：{{ message.failNum ? message.failNum : 0 }}
              &nbsp;待发数：{{ message.pendingNum ? message.pendingNum : 0 }}
              &nbsp;无效号码数：{{ message.invalidNum ? message.invalidNum : 0 }}
        </span>
      </div>


      <div class="flex flex-direction-column admin-table-header">
        <div class="flex align-items-c">
          <select v-model="page.state" class="form-control">
            <option value="">全部</option>
            <option value="1">发送成功</option>
            <option value="-1">发送失败</option>
            <option value="0">未完成</option>
          </select>
          <div class="select-box inline-block">
            <search  placeholder='手机号码' :value.sync='page.mobile' :action="queryParams"></search>
          </div>
         
          &nbsp;&nbsp;<button class="btn btn-primary" @click="queryParams()">查询</button>
        </div>
      </div>

      <div class="admin-table flex-1 flex flex-direction-column">
        <div class="table-total flex flex-1 justify-content-e text-right">
          共<span class="text-danger">{{origin.res.totalCount ? origin.res.totalCount : 0}}</span>条
        </div>
        <div class="modal-table flex">
          <table class="table">
            <thead>
            <tr>
              <th>编号</th>
              <th>手机号码</th>
              <th>发送结果 </th>
              <th>原因</th>
            </tr>
            </thead>
            <tbody >
            <tr v-for='list in origin.list'>
              <td>{{ $index +1 }}</td>
              <td>{{ list.mobile }}</td>
              <td>
                <span class="text-danger" v-if="list.state==-1">发送失败</span>
                <span v-if="list.state==0">未发送</span>
                <span class="darkgreen" v-if="list.state==1">发送成功</span>
              </td>
              <td>{{ list.reason }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="more">
          <a v-if='origin.res.currentPageNo >= origin.res.totalPageCount'>加载完毕</a>
          <a @click="query('more')" class="text-none" v-else>加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
        </div>
      </div>
  </modal>
</template>
<script>
  export default {
    props:{
      show:{
        type: Boolean
      },
      msgKey: {
        type: String
      },
      message:{
        type: Object
      }
    },
    data() {
      return {
        page:{
          state:1,
          mobile:''
        },
        origin:{
          res:{},
          list:{}
        }
      }
    },
    components: {
      'modal': require('ui/modal.vue'),
      'search': require('ui/search-input.vue')
    },
    watch:{
      msgKey:'query'
    },
    methods: {
      query(type){
        let params = this.page
        if(type === 'more') {
          params.pageNo = this.origin.res.currentPageNo + 1
        }
        $.get('tenant/'+ this.$route.params.uid + '/session/msg/detail/' + this.msgKey,params).then((res) => {
          if(res.success){
            this.origin.res = res.data
            this.origin.list = type === 'more' ? this.origin.list.concat(res.data.result) : res.data.result
          }
        })
      },
      queryParams(){
        this.page.pageNo = 1
        this.query()
      },
      reset(){
        this.show = false
      }
    },
  }
</script>

<style lang="sass" scoped>
  .control-label{
    width: 80px;
    text-align: left;
    padding-right: 10px;
  }
  .form-group{
    margin-bottom: 10px;
  }
  .modal-table{
    overflow-y: auto;
    max-height: 400px;
  }
</style>
