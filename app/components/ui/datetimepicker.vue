<template>
<div class="input-group date-component">
    <input
    type="text"
    :value.sync='date'
    class="datepicker _month form-control"
    data-date-end-date="0m" />
    <span class="iconfont icon-oc-date"></span>
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
    }).on('changeDate',function(e){
      $(this).datepicker('hide')

      let currenSelectDate = $(this)[0].value
      console.log(currenSelectDate);
      self.date = currenSelectDate ? currenSelectDate : self.date
    });

    // 默认当前月份
    let month = date.getMonth()+1
    let fmtMonth = month.length > 1 ? month : `0${month}`
    let str = date.getFullYear() + '-' + fmtMonth

    self.date = str
  }
}
</script>
<style lang='sass'>
@import '~bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';

.date-component {
  width: 120px;
  background-color: white;
  display: inline-block;
  position: relative;
  span {
    font-size: 2.2rem;
    position: absolute;
    right: 8px;
    top: 2px;
    z-index: 2;
  }
  .form-control {
    display: inline-block;
  }
}

.input-group-addon {
  background: none;
  border-left: none;
}

</style>
