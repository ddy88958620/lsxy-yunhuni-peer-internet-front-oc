<template>
  <div class="search-box flex flex-1">
    <input class="form-control search" 
      placeholder="{{placeholder}}" 
      :value.sync='value'
      type="text"
      id="{{uuid}}" />
    <i class="iconfont icon-oc-search cursor" ></i>
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
        searchName: '',
      }
    },
    props: {
      value:{
        twoWays:true,
        default:''
      },
      uuid:{
        type: String,
      },
      placeholder: {
        default: ''
      },
    },
    methods: {
      search(){
         
      },
      searchkeyup(){
        
      }
    },
    ready(){

    }
  }
</script>
