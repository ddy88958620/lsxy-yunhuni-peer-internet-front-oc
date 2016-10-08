<style lang="sass" scoped>
  .headbox{
    background-color: white;
    padding-left: 15px;
    color:#666;
    height: 65px;
	  line-height: 65px;
    font-size: 1.6rem;
    i{

    }
  }
</style>

<template>
  <div class="headbox">
    <span class="m-title">
      <i class="iconfont icon-oc-ranking"></i>
      活跃会员排名
    </span>
    <span class="float-r admin-padding-l-r cursor " v-link="'/admin/tenant'">更多</span>
  </div>
</template>
