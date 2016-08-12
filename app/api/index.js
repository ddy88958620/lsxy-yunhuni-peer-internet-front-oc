import {
  AuthResource,
  DemandMemberAwait,
  Dashboard,
  DashboardApp
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
}
