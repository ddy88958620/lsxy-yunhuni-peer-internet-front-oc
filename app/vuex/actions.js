import api from '../api'
import * as types from './mutation-types.js'
import {saveCookie, removeCookie} from '../utils/cookieAuth.js'

export const showMsg = ({dispatch}, message) => {
  console.log(message);
  dispatch(types.SHOW_MSG, message)
}

export const hideMsg = ({dispatch}) => {
  dispatch(types.HIDE_MSG)
}

export const localLogin = ({dispatch, router}, user) => {
  api.localLogin(user).then(response => {
    let login = response.body
    
    console.log(login)
    
	  // 登入成功
    if(login === ' ') {
    	saveCookie('user', user.userName)
      dispatch(types.LOCAL_LOGIN, user.userName)
      router.go({path:'/admin/dashboard'})
      dispatch(types.HIDE_MSG)
    }else {
      dispatch(types.SHOW_MSG, {content:'用户名或密码不匹配'})
    }
  }, response => {
    console.log('fail');
    // dispatch(types.SHOW_MSG, {content:'用户名或密码不匹配'})
  })
}

export const localLogout = ({dispatch, router}) => {
  removeCookie('user')
  router.go({path: '/auth/login'})
}


//总应用数
export const getAppCount = ({dispatch}) => {
  console.log(api.getAppCount())
  return api.getAppCount().then(response => {
    let app_data = response.json()
    dispatch(types.APP_COUNT, app_data.data)
  }, response => {
    console.log('fail');
  })
}

//注册会员数
export const getMemberCount = ({dispatch}) =>{
  api.getMemberCount().then(response => {
    let member_data = response.json()
    dispatch(types.MEMBER_COUNT, member_data.data)
  }, response => {
    console.log('fail');
  })
}

//@params top 排名量 会员排行
export const getMemberRankList = ({dispatch},top) => {
  api.getMemberRankList(top).then(response =>{
    let rank_list = response.json()
    dispatch(types.MEMBER_RANK_LIST, rank_list.data)
  }, response => {
    console.log('fail');
  })
}

//昨日会话量
export const getLastDayComsume = ({dispatch}) => {
  api.getLastDayComsume().then(response =>{
    let comsume = response.json()
    dispatch(types.LASTDAY_COMSUME, comsume.data)
  }, response => {
    console.log('fail');
  })
}

//昨日消费额
export const getLastDayDuration = ({dispatch}) => {
  api.getLastDayDuration().then(response =>{
    let duration = response.json()
		dispatch(types.LASTDAY_DURATION, duration.data)
  }, response => {
    console.log('fail');
  })
}

//新增会员、应用统计
export const getNewMemberAndApp = ({dispatch}, date) => {
  api.getNewMemberAndApp(date).then(response =>{
      let duration = response.json()
      dispatch(types.MEMBER_APP_STATISTIC, duration.data)
    }, response => {
      console.log('fail');
  })
}

//话务量、消费额统计
export const getConsumeAnduration = ({dispatch},date) => {
    api.getConsumeAnduration(date).then(response =>{
      let duration = response.json()
      dispatch(types.CONSUME_DURATION_STATISTIC, duration.data)
    }, response => {
      console.log('fail');
  })
}

//租户列表
export const getTenantList = ({dispatch},params) =>{
  api.getTenantList(params).then(response=> {
    let tenant_list = response.json()
    if(tenant_list){
      dispatch(types.TENANT_LIST,tenant_list.data)
    }
  }, response =>{
    console.log('fail');
  })
}

//租户列表 加载更多
export const getMoreTenant = ({dispatch},params) =>{
  api.getTenantList(params).then(response=> {
    let tenant_list = response.json()
    if(tenant_list.data.result.length>0){
      dispatch(types.TENANT_MORE_LIST,tenant_list.data)
    }
  }, response =>{
    console.log('fail');
  })
}

//租户列表 会员总览 余额 存储 套餐
export const getTenantBilling = ({dispatch},params) =>{
  api.getTenantBilling(params).then(response=> {
    let bill = response.json()
  
    dispatch(types.TENANT_BILLING,bill.data)
    
  }, response =>{
    console.log('fail');
  })
}

