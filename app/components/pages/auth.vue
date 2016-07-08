<template>
    <validator name="validation">
      <form novalidate>
        <div 
          class="validate-field form-group"
          >
          <label :for="usernmae">用户名</label>
          <input 
            type="text"
            class='form-control'
            v-model='user.name'
            :id="username" 
            :placeholder=""
            :field="username"
            v-validate:username="{maxlength: 16, minlength: 3, required: true}">
        </div>
        <div 
          class="validate-field form-group"
          <label :for="password">密码</label>
          <input 
            type="password"
            class='form-control'
            v-model='user.password'
            :id="password" 
            :placeholder=""
            :field="password"
            v-validate:password="{maxlength:16, minlength: 3, required: true}">
        </div>
        <button class="btn btn-primary" :disabled='!$validation.valid' @click='login($validation)'>登入</button>
        <pre>{{ $validation | json }}</pre>
      </form>
    </validator>
    <router-view></router-view>
</template>
<script>
import {showMsg, hideMsg, localLogin} from '../../vuex/actions'
import toaster from '../ui/toaster.vue'

export default {
  data(){
    return{
      user: {
        name: '',
        password: ''
      }
    }
  },
  components: {
    toaster
  },
  vuex: {
    getters: {
      messege: ({showmsg}) => showmsg.message
    },
    actions: {
      showMsg,hideMsg,localLogin
    }
  },
  methods: {
    login(val) {
      if(val.valid) {
        this.localLogin(this.user)
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
form
  position: absolute
  left: 50%
  top: 30%
  transform: translate(-50%,0%)

.validate-field
  .pristine.invalid
    border-color: #ccc
    box-shadow: none
  .invalid
    border-color: #a94442
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075)
  .valid
    border-color: #3c763d
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075)
</style>
