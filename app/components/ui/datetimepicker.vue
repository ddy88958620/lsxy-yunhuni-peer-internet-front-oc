<template>
<div class="input-group date">
    <input
    type="text"
    :value.sync='date'
    class="datepicker _month form-control"
    data-date-end-date="0m" />
    <div class="input-group-addon">
      <span class="iconfont icon-oc-date"></span>
    </div>
</div>
</template>
<script>
require("bootstrap-datepicker")

export default {
  data(){
    return {
      date: ''
    }
  },
  watch: {
    time(value){
      console.log(value)
    }
  },
  ready(){
    const self = this
    // 当前日期
    let date = new Date()

    $('._month').datepicker({
      language: "zh-CN",
      format: 'yyyy-mm',
      startView: "months",
      minViewMode: "months",
      todayHighlight: true,
      todayBtn: true,
      autoclose: true //fail
    }).on('changeDate',function(e){
      $(this).datepicker('hide')

      self.date = $(this)[0].value
    });

    // 默认当前月份
    var str = date.getFullYear() + '-' + (date.getMonth()+1)
    self.date = str
  }
}
</script>
<style lang='sass' scoped>
@import '~bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';

.form-control {
  display: inline-block;
}

div.date {
  width: 120px;
  input {
    border-right: none;
  }
}

.input-group-addon {
  background: none;
  border-left: none;
}

</style>
