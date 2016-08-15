<template>
    <section class='section_one flex bg-section-margin flex-direction-column justify-content-s '>
        <div class="flex flex-direction-row justify-content-b">

          <div class="box">
            <div class=" flex-grow-1 flex flex-1 flex-direction-column ">
              <div class="sort flex flex-1 flex-direction-column greenborder">
                <div class="flex justify-content-s company">
                  <div class="canvas flex justify-content-c align-items-c ">
                    <img class="avatar" src="/avatar.png?a226ccef62bc02b7f799d54e4c5b27dd">
                  </div>
                  <span class="flex flex-1 name align-items-c justify-content-c" title="广州流水行云有限公司">广州流水行云有限公司</span>
                </div>
                <div class="message flex flex-1 flex-direction-column ">
                  <span class="flex overflow-x-h">REST API: http://api.yunhuni.com/123456789123456</span>
                  <span class="flex overflow-x-h">SercreKey：SoWHEREYOUGOIMYOURSHADOW</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex box">
            <div class="flex-grow-1 flex flex-1 flex-direction-column">
              <div class="sort flex flex-1 flex-direction-column blueborder ">
                <div class="flex justify-content-s top-title">
                  <i class="icon iconfont icon-oc-recharge"></i>
                  <span class="flex align-items-c unit">余额（元）</span>
                </div>
                <div class="flex flex-1 green money">
                    ￥100.00
                </div>
                <div class="flex flex-direction-row-reverse">
                  <button class="btn btn-default" @click="showModal = true" >消费记录</button>
                  <button class="btn btn-primary">充值</button>
                </div>
              </div>
            </div>
          </div>

          <div class="flex box">
            <div class="flex-grow-1 flex flex-1 flex-direction-column">
              <div class="sort flex-1 flex flex-direction-column yellowborder ">
                <div class="flex justify-content-s top-title">
                  <i class="icon iconfont icon-oc-storage"></i>
                  <span class="flex align-items-c unit">存储容量（G）</span>
                </div>
                <div class="flex flex-1 green money">
                  0.84
                </div>
                <div class="flex flex-direction-row-reverse">

                </div>
              </div>
            </div>
          </div>

          <div class="flex box">
            <div class="flex-grow-1 flex flex-1 flex-direction-column">
              <div class="sort flex flex-1 flex-direction-column pinkborder">
                <div class="flex justify-content-s top-title">
                  <i class="icon iconfont icon-oc-surplus"></i>
                  <span class="flex align-items-c unit">套餐剩余量</span>
                </div>
                <div class="flex flex-1 flex-direction-column surplus">
                  <div class="flex flex-1">会议剩余：<span class="green">100</span>分钟</div>
                  <div class="flex flex-1">语音剩余：<span class="green">100</span>分钟</div>
                  <div class="flex flex-1">短信剩余：<span class="green">100</span>条</div>
                </div>
              </div>
            </div>
          </div>

        </div>
    </section>


  <modal :show.sync="showModal" title='消费记录'>
    <div slot="body" class="flex flex-1 flex-direction-column">
      <div class="flex flex-direction-column admin-table-header">
        <div class="flex align-items-c">
          <span class='datetime-picker-label clear-padding-left'>提交时间:</span>
          <datetime-picker disable="disable"></datetime-picker>
          <span class='datetime-picker-label'>至</span>
          <datetime-picker></datetime-picker>
        </div>
      </div>
      <div class="admin-table table-responsive flex-1 flex flex-direction-column">
        <div class="table-total flex flex-1 justify-content-e">
          消费总金额：<span class="brown">2400</span>元 共<span class="text-danger">20</span>条
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
            <tr v-for='message in messages'>
              <td class="message-time text-align-c">{{message.date}}</td>
              <td>{{message.money}}</td>
              <td>{{message.type}}</td>
              <td>{{message.remark}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="more"><a @click="moreMessage" class="text-none">加载更多<i class="icon iconfont icon-oc-dropdown" ></i></a></div>
      </div>
    </div>
  </modal>
    
</template>

<script>
  import {getTeantBilling} from '../../../../../vuex/actions.js'
  export default{
    vuex: {
      getters: {
        bill: ({tenant}) => tenant.bill

      },
      actions: {
        getTeantBilling
      }
    },
    components:{
      'modal': require('../../../../ui/modal.vue'),
      'datetime-picker': require('../../../../ui/datetimepicker.vue')
    },
    data(){
      return {
        showModal: false
      }
    },
    methods:{
      moreMessage:function(){

      }
    },
    ready(){
      console.log(this.$route.params.uid)
      this.getTeantBilling({id:1})
      //this.getTeantBilling({id:this.$route.params.uid})
    }
  }
</script>

<style lang="sass" scoped>
  .section_one {
    .box {
      background-color: #fff;
      width: 23%;
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


</style>