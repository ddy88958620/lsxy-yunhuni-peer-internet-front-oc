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
    let login = response.json()
    saveCookie('user', user)
    saveCookie('token', login.data.token)
    /*console.log(login)
    console.log(login.data.token)*/
    if(login.success === true) {
      saveCookie('user', user)
      dispatch(types.LOCAL_LOGIN, user)
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
export const getNewMemberAndApp = ({dispatch},date) => {
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
    dispatch(types.TENANT_LIST,tenant_list.data)
  }, response =>{
    console.log('fail');
  })
}
