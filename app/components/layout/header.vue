<style lang='sass'>
  @import '../../scss/variable.scss';
  .app-header {
    display:flex;
    flex-direction: row;
    justify-content:center;
    background-color: #2E97CB;
    color:#FFF;
  //border: 1px solid red;
    position: fixed;
    min-height: $header-height;
    line-height: $header-height;
    width: 100%;
    text-align: center;
    ul{
      margin: 0;
      padding: 0;
    }
    .nav-box{
      list-style: none;
    }
    .nav-left{
      display:flex;
      width: 50%;
      height: $header-height;
      justify-content: flex-start;
      align-items: flex-start;
    }

    .logo{
      width: 50px;
      height: $header-height;
    }
    .nav-right{
      display: flex;
      width: 50%;
      height: $header-height;
      justify-content: flex-end;
      align-items: flex-end;
      align-content: flex-end;
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

    <ul class="nav-box nav-left">
      <li class="logo">logo</li>
      <li>运营中心后台</li>
    </ul>
    <ul class="nav-box nav-right">
      <li >欢迎您，<a href="">admin</a>，今天，</li>
      <li ><a>您有(3)件事项未处理</a></li>
      <li >(3)条未读</li>
      <li>退出</li>
    </ul>
  </header>
</template>

<script>
</script>
