import { makeConstantCreator, makeActionCreator } from "../../utils/reduxUtils";

export const TransactionTypes = makeConstantCreator(
  "GET_DETAIL_TRANSACTION",
  "GET_DETAIL_TRANSACTION_SUCCESS",
  "GET_DETAIL_TRANSACTION_FAIL",

  "GET_TABLE_PAYMENT",
  "GET_TABLE_PAYMENT_SUCCESS",
  "GET_TABLE_PAYMENT_FAIL",

  "GET_LIST_TRANSACTION",
  "GET_LIST_TRANSACTION_SUCCESS",
  "GET_LIST_TRANSACTION_FAILURE",
);

// Get detail transaction by id
export const getDetailTransactionAction = id =>
  makeActionCreator(TransactionTypes.GET_DETAIL_TRANSACTION, { id });
export const getDetailTransactionSuccessAction = data =>
  makeActionCreator(TransactionTypes.GET_DETAIL_TRANSACTION_SUCCESS, {data});
export const getDetailTransactionFailureAction = error =>
  makeActionCreator(TransactionTypes.GET_DETAIL_TRANSACTION_FAIL, {error});

// Get table transactions payments by transactionId
export const getTablePaymentAction = id =>
  makeActionCreator(TransactionTypes.GET_TABLE_PAYMENT, {id});
export const getTablePaymentSuccessAction = (data, total) =>
  makeActionCreator(TransactionTypes.GET_TABLE_PAYMENT_SUCCESS, {data, total});
export const getTablePaymentFailureAction = error =>
  makeActionCreator(TransactionTypes.GET_TABLE_PAYMENT_FAIL, {error});

// Get list transaction
export const getListTransactionAction = params => makeActionCreator(TransactionTypes.GET_LIST_TRANSACTION, { params });
export const getListTransactionSuccessAction = data => makeActionCreator(TransactionTypes.GET_LIST_TRANSACTION_SUCCESS, { data });
export const getListTransactionFailureAction = error => makeActionCreator(TransactionTypes.GET_LIST_TRANSACTION_FAILURE, { error });



