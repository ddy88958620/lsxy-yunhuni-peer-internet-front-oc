import {
  MESSAGE_LIST,
  MESSAGE_MORE_LIST,
  NEW_MESSAGE,
  EDIT_MESSAGE,
  MESSAGE_DETAIL,
  MESSAGE_NUM,
} from '../mutation-types'

const state = {
   list : {},
   detail: {},
   num:{
      awaitDemand:0,
      awaitInvoice:0,
      awaitService:0,
      son:{
        awaitTenant:0,
        awaitTenant:0,
        awaitService:0,
        awaitInvoiceApplySend:0,
        awaitInvoiceApply:0
      }
   }
}

const mutations = {
  [MESSAGE_LIST] (state, list) {
    state.list = list
  },
  [MESSAGE_MORE_LIST] (state, list) {
    state.list.currentPageNo = list.currentPageNo
    state.list.result = state.list.result.concat(list.result)
  },
  [MESSAGE_DETAIL] (state, detail){
    state.detail = detail
  },
  [MESSAGE_NUM] (state, list){
    state.num = list
  }
}

export default {
  state,
  mutations
}
