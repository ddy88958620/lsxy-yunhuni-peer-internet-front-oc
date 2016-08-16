<template>
  <section class='section-two flex bg-section-margin flex-direction-column justify-content-s '>
    <div class="panel panel-default flex-1">
      <div class="panel-heading">上月数据</div>
      <div class="panel-body flex flex-1">
        <div class="flex flex-1 flex-direction-row justify-content-b">
          
          <div class="flex flex-1 flex-direction-column box border-right">
            <div class="flex flex-1 align-items-c ">
              <i class="icon iconfont icon-oc-wallet bigicon"></i>
              <span class="green money">{{ indicant.cost_coin }}</span>
              <i class="iconfont icon-oc-up"></i><span class='text-danger'>{{indicant.cost_coin_rate}}%</span>
            </div>
            <div class="flex flex-1 middle-font-size middle-font-color">
              消费额(元)
            </div>
          </div>
          <div class="flex flex-1 flex-direction-column box border-right">
            <div class="flex flex-1 align-items-c ">
              <i class="icon iconfont icon-oc-recharge bigicon"></i>
              <span class="green money">{{ indicant.recharge_coin }}</span>
              <i class="iconfont icon-oc-up"></i><span class='text-danger'>{{indicant.recharge_coin_rate}}%</span>
            </div>
            <div class="flex flex-1 middle-font-size middle-font-color">
              充值额(元)
            </div>
          </div>
          <div class="flex flex-1 flex-direction-column box border-right">
            <div class="flex flex-1 align-items-c ">
              <i class="icon iconfont icon-oc-wallet bigicon"></i>
              <span class="green money">{{ indicant.session_count }}</span>
              <i class="iconfont icon-oc-up"></i><span class='text-danger'>{{indicant.session_count_rate}}%</span>
            </div>
            <div class="flex flex-1 middle-font-size middle-font-color">
              会话量(次)
            </div>
          </div>
          <div class="flex flex-1 flex-direction-column box border-right">
            <div class="flex flex-1 align-items-c ">
              <i class="icon iconfont icon-oc-msg1 bigicon"></i>
              <span class="green money">{{ indicant.session_time }}</span>
              <i class="iconfont icon-oc-up"></i><span class='text-danger'>{{indicant.session_time_rate}}%</span>
            </div>
            <div class="flex flex-1 middle-font-size middle-font-color">
              话务量(分钟)
            </div>
          </div>
          <div class="flex flex-1 flex-direction-column box border-right">
            <div class="flex flex-1 align-items-c ">
              <i class="icon iconfont icon-oc-talktime bigicon"></i>
              <span class="green money">{{ indicant.age_session_time }}</span>
              <i class="iconfont icon-oc-up"></i><span class='text-danger'>{{indicant.age_session_time_rate}}%</span>
            </div>
            <div class="flex flex-1 middle-font-size middle-font-color">
              平均通话时长(分钟)
            </div>
          </div>
          <div class="flex flex-1 flex-direction-column box">
            <div class="flex flex-1 align-items-c ">
              <i class="icon iconfont icon-oc-callrate bigicon"></i>
              <span class="green money">{{ indicant.connected_rate }}</span>
              <i class="iconfont icon-oc-up"></i><span class='text-danger'>{{indicant.connected_rate_rate}}%</span>
            </div>
            <div class="flex flex-1 middle-font-size middle-font-color">
              接通率(%)
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {getTeantIndicant} from '../../../../../vuex/actions.js'
  export default{
    vuex: {
      getters: {
        indicant : ({tenant}) => tenant.detail.indicant
      },
      actions: {
        getTeantIndicant
      }
    },
    components:{
      'databox': require('./databox.vue'),
      'modal': require('../../../../ui/modal.vue')
    },
    data(){
      return{
        showModal: false,
        alldata:[
          {total:'54365.33',percent:'20%',trend:'0'},
          {total:'1200',percent:'20%',trend:'1'},
          {total:'300',percent:'20%',trend:'1'},
          {total:'111',percent:'20%',trend:'0'},
          {total:'111',percent:'20%',trend:'0'},
          {total:'99%',percent:'20%',trend:'0'}
        ]
      }
    },
    ready(){
      let params = {}
      params.id = this.$route.params.uid
      this.getTeantIndicant(params)
    }
  }
</script>


<style lang="sass" scoped>
  .section-two {
    .box{
      height: 140px;
      padding:20px;
    }

    .money{
      font-size: 1.8rem;
    }

    .bigicon{
      font-size: 2.8rem;
    }
    .icon-oc-up,.icon-oc-down{
      font-size: 8px;
    }
  }

 .box{
      height: 140px;
      padding:20px;
  }

  .money{
    padding: 0 10px;
    font-size: 1.8rem;
  }

  .bigicon{
      font-size: 2.8rem;
  }

  .icon-oc-up,.icon-oc-down{
      font-size: 8px;
  }

  .border-right{
      border-right: 1px solid #ddd;
  }

</style>
