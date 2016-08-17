import {
  INVOICE_PENDING_LIST,
  INVOICE_MORE_PENDING_LIST,
  INVOICE_PASSED_LIST,
  INVOICE_MORE_PASSED_LIST,
  INVOICE_ABNORMAL_LIST,
  INVOICE_MORE_ABNORMAL_LIST,
  INVOICE_DETAIL

} from '../mutation-types'

const state = {
  invoicelist: {
    pending: {},
    passed: {},
    abnormal: {}
  }
}

const mutations = {
  [INVOICE_PENDING_LIST] (state, list) {
    state.invoicelist.pending = list
  },
  [INVOICE_MORE_PENDING_LIST] (state, list) {
    state.invoicelist.pending.currentPageNo = list.currentPageNo
    state.invoicelist.pending.result = state.list.result.concat(list.result)
  },
  [INVOICE_PASSED_LIST] (state, list) {
    state.invoicelist.passed = list
  },
  [INVOICE_MORE_PASSED_LIST] (state, list) {
    state.invoicelist.passed.currentPageNo = list.currentPageNo
    state.invoicelist.passed.result = state.list.result.concat(list.result)
  },
  [INVOICE_ABNORMAL_LIST] (state, list) {
    state.invoicelist.abnormal = list
  },
  [INVOICE_MORE_ABNORMAL_LIST] (state, list) {
    state.invoicelist.abnormal.currentPageNo = list.currentPageNo
    state.invoicelist.abnormal.result = state.list.result.concat(list.result)
  },
  [INVOICE_DETAIL] (state, detail) {
    state.invoice.detail = detail 
  }

}

export default {
  state,
  mutations
}
