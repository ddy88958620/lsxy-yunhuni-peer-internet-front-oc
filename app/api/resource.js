import Vue from 'vue'
import domain from '../config/domain.js'
import { removeCookie, getCookie } from '../utils/cookieAuth.js'


// 
Vue.http.options.emulateJSON = true;
Vue.http.options.root = domain.API_ROOT;

Vue.http.interceptors.push(
  (request, next) => {
    // mock
    request.headers['X-YUNHUNI-API-TOKEN'] = getCookie('token')


    next((response) => {
      // 每次请求判断一次401
      // console.log(response.status);
    })
  }
)


export const AuthResource = Vue.resource(domain.API_ROOT+'/auth/login')
export const DemandMemberAwait = Vue.resource(domain.API_ROOT+'')
export const Dashboard = Vue.resource('dashboard.json')
