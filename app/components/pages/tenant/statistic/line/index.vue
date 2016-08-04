<template>

  <div class="flex flex-1 whilebg admin-padding ">
    <div class="flex flex-1  flex-direction-column ">
      <div class="flex flex-1 ">
        <h5 class="middle-font-color" >实时线路负荷占比图</h5>
      </div>
      <pie :uuid="'pie-app-chart1'"
           :title="['线路1','线路2','线路3','线路4','线路5']"
           :piedata="['300', '50', '100','100','200']"
           :color="['#84e8e6', '#d5f5f1', '#fdf7c9', '#fdf7c9', '#e4f6c3','#fbd0b0']">
      </pie>
      <div class="flex flex-1-auto justify-content-c middle-font-color ">
        全部应用
      </div>
    </div>
    <div class="flex flex-1"></div>
  </div>

  <div class="flex flex-1 whilebg admin-padding">

    <div class="flex flex-1  flex-direction-column border-top">
      <pie :uuid="'pie-app-chart2'"
           :piedata="[300, 50, 100,100,200]"
           :title="['线路1','线路2','线路3','线路4','线路5']"
           :color="['#84e8e6', '#d5f5f1', '#fdf7c9', '#fdf7c9', '#e4f6c3','#fbd0b0']">
      </pie>
      <div class="flex flex-1-auto justify-content-c middle-font-color">飞飞语音</div>
    </div>

    <div class="flex flex-1  flex-direction-column border-top">
      <pie :uuid="'pie-app-chart3'"
           :title="['线路1','线路2','线路3','线路4','线路5']"
           :piedata="[300, 50, 100,100,200]"
           :color="['#84e8e6', '#d5f5f1', '#fdf7c9', '#fdf7c9', '#e4f6c3','#fbd0b0']">
      </pie>
      <div class="flex flex-1-auto justify-content-c middle-font-color">中兴通信</div>
    </div>
  </div>



</template>
<style lang="sass" scoped>
  .border-top{
    border-top: 1px solid #ddd;
  }
</style>
<script>
  export default{
    components:{
      'pie': require('../../../../ui/pie-chart.vue')
    },
    data(){
      return{
        pieall:{

        }
      }
    },
    ready(){

    }
  }
</script>
