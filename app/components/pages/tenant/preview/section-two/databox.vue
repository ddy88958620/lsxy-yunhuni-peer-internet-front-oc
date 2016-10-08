<template>
    <div v-for="data in databox" class="flex flex-1 flex-direction-column box border-right">
        <div class="flex flex-1 align-items-c ">
            <i class="icon iconfont {{box[$index].icon}} bigicon"></i>
            <span class="green money">{{ data.total }}</span>
            <i class="iconfont icon-oc-up"></i><span class='text-danger'>{{data.percent}}</span>
        </div>
        <div class="flex flex-1 middle-font-size middle-font-color">
            {{ box[$index].title }}{{ box[$index].unit }}
        </div>
    </div>

</template>

<script>
  export default{
    data(){
      return{
        box: [
          {
            title: '消费额',
            icon: 'icon-oc-wallet',
            unit: '(元)',
          },
          {
            title: '充值额',
            icon: 'icon-oc-recharge',
            unit: '(元)',
          },
          {
            title: '会话量',
            icon: 'icon-oc-mobile',
            unit: '(次)',
          },
          {
            title: '话务量',
            icon: 'icon-oc-msg1',
            unit: '(分钟)'
          },
          {
            title: '平均通话时长',
            icon: 'icon-oc-talktime',
            unit: '(分钟)'
          },
          {
            title: '接通率',
            icon: 'icon-oc-callrate',
            unit: '(%)'
          }
        ]
      }
    },
    props:{
      databox: {
         type: Array,
      }
    }
  }
</script>

<style lang="sass" scoped>
    .box{
        height: 140px;
        padding:20px;
    }

    .money{
      padding: 0 10px;
      font-size: 1.8rem;
    }

    .bigicon{
        font-size: 2.8rem;
    }
    .icon-oc-up,.icon-oc-down{
        font-size: 8px;
    }
    .border-right{
        border-right: 1px solid #ddd;
    }

</style>
