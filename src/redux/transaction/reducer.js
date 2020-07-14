import { makeReducerCreator } from "../../utils/reduxUtils";
import { TransactionTypes } from './actions';
import { mongoObjectId } from "../../utils/textProcessor";

// Setup inintial state for app
export const initialState = {
  transaction: {},
  transactionPayments: {
    payments: [],
    currentPayment: {},
    offset: 0, // offset = (page - 1) * limit;
    limit: 10,
    total: null,
    loading: false,

    listPaymentSuccess: undefined,
    listPaymentFailure: undefined,

    createPaymentSuccess: undefined,
    createPaymentFailure: undefined,

    updatePaymentSuccess: undefined,
    updatePaymentFailure: undefined,
  },
  total: null,
  isLoadingDetail: true,
  isLoadingTable: false,
  isLoadingStatus: true,
  isLoadingUpload: false,
  isLoadingConfirm: false,
  detailTransactionSuccess: undefined,
  detailTransactionFailure: undefined,
  tablePaymentSuccess: undefined,
  tablePaymentFailure: undefined,
  confirmTransSuccess: undefined,
  confirmTransError: undefined,
  addPaymentSuccess: undefined,
  addPaymentFailure: undefined,
  transactions: [],
  loading: false,
  listTransactionSuccess: undefined,
  listTransactionFailure: undefined,
  listPaymentFailure:undefined,

  currentTransaction: {},
  errors: [],

  bonus: [
  ],
}
// End setup

const getDetailTransactionSuccess = (state, { data }) => ({
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
const getTablePaymentSuccess = (state, { data, total, limit, offset }) => ({
  ...state,
  transactionPayments: {
    ...state.transactionPayments,
    payments: data,
    limit,
    offset,
    total,
    loading: false,
    currentPayment: {},
  },
  isLoadingTable: false,
  listPaymentFailure: false,
  tablePaymentSuccess: true,
  tablePaymentFailure: false,
})
const getTablePaymentFail = state => ({
  ...state,
  isLoadingTable: false,
  listPaymentFailure: true,
  tablePaymentSuccess: false,
  tablePaymentFailure: true,
})

// ---------------------------------------
const getOnePaymentSuccess = (state, {data}) => {
  return {
    ...state,
    loading: false,
    transactionPayments: {
      ...state.transactionPayments,
      currentPayment: data,
    },
  };
};

const getOnePaymentFailure = state => ({
  ...state,
  loading: false,
});

// -----------------------------------------
const updateOnePaymentSuccess = state => ({
  ...state,
  loading:false,
  transactionPayments: {
    ...state.transactionPayments,
    currentPayment: {},
    updatePaymentFailure: false,
    updatePaymentSuccess: true,
  },

})
const updateOnePaymentFailure = state => ({
  ...state,
  loading:false,
  transactionPayments: {
    ...state.transactionPayments,
    updatePaymentFailure: true,
    updatePaymentSuccess: false,
  },
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

const onChangeBonus = (state, { id, name, value }) => {
  const bonus = [...state.bonus];
  const index = bonus.findIndex(e => e.id === id);
  let currentBonus = bonus.filter(e => e.id === id);
  currentBonus = {
    id,
    name,
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
const confirmOrderSuccess = (state, { status, standingOrder }) => {
  const { transaction } = state;
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
const confirmOrderImageSuccess = (state, { status, standingOrder }) => {
  const { transaction } = state;
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
  isLoadingStatus: false,

})

const onResendRequest = (state) => ({
  ...state,
  isLoadingStatus: true,
})
const resendRequestSuccess = (state, { status }) => {
  const { transaction } = state;
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
const cacelTransactionSuccess = (state, { status }) => {
  const { transaction } = state;
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
const removeOrderImage = (state) => {
  const { transaction } = state;
  transaction.fileUrl = '';
  return {
    ...state,
    transaction,
  };
};

const confirmTransaction = state => ({
  ...state,
  isLoadingConfirm: true,
});
const confirmTransactionSuccess = (state, { status }) => {
  const { transaction } = state;
  transaction.status = status;
  return {
    ...state,
    transaction,
    isLoadingConfirm: false,
  }
}
const confirmTransactionFailure = (state, { error }) => ({
  ...state,
  isLoadingConfirm: false,
  confirmTransactionError: error,
})


const addPaymentSuccess = (state) => ({
  ...state,
  // isLoadingConfirm: false,
  // transaction: detail,
  // isLoadingStatus: false,
  addPaymentSuccess: true,
  addPaymentFailure: false,
});
const addPaymentFailure = (state) => ({
  ...state,
  // isLoadingConfirm: false,
  // isLoadingStatus: false,
  addPaymentSuccess: false,
  addPaymentFailure: true,
})

const changeType = state => ({
  ...state,
  loading: true,
  isLoadingStatus: true,
});
const changeTypeSuccess = (state, { status }) => {
  const { transaction } = state;
  transaction.status = status;
  transaction.type = 1;
  return {
    ...state,
    transaction,
    isLoadingStatus: false,
  }
};
const changeTypeFailure = (state) => ({
  ...state,
  isLoadingStatus: false,
})

// const submitUpdateTransaction = state => ({
//   ...state,
//   isLoadingStatus: true,
// });

const submitUpdateTransactionSuccess = (state) => {
  return {
    ...state,
    isLoadingStatus: true,
  }
};
const submitUpdateTransactionFailure = (state) => ({
  ...state,
  isLoadingStatus: false,
})

export const transaction = makeReducerCreator(initialState, {
  [TransactionTypes.GET_LIST_TRANSACTION]: getListTransaction,

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
  [TransactionTypes.REMOVE_ORDER_IMAGE]: removeOrderImage,

  [TransactionTypes.CONFIRM_TRANSACTION]: confirmTransaction,
  [TransactionTypes.CONFIRM_TRANSACTION_SUCCESS]: confirmTransactionSuccess,
  [TransactionTypes.CONFIRM_TRANSACTION_FAILURE]: confirmTransactionFailure,

  // [TransactionTypes.ADD_PAYMENT]: addPayment,
  [TransactionTypes.ADD_PAYMENT_SUCCESS]: addPaymentSuccess,
  [TransactionTypes.ADD_PAYMENT_FAILURE]: addPaymentFailure,

  [TransactionTypes.CHANGE_TYPE]: changeType,
  [TransactionTypes.CHANGE_TYPE_SUCCESS]: changeTypeSuccess,
  [TransactionTypes.CHANGE_TYPE_FAILURE]: changeTypeFailure,

  // [TransactionTypes.SUBMIT_UPDATE_TRANSACTION]: submitUpdateTransaction,
  [TransactionTypes.SUBMIT_UPDATE_TRANSACTION_SUCCESS]: submitUpdateTransactionSuccess,
  [TransactionTypes.SUBMIT_UPDATE_TRANSACTION_FAILURE]: submitUpdateTransactionFailure,

  [TransactionTypes.GET_ONE_PAYMENT_SUCCESS]: getOnePaymentSuccess,
  [TransactionTypes.GET_ONE_PAYMENT_FAILURE]: getOnePaymentFailure,

  [TransactionTypes.UPDATE_ONE_PAYMENT_SUCCESS]: updateOnePaymentSuccess,
  [TransactionTypes.UPDATE_ONE_PAYMENT_FAILURE]: updateOnePaymentFailure,
})
