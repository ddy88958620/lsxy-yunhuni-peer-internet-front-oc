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
        height: 80px;
        padding: 5px 0;
        color:#333;
        .name{
          height: 30px;
          padding:5px 0;
        }
        .count{
          padding:0 5px 0 10px;
          font-size: 2.4rem;
        }
      }
    }
    .sort2{
       background-color:#fff;
      .ranking-three{
        height: 50px;
        padding:15px 10px;
        border-top:1px solid #f0f4fb;
        color:#666;
        .number{
          color:#bebebe;
          padding-right: 10px;
        }
      }
    }


    .title div {
      color: #212121;
      position: relative;   /*定位横线（当横线的父元素）*/
    }


    .title div:before, .title div:after{
      content: '';                 /*CSS伪类用法*/
      position: absolute;         /*定位背景横线的位置*/
      top: 51%;
      background: #ddd;       /*宽和高做出来的背景横线*/
      width: 30%;
      height: 1px;
    }
    .title div:before{
        left: -35%;
    }
    .title div:after {
      right: -35%;
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
  <div class="rankbox flex flex-1 flex-direction-column flex-grow-1 ">
    <div class="flex justify-content-c title overflow">
      <div>{{ box[index]['title'] }}</div>
    </div>
    <div v-for="r in datarank">
      <div class="sort flex flex-direction-column {{ box[index]['color'] }}border" v-if="$index==0">
        <div class="flex justify-content-b ranking-one">
          <i class="flex align-items-e band {{ box[index]['color'] }}bg" >NO.1</i>
          <i class="icon iconfont icon-oc-member {{ box[index]['color'] }}"></i>
        </div>
        <div class="flex flex-1 flex-direction-column ranking-two" v-if="$index==0">
          <span class="name overflow-y-h" title="{{r.name}}">{{r.name}}</span>
          <div class="flex flex-1  align-items-c  " >
            <i class="iconfont {{box[index]['icon']}} grey"></i>
            <span class="count align-items-e">{{r.count}}</span>
            <span class="overflow-y-h">{{box[index]['unit']}}</span>
          </div>
        </div>


      </div>
      <div class="sort2 flex flex-1 flex-direction-column" >
        <div class="flex flex-1 ranking-three" v-if="$index!=0"><i class="number flex" title="{{r.count}}{{box[index]['unit']}}" ><strong>{{r.rank}}</strong></i><span title="{{r.name}}" class="overflow-y-h">{{r.name}}</span></div>
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
            icon: 'icon-oc-msg',
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
