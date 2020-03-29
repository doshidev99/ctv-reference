import { makeReducerCreator } from "../../utils/reduxUtils";
import { TransactionTypes } from './actions';
import { mongoObjectId } from "../../utils/textProcessor";

// Setup inintial state for app
export const initialState = {
  transaction: {},
  payment: [],
  total: null,
  isLoadingDetail: true,
  isLoadingTable: false,
  isLoadingStatus: true,
  isLoadingUpload: false,
  isLoadingConfirm: false,
  detailTransactionSuccess: undefined,
  detailTransactionFailure: undefined,
  tablePaymentSuccess:undefined,
  tablePaymentFailure: undefined,
  confirmTransSuccess: undefined,
  confirmTransError: undefined,
  addPaymentSuccess: undefined,
  addPaymentFailure: undefined,

  transactions: [],
  loading: false,
  listTransactionSuccess: undefined,
  listTransactionFailure: undefined,
  currentTransaction: {},
  errors: [],

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

const getTablePayment = (state) => ({
  ...state,
  isLoadingTable: true,
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

const getListTransactionSuccess = (state, { data, total, limit, offset }) => ({
  ...state,
  transactions: data,
  limit,
  offset,
  total,
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
const confirmOrderSuccess = (state, {status, standingOrder}) => {
  const {transaction} =  state;
  transaction.status = status;
  transaction.standingOrder = standingOrder;
  return {
    ...state,
    transaction,
    isLoadingStatus: false,
  }
}
const confirmOrderFailure = state => ({
  ...state,
  isLoadingStatus: false,
})

const onConfirmImageOrder = (state) => ({
  ...state,
  isLoadingStatus: true,
})
const confirmOrderImageSuccess = (state, {status, standingOrder}) => {
  const {transaction} =  state;
  transaction.status = status;
  transaction.standingOrder = standingOrder;
  return {
    ...state,
    transaction,
    isLoadingStatus: false,
  }
}
const confirmOrderImageFailure = state => ({
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
const cancelTransactionFailure = (state) => ({
  ...state,
  isLoadingStatus: false,
})

const uploadImage = state => ({
  ...state,
  isLoadingUpload: true,
});
const uploadImageSuccess = (state, { fileUrl }) => {
  return {
    ...state,
    fileUrl,
    isLoadingUpload: false,
  };
};
const uploadImageFailure = state => ({
  ...state,
  isLoadingUpload: false,
});

const confirmTransaction = state => ({
  ...state,
  isLoadingConfirm: true,
});
const confirmTransactionSuccess = (state, {status}) => {
  const {transaction} =  state;
  transaction.status = status;
  return {
    ...state,
    transaction,
    isLoadingConfirm: false,
  }
}
const confirmTransactionFailure = (state, {error}) => ({
  ...state,
  isLoadingConfirm: false,
  confirmTransactionError: error,
})

const addPayment = state => ({
  ...state,
  isLoadingConfirm: true,
  isLoadingTable: true,
});
const addPaymentSuccess = (state, {data, total, detail}) => ({
  ...state,
  isLoadingConfirm: false,
  isLoadingTable: false,
  payment: data,
  total,
  transaction: detail,
  addPaymentSuccess: true,
  addPaymentFailure: false,
});
const addPaymentFailure = (state) => ({
  ...state,
  isLoadingConfirm: false,
  addPaymentSuccess: false,
  addPaymentFailure: true,
})

export const transaction = makeReducerCreator(initialState, {
  
  [TransactionTypes.GET_DETAIL_TRANSACTION_SUCCESS]: getDetailTransactionSuccess,
  [TransactionTypes.GET_DETAIL_TRANSACTION_FAIL]: getDetailTransactionFail,

  [TransactionTypes.GET_TABLE_PAYMENT]: getTablePayment,
  [TransactionTypes.GET_TABLE_PAYMENT_SUCCESS]: getTablePaymentSuccess,
  [TransactionTypes.GET_TABLE_PAYMENT_FAIL]: getTablePaymentFail,

  [TransactionTypes.TRANSACTION]: getListTransaction,
  [TransactionTypes.GET_LIST_TRANSACTION_SUCCESS]: getListTransactionSuccess,
  [TransactionTypes.GET_LIST_TRANSACTION_FAILURE]: getListTransactionFailure,

  [TransactionTypes.ADD_NEW_BONUS]: addNewBonus,
  [TransactionTypes.REMOVE_BONUS]: removeBonus,
  [TransactionTypes.ON_CHANGE_BONUS]: onChangeBonus,

  [TransactionTypes.CONFIRM_ORDER]: onConfirmOder,
  [TransactionTypes.CONFIRM_ORDER_SUCCESS]: confirmOrderSuccess,
  [TransactionTypes.CONFIRM_ORDER_FAIL]: confirmOrderFailure,

  [TransactionTypes.CONFIRM_ORDER_IMAGE]: onConfirmImageOrder,
  [TransactionTypes.CONFIRM_ORDER_IMAGE_SUCCESS]: confirmOrderImageSuccess,
  [TransactionTypes.CONFIRM_ORDER__IMAGE_FAIL]: confirmOrderImageFailure,

  [TransactionTypes.RESEND_REQUEST]: onResendRequest,
  [TransactionTypes.RESEND_REQUEST_SUCCESS]: resendRequestSuccess,
  [TransactionTypes.RESEND_REQUEST_FAIL]: resendRequestFailure,

  [TransactionTypes.CANCEL_TRANSACTION]: cacelTransaction,
  [TransactionTypes.CANCEL_TRANSACTION_SUCCESS]: cacelTransactionSuccess,
  [TransactionTypes.CANCEL_TRANSACTION_FAIL]: cancelTransactionFailure,

  [TransactionTypes.UPLOAD_IMAGE]: uploadImage,
  [TransactionTypes.UPLOAD_IMAGE_SUCCESS]: uploadImageSuccess,
  [TransactionTypes.UPLOAD_IMAGE_FAILURE]: uploadImageFailure,

  [TransactionTypes.CONFIRM_TRANSACTION]: confirmTransaction,
  [TransactionTypes.CONFIRM_TRANSACTION_SUCCESS]: confirmTransactionSuccess,
  [TransactionTypes.CONFIRM_TRANSACTION_FAILURE]: confirmTransactionFailure,

  [TransactionTypes.ADD_PAYMENT]: addPayment,
  [TransactionTypes.ADD_PAYMENT_SUCCESS]: addPaymentSuccess,
  [TransactionTypes.ADD_PAYMENT_FAILURE]: addPaymentFailure,
})
