<template>
  <div class="section_left">
    <div class="panel panel-default flex-1">
      <div class="panel-heading"><i class="iconfont icon-oc-member"></i>会员数据</div>
      <div class="panel-body flex align-items-c justify-content-c">

        <div class='flex flex-1 '>
          <div class="flex pie_wrap align-items-c">
            <pie
              :max="pie1.max",
              :value="pie1.value",
              :bgcolor="color[0]"
              >
            </pie>
          </div>
          <div class="flex flex-1 ">
            <ul class="list-none-style flex flex-direction-column  justify-content-c">
              <li>总注册会员 ( 个 )</li>
              <li>日 <i class="iconfont icon-oc-up"></i><span class='text-danger s-font'>11</span></li>
              <li>周 <i class="iconfont icon-oc-up"></i><span class='text-danger s-font'>77</span></li>
              <li>月 <i class="iconfont icon-oc-up"></i><span class='text-danger s-font'>308</span></li>
            </ul>
          </div>
        </div>

        <div class="border-span flex align-items-c "><span></span></div>

        <div class='flex flex-1 '>
          <div class="flex pie_wrap align-items-c">
            <pie style="font-size: 1.4rem;"
              :max="pie2.max",
              :value="pie2.value",
              :bgcolor="color[1]">
            </pie>
          </div>
          <div class="flex flex-1 align-items-c" >
            <ul class="list-none-style flex flex-direction-column  justify-content-c">
              <li>总注册会员 ( 个 )</li>
              <li>日 <i class="iconfont icon-oc-up "></i><span class='text-danger s-font'>22</span></li>
              <li>周 <i class="iconfont icon-oc-up "></i><span class='text-danger s-font'>77</span></li>
              <li>月 <i class="iconfont icon-oc-up "></i><span class='text-danger s-font'>308</span></li>
            </ul>
          </div>
        </div>

        <div class="border-span flex align-items-c "><span></span></div>

        <div class='flex flex-1'>
          <div class="flex pie_wrap align-items-c" >
            <pie
              :max="pie3.max",
              :value="pie3.value",
              :bgcolor="color[2]">
            </pie>
          </div>
          <div class="flex flex-1 align-items-c" >
            <ul class="list-none-style flex flex-direction-column  justify-content-c">
              <li>总注册会员 ( 个 )</li>
              <li>日 <i class="iconfont icon-oc-up"></i><span class='text-danger s-font'>22</span></li>
              <li>周 <i class="iconfont icon-oc-up"></i><span class='text-danger s-font'>77</span></li>
              <li>月 <i class="iconfont icon-oc-up"></i><span class='text-danger s-font'>308</span></li>
            </ul>
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
      pie1: { 'max': 999,  'value': 100},
      pie2: { 'max': 1000, 'value': 200},
      pie3: { 'max': 1000, 'value': 500}
    }
  },
  components: {
    pie
  },
}

</script>
<style lang='sass' scoped>
@import '../../../../scss/variable.scss';
.panel-heading{
  .iconfont {
    padding-right: 10px;
  }
}
.section_left {
  display: flex;
  flex: 3;
  margin-right: $admin-padding;
}

.pie_wrap {
  padding: 15px;
  width: 125px;
  padding-right: 0px;
}

.icon-oc-up{
  font-size: 8px;
}

.s-font{
  padding-left: 3px;
  font-size: 12px;
}

.border-span{
  span{
    height: 60px;
    padding: 0;
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

</style>
