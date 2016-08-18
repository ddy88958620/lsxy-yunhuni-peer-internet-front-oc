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
  TenantList,TenantBilling,TenantCert,TenantIndicant,TenantInfo,TenantAuthInfo,
  MessageList,MessageNew,MessageEdit,MessageDetail,
  InvoiceList,InvoiceDetail,InvoiceEdit,InvoiceSendList,
  ServiceList,
  DemandDetail,DemandEdit,DemandList,
  VoiceLlist,VoiceEdit,
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
  },
  getTenantBilling(param){
    return TenantBilling.get(param)
  },
  getTenantCert(param){
    return TenantCert.get(param)
  },
  getTenantIndicant(param){
    return TenantIndicant.get(param)
  },
  getTenantInfo(param){
    return TenantInfo.get(param)
  },
  getTenantAuthInfo(param){
    return TenantAuthInfo.get(param)
  },
  getMessageList(param){
    return MessageList.get(param)
  },
  newMessage(param){
    return MessageNew.get(param)
  },
  editMessage(param){
     return MessageEdit.post(param)
  },
  getMessageDetail(param){
    return MessageDetail.get(param)
  },
  getInvoiceList(param){
    return InvoiceList.get(param)
  },
  getInvoiceSendList(param){
    return InvoiceSendList.get(param)
  },
  getInvoiceDetail(param){
    return InvoiceDetail.get(param)
  },
  editInvoice(param){
    return InvoiceEdit.get(param)
  },
  getServiceList(param){
    return ServiceList.get(param)
  },
  getDemandDetail(param){
    return DemandDetail.get(param)
  },
  editDemand(param){
    return DemandEdit.post(param)
  },
  getDemandList(param){
    return DemandList.get(param)
  },
  getVoiceLlist(param){
    return VoiceLlist.get(param)
  },
  editVoiceEdit(param){
    return VoiceEdit.post(param)
  },
}


