import {
  DEMAND_AWAIT_LIST,
  DEMAND_MORE_PENDING_LIST,
  DEMAND_AUDITING_LIST,
  DEMAND_MORE_AUDITING_LIST,
  DEMAND_UNAUTH_LIST,
  DEMAND_MORE_UNAUTH_LIST,
  VOICE_AWAIT_LIST,
  VOICE_MORE_PENDING_LIST,
  VOICE_AUDITING_LIST,
  VOICE_MORE_AUDITING_LIST,
  VOICE_UNAUTH_LIST,
  VOICE_MORE_UNAUTH_LIST,
  VOICE_DETAIL,
  DEMAND_NUM,
} from '../mutation-types'

const state = {
  memberlist: {
    await: {},
    auditing: {},
    unauth: {}
  },
  memberdetail:{},
  voicelist: {
    await: {},
    auditing: {},
    unauth: {}
  },
  num:{
    tenant: 0,
    voiceFilePlay: 0
  }

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
  [VOICE_AWAIT_LIST] (state, list) {
    state.voicelist.await = list
  },
  [VOICE_MORE_PENDING_LIST] (state, list) {
    state.voicelist.await.currentPageNo = list.currentPageNo
    state.voicelist.await.result = state.voicelist.await.result.concat(list.result)
  },
  [VOICE_AUDITING_LIST] (state, list) {
    state.voicelist.auditing = list
  },
  [VOICE_MORE_AUDITING_LIST] (state, list) {
    state.voicelist.auditing.currentPageNo = list.currentPageNo
    state.voicelist.auditing.result = state.voicelist.auditing.result.concat(list.result)
  },
  [VOICE_UNAUTH_LIST] (state, list) {
    state.voicelist.unauth = list
  },
  [VOICE_MORE_UNAUTH_LIST] (state, list) {
    state.voicelist.unauth.currentPageNo = list.currentPageNo
    state.voicelist.unauth.result = state.voicelist.unauth.result.concat(list.result)
  },
  [VOICE_DETAIL] (state, index){
    //this.todos.splice(index, 1)
    state.voicelist.await.totalCount = state.voicelist.await.totalCount-1
    state.voicelist.await.result.splice(index,1)
  },
  [DEMAND_NUM] (state, list){
    state.num = list
  }
}

export default {
  state,
  mutations
}


