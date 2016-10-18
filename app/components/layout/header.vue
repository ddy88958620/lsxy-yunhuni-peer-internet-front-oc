<style lang='sass' scope>
  @import '../../scss/variable.scss';
  .app-header{
    position: fixed;
    left: 200px;
    right: 0;
    top: 0;
    bottom: 0;
    height:$header-height;
    border-bottom: 1px solid #eeeeee;
    box-shadow: #eee 0px 1px 1px;
    background: #eff5fa;
    color:#666;
    font-size: 1.4rem;
    z-index: 999;
    .nav-left{
	    float: left;
      padding-top: 15px;
    }
    .nav-right{
      float: right;
      width: 200px;
      padding-right: 15px;
      padding-top: 15px;
    }
    .matter{
      height: 45px;
       &:hover {
        .tipbar{
          display: block;
        }
       }
    }

    .tipbar{
      position: absolute;
      left: 185px;
      display: none;
      top:50px;
      min-width: 300px;
      #tringle-up{
        width: 0;
        height: 0;
        position: absolute;
        left:50%;
        margin-left: -5px;
        top:-5px;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 5px solid #dbe2ee;
      }

    }
    .topbar-btn{
      padding: 0px 10px;
      height: 45px;
      line-height: 30px;
    }
  }
</style>

<template>
  <header class='app-header '>
    <div class="nav-left  overflow">
      <div class="topbar-btn inline-block" >欢迎您来到云呼你运营中心 ，<div class="matter inline-block">您有&nbsp;3&nbsp;件事项未处理&nbsp;&nbsp;<i class="iconfont icon-oc-handle"></i>
        <div class="tipbar">
          <div id="tringle-up">

          </div>

          <div class="admin-table">
            <table class="table">
              <thead>
              <tr>
                <th>序号</th>
                <th>事件</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>1</td> <td>您有3个租户等待身份认证</td>
              </tr>
              <tr>
                <td>2</td> <td>您有3个放音文件等待审核</td>
              </tr>
              <tr>
                <td>3</td> <td>您有3个放音文件等待审核</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </div>
    <div class="nav-right">
      <search
        :value.sync= 'value'
        :action="search"
        placeholder='请输入会员名称'>
      </search>
    </div>
  </header>
</template>
<script>
import {localLogout} from '../../vuex/actions.js'
export default {
  data(){
    return{
      value: '',
    }
  },
  components: {
    'search': require('../ui/search-input.vue'),
  },
  methods:{
    search: function() {
      this.$route.router.go({
        name: 'tenantlist',
        query: {searchName: this.value}
      })
    }
  },
  ready(){
  }
}
</script>
