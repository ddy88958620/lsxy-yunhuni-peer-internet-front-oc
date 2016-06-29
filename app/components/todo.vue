<template>
  <div>
    <input type="text" @keyup.enter='doAddTodo'/>
    <div v-for='todo in todos'>
      <span>{{ todo }}</span>
    </div>
  </div>
</template>
<script>
import {
 addTodo
} from '../vuex/actions.js'

export default {
  vuex: {
    getters: {
      todos: ({todo}) => todo.todos
    },
    actions: {
      addTodo
    }
  },
  data() {
    return {
      msg: 'hello'
    }
  },
  methods: {
    doAddTodo(e) {
      const value = e.target.value.trim()
      this.addTodo(value)
    }
  }
}
</script>
