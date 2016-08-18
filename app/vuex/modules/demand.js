import {
  DEMAND_AWAIT_LIST,
  DEMAND_MORE_PENDING_LIST,
  DEMAND_AUDITING_LIST,
  DEMAND_MORE_AUDITING_LIST,
  DEMAND_UNAUTH_LIST,
  DEMAND_MORE_UNAUTH_LIST,
 

} from '../mutation-types'



const state = {
  memberlist: {
    await: {},
    auditing: {},
    unauth: {}
  },
  memberdetail:{},
  deliverylist: {
    unsend: {},
    send: {}
  },
  delivery:{}
}

const mutations = {
  [DEMAND_AWAIT_LIST] (state, list) {
    state.memberlist.await = list
  },
  [DEMAND_MORE_PENDING_LIST] (state, list) {
    state.memberlist.await.currentPageNo = list.currentPageNo
    state.memberlist.await.result = state.memberlist.await.result.concat(list.result)
  },
  [DEMAND_AUDITING_LIST] (state, list) {
    state.memberlist.auditing = list
  },
  [DEMAND_MORE_AUDITING_LIST] (state, list) {
    state.memberlist.auditing.currentPageNo = list.currentPageNo
    state.memberlist.auditing.result = state.memberlist.auditing.result.concat(list.result)
  },
  [DEMAND_UNAUTH_LIST] (state, list) {
    state.memberlist.unauth = list
  },
  [DEMAND_MORE_UNAUTH_LIST] (state, list) {
    state.memberlist.unauth.currentPageNo = list.currentPageNo
    state.memberlist.unauth.result = state.memberlist.unauth.result.concat(list.result)
  },
}


export default {
  state,
  mutations
}