//租户列表 会员总览 余额 存储 套餐
export const getTenantCert = ({dispatch},params) =>{
  api.getTenantCert(params).then(response=> {
    let cert = response.json()
  
    dispatch(types.TENANT_CERT,cert.data)
    
  }, response =>{
    console.log('fail');
  })
}

//租户列表 会员总览 余额 存储 套餐
export const getTenantIndicant = ({dispatch},params) =>{
  api.getTenantIndicant(params).then(response=> {
    let indicant = response.json()
    dispatch(types.TENANT_INDICANT,indicant.data)
  }, response =>{
    console.log('fail');
  })
}

// 租户消费量和话务量
export const getTenantDuration = ({dispatch}, params) =>{
  api.getTenantConsumeAnduration(params).then(response=> {
    let indicant = response.json()
    dispatch(types.TENANT_DURATION_STATISTIC,indicant.data)
  }, response =>{
    console.log('fail');
  })
}
// 租户 api
export const getTenantApi = ({dispatch}, params) =>{
  api.getTenantApiInvoke(params).then(response=> {
    let indicant = response.json()
    dispatch(types.TENANT_API_STATISTIC,indicant.data)
  }, response =>{
    console.log('fail');
  })
}

// 租户 session
export const getTenantSession = ({dispatch}, params) =>{
  api.getTenantSessionStatistic(params).then(response=> {
    let indicant = response.json()
    dispatch(types.TENANT_SESSION_STATISTIC,indicant.data)
  }, response =>{
    console.log('fail');
  })
}

//租户列表 基础信息
export const getTenantInfo = ({dispatch},params) =>{
  api.getTenantInfo(params).then(response=> {
    let info = response.json()

    console.log(info)

    dispatch(types.TENANT_INFO,info.data)
  }, response =>{
    console.log('fail');
  })
}


//租户列表 认证信息
export const getTenantAuthInfo = ({dispatch},params) =>{
  api.getTenantAuthInfo(params).then(response=> {
    let info = response.json()
    dispatch(types.TENANT_AUTH_INFO,info.data)
  }, response =>{
    console.log('fail');
  })
}


//消息列表
export const getMessageList = ({dispatch},params) =>{
  api.getMessageList(params).then(response=> {
    let message_list = response.json()
    dispatch(types.MESSAGE_LIST,message_list.data)
  }, response =>{
    console.log('fail');
  })
}

//新增消息
export const NewMessage = ({dispatch},params) =>{
  api.newMessage(params).then(response=> {
    //
    console.log('返回success')

  }, response =>{
    console.log('fail');
  })
}

//客服中心
export const getServiceList = ({dispatch},params) =>{
  api.getServiceList(params).then(response=> {
    let service_list = response.json()
    dispatch(types.SERVICE_LIST,service_list.data)
  }, response =>{
    console.log('fail');
  })
}

//客服中心 加载更多
export const getMoreService = ({dispatch},params) =>{
  api.getServiceList(params).then(response=> {
    let service_list = response.json()
    if(service_list.data.result.length>0){
      dispatch(types.SERVICE_MORE_LIST,service_list.data)
    }
  }, response =>{
    console.log('fail');
  })
}

//财务中心 
export const getInvoiceList = ({dispatch},params) =>{
  api.getInvoiceList(params).then(response=> {
    let invoice_list = response.json()
    switch(params.status){
      case 'await':
        dispatch(types.INVOICE_PENDING_LIST,invoice_list.data)
        break;
      case 'auditing':
        dispatch(types.INVOICE_PASSED_LIST,invoice_list.data)
        break;
      case 'unauth': 
        dispatch(types.INVOICE_ABNORMAL_LIST,invoice_list.data)
        break;  
    }
  }, response =>{
    console.log('fail');
  })
}


//财务中心 加载更多
export const getMoreInvoiceList = ({dispatch},params) =>{
  api.getInvoiceList(params).then(response=> {
    let invoice_list = response.json()
    if(invoice_list.data.result.length>0){
      switch(params.status){
        case 'await':
          dispatch(types.INVOICE_MORE_PENDING_LIST,invoice_list.data)
        break;
        case 'auditing':
          dispatch(types.INVOICE_MORE_PASSED_LIST,invoice_list.data)
        break;
        case 'unauth':
          dispatch(types.INVOICE_MORE_ABNORMAL_LIST,invoice_list.data)
        break;  
      }
    }
  }, response =>{
    console.log('fail');
  })
}

