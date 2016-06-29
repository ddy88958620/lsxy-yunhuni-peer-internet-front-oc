<template>
  <div>
    <todo></todo>
  </div>
</template>
<script>
import store from '../vuex/store.js'
import todo from './todo.vue'
export default {
  store,
  components: {
    todo
  },
}
</script>
