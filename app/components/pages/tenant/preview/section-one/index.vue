<template>
    <section class='section_one bg-section-margin'>
        <div class="no-wrap">
          <div class="box inline-block ofh">
            <div class=" flex-grow-1 flex flex-1  ">
              <div class="sort flex  greenborder">
                <div class="flex  company">
                  <div class="canvas inline-block justify-content-c align-items-c ">
                    <img class="avatar" src="/avatar.png?a226ccef62bc02b7f799d54e4c5b27dd">
                  </div>
                  <span class="inline-block name " >{{tenant.tenantName}}</span>
                </div>
                <div class="message inline-block ">
                  <div class="flex " title="{{cert && cert.apiUrl}}">
                     <span class="inline-block white-space" >接口API: {{cert && cert.apiUrl}}</span>
                  </div>
                  <div class="flex " title="{{cert && cert.cert.secretKey}}">
                     <span class="inline-block white-space" >密钥: {{cert && cert.cert.secretKey}}</span>
                  </div>
                  <div class="flex " title="">
                     <span class="inline-block  white-space" >鉴权账号: {{cert && cert.cert.certId}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class=" box inline-block ofh">
            <div class="flex-grow-1 flex flex-1 flex-direction-column">
              <div class="sort flex flex-1 flex-direction-column blueborder ">
                <div class="flex justify-content-s top-title">
                  <i class="icon iconfont icon-oc-recharge"></i>
                  <span class="flex align-items-c unit">余额（元）</span>
                </div>
                <div class="flex flex-1 green money">
                  <!--{{ tenant.remain_coin>=0 ? tenant.remain_coin ?  tenant.remain_coin : 0 : '欠费'+-tenant.remain_coin }}-->
                    <span v-if="bill.balance >=0 || bill.balance==null ">
                       ￥{{(bill && bill.balance)}}.{{bill.balanceDec}}
                    </span>
                    <span v-else>
                       {{(bill && bill.balance) ? '欠费'+-bill.balance : '￥0.00' }}
                    </span>
                </div>
                <div class="flex flex-direction-row-reverse">
                  <button class="btn btn-default" @click="openModal" >消费记录</button>
                  <button class="btn btn-primary" @click="recharge.showModal = true">充值</button>
                </div>
              </div>
            </div>
          </div>
          <div class="inline-block box ofh">
            <div class="flex-grow-1 flex flex-1 flex-direction-column">
              <div class="sort flex-1 flex flex-direction-column yellowborder ">
                <div class="flex justify-content-s top-title">
                  <i class="icon iconfont icon-oc-storage"></i>
                  <span class="flex align-items-c unit">存储容量（M）</span>
                </div>
                <div class="flex flex-1">
                  <span class="green money">{{filesize}}</span>
                </div>
                <div class="flex flex-direction-row-reverse">
                  
                </div>
              </div>
            </div>
          </div>

          <div class="inline-block box ofh">
            <div class="flex-grow-1 flex flex-1 flex-direction-column">
              <div class="sort flex flex-1 flex-direction-column pinkborder">
                <div class="flex justify-content-s top-title">
                  <i class="icon iconfont icon-oc-surplus"></i>
                  <span class="flex align-items-c unit">套餐剩余量</span>
                </div>
                <div class="flex flex-1 flex-direction-column surplus">
                  <div class="flex flex-1">会议剩余：<span class="green">{{(bill && bill.conferenceRemain) || 0}}</span>分钟</div>
                  <div class="flex flex-1">语音剩余：<span class="green">{{(bill && bill.voiceRemain) || 0}}</span>分钟</div>
                  <div class="flex flex-1">短信剩余：<span class="green">{{(bill && bill.smsRemain) || 0}}</span>条</div>
                </div>
              </div>
            </div>
          </div>

        </div>
    </section>


  <modal :show.sync="showModal" title='消费记录' :width='table'  :action="closeModal"  >
    <div slot="body" class="flex flex-1 flex-direction-column">
      <div class="flex flex-direction-column admin-table-header">
        <div class="flex align-items-c">
          <span class='datetime-picker-label clear-padding-left'>提交时间:</span>
          <datetime-picker :uuid="'datetimepicker3'" :type.sync="'month'"
                           :value.sync="page.query.date"></datetime-picker>
          &nbsp;&nbsp;<button class="btn btn-primary" @click="query(true)">查询</button>
        </div>
      </div>
      <div class="admin-table flex-1 flex flex-direction-column">
        <div class="table-total flex flex-1 justify-content-e float-r">
          消费总金额：<span class="brown">{{page.totalAmount}}</span>元 共<span class="text-danger">{{page.total}}</span>条
        </div>
        <div class="flex modal-table" >
          <table class="table"  >
            <thead>
            <tr>
              <th class="text-align-c">消费时间</th>
              <th>消费金额</th>
              <th>消费类型</th>
              <th>备注</th>
            </tr>
            </thead>
            <tbody >
            <tr v-for='consume in consumes'>
              <td class="message-time text-align-c">{{consume.createTime | date}}</td>
              <td>{{consume.amount}}</td>
              <td>{{consume.type}}</td>
              <td>{{consume.remark}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="more">
          <a v-show='page.loading'>正在加载</a>
          <a v-show='!page.loading && !page.hasMore'>加载完毕</a>
          <a @click="query()" class="text-none" v-show='!page.loading && page.hasMore'>加载更多<i
            class="icon iconfont icon-oc-dropdown"></i></a>
        </div>
      </div>
    </div>
  </modal>

  <modal :show.sync="recharge.showModal" title="充值" :action="doRecharge">
    <div slot="body" class="flex flex-1 flex-direction-column" >
      <div class="flex flex-1 ">
        <span class="flex flex-1 align-items-c justify-content-c">充值金额</span>
        <span class="flex flex-5 "><input type="text" class="form-control " v-model='recharge.amount' /></span>
      </div>
    </div>
  </modal>

  <modal :show.sync="api.showModal" title="开发者账号" :action="hideApi">
    <div slot="body" class="flex flex-1 flex-direction-column" >
      <div class="flex flex-1 flex-direction-column apimodal">
          <div class="flex" >
            <span class="title" >api接口: </span>
            <span>{{cert && cert.apiUrl}}</span>
          </div>
          <div class="flex flex-1" >
            <span class="titleid">密钥: </span><span class="overflow-x-h word-space" >{{cert && cert.cert.secretKey}}</span>
          </div>

          <div class="flex flex-1" >
           <span class="titleid">鉴权账号: </span>  <span class="overflow-x-h word-space" >{{cert && cert.cert.certId}}</span>
          </div>

      </div>
    </div>
    <div slot="footer">
    </div>

  </modal>

</template>

<script>
  import {getTenantBilling,getTenantCert,showMsg} from '../../../../../vuex/actions.js'
  export default{
    vuex: {
      getters: {
        bill: ({tenant}) => tenant.detail.bill,
        cert: ({tenant}) => tenant.detail.cert
      },
      actions: {
        getTenantBilling,
        getTenantCert,
        showMsg
      }
    },
    components:{
      'modal': require('../../../../ui/modal.vue'),
      'datetime-picker': require('../../../../ui/datetimepicker.vue')
    },
    data(){
      return {
        showModal: false,
        tenant:{},
        consumes:[],
        page: {
          query: {
            date: (new Date().getYear()+1900) +'-'+(new Date().getMonth()+1),
            pageNo: 0,
            pageSize: 10
          },
          loading: true,
          hasMore: true,
          total:0,
          totalAmount:0
        },
        recharge:{
          showModal:false,
          amount:0
        },
        api:{
          showModal:false,
        }
      }
    },
    methods:{
      moreMessage:function(){
      },
      getTenantInfo(){
        let self = this
        $.get('/tenant/tenants/' + this.$route.params.uid + '/info').then((res) => {
          return res.data && (self.tenant = res.data)
        });
      },
      openModal(){
        this.showModal = true
        this.query(true)
      },
      closeModal(){
        this.showModal = false
      },
      query(init){
        let self = this
        let pageNo = (init && 1) || self.page.query.pageNo + 1
        let params = $.extend(true, {}, self.page.query);
        if(self.page.query.date){
          let y_m = self.page.query.date.split('-')
          params.year = y_m[0]
          params.month = y_m[1]
        }
        params.pageNo = pageNo;
        self.page.loading = true
        if(init){
          self.consumes = [];
        }

    

        $.get('/tenant/tenants/'+this.$route.params.uid+'/consumes', params).then((res)=> {
          self.page.loading = false
          if (res.data && res.data.consumes && res.data.consumes.result) {
            if (init) {
              self.consumes = res.data.consumes.result  
            } else {
              self.consumes = self.consumes.concat(res.data.consumes.result)
            }
            self.page.query.pageNo = pageNo
          }
          self.page.hasMore = res.data && res.data.consumes && ((res.data.consumes.totalPageCount || 0 ) > self.page.query.pageNo)
          self.page.total = (res.data && res.data.consumes && res.data.consumes.totalCount) || 0
          self.page.totalAmount = (res.data && res.data && res.data.sumAmount) || 0
        })
      },
      doRecharge:function(){
        let self = this;
        if(this.recharge.amount>0 && this.recharge.amount<1000000){
          $.put('/tenant/tenants/'+this.$route.params.uid+'/recharge',this.recharge).then((res) => {

            if(res.success === 'false'){
              self.showMsg({content: res.errorMsg, type: 'danger'})
              return
            }
        
            if(res.data){
              self.recharge.amount = 0
              self.recharge.showModal = false
              //充值成功提示
              self.showMsg({content: '充值成功', type: 'success'})
              self.getTenantBilling({id:self.$route.params.uid})
            }
          })
        }
      }
    },
    computed: {
      remainFilesize:function(){
        return (((this.bill && this.bill.fileRemainSize) || 0) / 1024 / 1024 / 1024).toFixed(2)
      },
      filesize: function () {
        return (((this.bill && this.bill.fileTotalSize) || 0) / 1024 / 1024 ).toFixed(2)
      }
    },
    ready(){
      let params = {}
      params.id = this.$route.params.uid
      this.getTenantBilling(params)
      this.getTenantCert(params)
      this.getTenantInfo()
    }
  }
</script>

<style lang="sass" scoped>
  .section_one {
    .box {
      background-color: #fff;
      width: 25%;
      min-width: 235px;
      height: 172px;
    }

    .sort {
      border-top: 4px solid #00A000;
      padding: 10px;
      .top-title{
        i{ font-size: 2rem;}
        padding-bottom: 15px;
      }
    }

    .company{
      height: 80px;
      .canvas {
        width: 80px;
        height: 80px;
        .avatar {
          width: 60px;
          height: 60px;
          border-radius: 30px;
        }
      }
      .name{
        color:#666;
        font-size: 1.6rem;
      }
    }

    .message{
      color:#999;
      .title{
        width: 100px;
      }
      .titleid{
        min-width: 60px;
        width: 60px;
        
      }
    }

    .word-space{
       display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
    }

    .money{
      font-size: 2.6rem;
    }

    .unit{
      color:#666;
      padding-left: 10px;
      font-size: 1.4rem;
    }

    .surplus{
      font-size:1.4rem;
    }
    button{
      margin: 0 5px;
    }
  }

  .apimodal{
    .title{
      width:55px !important;
    }
  }


</style>