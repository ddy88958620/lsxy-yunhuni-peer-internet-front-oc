import {
  INVOICE_PENDING_LIST,
  INVOICE_MORE_PENDING_LIST,
  INVOICE_PASSED_LIST,
  INVOICE_MORE_PASSED_LIST,
  INVOICE_ABNORMAL_LIST,
  INVOICE_MORE_ABNORMAL_LIST,
  INVOICE_DETAIL,
  DELIVERY_UNSEND_LIST,
  DELIVERY_MORE_UNSEND_LIST,
  DELIVERY_SEND_LIST,
  DELIVERY_MORE_SEND_LIST,
  DELIVERY_DETAIL,
} from '../mutation-types'

const state = {
  invoicelist: {
    pending: {
     totalCount:0,
     totalPageCount:0,
     result:[]
    },
    passed: {
     totalCount:0,
     totalPageCount:0,
     result:[]
    },
    abnormal: {
     totalCount:0,
     totalPageCount:0,
     result:[]
    }
  },
  invoice:{

  },
  deliverylist: {
    unsend: {},
    send: {}
  },
  delivery:{}
}

const mutations = {
  [INVOICE_PENDING_LIST] (state, list) {
    state.invoicelist.pending = list
  },
  [INVOICE_MORE_PENDING_LIST] (state, list) {
    state.invoicelist.pending.currentPageNo = list.currentPageNo
    state.invoicelist.pending.result = state.invoicelist.pending.result.concat(list.result)
  },
  [INVOICE_PASSED_LIST] (state, list) {
    state.invoicelist.passed = list
  },
  [INVOICE_MORE_PASSED_LIST] (state, list) {
    state.invoicelist.passed.currentPageNo = list.currentPageNo
    state.invoicelist.passed.result = state.invoicelist.passed.result.concat(list.result)
  },
  [INVOICE_ABNORMAL_LIST] (state, list) {
    state.invoicelist.abnormal = list
  },
  [INVOICE_MORE_ABNORMAL_LIST] (state, list) {
    state.invoicelist.abnormal.currentPageNo = list.currentPageNo
    state.invoicelist.abnormal.result = state.invoicelist.abnormal.result.concat(list.result)
  },
  [INVOICE_DETAIL] (state, detail) {
    state.invoice = detail 
  },
  [DELIVERY_UNSEND_LIST] (state, list){
    state.deliverylist.unsend = list 
  },
  [DELIVERY_MORE_UNSEND_LIST] (state, list) {
    state.deliverylist.unsend.currentPageNo = list.currentPageNo
    state.deliverylist.unsend.result = state.deliverylist.unsend.result.concat(list.result)
  },
  [DELIVERY_SEND_LIST] (state, list){
    state.deliverylist.send = list 
  },
  [DELIVERY_MORE_SEND_LIST] (state, list) {
    state.deliverylist.send.currentPageNo = list.currentPageNo
    state.deliverylist.send.result = state.deliverylist.send.result.concat(list.result)
  },
  [DELIVERY_DETAIL] (state, detail) {
    state.delivery.detail = detail 
  }
}


export default {
  state,
  mutations
}
