<style lang='sass' scope>
@import '../../scss/font.scss';
@import '../../scss/mixin.scss';
@import '../../scss/variable.scss';
.app-sidebar {
  width: $sidebar-width;
  background-color: #616b88;
  color: #d9dbe8;
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
    border-top:1px solid transparent;
    border-bottom:1px solid #444f70;
    padding-left: 48px;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 1.4rem;

    .logo-box{
      height: 110px;
      font-size: 1.6rem;
      background-color: #586381;
      .logo{
        width: 50px;
        height: 60px;
        padding: 10px 0;
      }
    }

    .avatar-box{
      height: 180px;
      padding-top: 10px;
      .canvas{
        @include circlebox(50px);
        border:1px solid #2a303e;
        img{
          @include circlebox(40px);
        }
      }
      .identity{
        padding: 10px 0 0 0;
      }
    }

    li {
      .sub{
        width: 100%;
        padding: 15px 15px 15px 50px;
        &:hover{
          @extend .active;
        }
        i{
          padding-right: 10px;
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
  <aside class='app-sidebar'>
    <ul class="flex-direction-column-reverse fex fex-1 ">
      <li class="logo-box flex flex-direction-column justify-content-c align-items-c border">
        <img src="../../assets/images/logo.png" class="logo " />
        <span>云呼你运营中心</span>
      </li>
      <li class="avatar-box flex justify-content-c align-items-c flex-direction-column border">
        <div class="canvas flex justify-content-c align-items-c ">
          <img class="avatar" src="../../assets/images/avatar.png" />
        </div>
        <a class="flex flex-1 identity text-center cursor text-none" title='管理员'>管理员</a>
        <a class="flex flex-1 iconfont icon-oc-user cursor text-none" @click='localLogout' title='退出'></a>
      </li>
      <li class="flex" v-for='menu in menus'>
        <a class="sub border" v-link="menu.link">
          <i class="iconfont {{menu.icon}}"></i>
          {{ menu.title }}</a>
      </li>
    </ul>
  </aside>
</template>
<script>
import menus from '../../config/menu.js'
import {localLogout} from '../../vuex/actions.js'
export default {
  data() {
    return {
      menus: menus,
    }
  },
  vuex:{
    actions: {
      localLogout
    }
  }
}

</script>
