import {
  AuthResource,
  DemandMemberAwait,
  Dashboard,
  DashboardApp,
  DashboardMember,
  DashboardMemberRankList,
  DashboardComsume,
  DashboardDuration,
  ConsumeAnduration,
  Dashboardstatistic,
  TenantList
} from './resource.js'



export default {
  localLogin(user){
    return AuthResource.save(user)
  },
  getDemandMemberAwait(){
    return DemandMemberAwait.get()
  },
  getDashboard(){
    return Dashboard.get()
  },
  getMemberCount(){
    return Dashboard.get()
  },
  getAppCount(){
    return DashboardApp.get()
  },
  getMemberCount(){
   return DashboardMember.get()
  },
  getMemberRankList(top){
    return DashboardMemberRankList.get(top)
  },
  getLastDayComsume(){
    return DashboardComsume.get()
  },  
  getLastDayDuration(){
    return DashboardDuration.get()
  },
  getNewMemberAndApp(date){
    return Dashboardstatistic.get(date)
  },
  getConsumeAnduration(date){
    return ConsumeAnduration.get(date)
  },
  getTenantList(param){
    return TenantList.get(param)
  }




}
