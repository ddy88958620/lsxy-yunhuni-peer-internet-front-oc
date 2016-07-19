<style lang="sass">
  .rankbox{
    border:1px solid #000;
    width: 300px;
    font-size:1.6rem;

    .sort{
      background-color:#fff;
      border-top:4px solid #00A000;
      padding:10px;
      .band{
        padding: 5px;
        background-color:#00A000;
      }
    }
  }

</style>


<template>
  <div class="rankbox flex flex-direction-column  ">
    <div class="flex justify-content-c">按会话量排名</div>
    <div class="sort flex flex-1 flex-direction-column ">
      <div class="flex flex-1 justify-content-b">
        <span class="band">NO.1</span>
        <i class="iconfont icon-oc-user"></i>
      </div>
      <div class="flex flex-1">流水行云科技有限公司</div>
      <div class="flex flex-1"><i class="" ></i>44465685（次）</div>
      <div class="flex flex-1"><span>2</span> 流水行云科技有限公司 </div>
      <div class="flex flex-1"><span>3</span>流水行云科技有限公司</div>
    </div>
  </div>
</template>
<style>

</style>
<script>
  export default {
    props: {
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      value: {
        type: Number,
        default: 50
      },
      bgcolor: {
        type: String,
        defualt: '#89d9e3'
      },
      height: {
        type: String,
        default: '80px'
      },
      weight: {
        type: String,
        defualt: '80px'
      }
    },
    computed: {
      angleOffset(){

      }
    },
    ready(){

    }
  }
</script>
