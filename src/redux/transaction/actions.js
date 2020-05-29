import { makeConstantCreator, makeActionCreator } from "../../utils/reduxUtils";

export const TransactionTypes = makeConstantCreator(
  "GET_DETAIL_TRANSACTION",
  "GET_DETAIL_TRANSACTION_SUCCESS",
  "GET_DETAIL_TRANSACTION_FAIL",

  "GET_TABLE_PAYMENT",
  "GET_TABLE_PAYMENT_SUCCESS",
  "GET_TABLE_PAYMENT_FAIL",

  "GET_ONE_PAYMENT",
  "GET_ONE_PAYMENT_SUCCESS",
  "GET_ONE_PAYMENT_FAILURE",

  "UPDATE_ONE_PAYMENT",
  "UPDATE_ONE_PAYMENT_SUCCESS",
  "UPDATE_ONE_PAYMENT_FAILURE",

  "GET_LIST_TRANSACTION",
  "GET_LIST_TRANSACTION_SUCCESS",
  "GET_LIST_TRANSACTION_FAILURE",

  "ADD_NEW_BONUS",
  "REMOVE_BONUS",
  "ON_CHANGE_BONUS",

  "CONFIRM_ORDER",
  "CONFIRM_ORDER_SUCCESS",
  "CONFIRM_ORDER_FAIL",

  "CONFIRM_ORDER_IMAGE",
  "CONFIRM_ORDER_IMAGE_SUCCESS",
  "CONFIRM_ORDER_IMAGE_FAIL",

  "RESEND_REQUEST",
  "RESEND_REQUEST_SUCCESS",
  "RESEND_REQUEST_FAIL",

  "CANCEL_TRANSACTION",
  "CANCEL_TRANSACTION_SUCCESS",
  "CANCEL_TRANSACTION_FAIL",

  "UPLOAD_IMAGE",
  "UPLOAD_IMAGE_SUCCESS",
  "UPLOAD_IMAGE_FAILURE",
  "REMOVE_ORDER_IMAGE",

  "CONFIRM_TRANSACTION",
  "CONFIRM_TRANSACTION_SUCCESS",
  "CONFIRM_TRANSACTION_FAILURE",

  "ADD_PAYMENT",
  "ADD_PAYMENT_SUCCESS",
  "ADD_PAYMENT_FAILURE",

  "CHANGE_TYPE",
  "CHANGE_TYPE_SUCCESS",
  "CHANGE_TYPE_FAILURE",

  "SUBMIT_UPDATE_TRANSACTION",
  "SUBMIT_UPDATE_TRANSACTION_SUCCESS",
  "SUBMIT_UPDATE_TRANSACTION_FAILURE",
);

// Get detail transaction by id
export const getDetailTransactionAction = (id) =>
  makeActionCreator(TransactionTypes.GET_DETAIL_TRANSACTION, {id});
export const getDetailTransactionSuccessAction = (data) =>
  makeActionCreator(TransactionTypes.GET_DETAIL_TRANSACTION_SUCCESS, {data});
export const getDetailTransactionFailureAction = error =>
  makeActionCreator(TransactionTypes.GET_DETAIL_TRANSACTION_FAIL, {error});

// Get table transactions payments by transactionId
export const getTablePaymentAction = (id, limit, offset, filter, orderBy, fields) =>
  makeActionCreator(TransactionTypes.GET_TABLE_PAYMENT, {id, limit, offset, filter, orderBy, fields});
export const getTablePaymentSuccessAction = (data, total,  limit, offset) =>
  makeActionCreator(TransactionTypes.GET_TABLE_PAYMENT_SUCCESS, {data, total, limit, offset});
export const getTablePaymentFailureAction = error =>
  makeActionCreator(TransactionTypes.GET_TABLE_PAYMENT_FAIL, {error});

// Get list transaction
export const getListTransactionAction = (limit, offset, filter, orderBy, fields) =>
  makeActionCreator(TransactionTypes.GET_LIST_TRANSACTION, { limit, offset, filter,orderBy, fields });
export const getListTransactionSuccessAction = (data, total, limit, offset) =>
  makeActionCreator(TransactionTypes.GET_LIST_TRANSACTION_SUCCESS, { data, total, limit ,offset });
export const getListTransactionFailureAction = error =>
  makeActionCreator(TransactionTypes.GET_LIST_TRANSACTION_FAILURE, { error });

// Add new bonus on success transaction
export const addNewBonusAction = () =>
  makeActionCreator(TransactionTypes.ADD_NEW_BONUS);
export const removeBonusAction = id =>
  makeActionCreator(TransactionTypes.REMOVE_BONUS, { id });
export const onChangeBonusAction = (id, name, value) =>
  makeActionCreator(TransactionTypes.ON_CHANGE_BONUS, { id,name, value });

// Confirm uy nhiem chi order :3
export const confirmOrderAction = (id) =>
  makeActionCreator(TransactionTypes.CONFIRM_ORDER, {id});
export const confirmOrderSuccessAction = (status, standingOrder) =>
  makeActionCreator(TransactionTypes.CONFIRM_ORDER_SUCCESS, {status, standingOrder});
