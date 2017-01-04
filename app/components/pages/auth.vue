<template>
    <validator  name="validation">
      <div class="table-layout login-bg">
        <div class="table-cell">
          <div class="table-container login-form">
						<div class="login-header table-layout">
							<div class="table-cell">
								<img class="table-container" src="../../assets/images/loginlogo.png" alt="" width="277" height="83">
							</div>
						</div>
						<div class="login-content position-layout">
							<form novalidate id='auth-form' class="position-center" autocomplete="on">
								<div
									class="validate-field form-group relative ">
									<i class="iconfont icon-oc-login-user input-icon"></i>
									<input
										type="text"
                    name='username'
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
										type="password"
                    name='password'
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
									<div class="relative inline-block">
										<input
											value=""
											type="text"
											class="form-control vercode"
											placeholder="请输入验证码"
											v-model='user.code'
											:id="code"
											:field="code"
											v-validate:code="{maxlength:4, minlength: 4, required: true}">
										<div class="error" v-if="$validation.code.modified">
											<span v-if="$validation.code.required || $validation.code.maxlength || $validation.code.minlength">验证码长度为4位</span>
										</div>
									</div>
									<div class="inline-block recode">
										<img :src="verCodeUrl" @click="refreshVerCode" height="40px"/>
									</div>
								</div>

								<div class="validate-field form-group flex mt-15">
									<input type="checkbox"  v-model="user.remember"  />  记住用户名
								</div>

								<div class="form-group mt-15 width-100">
									<button class="btn btn-login width-100" :disabled='!$validation.valid' @click.prevent='login($validation)'>登录</button>
								</div>

							</form>
						</div>
	          <div class="copy text-align-c" >Copyright 2016 壹耘 粤ICP备16048993号 All Rights Reserved 广州流水行云科技有限公司</div>
          </div>
        </div>
      </div>
    </validator>
    <router-view></router-view>
</template>
<script>
import {showMsg, localLogin} from '../../vuex/actions'
import toaster from '../ui/toaster.vue'
import domain from '../../config/domain'
import cookies from 'cookies'
import Vue from 'vue'


//import analytics from '../../assets/svg/analytics.svg'
//import archives from '../../assets/svg/archives.svg'
//import businessman from '../../assets/svg/businessman.svg'
//import businessmen from '../../assets/svg/businessmen.svg'
//import certificate from '../../assets/svg/certificate.svg'
//import chat from '../../assets/svg/chat.svg'
//import contract from '../../assets/svg/contract.svg'
//

//console.log(analytics)
//console.log(analytics)
//console.log(archives)
//console.log(businessman)
//console.log(certificate)
//console.log(chat)

export default {
  data(){
    return{
      user: {
        userName: '',
        password: '',
        code:'',
        remember:'true',
      },
      verCodeUrl:''
    }
  },
  components: {
    toaster
  },
  vuex: {
    getters: {
      messege: ({showmsg}) => showmsg.message,
    },
    actions: {
      showMsg, localLogin,
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
  watch:{
    'messege':function(){
      if(this.messege.content!=''){
          this.refreshVerCode()
      }
    }
  },
  create() {

  },
  ready() {
    this.refreshVerCode()
  },
  route:{
  	data(){
      let self = this
      //初始化
      self.user  = {
         userName: '',
         password: '',
         code:'',
         remember:'true'
      }
      let cookieUser = cookies.get('interimUser')
      if(cookieUser!='' && cookieUser!=undefined){
        self.user.userName = cookieUser
        self.user.remember = true
      }else{
        self.user.remember = false
      }
      this.refreshVerCode()
    }
  }
}
</script>
<style lang='sass' scoped>

.login-bg{
  background:url("../../assets/images/loginbg.jpg") no-repeat ;
  background-position: center top;
  background-attachment: fixed;
  background-size: cover;
	height: 100%;
  width: 100%;
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
    height: 345px;
    .relative{
      position: relative;
    }
    .recode{
      padding: 0 10px;
    }
    .vercode {
	    width: 180px;
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

</style>
