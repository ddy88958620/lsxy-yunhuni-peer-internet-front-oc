import {
  TENANT_LIST,
  TENANT_MORE_LIST,
  TENANT_LIST_CURRENT_PAGE,
  TENANT_BILLING
} from '../mutation-types.js'

const state = {
  list: {},
  bill: {}

}

const mutations = {
  [TENANT_LIST] (state, list) {
    state.list = list
  },
  [TENANT_MORE_LIST] (state, list) {
  	state.list.currentPageNo = list.currentPageNo
  	state.list.result = state.list.result.concat(list.result)
  	/*Array.prototype.map(list, (i)=> {
  		state.list.result.push(i)
  	})*/
   },
   [TENANT_BILLING] (state ,bill){
    state.bill = bill
   }
}

export default {
  state,
  mutations
}
