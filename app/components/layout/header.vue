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
    .topbar-btn{
      padding: 15px 10px;
    }
  }
</style>

<template>
  <header class='app-header '>
    <div class="nav-left  overflow">
      <span class="topbar-btn" >欢迎您来到云呼你运营中心<!-- ， 您有&nbsp;<a href="#">3</a>&nbsp;件事项未处理</span><i class="iconfont icon-oc-handle"></i> -->
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
}
</script>
