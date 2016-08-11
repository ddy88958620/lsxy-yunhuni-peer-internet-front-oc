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
    let r_user = response.json().res.data.user
    if(r_user.name === user.name) {
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
export const dashboard =({dispatch,router}) => {
  api.getDashboard().then(response => {
    let dash_data = response.json()
    //dispatch(types.DASHBOARD_MEMBER, dash_data[1].res.result.member)
    console.log(response)
    dispatch(types.DASHBOARD_APP, dash_data[2].res.result.app)
  }, response => {
    console.log('fail');
  })
}

