<template>
  <div class="rankbox flex flex-1 flex-direction-column flex-grow-1 ">
    <div class="flex justify-content-c overflow">
      <div class="hr-title">{{ box[index].title  }}</div>
    </div>
    <div>
      <div class="sort flex flex-direction-column {{ box[index]['color'] }}border">
        <div class=" ranking-one">
          <i class=" band inline-block {{ box[index]['color'] }}bg" >NO.1</i>
          <i class="icon iconfont icon-oc-member block  float-r {{ box[index]['color'] }}"></i>
        </div>
        <div class="flex flex-1 flex-direction-column ranking-two" >
         <span class="name overflow-y-h" v-if="rank.length === 0">暂无数据</span>
         <span class="name overflow-y-h cursor" v-link="'/admin/tenant/detail/'+rank[0].id" title="{{rank[0].name}}" v-else>{{rank[0].name}}</span>


          <div class="flex flex-1  align-items-c  " >
            <i class="iconfont {{box[index]['icon']}} grey"></i>
            <span class="count align-items-e">{{ rank.length === 0  ? '0' : rank[0].value }}</span>
            <span class="overflow-y-h">{{box[index]['unit']}}</span>
          </div>
        </div>
      </div>

      <div class="sort2 flex flex-1 flex-direction-column" >
        <div class="flex flex-1 ranking-three" title="{{ rank.length <= 1  ? '暂无数据' : rank[1].name }}" ><i class="number inline-block" title="" ><strong>2</strong></i>
         <span class="name overflow-y-h" v-if="rank.length <=1">暂无数据</span>
         <span class="name overflow-y-h cursor" v-link="'/admin/tenant/detail/'+rank[1].id"  v-else>{{rank[1].name}}</span>
        </div>
      </div>

      <div class="sort2 flex flex-1 flex-direction-column" >
        <div class="flex flex-1 ranking-three" title="{{ rank.length <= 2  ? '暂无数据' : rank[2].name }}" ><i class="number inline-block" title="" ><strong>3</strong></i>
         <span class="name overflow-y-h" v-if="rank.length <=2">暂无数据</span>
         <span class="name overflow-y-h cursor" v-link="'/admin/tenant/detail/'+rank[2].id"  v-else>{{rank[2].name}}</span>
        </div>
      </div>
    </div>


   <!--  <div>
      <div class="sort flex flex-direction-column {{ boxs[key]['color'] }}border">
        <div class="flex justify-content-b ranking-one">
          <i class="flex align-items-e band {{ boxs[key]['color'] }}bg" >NO.1</i>
          <i class="icon iconfont icon-oc-member {{ boxs[key]['color'] }}"></i>
        </div>
        <div class="flex flex-1 flex-direction-column ranking-two" v-if="$index==0">
          <span class="name overflow-y-h" title="{{r.name}}">{{.name ? r.name :'暂未获取数据'}}</span>
          <div class="flex flex-1  align-items-c  " >
            <i class="iconfont {{boxs[key]['icon']}} grey"></i>
            <span class="count align-items-e">{{datarank[0].value}}</span>
            <span class="overflow-y-h">{{boxs[key]['unit']}}</span>
          </div>
        </div>
      </div>

      <div class="sort2 flex flex-1 flex-direction-column" >
        <div class="flex flex-1 ranking-three" v-if="$index!=0"><i class="number flex" title="{{r.count}}{{box[index]['unit']}}" ><strong>{{r.rank}}</strong></i><span title="{{r.name}}" class="overflow-y-h">{{r.name}}</span></div>
      </div>
    </div> -->
  </div>
</template>

<script>
  export default {
    data(){
      return {
        box: [
          {
            title:'按会话量排名',
            color: 'green',
            icon: 'icon-oc-msg-small',
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
            title:'按话务周增量排名',
            color: 'purple',
            icon: 'icon-oc-mobile',
            unit: '(分钟)'
          },
          {
            title:'按会话周增量排名',
            color: 'pink',
            icon: 'icon-oc-msg-small',
            unit: '(次)'
          }
        ]
      }
    },
    props: {
      rank: {
        type: Array
      },
      index:{
        type:Number,
        default:0
      },

    },
    computed: {
    },
    ready(){}
  }
</script>


<style lang="sass" scoped>
  .rankbox{
    padding-top: 10px;
    font-size:1.6rem;

    .sort{
      background-color:#fff;
      border-top:4px solid #00A000;
      padding:10px;
      .ranking-one{
        color:#00A000;
        .band{
          padding: 2px 3px;
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

  }
</style>

