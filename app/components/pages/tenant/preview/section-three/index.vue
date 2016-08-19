<template>
    <section class="section-three flex admin-padding  bg-section-margin admin-border whilebg">
     <div class="flex flex-1 flex-direction-column">
       <div class="flex-1">
         <div class="flex flex-1 section-time-box">
           <a >上个月</a>
           <span>2016-08-1</span>
         </div>
         <chart
					  :uuid="'dashboard-st3-chart'" :type="['line','bar']"
            :title="['话务量','消费额']"
            :ydata1="comsumeduration.cost"
            :ydata2="comsumeduration.session"
            :xtitle="['话务量(次数)','消费额(元)']"
            :color="[['rgba(246,239,232,0.2)','rgba(251,54,45,0.8)','rgba(251,54,45,0.8)','#FFF','rgba(251,54,45,0.8)','rgba(220,220,220,1)'],
                    ['#ebeecc','rgba(214,235,78,0.8)','rgba(214,235,78,1)','#FFF','rgba(214,235,78,0.1)','rgba(220,220,220,0.1)']]"
         ></chart>
       </div>
     </div>

    </section>
</template>
<script>
  import {getTenantDuration} from '../../../../../vuex/actions.js'
  export  default {
  	vuex:{
  		getters: {
  			comsumeduration: ({tenant}) => tenant.statistic.comsumeduration
      },
      actions: {
        getTenantDuration
      }
    },
    data(){
      return{

      }
    },
    methods: {
    	doGetTenantDuration(date){
    		this.getTenantDuration(date)
      }
    },
    components: {
      'chart': require('../../../../ui/chart.vue')
    },
    ready(){
      let uid = this.$route.params.uid
      this.doGetTenantDuration({id: uid, year: '2016', month:'08'})
    }
  }
</script>
<style lang='sass' scoped>

</style>
