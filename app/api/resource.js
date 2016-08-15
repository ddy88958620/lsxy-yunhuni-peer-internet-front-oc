import Vue from 'vue'
import domain from '../config/domain.js'
import { removeCookie, getCookie } from '../utils/cookieAuth.js'


// 
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

//首页
export const DashboardApp = Vue.resource(domain.API_ROOT+'/dashboard/app/indicant')
export const DashboardMember = Vue.resource(domain.API_ROOT+'/dashboard/member/indicant')
export const DashboardMemberRankList = Vue.resource(domain.API_ROOT+'/dashboard/member/top')
export const DashboardComsume = Vue.resource(domain.API_ROOT+'/dashboard/comsume/indicant')
export const DashboardDuration = Vue.resource(domain.API_ROOT+'/dashboard/duration/indicant')
export const Dashboardstatistic = Vue.resource(domain.API_ROOT+'/dashboard/statistic')
export const ConsumeAnduration = Vue.resource(domain.API_ROOT+'/dashboard/consumeAnduration/statistic')

//租户中心
export const TenantList = Vue.resource(domain.API_ROOT+'/tenant/tenants/')
export const TeantRecharge = Vue.resource(domain.API_ROOT+'/tenant/tenants/{id}/recharge') 


//消息中心
export const MessageList = Vue.resource(domain.API_ROOT+'/message/list')
export const MessageNew = Vue.resource(domain.API_ROOT+'/message/new')











//审批管理