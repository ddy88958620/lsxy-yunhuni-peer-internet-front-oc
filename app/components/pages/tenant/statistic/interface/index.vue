<template>

  <div class="flex flex-1 admin-padding admin-border bg-section-margin whilebg ">
    <chart
      :uuid="'sectionThreeChart1'"
      :type="['line','line']"
      :ydata1="chartApiValue"
      :title="['API调用', '']"
      :xtitle="['话务量(次数)','消费额(元)']"
      :color="[['rgba(246,239,232,0.2)','rgba(251,54,45,0.8)','rgba(251,54,45,0.8)','#FFF','rgba(251,54,45,0.8)','rgba(220,220,220,1)'],
                    ['#ebeecc','rgba(214,235,78,0.8)','rgba(214,235,78,1)','#FFF','rgba(214,235,78,0.1)','rgba(220,220,220,0.1)']]"
    ></chart>
  </div>
  <div class="flex-flex-1 bg-section-margin">
    <admin-table></admin-table>
  </div>
</template>
<style lang="sass" scoped>

</style>
<script>
  import DATE from '../../../../../utils/date'
  export default{
  	data(){
  		return {
  			chartApiValue: '',
			  chartApiDate: null
      }
    },
    components:{
      'chart': require('../../../../ui/realtime-chart.vue'),
      'admin-table': require('./table.vue')
    },
    methods: {
      chartApiQuery(){
        let uid = this.$route.params.uid
        let self = this
        if (this.chartApiDate === null){
          this.chartApiDate = DATE.today('month')
        }
        $.get('/tenant/tenants/'+uid+'/session/statistic', self.chartApiDate).then((res)=>{
          self.chartApiValue = res.data
        })
      }
    },
    ready(){
    	this.chartApiQuery()
    }
  }
</script>
