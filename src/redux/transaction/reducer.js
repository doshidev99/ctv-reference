import { makeReducerCreator } from "../../utils/reduxUtils";
import { TransactionTypes } from './actions';
import { mongoObjectId } from "../../utils/textProcessor";

// Setup inintial state for app
export const initialState = {
  transaction: {},
  payment: [],
  total: null,
  isLoadingDetail: true,
  isLoadingTable: true,
  isLoadingStatus: true,
  detailTransactionSuccess: undefined,
  detailTransactionFailure: undefined,
  tablePaymentSuccess:undefined,
  tablePaymentFailure: undefined,

  transactions: [],
  loading: false,
  listTransactionSuccess: undefined,
  listTransactionFailure: undefined,
  currentTransaction: {},

  bonus: [
    {
      id: mongoObjectId(),
    },
  ],
}
// End setup

const getDetailTransactionSuccess = (state, {data}) => ({
  ...state,
  transaction: data,
  isLoadingDetail: false,
  isLoadingStatus: false,
  detailTransactionSuccess: true,
  detailTransactionFailure: false,
})

const getDetailTransactionFail = state => ({
  ...state,
  isLoadingDetail: true,
  isLoadingStatus: true,
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

// Bonus
const addNewBonus = state => {
  const bonus = [...state.bonus];
  bonus.push({
    id: mongoObjectId(),
  });
  return {
    ...state,
    bonus,
  };
};

const removeBonus = (state, { id }) => {
  let bonus = [...state.bonus];
  bonus = bonus.filter(e => e.id !== id);
  return {
    ...state,
    bonus,
  };
};

const onChangeBonus = (state, { id, title, value }) => {
  const bonus = [...state.bonus];
  const index = bonus.findIndex(e => e.id === id);
  let currentBonus = bonus.filter(e => e.id === id);
  currentBonus = {
    id,
    title,
    value,
  };
  bonus[index] = currentBonus;
  return {
    ...state,
    bonus,
  };
};

const onConfirmOder = (state) => ({
  ...state,
  isLoadingStatus: true,
})
const confirmSuccess = (state, {status, standingOrder}) => {
  const {transaction} =  state;
  transaction.status = status;
  transaction.standingOrder = standingOrder;
  return {
    ...state,
    transaction,
    isLoadingStatus: false,
  }
}
const confirmFailure = state => ({
  ...state,
  isLoadingStatus: true,
})

const onResendRequest = (state) => ({
  ...state,
  isLoadingStatus: true,
})
const resendRequestSuccess = (state, {status}) => {
  const {transaction} =  state;
  transaction.status = status;
  return {
    ...state,
    transaction,
    isLoadingStatus: false,
  }
}
const resendRequestFailure = state => ({
  ...state,
  isLoadingStatus: true,
})

const cacelTransaction = state => ({
  ...state,
  isLoadingStatus: true,
});
const cacelTransactionSuccess = (state, {status}) => {
  const {transaction} =  state;
  transaction.status = status;
  return {
    ...state,
    transaction,
    isLoadingStatus: false,
  }
};
const cacelTransactionFailure = state => ({
  ...state,
  isLoadingStatus: true,
})

export const transaction = makeReducerCreator(initialState, {
  
  [TransactionTypes.GET_DETAIL_TRANSACTION_SUCCESS]: getDetailTransactionSuccess,
  [TransactionTypes.GET_DETAIL_TRANSACTION_FAIL]: getDetailTransactionFail,
  [TransactionTypes.GET_TABLE_PAYMENT_SUCCESS]: getTablePaymentSuccess,
  [TransactionTypes.GET_TABLE_PAYMENT_FAIL]: getTablePaymentFail,
  [TransactionTypes.TRANSACTION]: getListTransaction,
  [TransactionTypes.GET_LIST_TRANSACTION_SUCCESS]: getListTransactionSuccess,
  [TransactionTypes.GET_LIST_TRANSACTION_FAILURE]: getListTransactionFailure,
  [TransactionTypes.ADD_NEW_BONUS]: addNewBonus,
  [TransactionTypes.REMOVE_BONUS]: removeBonus,
  [TransactionTypes.ON_CHANGE_BONUS]: onChangeBonus,
  [TransactionTypes.CONFIRM_ORDER]: onConfirmOder,
  [TransactionTypes.CONFIRM_ORDER_SUCCESS]: confirmSuccess,
  [TransactionTypes.CONFIRM_ORDER_FAIL]: confirmFailure,
  [TransactionTypes.RESEND_REQUEST]: onResendRequest,
  [TransactionTypes.RESEND_REQUEST_SUCCESS]: resendRequestSuccess,
  [TransactionTypes.RESEND_REQUEST_FAIL]: resendRequestFailure,
  [TransactionTypes.CANCEL_TRANSACTION]: cacelTransaction,
  [TransactionTypes.CANCEL_TRANSACTION_SUCCESS]: cacelTransactionSuccess,
  [TransactionTypes.CANCEL_TRANSACTION_FAIL]: cacelTransactionFailure,
})
