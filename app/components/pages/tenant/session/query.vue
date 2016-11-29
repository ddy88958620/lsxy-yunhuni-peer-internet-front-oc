<template>
  <div>
  </div>
</template>

<script>
  export default{
    props: {
      app: {
        type:String,
        default:'',
      },
      time: {
        type:String,
        default:'',
      },
      data:[]
    },
    methods:{
      query(){
        console.log("查询")
      }
    },
    ready(){
      this.query()
    }
  }
</script>
