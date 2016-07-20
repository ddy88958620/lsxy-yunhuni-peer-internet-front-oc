<style lang="sass" scoped>
  .rankbox{
    padding-top: 10px;
    font-size:1.6rem;
    .title{
      padding: 14px 0;
      span{
        color:#dddddd;
      }
    }
    .sort{
      background-color:#fff;
      border-top:4px solid #00A000;
      padding:10px;
      .ranking-one{
        color:#00A000;
        .band{
          padding: 0 3px;
          color:#FFF;
        }
        .icon{
          font-size:1.8rem;
        }
      }
      .ranking-two{
        padding: 5px 0;
        color:#333;
      }
    }
    .sort2{
       background-color:#fff;
      .ranking-three{
        padding:15px 10px;
        border-top:1px solid #f0f4fb;
        color:#666;
        .count{
          padding:0 5px 0 10px;
          font-size: 2.4rem;
        }
        .number{
          color:#bebebe;
          padding-right: 10px;
        }
      }
    }
    .grey{
      color:#b2b9ce;
    }
    .green{
      color:#76dcd8;
    }
    .greenbg{
      background-color:#76dcd8;
    }
    .greenborder{
      border-color: #76dcd8;
    }
    .blue{
      color:#80d1ff;
    }
    .bluebg{
      background-color:#80d1ff;
    }
    .blueborder{
      border-color: #80d1ff;
    }
    .yellow{
      color:#f9e993;
    }
    .yellowbg{
      background-color:#f9e993;
    }
    .yellowborder{
      border-color: #f9e993;
    }
    .purple{
      color:#cec2ed;
    }
    .purplebg{
      background-color:#cec2ed;
    }
    .purpleborder{
      border-color: #cec2ed;
    }
    .pink{
      color:#f1adc3;
    }
    .pinkbg{
      background-color:#f1adc3;
    }
    .pinkborder{
      border-color: #f1adc3;
    }
  }

</style>


<template>
  <div class="rankbox flex flex-direction-column flex-grow-1 ">
    <div class="flex justify-content-c title "><span>---</span>{{ box[index]['title'] }}<span>---</span></div>

    <div v-for="r in datarank">
      <div class="sort flex flex-direction-column {{ box[index]['color'] }}border" v-if="$index==0">
        <div class="flex  justify-content-b ranking-one">
          <i class="flex align-items-e band {{ box[index]['color'] }}bg" >NO.1</i>
          <i class="icon iconfont icon-oc-member {{ box[index]['color'] }}"></i>
        </div>
        <div class="flex flex-1 ranking-two">{{r.name}}</div>
      </div>
      <div class="sort2 flex flex-1 flex-direction-column" >
        <div class="flex flex-1 align-items-c ranking-three" v-if="$index==0">
          <i class="iconfont {{box[index]['icon']}} grey"></i>
          <span class="count align-items-e">{{r.count}}</span>
          <span>{{box[index]['unit']}}</span>
        </div>
        <div class="flex flex-1 ranking-three" v-if="$index!=0"><i class="number flex" ><strong>{{r.rank}}</strong></i><span>{{r.name}}</span></div>
      </div>
    </div>

  </div>
</template>
<style>

</style>
<script>
  export default {
    data(){
      return {
        box: [
          {
            title:'按会话量排名',
            color: 'green',
            icon: 'icon-oc-member',
            unit: '(次)'
          },
          {
            title:'按话务量排名',
            color: 'blue',
            icon: 'icon-oc-mobile',
            unit: '(分钟)'
          },
          {
            title:'按消费额排名',
            color: 'yellow',
            icon: 'icon-oc-wallet',
            unit: '(元)'
          },
          {
            title:'按会话周增量排名',
            color: 'purple',
            icon: 'icon-oc-msg',
            unit: '(次)'
          },
          {
            title:'按话务周增量排名',
            color: 'pink',
            icon: 'icon-oc-mobile',
            unit: '(分钟)'
          }
        ]
      }
    },
    props: {
      datarank: {
        type: Array,
      },
      index:{
        type:Number,
        default:0
      }
    },
    computed: {
    },
    ready(){
    }
  }
</script>
