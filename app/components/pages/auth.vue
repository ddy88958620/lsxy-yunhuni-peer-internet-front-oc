<template>
    <validator name="validation">
      <div class="flex flex-1 login-bg align-items-c justify-content-c ">
        <div class="flex login-form   flex-direction-column ">
          <div class="login-header flex justify-content-c align-items-c ">
            <img src="../../assets/images/loginlogo.png" alt="" width="277" height="83" class="flex">
          </div>
          <div class="login-content flex flex-1 justify-content-c">
            <form novalidate id='auth-form'>


              <div
                class="validate-field form-group relative ">
                <i class="iconfont icon-oc-user input-icon"></i>
                <input
                  type="text"
                  class='form-control form-input'
                  v-model='user.name'
                  placeholder="请输入账号"
                  :id="username"
                  :field="username"
                  v-validate:username="{maxlength: 16, minlength: 3, required: true}">
              </div>

              <div
                class="validate-field form-group relative">
                <i class="iconfont icon-oc-user input-icon"></i>
                <input
                  type="password"
                  class='form-control form-input'
                  v-model='user.password'
                  placeholder="请输入密码"
                  :id="password"
                  :field="password"
                  v-validate:password="{maxlength:16, minlength: 3, required: true}">
              </div>

              <div class="validate-field form-group flex-direction-row flex">
                <input type="text" class="form-control flex flex-1 "   placeholder="请输入验证码" />
                <div class="flex  flex-1"></div>
              </div>

              <div class="validate-field form-group flex mt-15">
                <input type="checkbox"   />  记住密码
              </div>

              <div class="form-group flex flex-1 mt-15">
                <button class="btn btn-primary flex flex-1 justify-content-c" :disabled='!$validation.valid' @click.prevent='login($validation)'>登录</button>
              </div>



            </form>
          </div>
        </div>
      </div>


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
<style lang='sass' scoped>

.login-bg{
  background:url("../../assets/images/loginbg.jpg") no-repeat ;
  background-position: center bottom;
  background-attachment: fixed;
}

.login-form{
  width: 907px;
  height: 604px;
  .login-header{
    height: 242px;
    background:url("../../assets/images/loginheader.jpg") no-repeat ;
  }
  .login-content{
    background-color: #f3f4f9;

    .relative{
      position: relative;
    }

    .form-group{
      margin-top: 30px;
      width: 360px;
      input[type="text"],input[type="password"],button{
        border: 0;
        height: 44px;
      }
      .form-input{
        padding-left: 40px;
      }
      .input-icon{
        position: absolute;
        z-index: 1;
        top:12px;
        left: 15px;
        color:#dddddd;

      }
    }
    .mt-15{
      margin-top: 15px;
    }

  }

}



#auth-form2 {
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%,0%);
}

.validate-field {


  .pristine.invalid {
    border-color: #ccc;
    box-shadow: none;
  }

  .invalid {
    border-color: #a94442;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  }
  .valid {
    border-color: #3c763d;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  }
}

</style>
