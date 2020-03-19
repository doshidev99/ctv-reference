import { makeReducerCreator } from "../../utils/reduxUtils";
import { TransactionTypes } from "./actions";

// Setup inintial state for app
export const initialState = {
  transactions: [],
  loading: false,
  listTransactionSuccess: undefined,
  listTransactionFailure: undefined,
  currentTransaction: {},
};
// End setup

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
  [TransactionTypes.TRANSACTION]: getListTransaction,
  [TransactionTypes.GET_LIST_TRANSACTION_SUCCESS]: getListTransactionSuccess,
  [TransactionTypes.GET_LIST_TRANSACTION_FAILURE]: getListTransactionFailure,
});
