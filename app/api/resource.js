import Vue from 'vue'
import domain from '../config/domain.js'
import { removeCookie } from '../utils/cookieAuth.js'


// 
Vue.http.options.emulateJSON = true;
Vue.http.options.root = domain.API_ROOT;

Vue.http.interceptors.push(
  (request, next) => {
    // mock
    request.method = 'GET'
    next((response) => {
      // 每次请求判断一次401
      // console.log(response.status);
    })
  }
)

export const AuthResource = Vue.resource('auth.json')
export const DemandMemberAwait = Vue.resource('demandMember.json')
