<template>
  <section class='section-two flex bg-section-margin flex-direction-column justify-content-s '>
    <div class="panel panel-default flex-1">
      <div class="panel-heading">上月数据</div>
      <div class="panel-body flex flex-1">
        <div class="flex flex-1 flex-direction-row justify-content-b">
          
          <div class="flex flex-1 flex-direction-column box border-right">
            <div class="flex flex-1 align-items-c ">
              <i class="icon iconfont icon-oc-wallet bigicon"></i>
              <span class="green money">{{ indicant.dto.cost_coin >0 ? indicant.dto.cost_coin.toFixed(2) : '0.00' }}</span>
              <div v-if="indicant.dto1.costCoin === true" >
                 <i class="iconfont {{ indicant.dto.cost_coin_rate >= 0 ? 'icon-oc-up' : 'icon-oc-down'}}"></i><span class='text-danger'>{{indicant.dto.cost_coin_rate}}%</span>
              </div>
              <div v-else>
                --
              </div>
            </div>
            <div class="flex flex-1 middle-font-size middle-font-color">
              消费额(元)
            </div>
          </div>
          <div class="flex flex-1 flex-direction-column box border-right">
            <div class="flex flex-1 align-items-c ">
              <i class="icon iconfont icon-oc-recharge bigicon"></i>
              <span class="green money">{{ indicant.dto.recharge_coin >0 ? indicant.dto.recharge_coin.toFixed(2) : '0.00' }}</span>

              <div v-if="indicant.dto1.rechargeCoinRate === true" >
                 <i class="iconfont {{ indicant.dto.recharge_coin_rate >= 0 ? 'icon-oc-up' : 'icon-oc-down'}}"></i><span class='text-danger'>{{indicant.dto.recharge_coin_rate}}%</span>
              </div>
              <div v-else>
                --
              </div>       
            </div>
            <div class="flex flex-1 middle-font-size middle-font-color">
              充值额(元)
            </div>
          </div>
          <div class="flex flex-1 flex-direction-column box border-right">
            <div class="flex flex-1 align-items-c ">
              <i class="icon iconfont icon-oc-wallet bigicon"></i>
              <span class="green money">{{ indicant.dto.session_count }}</span>
              <div v-if="indicant.dto1.sessionCountRate === true" >
                 <i class="iconfont {{ indicant.dto.session_count_rate >= 0 ? 'icon-oc-up' : 'icon-oc-down'}}"></i><span class='text-danger'>{{indicant.dto.session_count_rate}}%</span>
              </div>
              <div v-else>
                --
              </div>
            </div> 
            <div class="flex flex-1 middle-font-size middle-font-color">
              会话量(次)
            </div>
          </div>
          <div class="flex flex-1 flex-direction-column box border-right">
            <div class="flex flex-1 align-items-c ">
              <i class="icon iconfont icon-oc-msg1 bigicon"></i>
              <span class="green money">{{ indicant.dto.session_time }}</span>

              <div v-if="indicant.dto1.sessionTimeRate === true" >
                 <i class="iconfont {{ indicant.dto.session_time_rate >= 0 ? 'icon-oc-up' : 'icon-oc-down'}}"></i><span class='text-danger'>{{indicant.dto.session_time_rate}}%</span>
              </div>
              <div v-else>
                --
              </div>

             <!--  <i class="iconfont icon-oc-up"></i><span class='text-danger'>{{indicant.dto.session_time_rate}}%</span> -->
            </div>
            <div class="flex flex-1 middle-font-size middle-font-color">
              话务量(分钟)
            </div>
          </div>
          <div class="flex flex-1 flex-direction-column box border-right">
            <div class="flex flex-1 align-items-c ">
              <i class="icon iconfont icon-oc-talktime bigicon"></i>
              <span class="green money">{{ indicant.dto.age_session_time }}</span>

              <div v-if="indicant.dto1.avgSessionTimeRate === true" >
                 <i class="iconfont {{ indicant.dto.age_session_time >= 0 ? 'icon-oc-up' : 'icon-oc-down'}}"></i><span class='text-danger'>{{indicant.dto.age_session_time}}%</span>
              </div>
              <div v-else>
                --
              </div>
              <!-- <i class="iconfont icon-oc-up"></i><span class='text-danger'>{{indicant.dto.age_session_time_rate}}%</span> -->
            </div>
            <div class="flex flex-1 middle-font-size middle-font-color">
              平均通话时长(分钟)
            </div>
          </div>
          <div class="flex flex-1 flex-direction-column box">
            <div class="flex flex-1 align-items-c ">
              <i class="icon iconfont icon-oc-callrate bigicon"></i>
              <span class="green money">{{ indicant.dto.connected_rate }}</span>
              <div v-if="indicant.dto1.connectedRateRate === true" >
                 <i class="iconfont {{ indicant.dto.connected_rate_rate >= 0 ? 'icon-oc-up' : 'icon-oc-down'}}"></i><span class='text-danger'>{{indicant.dto.connected_rate_rate}}%</span>
              </div>
              <div v-else>
                --
              </div>
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
  import {getTenantIndicant} from '../../../../../vuex/actions.js'
  export default{
    vuex: {
      getters: {
        indicant : ({tenant}) => tenant.detail.indicant
      },
      actions: {
        getTenantIndicant
      }
    },
    components:{
      'databox': require('./databox.vue'),
      'modal': require('../../../../ui/modal.vue')
    },
    data(){
      return{
        showModal: false,
        
      }
    },
    ready(){
      let params = {}
      params.id = this.$route.params.uid
      this.getTenantIndicant(params)
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
