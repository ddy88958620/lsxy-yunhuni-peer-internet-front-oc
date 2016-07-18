<style lang='sass' scope>
  @import '../../scss/variable.scss';
  .app-header{
    height:$header-height;
    border-bottom: 1px solid #eeeeee;
    color:#666;
    font-size: 1.4rem;
    .nav-right{
      width: 200px;
    }
    .topbar-btn{
      padding: 17px 10px;
      cursor: pointer;
    }
  }
</style>

<template>
  <header class='app-header flex align-items-c'>

    <div class="nav-left flex flex-1 justify-content-s align-items-c overflow">
      <span class="topbar-btn flex" >欢迎您来到云呼你运营中心,您有 <span>3</span> 件事项未处理</span>
    </div>
    <div class="nav-right">
      <div class=" flex flex-1 align-items ">
        <input class="form-control" placeholder="搜索"  />
      </div>
    </div>

  </header>
</template>
<script>
import {localLogout} from '../../vuex/actions.js'
export default {
  vuex: {
    actions: {

    }
  }
}
</script>
