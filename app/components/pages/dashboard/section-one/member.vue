<template>
  <div class="section_left" >
    <div class="panel panel-default flex-1">
      <div class="panel-heading"><i class="iconfont icon-oc-member"></i>会员数据</div>
      <div class="panel-body flex align-items-c justify-content-c">

        <div class='flex flex-1 ' >
          <div class="flex pie_wrap align-items-c ">
            <pie
              :max="member.regist_total"
              :value="member.regist_total"
              :bgcolor="color[0]"
              :uuid="'memberpie'"
              >
            </pie>
          </div>
          <div class="flex flex-1 ">
            <ul class="list-none-style flex flex-1 flex-direction-column  justify-content-c">
              <li>总注册会员 ( 个 )</li>
              <li>日 <i class="iconfont icon-oc-up"></i><span class='text-danger s-font'>{{member.regist_tatal_day}}</span></li>
              <li>周 <i class="iconfont icon-oc-up"></i><span class='text-danger s-font'>{{member.regist_tatal_week}}</span></li>
              <li>月 <i class="iconfont icon-oc-up"></i><span class='text-danger s-font'>{{member.regist_tatal_month}}</span></li>
            </ul>
          </div>
        </div>

        <div class="border-span flex align-items-c "><span></span></div>

        <div class='flex flex-1' >
          <div class="flex pie_wrap align-items-c">
            <pie
              :max="member.regist_total"
              :value="member.auth_total"
              :uuid="'memberpie2'"
              :bgcolor="color[1]" >
            </pie>
          </div>
          <div class="flex flex-1 align-items-c" >
            <ul class="list-none-style flex flex-1 flex-direction-column  justify-content-c">
              <li>总认证会员 ( 个 )</li>
              <li>日 <i class="iconfont icon-oc-up "></i><span class='text-danger s-font'>{{member.auth_total_day}}</span></li>
              <li>周 <i class="iconfont icon-oc-up "></i><span class='text-danger s-font'>{{member.auth_total_week}}</span></li>
              <li>月 <i class="iconfont icon-oc-up "></i><span class='text-danger s-font'>{{member.auth_total_month}}</span></li>
            </ul>
          </div>
        </div>

        <div class="border-span flex align-items-c "><span></span></div>

        <div class='flex flex-1'>
          <div class="flex pie_wrap align-items-c" >
            <pie
              :max="member.regist_total"
              :value="member.consume"
              :uuid="'memberpie3'"
              :bgcolor="color[2]">
            </pie>
          </div>
          <div class="flex flex-1 align-items-c" >
            <ul class="list-none-style flex flex-1 flex-direction-column  justify-content-c">
              <li>总产生消费会员 ( 个 )</li>
              <li>日 <i class="iconfont icon-oc-up "></i><span class='text-danger s-font'>{{member.consume_day}}</span></li>
              <li>周 <i class="iconfont icon-oc-up "></i><span class='text-danger s-font'>{{member.consume_week}}</span></li>
              <li>月 <i class="iconfont icon-oc-up "></i><span class='text-danger s-font'>{{member.consume_month}}</span></li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>
<script>
import { getMemberCount } from '../../../../vuex/actions'
import pie from '../../../ui/pie.vue'
export default {
  vuex:{
    getters:{
      membertest : ({ member }) =>member.count
    },
    actions:{
      getMemberCount
    }
  },
  data(){
    return {
      color:['#89d9e3','#80d1ff','#f4ebb6'],
      pie1: { 'max': 999,  'value': 100},
      pie2: { 'max': 1000, 'value': 200},
      pie3: { 'max': 1000, 'value': 500},
      member:{
        regist_total: 0,
        regist_tatal_day: 0,
        regist_tatal_week: 0,
        regist_tatal_month: 0,
        auth_total: 0,
        auth_total_day: 0,
        auth_total_week: 0,
        auth_total_month: 0,
        consume: 0,
        consume_day: 0,
        consume_week: 0,
        consume_month: 0
      }
    }
  },
  components: {
    pie
  },
  ready(){
    let self = this
    $.get('/dashboard/member/indicant').then((res) => {
          if(res.success==true){
            self.member = res.data
          }
     })
    //this.getMemberCount()
  }
}

</script>
<style lang='sass' scoped>
@import '../../../../scss/variable.scss';
.panel-heading{
  .iconfont {
    padding-right: 10px;
  }
}
.section_left {
  display: flex;
  flex: 3;
  margin-right: $admin-padding;
}

.pie_wrap {
  padding: 15px;
  width: 125px;
  padding-right: 0px;
}

.icon-oc-up{
  font-size: 8px;
}

.s-font{
  padding-left: 3px;
  font-size: 12px;
}

.border-span{
  span{
    height: 60px;
    padding: 0;
    border-left: 1px solid #ddd;
  }
  width: 1px;
}

.panel-body{
  height: 160px;
  ul{
    width: 110px;
    overflow-y: hidden;
  }
}

.panel-heading{
    font-size: 1.6rem;
  }

</style>
