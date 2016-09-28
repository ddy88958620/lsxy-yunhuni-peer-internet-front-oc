<style lang='sass' scope>
@import '../../scss/mixin.scss';
@import '../../scss/variable.scss';
.app-sidebar {
  width: $sidebar-width;
  background-color: #616b88;
  color: #d9dbe8;
  position: fixed;
  height: 100%;

  a {
    color: #d9dbe8;
  }
  .border{
    border-top:1px solid #7f8ca5;
    border-bottom:1px solid #505b7b;
  }
  .active{
    border-left: 3px solid #f6f883;
    background-color: #515a76;
    color: #fff;
    border-top: 1px solid transparent;
    border-bottom:1px solid #444f70;
    padding-left: 47px;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 1.4rem;

    .logo-box{
      height: 110px;
      font-size: 1.6rem;
      border-bottom:1px solid #505b7b;
      background-color: #586381;
      .logo{
        width: 50px;
        height: 60px;
        padding: 10px 0;
      }
    }

    .avatar-box{
      height: 180px;
      padding-top: 15px;
      .canvas{
        width: 96px;
        height: 96px;
        background: url('../../assets/images/avatar_bg.png') no-repeat ;
        img{
          @include circlebox(40px);
        }
      }
      .identity{
        padding: 10px 0 0 0;
      }
      .exitbox{
        font-size: 1.8rem;
        padding-bottom: 10px;
      }
    }
    
    .submenu{
      width: 20px;
      height: 14px;
      background: url('../../assets/images/menu_bg.png') no-repeat ;
    }
    
    .menu-box{
      .iconfont{
        color:#515a76;
        font-size: 1rem !important;
      }
      height: 24px;
    }

    li {
      .sub{
        width: 100%;
        height: 46px;
        line-height: 46px;
        padding: 0 15px 0 50px;
        &:hover{
          @extend .active;
        }
        i{
          padding-right: 12px;
        }
      }
      a.v-link-active {
        @extend a;
        @extend .active;
      }
    }

  }
}
</style>
<template>
  <aside class='app-sidebar height-100'>
    <ul class="height-100">
      <li class="logo-box text-align-c position-layout">
        <div class="position-center width-100">
          <img src="../../assets/images/logo.png" class="logo " /><br/>
          <span>云呼你运营中心</span>
        </div>
      </li>
      <li class="avatar-box position-layout">
	      <div class="position-center width-100 text-align-c ">
          <div class="canvas table-container position-layout">
            <img class="avatar position-center" src="../../assets/images/avatar.png"/>
          </div>
          <a class="block identity text-center cursor text-none" title='管理员'>管理员</a>
          <a class="block inline-block exitbox iconfont icon-oc-exit cursor text-none" @click='localLogout' title='退出'></a>
        </div>
      </li>
      <li class="menu-box border width-100 position-layout">
        <i class="submenu inline-block position-center"></i>
      </li>
      <li class="block " v-for='menu in menus'>
        <a class="block sub border align-items-c " v-link="menu.link">
          <i class="iconfont {{menu.icon}}"></i>{{ menu.title }}
          <span class="menu-count" v-if="menu.label=='Custom' && num.awaitService!=0" >{{num.awaitService}}</span>
          <span class="menu-count" v-if="menu.label=='Finance' && num.awaitInvoice!=0" >{{num.awaitInvoice}}</span>
          <span class="menu-count" v-if="menu.label=='Demand' && num.awaitDemand!=0" >{{num.awaitDemand}}</span>
          </a>
      </li>
    </ul>
  </aside>
</template>
<script>
import menus from '../../config/menu.js'
import {localLogout,getMessageNum} from '../../vuex/actions.js'
export default {
  data() {
    return {
      menus: menus,
    }
  },
  methods:{
    getNum(){
      let self = this;
      $.get('/message/await/num').then((res)=> {
        if(res.success){
          self.num = res.data
        }
      })
    }
  },
  vuex:{
    actions: {
      localLogout,
      getMessageNum
    },
    getters:{
      num: ({message}) => message.num
    },
  }
}

</script>
