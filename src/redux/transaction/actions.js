import { makeConstantCreator, makeActionCreator } from "../../utils/reduxUtils";

export const TransactionTypes = makeConstantCreator(
  "GET_LIST_TRANSACTION",
  "GET_LIST_TRANSACTION_SUCCESS",
  "GET_LIST_TRANSACTION_FAILURE",
);

// Get list transaction
export const getListTransactionAction = (limit, offset, filter) =>
  makeActionCreator(TransactionTypes.GET_LIST_TRANSACTION, { limit, offset, filter });
export const getListTransactionSuccessAction = (data, total, limit, offset) =>
  makeActionCreator(TransactionTypes.GET_LIST_TRANSACTION_SUCCESS, { data, total, limit ,offset });
export const getListTransactionFailureAction = error =>
  makeActionCreator(TransactionTypes.GET_LIST_TRANSACTION_FAILURE, { error });



