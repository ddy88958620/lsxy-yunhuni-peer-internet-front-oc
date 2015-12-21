<template>
  <textarea name="post" rows="8" cols="40" :value="content" @change='update_content' placeholder='content here....'></textarea>
  <button @click='new_post'>提交</button>
  <div class="">
  content:
  {{ content }}
  </div>
</template>

<script>
import store from '../store/editor'

export default {
  computed: {
    content(){
      return store.state.content
    }
  },
  methods: store.actions // extend the store methods
}

</script>