export const confirmOrderFailureAction = error =>
  makeActionCreator(TransactionTypes.CONFIRM_ORDER_FAIL, {error});

export const confirmOrderImageAction = (id, imageUrl) =>
  makeActionCreator(TransactionTypes.CONFIRM_ORDER_IMAGE, {id, imageUrl});
export const confirmOrderImageSuccessAction = (status, standingOrder) =>
  makeActionCreator(TransactionTypes.CONFIRM_ORDER_IMAGE_SUCCESS, {status, standingOrder});
export const confirmOrderImageFailureAction = error =>
  makeActionCreator(TransactionTypes.CONFIRM_ORDER_IMAGE_FAIL, {error});

  // Request resend, return status = 0
export const resendRequestAction = id =>
  makeActionCreator(TransactionTypes.RESEND_REQUEST, {id});
export const resendRequestSuccessAction = (status) =>
  makeActionCreator(TransactionTypes.RESEND_REQUEST_SUCCESS, {status});
export const resendRequestFailureAction = error =>
  makeActionCreator(TransactionTypes.RESEND_REQUEST_FAIL, {error});

// Cancel transaction, return status = 5
export const cancelTransactionAction = id =>
makeActionCreator(TransactionTypes.CANCEL_TRANSACTION, {id});
export const cancelTransactionSuccessAction = (status) =>
makeActionCreator(TransactionTypes.CANCEL_TRANSACTION_SUCCESS, {status});
export const cancelTransactionFailureAction = error =>
makeActionCreator(TransactionTypes.CANCEL_TRANSACTION_FAIL, {error});

// Upload up nhiem chi Image
export const uploadImageAction = () =>
  makeActionCreator(TransactionTypes.UPLOAD_IMAGE);
export const uploadImageSuccessAction = (fileUrl, mode) =>
  makeActionCreator(TransactionTypes.UPLOAD_IMAGE_SUCCESS, { fileUrl, mode });
export const uploadImageImageFailureAction = error =>
  makeActionCreator(TransactionTypes.UPLOAD_IMAGE_FAILURE, { error });

export const removeOrderImageAction = (id, link) =>
  makeActionCreator(TransactionTypes.REMOVE_ORDER_IMAGE, { id, link });

// Confirm transaction with comission amount
export const confirmTransactionAction = (id, payload) =>
  makeActionCreator(TransactionTypes.CONFIRM_TRANSACTION, {id, payload});
export const confirmTransactionSuccessAction = (status) =>
  makeActionCreator(TransactionTypes.CONFIRM_TRANSACTION_SUCCESS, { status });
export const confirmTransactionFailureAction = error =>
  makeActionCreator(TransactionTypes.CONFIRM_TRANSACTION_FAILURE, { error });

  // Add payment phase
export const addPaymentAction = (id, payload) =>
  makeActionCreator(TransactionTypes.ADD_PAYMENT, {id, payload});
export const addPaymentSuccessAction = () =>
  makeActionCreator(TransactionTypes.ADD_PAYMENT_SUCCESS);
export const addPaymentFailureAction = error =>
  makeActionCreator(TransactionTypes.ADD_PAYMENT_FAILURE, { error });

// Change type transaction
export const changeTypeAction = (id) =>
  makeActionCreator(TransactionTypes.CHANGE_TYPE, {id});
export const changeTypeSuccessAction = (status) =>
  makeActionCreator(TransactionTypes.CHANGE_TYPE_SUCCESS, {status});
export const changeTypeFailureAction = error =>
  makeActionCreator(TransactionTypes.CHANGE_TYPE_FAILURE, { error });

// Update confirm transaction form
export const submitUpdateFormAction = (id, payload) =>
  makeActionCreator(TransactionTypes.SUBMIT_UPDATE_TRANSACTION, {id, payload});
export const submitUpdateFormSuccessAction = () =>
  makeActionCreator(TransactionTypes.SUBMIT_UPDATE_TRANSACTION_SUCCESS);
export const submitUpdateFormFailureAction = error =>
  makeActionCreator(TransactionTypes.SUBMIT_UPDATE_TRANSACTION_FAILURE, { error });


  // Get one document
export const getOnePaymentAction = (id) =>
makeActionCreator(TransactionTypes.GET_ONE_PAYMENT, {id});
export const getOnePaymentSuccessAction = (data) =>
makeActionCreator(TransactionTypes.GET_ONE_PAYMENT_SUCCESS, {data});
export const getOnePaymentFailureAction = error =>
makeActionCreator(TransactionTypes.GET_ONE_PAYMENT_FAILURE, { error });

// Edit one service
export const updateOnePaymentAction = (id, payload) =>
  makeActionCreator(TransactionTypes.UPDATE_ONE_PAYMENT, {id, payload});
export const updateOnePaymentSuccessAction = (id) =>
  makeActionCreator(TransactionTypes.UPDATE_ONE_PAYMENT_SUCCESS, {id});
export const updateOnePaymentFailureAction = error =>
  makeActionCreator(TransactionTypes.UPDATE_ONE_PAYMENT_FAILURE, { error });

