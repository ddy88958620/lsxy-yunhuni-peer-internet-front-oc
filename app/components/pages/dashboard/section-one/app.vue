<template>
  <div class="section_right ofh">
    <div class="panel panel-default">
      <div class="panel-heading"><i class="iconfont icon-oc-app"></i>应用数据</div>
      <div class="panel-body">
        
        <div class='inline-block width-50 text-align-c'>
          <div class="pie-wrap-start text-align-c">
            <div class="pie-wrap inline-block">
              <pie :uuid="'apppie'" :max="app.total" :value="app.total" :bgcolor="'#89d9e3'"></pie>
            </div>
          </div>
          <div class="title-box">
            总应用数（个）
          </div>
        </div>

        <div class="border-span  float-l"><span></span></div>

        <div class='inline-block width-50 text-align-c' >
          <div class="pie-wrap-start text-align-c">
            <div class="pie-wrap inline-block">
              <pie :uuid="'appie2'" :max="app.total" :value="app.online" :bgcolor="'#80d1ff'" ></pie>
            </div>
          </div>
          <div class=" title-box">
            总上线应用数（个)
          </div>
        </div>

      </div>
    </div>
  </div>

</template>
<script>
import { getAppCount } from '../../../../vuex/actions.js'
import pie from '../../../ui/pie.vue'

export default {
  vuex: {
    getters:{
      apptest: ({app}) => app.count
    },
    actions:{
      getAppCount
    }
  },
  data(){
    return {
      color:'#89d9e3',
      colorTwo:'#80d1ff',
      colorThree: '#f4ebb6',
      app:{
        total : 0,
        online : 0
      }
    }
  },
  components: {
    pie
  },
	ready(){
    let self = this
    $.get('/dashboard/app/indicant').then((res) => {
          if(res.success==true){
            self.app = res.data
          }
     })
    //this.getAppCount()
  },
}
</script>
<style lang="sass" scoped>
  .section_right {
    display: inline-block;
    width: 40%;
  }
  .panel-heading{
    .iconfont{
      padding-right: 10px;
    }
  }

  .border-span{
    padding-top:50px;
    span{
      height: 60px;
      padding: 0;
      display: inline-block;
      border-left: 1px solid #ddd;
    }
    width: 1%;
  }

  .width-50{
    width: 49%;
    float: left;
  }


  .panel-body{
    height: 160px;
    ul{
      width: 110px;
    }
  }

  .title-box{
    text-align: center;
  }

  .panel-heading{
    font-size: 1.6rem;
  }


</style>
