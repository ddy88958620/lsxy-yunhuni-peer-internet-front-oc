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
    bill:{
      balance:0,
    },
    cert:{
      cert:{
        apiUrl:'',
        secretKey:'',
        certId:''
      }
    },
    indicant:{
      dto1: {
        sessionCountRate: false,
        rechargeCoinRate: false,
        avgSessionTimeRate: false,
        costCoin: false,
        connectedRateRate: false,
        sessionTimeRate: false
      },
      dto: {
        cost_coin: 0,
        recharge_coin: 0,
        session_count: 0,
        session_time: 0,
        age_session_time: 0,
        connected_rate: 0,
        cost_coin_rate: 0,
        recharge_coin_rate: 0,
        session_count_rate: 0,
        session_time_rate: 0,
        age_session_time_rate: 0,
        connected_rate_rate: 0,
      }
    }
  },
  base:{
    info:{},
    authinfo:{
      realnamePrivate:{},
      realnameCorp:{},
      status:100
    }
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
