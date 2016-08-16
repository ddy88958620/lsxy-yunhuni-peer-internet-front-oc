import {
  TENANT_LIST,
  TENANT_MORE_LIST,
  TENANT_LIST_CURRENT_PAGE,
  TENANT_BILLING,
  TENANT_CERT,
  TENANT_INDICANT,
  TENANT_INFO,
  TENANT_AUTH_INFO

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
   }
}

export default {
  state,
  mutations
}
