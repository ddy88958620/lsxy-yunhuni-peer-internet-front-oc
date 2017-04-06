<template>
  <modal :show.sync="show"  title="子账号详情" :reset="reset">
    <div slot="body">
      <div class="form-group">
        <label class="control-label">子账号ID: </label>
        <span>{{ origin.subs.id }}</span>
      </div>
      <div class="form-group">
        <label class="control-label">鉴权账号 : </label>
        <span>{{ origin.subs.certId }}</span>
      </div>
      <div class="form-group">
        <label class="control-label">密钥 : </label>
        <span>{{ origin.subs.secretKey }}</span>
      </div>
      <div class="form-group">
        <label class="control-label vertical-align-top">回调地址 : </label>
        <span class="inline-block over-width">{{ origin.subs.url }}</span>
      </div>
      <p class="small-font-color">负数为额度不作限制，0则表示额度为0，正数为具体的使用额度限制</p>
      <div class="form-group" v-if="serviceType=='voice' || serviceType=='call_center'">
        <label class="control-label">语音（分钟）: </label>
        <input type="text" class="form-control input-width" placeholder="" value="{{origin.subs.voiceNum}}" readonly />
      </div>
      <div class="form-group" v-if="serviceType=='call_center'">
        <label class="control-label">坐席（个）: </label>
        <input type="text" class="form-control input-width" placeholder=""  value="{{origin.subs.seatNum}}" readonly="readonly"/>
      </div>
      <div class="form-group" v-if="serviceType=='msg'">
        <label class="control-label ">闪印（条）: </label>
        <input type="text" class="form-control input-width" placeholder="" v-model="origin.subs.ussdNum" value="{{origin.subs.ussdNum}}" readonly />
      </div>
      <div class="form-group" v-if="serviceType=='msg'">
        <label class="control-label">短信（条）: </label>
        <input type="text" class="form-control input-width" placeholder="" v-model="origin.subs.smsNum" value="origin.subs.smsNum" readonly />
      </div>

      <div class="form-group">
          <label class="control-label vertical-align-top">
            备注 : 
          </label>  
          <span class="inline-block over-width">
            {{ origin.subs.remark }}
          </span>  
      </div>

      <div class="admin-table flex-1 flex flex-direction-column" v-if="serviceType=='call_center' || serviceType=='voice'">
        <div class="table-total flex flex-1 justify-content-e text-right">
          共<span class="text-danger">{{origin.phone_res.totalCount ? origin.phone_res.totalCount : 0}}</span>条
        </div>

        <div class="modal-table flex">
          <table class="table">
            <thead>
            <tr>
              <th class='text-center'>号码</th>
              <th>状态</th>
              <th>可呼入 </th>
              <th>可呼出</th>
              <th>归属地</th>
              <th>有效期</th>
            </tr>
            </thead>
            <tbody >
            <tr v-for='phone in origin.phone_list'>
              <td>{{ phone.num }}</td>
              <td>
                <span class="text-danger" v-if="phone.status==0">过期</span>
                <span class="darkgreen" v-if="phone.status==1">正常</span>
              </td>
              <td>{{ phone.isCalled==1 ? '✔' : '✘' }}</td>
              <td>{{ phone.isDialing==1 ? '✔' : '✘' }}</td>
              <td>{{ phone.areaCode }}</td>
              <td>{{ phone.expireTime | totalDate }}</td>
            </tr>
            </tbody>
          </table>
        </div>
       
        <div class="more">
          <a v-if='origin.phone_res.currentPageNo >= origin.phone_res.totalPageCount'>加载完毕</a>
          <a @click="query('more')" class="text-none" v-else>加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
        </div>
      </div>
    </div>

    </div>
    <div  slot="footer">
        <button class="btn btn-default" @click="reset">关闭</button>
    </div>
  </modal>

</template>
<script>
  function initPostData(){
    return {
      subs:{},
      phone_res:{},
      phone_list:[]
    }
  }
  export default {
    vuex:{
      actions: {
        showMsg: require('actions').showMsg
      }
    },
    data(){
      return {
        show: false,
        subId:'',
        serviceType : this.$route.params.serviceType,
        origin: {
          subs:{},
          phone_res:{},
          phone_list:[]
        },
      }
    },
    watch: {
      subId: 'findSubs'
    },
    components: {
      'modal': require('ui/modal.vue'),
    },
    methods: {
      findSubs(){
        if(! this.subId)
          return
        $.get('tenant/tenants/'+ this.$route.params.uid + '/apps/' + this.$route.params.appid + '/subs/'+ this.subId).then((res) => {
          if(res.success){
            this.origin.subs = res.data
          }
        })
        if(this.serviceType=='call_center' || this.serviceType=='voice'){
          this.queryPhone();
        }
      },
      queryPhone(type){
        let params = {id:this.subId}
        if(type === 'more') {
          params.pageNo = this.origin.phone_res.currentPageNo + 1
        }
       
        $.get('tenant/tenants/'+ this.$route.params.uid + '/apps/' + this.$route.params.appid + '/subs/'+ this.subId + '/nums',params).then((res) => {
          if(res.success){
            this.origin.phone_res = res.data
            this.origin.phone_list = type === 'more' ? this.origin.phone_list.concat(res.data.result) : res.data.result
          }
        })
      },
      reset(){
        this.subId = ''
        this.show = false
      }
    },
  }
</script>

<style lang="sass" scoped>
  .control-label{
    width: 100px;
    text-align: right;
    padding-right: 10px;
  }
  .form-group{
    margin-bottom: 10px;
  }
  .modal-table{
    height: 200px;
  }
</style>
