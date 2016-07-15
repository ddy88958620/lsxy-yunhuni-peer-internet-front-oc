<template>
  <div class="section_right">
    <div class="panel panel-default flex-1">
      <div class="panel-heading">应用数据</div>
      <div class="panel-body flex ">
        <div class='flex-1 flex justify-content'>
          <pie></pie>
        </div>
        <div class='flex-1 flex justify-content'>
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
  }
}
</script>
<style>

.section_right {
  display: flex;
  flex: 2;
}

</style>
