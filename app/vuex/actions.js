import * as types from './mutation-types.js'

export const showMsg = ({dispatch}, message) => {
  console.log(message);
  dispatch(types.SHOW_MSG, message)
}

export const hideMsg = ({dispatch}) => {
  dispatch(types.HIDE_MSG)
}
