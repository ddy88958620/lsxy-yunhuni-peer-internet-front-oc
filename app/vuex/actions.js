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
  // api.....
  let api = true
  if(api) {
    saveCookie('user', 'lluvio')
    dispatch(types.LOCAL_LOGIN, user)
    router.go({path:'/admin'})
  }
}

export const localLogout = ({dispatch, router}) => {
  removeCookie('user')
  router.go({path: '/auth/login'})
}
