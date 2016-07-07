<style lang='sass'>
  @import '../../scss/variable.scss';
  .app-header {
    z-index: -1;
    display:flex;
    flex-direction: row;
    justify-content:center;
    background-color: #2E97CB;
    color:#FFF;
    position: fixed;
    min-height: $header-height;

    width: 100%;
    text-align: center;
    ul{
      margin: 0;
      padding: 0;
    }
    .nav-box{
      list-style: none;
    }
    .logobox{
      width: 200px;
    }
    .nav-left{
      display: flex;
      flex: 1;
      align-items: center;
      height: $header-height;
      .logo{
        width: 50px;
      }
    }
    .nav-right{
      display: flex;
      flex: 1;
      border:1px solid #000;
      height: $header-height;
      align-items: center;
      justify-content: flex-end;
      li{
        width: auto;
        padding:0 5px;
        &:hover{
           color:#FFF;
           background-color: #00799e;
         }
        a{
          cursor: pointer;
          color:#FFF;
        }
      }
    }
  }
</style>

<template>
  <header class='app-header'>
    <div class="logobox">
      <ul class="nav-box nav-left">
        <li class="logo">logo</li>
        <li>运营中心后台</li>
      </ul>
    </div>

    <ul class="nav-box nav-right">
      <li >欢迎您，<a href="">{{ msg }}</a>，今天，</li>
      <li ><a @click='doshowMsg()' >您有(3)件事项未处理</a></li>
      <li >(3)条未读</li>
      <li>退出</li>
    </ul>
  </header>
</template>


<script>
  import {showMsg,hideMsg} from '../../vuex/actions'
  export default {
    vuex: {
      actions: {
        showMsg,
        hideMsg
      }
    },
    data(){
      return {
        msg: 'admin'
      }
    },
    methods: {
      doshowMsg(){
        this.showMsg({
          content: 'content',
          title: 'title',
          type: 'error'
        })
      }
    }
  }
</script>
