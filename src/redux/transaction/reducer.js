import { makeReducerCreator } from "../../utils/reduxUtils";
import { TransactionTypes } from './actions';

// Setup inintial state for app
export const initialState = {
  transaction: {},
  payment: [],
  total: null,
  isLoadingDetail: true,
  isLoadingTable: true,
  detailTransactionSuccess: undefined,
  detailTransactionFailure: undefined,
  tablePaymentSuccess:undefined,
  tablePaymentFailure: undefined,

  transactions: [],
  loading: false,
  listTransactionSuccess: undefined,
  listTransactionFailure: undefined,
  currentTransaction: {},
}
// End setup

// DETAIL TRANSACTION
// const getDetailTransaction = state => ({
//   ...state,
//   loading: true,
// });

const getDetailTransactionSuccess = (state, {data}) => ({
  ...state,
  transaction: data,
  isLoadingDetail: false,
  detailTransactionSuccess: true,
  detailTransactionFailure: false,
})

const getDetailTransactionFail = state => ({
  ...state,
  isLoadingDetail: true,
  detailTransactionSuccess: false,
  detailTransactionFailure: true,
})

const getTablePaymentSuccess = (state, {data, total}) => ({
  ...state,
  payment: data,
  total,
  isLoadingTable: false,
  tablePaymentSuccess: true,
  tablePaymentFailure: false,
})

const getTablePaymentFail = state => ({
  ...state,
  isLoadingTable: true,
  tablePaymentSuccess: false,
  tablePaymentFailure: true,
})
const getListTransaction = state => ({
  ...state,
  loading: true,
});

const getListTransactionSuccess = (state, { data }) => ({
  ...state,
  transactions: data,
  loading: false,
  listTransactionSuccess: true,
  listTransactionFailure: false,
});

const getListTransactionFailure = state => ({
  ...state,
  loading: false,
  listTransactionSuccess: false,
  listTransactionFailure: true,
});

export const transaction = makeReducerCreator(initialState, {
  
  [TransactionTypes.GET_DETAIL_TRANSACTION_SUCCESS]: getDetailTransactionSuccess,
  [TransactionTypes.GET_DETAIL_TRANSACTION_FAIL]: getDetailTransactionFail,
  [TransactionTypes.GET_TABLE_PAYMENT_SUCCESS]: getTablePaymentSuccess,
  [TransactionTypes.GET_TABLE_PAYMENT_FAIL]: getTablePaymentFail,
  [TransactionTypes.TRANSACTION]: getListTransaction,
  [TransactionTypes.GET_LIST_TRANSACTION_SUCCESS]: getListTransactionSuccess,
  [TransactionTypes.GET_LIST_TRANSACTION_FAILURE]: getListTransactionFailure,
})
