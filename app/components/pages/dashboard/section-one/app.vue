<template>
  <div class="section_right">
    <div class="panel panel-default flex-1">
      <div class="panel-heading"><i class="iconfont icon-oc-app"></i>应用数据</div>
      <div class="panel-body flex">

        <div class='flex flex-1 append-solid flex-direction-column align-items-c'>
          <div class="flex-1 pie_wrap">
            <pie
              :max="pie1.max",
              :value="pie1.value",
              :bgcolor="color[0]"
            ></pie>
          </div>
          <div class="flex flex-1 align-items-c">
            总应用数（个）
          </div>
        </div>


        <div class='flex flex-1 flex-direction-column align-items-c'>
          <div class="flex-1 pie_wrap ">
            <pie
              :max="pie2.max",
              :value="pie2.value",
              :bgcolor="color[1]"
            ></pie>
          </div>
          <div class="flex flex-1 align-items-c">
            总上线应用数（个）
          </div>
        </div>

      </div>
    </div>
  </div>

</template>
<script>
  import pie from '../../../ui/pie.vue'

export default {
  data(){
    return {
      color:['#89d9e3','#80d1ff','#f4ebb6'],
      pie1: { 'max': 1000, 'value': 400 },
      pie2: { 'max': 1000, 'value': 600 }
    }
  },
  components: {
    pie
  }
}
</script>
<style lang="sass" scoped>
  .panel-heading{
    .iconfont{
      padding-right: 10px;
    }
    color:#666;
    font-size: 1.6rem;
  }
  .section_right {
    display: flex;
    flex: 2;
  }
</style>
