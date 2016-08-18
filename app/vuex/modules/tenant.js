import {
  TENANT_LIST,
  TENANT_MORE_LIST,
  TENANT_LIST_CURRENT_PAGE,
  TENANT_BILLING,
  TENANT_CERT,
  TENANT_INDICANT,
  TENANT_INFO,
  TENANT_AUTH_INFO,
  TENANT_API_STATISTIC,
	TENANT_SESSION_STATISTIC,
	TENANT_DURATION_STATISTIC,
} from '../mutation-types.js'

const state = {
  list: {},
  detail:{
    bill:{},
    cert:{},
    indicant:{}
  },
  base:{
    info:{},
    authinfo:{}
  },
  statistic:{
  	comsumeduration: {},
    session: {},
    api: {}
  }

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
   [TENANT_BILLING] (state, bill) {
    state.detail.bill = bill
   },
   [TENANT_CERT] (state, cert) {
    state.detail.cert = cert
   },
   [TENANT_INDICANT] (state, indicant) {
    state.detail.indicant = indicant
   },
   [TENANT_INFO] (state,info) {
    state.base.info = info
   },
   [TENANT_AUTH_INFO] (state,info) {
    state.base.authinfo = info 
   },
  // statistic:{
  //   comsumeduration: null,
  //   session: null,
  //   invokec: null
  // }
  [TENANT_SESSION_STATISTIC] (state, statics){
  	state.statistic.session = statics
  },
  [TENANT_API_STATISTIC] (state, statics){
    state.statistic.api = statics
  },
  [TENANT_DURATION_STATISTIC] (state, statics){
  	state.statistic.comsumeduration = statics
  }
}

export default {
  state,
  mutations
}
