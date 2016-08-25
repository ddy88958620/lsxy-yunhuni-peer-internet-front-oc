<style>
  .headbox{
    background-color: white;
    padding-left: 15px;
    color:#666;
    height: 65px;
    font-size: 1.6rem;
    i{

    }
  }
</style>

<template>
  <div class="headbox flex flex-1 align-items-c justify-content-b">
    <span class="m-title">
      <i class="iconfont icon-oc-ranking"></i>
      活跃会员排名
    </span>
    <span class="flex admin-padding-l-r cursor" v-link="'/admin/tenant'">更多</span>
  </div>
</template>
