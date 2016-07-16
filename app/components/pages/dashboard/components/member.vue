<template>
  <div class="section_left">

    <div class="panel panel-default flex-1">
      <div class="panel-heading">会员数据</div>
      <div class="panel-body flex">
        <div class='flex-1'>
          <pie></pie>
        </div>
        <div class='flex-1'>
          <pie></pie>
        </div>
        <div class='flex-1'>
          <pie></pie>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import pie from './pie.vue'

export default {
  components: {
    pie
  },
}

</script>
<style>

.section_left {
  display: flex;
  flex: 3;
}

</style>
