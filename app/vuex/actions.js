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

//首页
export const dashboard = ({dispatch}) => {
  api.getAppCount().then(response => {
    let app_data = response.json()
    console.log(app_data)
    dispatch(types.DASHBOARD_APP, app_data.data)
  }, response => {
    console.log('fail');
  })
}

//app
export const getAppCount = ({dispatch}) => {
  console.log(api.getAppCount())
  return api.getAppCount().then(response => {
    let app_data = response.json()
	  console.log(app_data.data)
    dispatch(types.APP_COUNT, app_data.data)
  }, response => {
    console.log('fail');
  })
}

//member
export const getMemberCount = ({dispatch}) =>{
  api.getMemberCount().then(response => {
    let member_data = response.json()

    dispatch(types.MEMBER_COUNT, member_data.data)

  }, response => {
    console.log('fail');
  })
}





