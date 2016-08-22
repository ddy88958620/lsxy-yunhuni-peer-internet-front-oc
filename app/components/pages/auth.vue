<template>
    <validator  name="validation">
      <div class="flex flex-1 login-bg align-items-c justify-content-c ">
        <div class="flex login-form   flex-direction-column ">
          <div class="login-header flex justify-content-c align-items-c ">
            <img src="../../assets/images/loginlogo.png" alt="" width="277" height="83" class="flex">
          </div>
          <div class="login-content flex flex-1 justify-content-c">
            <form novalidate id='auth-form'>
              <div
                class="validate-field form-group relative ">
                <i class="iconfont icon-oc-login-user input-icon"></i>
                <input
                  value="user001"
                  type="text"
                  class='form-control form-input'
                  v-model='user.userName'
                  placeholder="请输入账号"
                  :id="username"
                  :field="username"
                  v-validate:username="{maxlength: 16, minlength: 3, required: true}">
                  <div class="error" v-if="$validation.username.modified">
                    <span v-if="$validation.username.required || $validation.username.maxlength || $validation.username.minlength">账号长度为3-16位</span>
                  </div>
              </div>

              <div
                class="validate-field form-group relative">
                <i class="iconfont icon-oc-login-pwd input-icon"></i>
                <input
                  value="123456"
                  type="password"
                  class='form-control form-input'
                  v-model='user.password'
                  placeholder="请输入密码"
                  :id="password"
                  :field="password"
                  v-validate:password="{maxlength:16, minlength: 3, required: true}">
                <div class="error" v-if="$validation.password.modified">
                  <span v-if="$validation.password.required || $validation.password.maxlength || $validation.password.minlength">密码长度为3-16位</span>
                </div>
              </div>

              <div class="validate-field form-group flex-direction-row flex">
                <div class="flex flex-1 relative">
                  <input
                    value="1234"
                    type="text"
                    class="form-control"
                    placeholder="请输入验证码"
                    v-model='user.code'
                    :id="code"
                    :field="code"
                    v-validate:code="{maxlength:6, minlength: 6, required: true}">
                  <div class="error" v-if="$validation.code.modified">
                    <span v-if="$validation.code.required || $validation.code.maxlength || $validation.code.minlength">验证码长度为6位</span>
                  </div>
                </div>
                <div class="flex  flex-1"><img :src="verCodeUrl" @click="refreshVerCode"/></div>
              </div>

              <div class="validate-field form-group flex mt-15">
                <input type="checkbox"    />  记住密码
              </div>

              <div class="form-group flex flex-1 mt-15">
                <button class="btn btn-login flex flex-1 justify-content-c" :disabled='!$validation.valid' @click.prevent='login($validation)'>登录</button>
              </div>

            </form>
          </div>


          <div class="copy flex justify-content-c" >Copyright 2016 云呼你 粤ICP备16048993号 All Rights Reserved 广州流水行云科技有限公司</div>
        </div>
      </div>



    </validator>
    <router-view></router-view>
</template>
<script>
import {showMsg, hideMsg, localLogin} from '../../vuex/actions'
import toaster from '../ui/toaster.vue'
import domain from '../../config/domain'
export default {
  data(){
    return{
      user: {
        userName: '',
        password: '',
        code:''
      },
      verCodeUrl:''
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
    },
    refreshVerCode(){
      this.verCodeUrl = domain.API_ROOT+'verCode?'+new Date().getTime()
    }
  },
  ready(){
    this.refreshVerCode()
  }
}
</script>
<style lang='sass' scoped>

.login-bg{
  background:url("../../assets/images/loginbg.jpg") no-repeat ;
  background-position: center top;
  background-attachment: fixed;
  background-size: cover;
}

.btn-login{
  background-color: #19406c;
  color:#FFF;
}

.btn-login[disabled]{
  opacity: 0.8;
}

.login-form{
  width: 907px;
  height: 644px;
  .login-header{
    height: 242px;
    background:url("../../assets/images/loginheader.jpg") no-repeat ;
  }
  .login-content{
    background-color: #eff0f5;

    .relative{
      position: relative;
    }

    .form-group{
      margin-top: 30px;
      width: 360px;
      input[type="text"],input[type="password"],button{
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
      .error {
        position: absolute;
        padding-top: 3px;
        right: 0;
        bottom:-18px;
        color:#c26060;
      }
    }

    .mt-15{
      margin-top: 15px;
    }

  }

  .copy{
    color:#FFF;
    padding-top: 20px;
    padding-bottom: 20px;
  }
}



.validate-field {

  .pristine.invalid {
    border: 0;
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
