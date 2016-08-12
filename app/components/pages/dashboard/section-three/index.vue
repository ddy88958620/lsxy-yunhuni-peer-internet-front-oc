<template>
    <section class="section-three flex admin-border bg-section-margin whilebg">
     <div class="flex section-left flex-direction-column ">
        <div class="flex flex-1 flex-1align-items-c flex-direction-column session-small-box border-bottom">
          <div>
            <span class='iconfont icon-oc-mobile'></span>
            <span class='admin-font-color ranknumber'>548465</span>
          </div>
          <ul class="list-none-style">
            <li class='title'>昨日话务量 ( 分钟 )</li>
            <li>日 <i class="iconfont icon-oc-up small"></i><span class='text-danger'>11%</span></li>
            <li>周 <i class="iconfont icon-oc-up small"></i><span class='text-danger'>77%</span></li>
            <li>月 <i class="iconfont icon-oc-up small"></i><span class='text-danger'>308%</span></li>
          </ul>
        </div>
        <div class="flex flex-1 flex-1align-items-c flex-direction-column session-small-box">
          <div>
            <span class='iconfont icon-oc-wallet'></span>
            <span class='admin-font-color ranknumber'>548465</span>
          </div>
          <ul class="list-none-style">
            <li class='title'>昨日消费额 ( 元 )</li>
            <li>日 <i class="iconfont icon-oc-up small"></i><span class='text-danger'>11%</span></li>
            <li>周 <i class="iconfont icon-oc-up small"></i><span class='text-danger'>77%</span></li>
            <li>月 <i class="iconfont icon-oc-up small"></i><span class='text-danger'>308%</span></li>
          </ul>
        </div>
     </div>
     <div class="flex flex-1 flex-direction-column section-right admin-padding">
       <datetime-picker :type="bar"></datetime-picker>
       <div class="flex-1">
         <chart :uuid="'dashboard-st3-chart'" :type="['line','bar']"
            :title="['话务量','消费额']",
            :xtitle="['话务量(次数)','消费额(元)']",
            :color="[['rgba(246,239,232,0.2)','rgba(251,54,45,0.8)','rgba(251,54,45,0.8)','#FFF','rgba(251,54,45,0.8)','rgba(220,220,220,1)'],
                    ['#ebeecc','rgba(214,235,78,0.8)','rgba(214,235,78,1)','#FFF','rgba(214,235,78,0.1)','rgba(220,220,220,0.1)']]"
         ></chart>
       </div>
     </div>

    </section>
</template>
<script>
  export  default {
    data(){
      return{}
    },
    components: {
      'chart': require('../../../ui/chart.vue'),
      'datetime-picker': require('../../../ui/datetimepicker.vue')
    }
  }
</script>
<style lang='sass'>

.section-three {
  .section-left {
    width: 280px;
  }
  .session-small-box {
    padding: 30px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    ul {
      color: #888;
      .title {
        font-size: 1.8rem;
        color:#666;
        font-weight: 500;
        padding-top: 10px;
      }
    }
    .iconfont {
      font-size: 3.5rem;
    }
    .ranknumber {
      font-size: 2.5rem;
      padding-left: 10px;
      font-weight: 500;
    }
    .small{
      font-size: 8px;
    }
  }
  .border-bottom{
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
}


</style>
