<template>
  <div class="section_left">
    <div class="panel panel-default flex-1">
      <div class="panel-heading">会员数据</div>
      <div class="panel-body flex">
        <div class='flex flex-1 append-solid'>
          <div class="flex-1 pie_wrap">
            <pie
              :max="pie1.max",
              :value="pie1.value"
              >
            </pie>
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
              :value="pie2.value">
            </pie>
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
        <div class='flex flex-1'>
          <div class="flex-1 pie_wrap">
            <pie
              :min="pie3.min",
              :max="pie3.max",
              :value="pie3.value">
            </pie>
          </div>
          <div class="flex flex-1 align-items-c">
            <ul class="list-none-style">
              <li>总注册会员 ( 个 )</li>
              <li>日 11</li>
              <li>周 77</li>
              <li>月 308</li>
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
      pie1: { 'max': 999,  'value': 499},
      pie2: { 'max': 1000, 'value': 200},
      pie3: { 'max': 1000, 'value': 500}
    }
  },
  components: {
    pie
  },
}

</script>
<style lang='sass'>

@import '../../../../scss/variable.scss';

.section_left {
  display: flex;
  flex: 3;
  margin-right: $admin-padding;
}

.pie_wrap {
  padding: 15px;
  padding-right: 0px;
}

.append-solid::after {
  border: solid 1px rgba(0, 0, 0, 0.05);
  content: '';
  height: 50%;
  display: flex;
  align-self: center;
}

</style>
