<style>

button{
  color: black;
}

</style>
<template id="">
  获取TODO_LIST <button v-on:click='get_list'> get </button>

  <ul>
    <li v-for='todo in todo_list'> {{ todo.message }}</li>
  </ul>

 {{ data | json 2}}
</template>

<script>
export default {
  data(){
    return {
      todo_list: []
    }
  },
  methods: {
    get_list:function(){

        let that = this

        $.get('todos/').then((data)=>{
          that.todo_list =  data
        },(fail) => {

      })
    }
  },
  route: {
    data: function(){
      console.log('route init')
    }
  }
}
</script>
