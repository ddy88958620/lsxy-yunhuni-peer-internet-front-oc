<template>
    <section class="section-three flex  bg-section-margin">
     <div class="flex section-left flex-direction-column ">
          <div class="flex flex-1 flex-1align-items-c flex-direction-column session-small-box">
            <div>
              <span>icon</span>
              <span class='admin-font-color'>548465</span>
            </div>
            <ul class="list-none-style">
              <li>总注册会员 ( 个 )</li>
              <li>日 <span class='text-danger'>11</span></li>
              <li>周 <span class='text-danger'>77</span></li>
              <li>月 <span class='text-danger'>308</span></li>
            </ul>
          </div>
           <div class="flex flex-1 flex-1align-items-c flex-direction-column session-small-box">
             <div>
               <span>icon</span>
               <span class='admin-font-color'>548465</span>
             </div>
             <ul class="list-none-style">
               <li>总注册会员 ( 个 )</li>
               <li>日 <span class='text-danger'>11</span></li>
               <li>周 <span class='text-danger'>77</span></li>
               <li>月 <span class='text-danger'>308</span></li>
             </ul>
           </div>
     </div>
     <div class="flex flex-1 section-right">
       <datetime-picker :type="bar"></datetime-picker>
       <div class="flex-1">
         <chart></chart>
       </div>
     </div>

    </section>
</template>
<script>
  export  default {
    data(){
      return{}
    },
    components: {
      'chart': require('../../../ui/chart.vue'),
      'datetime-picker': require('../../../ui/datetimepicker.vue')
    }
  }
</script>
<style lang='sass'>

.section-three {
  background-color: white;

  .section-left {
    width: 200px;
  }
  .session-small-box {
    padding: 30px;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
}


</style>
