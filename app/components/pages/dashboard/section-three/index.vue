<template>
    <section class="section-three flex admin-border bg-section-margin whilebg">
     <div class="flex section-left flex-direction-column ">
        <div class="flex flex-1 flex-1align-items-c flex-direction-column session-small-box border-bottom">
       
          <div>
            <span class='iconfont icon-oc-mobile'></span>
            <span class='admin-font-color ranknumber'>{{duration.dto.duration_day}}</span>
          </div>
          <ul class="list-none-style">
            <li class='title'>昨日话务量 ( 分钟 )</li>

             <li v-if="duration.dto1.rateOfDay===true" >日<i class="iconfont icon-oc-up small {{ duration.dto.day_rate >= 0 ? 'icon-oc-up' : 'icon-oc-down'}}"></i><span class='text-danger'>{{duration.dto.day_rate}}%</span></li>
             <li v-else>日 --</li>

             <li v-if="duration.dto1.rateOfWeek===true" >周<i class="iconfont icon-oc-up small {{ duration.dto.week_rate >= 0 ? 'icon-oc-up' : 'icon-oc-down'}}"></i><span class='text-danger'>{{duration.dto.week_rate}}%</span></li>
             <li v-else>周 --</li>

             <li v-if="duration.dto1.rateOfMonth===true" >月<i class="iconfont icon-oc-up small {{ duration.dto.month_rate >= 0 ? 'icon-oc-up' : 'icon-oc-down'}}"></i><span class='text-danger'>{{duration.dto.month_rate}}%</span></li>
             <li v-else>y月 --</li>

              
          </ul>
        </div>
        <div class="flex flex-1 flex-1align-items-c flex-direction-column session-small-box">
          
          <div>
            <span class='iconfont icon-oc-wallet'></span>
            <span class='admin-font-color ranknumber'>{{comsume.dto.consume_day >0 ? comsume.dto.consume_day.toFixed(2) : '0.00' }}</span>
          </div>
          <ul class="list-none-style">
            <li class='title'>昨日消费额 ( 元 )</li>
            <li v-if="comsume.dto1.rateOfDay===true" >日<i class="iconfont icon-oc-up small {{ comsume.dto.day_rate >= 0 ? 'icon-oc-up' : 'icon-oc-down'}}"></i><span class='text-danger'>{{comsume.dto.day_rate}}%</span></li>
            <li v-else>日 --</li>
            <li v-if="comsume.dto1.rateOfWeek===true" >周<i class="iconfont icon-oc-up small {{ comsume.dto.week_rate >= 0 ? 'icon-oc-up' : 'icon-oc-down'}}"></i><span class='text-danger'>{{comsume.dto.week_rate}}%</span></li>
            <li v-else>周 --</li>
            <li v-if="comsume.dto1.rateOfMonth===true" >月<i class="iconfont icon-oc-up small {{ comsume.dto.month_rate >= 0 ? 'icon-oc-up' : 'icon-oc-down'}}"></i><span class='text-danger'>{{comsume.dto.month_rate}}%</span></li>
            <li v-else>月 --</li>
          </ul>
        </div>
     </div>
     <div class="flex flex-1 flex-direction-column section-right admin-padding">
       <datetime-picker :uuid="'sectionThreeDate'" :action="doGetConsumeAnduraion" :type.sync="date.type" :value.sync="date.value"></datetime-picker>
       <div class="flex-1">
         <chart
           :uuid="'sectionThreeChart'"
						:type="['line','bar']"
						:ydata1="comsumeduration.session"
						:ydata2="comsumeduration.cost"
						:title="['话务量','消费额']"
						:xtitle="['话务量(分钟)','消费额(元)']"
						:color="[['rgba(246,239,232,0.2)','rgba(251,54,45,0.8)','rgba(251,54,45,0.8)','#FFF','rgba(251,54,45,0.8)','rgba(220,220,220,1)'],
                    ['#ebeecc','rgba(214,235,78,0.8)','rgba(214,235,78,1)','#FFF','rgba(214,235,78,0.1)','rgba(220,220,220,0.1)']]"
         ></chart>
       </div>
     </div>

    </section>
</template>
<script>
  import { getLastDayComsume, getLastDayDuration, getConsumeAnduration} from '../../../../vuex/actions'
  import DATE from '../../../../utils/date'
  export  default {
    vuex :{
      getters :{
         comsume: ({app}) => app.comsume,
         duration: ({app}) => app.duration,
         comsumeduration: ({app}) => app.statistic.comsumeduration,
      },
      actions :{
        getLastDayComsume,
        getLastDayDuration,
        getConsumeAnduration
      }
    },
    data(){
      return{
      	date: {
      	  type: 'month',
          value: DATE.todayString('month')
        }
      }
    },
    methods:{
      doGetConsumeAnduraion(date){
        if (date) {
          this.getConsumeAnduration(date)
        } else {
          let year = this.date.value.split('-')[0]
          let month = this.date.value.split('-')[1]
          // {year, month} === {year: year, month: month
          this.getConsumeAnduration({year: year,month:month})
        }
      }
    },
    components: {
      'chart': require('../../../ui/chart.vue'),
      'datetime-picker': require('../../../ui/datetimepicker.vue')
    },
    ready(){
      this.getLastDayComsume()
      this.getLastDayDuration()
      this.doGetConsumeAnduraion()
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
