import * as types from './mutation-types.js'

export const addTodo = ({dispatch}, text) => {
  dispatch(types.ADD_TODO, text)
}
