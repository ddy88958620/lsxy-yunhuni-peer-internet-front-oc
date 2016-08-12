<template>
  <div class="section_right">
    <div class="panel panel-default flex-1">
      <div class="panel-heading"><i class="iconfont icon-oc-app"></i>应用数据</div>
      <div class="panel-body flex flex-1">

        <div class='flex flex-1 flex-direction-column align-items-c justify-content-c'>
          <div class="flex  pie_wrap">
            <pie
              :max.syncs="a.total"
              :value.sync="a.total"
              :bgcolor="color[0]"
            ></pie>
          </div>
          <div class="flex  align-items-c title-box">
            总应用数（个）
          </div>
        </div>

        <div class="border-span flex align-items-c "><span></span></div>

        <div class='flex flex-1 flex-direction-column align-items-c justify-content-c'>
          <div class="flex  pie_wrap align-items-c ">
            <pie
              :max.sync="a.total"
              :value.sync="a.online"
              :bgcolor="color[1]"
            ></pie>
          </div>
          <div class="flex align-items-c title-box">
            总上线应用数（个)  {{a.total }}
          </div>
        </div>

      </div>
    </div>
  </div>

</template>
<script>
import { getAppCount } from '../../../../vuex/actions'
import pie from '../../../ui/pie.vue'


export default {
  vuex: {
    getters:{
      a: ({app}) => app
    },
    actions:{
      getAppCount
    }
  },
  data(){
    return {
      color:['#89d9e3','#80d1ff','#f4ebb6'],
    }
  },
  components: {
    pie
  },
  created(){
    this.getAppCount()
  },
  ready(){

    //this.getAppCount()
  }
}
</script>
<style lang="sass" scoped>
  .panel-heading{
    .iconfont{
      padding-right: 10px;
    }
  }

  .section_right {
    display: flex;
    flex: 2;
  }

  .border-span{
    span{
      height: 60px;
      padding: 0px 0;
      border-left: 1px solid #ddd;
    }
    width: 1px;
  }

  .panel-body{
    height: 160px;
    ul{
      width: 110px;
      overflow-y: hidden;
    }
  }

  .title-box{
    padding-top: 10px;
  }

</style>