//财务中心 详情
export const getInvoiceDetail = ({dispatch},params) =>{
  api.getInvoiceDetail(params).then(response=> {
    let detail = response.json()
    console.log('数据')
    console.log(detail)

    dispatch(types.INVOICE_DETAIL,detail.data)
  }, response =>{
    console.log('fail');
  })
}


export const getDeliveryList = ({dispatch},params) =>{
  api.getInvoiceSendList(params).then(response=> {
    let invoice_list = response.json()
    switch(params.status){
      case 'auditing':
        if(invoice_list.data){
          dispatch(types.DELIVERY_UNSEND_LIST,invoice_list.data)
        }
        break;
      case 'unauth': 
        if(invoice_list.data){
          dispatch(types.DELIVERY_SEND_LIST,invoice_list.data)
        }
        break;  
    }
  }, response =>{
    console.log('fail');
  })
}



//财务中心 加载更多
export const getMoreDeliveryList = ({dispatch},params) =>{
  api.getInvoiceSendList(params).then(response=> {
    let delivery_list = response.json()
    if(invoice_list.data.result.length>0){
      switch(params.status){
        case 'auditing':
          dispatch(types.DELIVERY_UNSEND_LIST,delivery_list.data)
        break;
        case 'unauth':
          dispatch(types.DELIVERY_SEND_LIST,delivery_list.data)
        break;  
      }
    }
  }, response =>{
    console.log('fail');
  })
}

//审核列表
export const getDemandList = ({dispatch},params) =>{
  api.getDemandList(params).then(response=> {
    let demand_list = response.json()
   
    switch(params.authStatus){
      case 'await':
        dispatch(types.DEMAND_AWAIT_LIST,demand_list.data)
        break;
      case 'auditing':
        dispatch(types.DEMAND_AUDITING_LIST,demand_list.data)
        break;
      case 'unauth':
        dispatch(types.DEMAND_UNAUTH_LIST,demand_list.data)
        break;  
    }

  },response =>{
  })
}



//审核列表 加载更多
export const getMoreDemandList = ({dispatch},params) =>{
  api.getDemandList(params).then(response=> {
    let delivery_list = response.json()
    if(delivery_list.data.result.length>0){
      switch(params.status){
        case 'await':
          dispatch(types.DEMAND_MORE_PENDING_LIST,demand_list.data)
          break;
        case 'auditing':
          dispatch(types.DEMAND_MORE_AUDITING_LIST,delivery_list.data)
          break;
        case 'unauth':
          dispatch(types.DEMAND_MORE_UNAUTH_LIST,delivery_list.data)
          break;  
      }
    }
  }, response =>{
    console.log('fail');
  })
}


//审核中心修改
export const editDemand = ({dispatch},params) =>{

}

//详情
export const getDemandDetail = ({dispatch},params) =>{

}


//放音列表
export const getVoiceList = ({dispatch},params) =>{
  api.getVoiceLlist(params).then(response=> {
    let voice_list = response.json()
    switch(params.type){
      case 'await':
        dispatch(types.VOICE_AWAIT_LIST,voice_list.data)
        break;
      case 'auditing':
        dispatch(types.VOICE_AUDITING_LIST,voice_list.data)
        break;
      case 'unauth':
        dispatch(types.VOICE_UNAUTH_LIST,voice_list.data)
        break;  
    }
  },response =>{
  })
}



//放音列表 加载更多
export const getMoreVoiceList = ({dispatch},params) =>{
  api.getVoiceLlist(params).then(response=> {
    let voice_list = response.json()
    if(voice_list.data.result.length>0){
      switch(params.status){
        case 'await':
          dispatch(types.VOICE_MORE_PENDING_LIST,voice_list.data)
          break;
        case 'auditing':
          dispatch(types.VOICE_AUDITING_LIST,voice_list.data)
          break;
        case 'unauth':
          dispatch(types.VOICE_MORE_UNAUTH_LIST,voice_list.data)
          break;  
      }
    }
  }, response =>{
    console.log('fail');
  })
}

