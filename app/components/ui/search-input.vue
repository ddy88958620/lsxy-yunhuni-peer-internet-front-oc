<template>
  <div class="search-box flex flex-1">
    <input class="form-control search" placeholder="{{placeholder}}" @keyup.enter="search" v-model="searchName" value="{{ searchName }}"/>
    <i class="iconfont icon-oc-search cursor" @click='search'></i>
  </div>
</template>

<style lang="sass" scoped>
  .search-box{
    position: relative;
    i{
      position: absolute;
      right:5px;
      top:5px;
      color:#d4d4d4;
      font-size: 1.8rem;
    }
  }
</style>

<script>
  export default {
    data(){
      return{
        searchName: ''
      }
    },
    props: {
      placeholder: {
        default: ''
      },
    },
    methods: {
      search(){
         console.log('搜索内容'+searchName);
      }
    },
    ready(){
      console.log(this.$data);
    }

  }

</script>
