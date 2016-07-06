<style lang='sass' scoped>
form {
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%,-50%);
}
</style>
<template>
    <validator name="validation1">
      <form novalidate>
        <div class="username-field">
          <label for="username">username:</label>
          <input id="username" type="text" v-validate:username="['required']">
        </div>
        <div class="comment-field">
          <label for="comment">comment:</label>
          <input id="comment" type="text" v-validate:comment="{ maxlength: 256 }">
        </div>
        <div class="errors">
          <p v-if="$validation1.username.required">Required your name.</p>
          <p v-if="$validation1.comment.maxlength">Your comment is too long.</p>
        </div>
        <input type="submit" value="send">
      </form>
    </validator>

    <button @click='doshowMsg()'>showmsg</button>
    <button @click='hideMsg()'>hidemsg</button>

    <router-view></router-view>
</template>
<script>
import {showMsg,hideMsg} from '../../vuex/actions'

export default {
  vuex: {
    actions: {
      showMsg,
      hideMsg
    }
  },
  data(){
    return {
      msg: ''
    }
  },
  methods: {
    doshowMsg(){
      this.showMsg({
        content: 'content',
        title: 'title',
        type: 'error'
      })
    }
  }
}
</script>
