<template>
  <div class="section_right">
    <div class="panel panel-default flex-1">
      <div class="panel-heading">应用数据</div>
      <div class="panel-body flex">
        <div class='flex flex-1 append-solid'>
          <div class="flex-1 pie_wrap">
            <pie
              :max="pie1.max",
              :value="pie1.value",
              :bgcolor="color[0]"
            ></pie>
          </div>
          <div class="flex flex-1 align-items-c">
            <ul class="list-none-style">
              <li>总注册会员 ( 个 )</li>
              <li>日 <span class='text-danger'>11</span></li>
              <li>周 <span class='text-danger'>77</span></li>
              <li>月 <span class='text-danger'>308</span></li>
            </ul>
          </div>
        </div>
        <div class='flex flex-1 append-solid'>
          <div class="flex-1 pie_wrap">
            <pie
              :max="pie2.max",
              :value="pie2.value",
              :bgcolor="color[1]"
            ></pie>
          </div>
          <div class="flex flex-1 align-items-c">
            <ul class="list-none-style">
              <li>总注册会员 ( 个 )</li>
              <li>日 <span class='text-danger'>11</span></li>
              <li>周 <span class='text-danger'>77</span></li>
              <li>月 <span class='text-danger'>308</span></li>
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
      pie1: { 'max': 1000, 'value': 400 },
      pie2: { 'max': 1000, 'value': 600 }
    }
  },
  components: {
    pie
  }
}
</script>
<style>

.section_right {
  display: flex;
  flex: 2;
}

</style>
