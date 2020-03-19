import { makeConstantCreator, makeActionCreator } from "../../utils/reduxUtils";

export const TransactionTypes = makeConstantCreator(
  "GET_LIST_TRANSACTION",
  "GET_LIST_TRANSACTION_SUCCESS",
  "GET_LIST_TRANSACTION_FAILURE",
);

// Get list transaction
export const getListTransactionAction = params => makeActionCreator(TransactionTypes.GET_LIST_TRANSACTION, { params });
export const getListTransactionSuccessAction = data => makeActionCreator(TransactionTypes.GET_LIST_TRANSACTION_SUCCESS, { data });
export const getListTransactionFailureAction = error => makeActionCreator(TransactionTypes.GET_LIST_TRANSACTION_FAILURE, { error });



