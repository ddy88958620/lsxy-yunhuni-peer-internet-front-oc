<template>


  <section class='section-two flex bg-section-margin flex-direction-column justify-content-s '>
    <div class="panel panel-default flex-1">
      <div class="panel-heading">上月数据</div>
      <div class="panel-body flex flex-1">
        <div class="flex flex-1 flex-direction-row justify-content-b">
          <databox :databox="alldata"></databox>
        </div>
      </div>
    </div>
  </section>
    
    
</template>
<style lang="sass" scoped>
  .section-two {
    .box{
      height: 140px;
      padding:20px;
    }

    .money{
      font-size: 1.8rem;
    }

    .bigicon{
      font-size: 2.8rem;
    }
    .icon-oc-up,.icon-oc-down{
      font-size: 8px;
    }
  }


</style>
<script>
  export default{
    components:{
      'databox': require('./databox.vue'),
      'modal': require('../../../../ui/modal.vue')
    },
    data(){
      return{
        showModal: false,
        alldata:[
          {total:'54365.33',percent:'20%',trend:'0'},
          {total:'1200',percent:'20%',trend:'1'},
          {total:'300',percent:'20%',trend:'1'},
          {total:'111',percent:'20%',trend:'0'},
          {total:'111',percent:'20%',trend:'0'},
          {total:'99%',percent:'20%',trend:'0'}
        ]
      }
    }
  }
</script>
