import { takeEvery, put, call } from "redux-saga/effects";
import {
  TransactionTypes,
  getListTransactionSuccessAction,
  getListTransactionFailureAction,

} from "./actions";

import { listTransactionApi } from "../../api/modules/transaction"
import { apiWrapper } from "../../utils/reduxUtils";

function* getListTransaction () {
  try {
    const response = yield call(
      apiWrapper,
      {},
      listTransactionApi,
    );
    if (response.results){
      yield put(getListTransactionSuccessAction(response.results));
    }
  } catch (error) {
    yield put(getListTransactionFailureAction(error));
  }
}

export default [
  takeEvery(TransactionTypes.GET_LIST_TRANSACTION, getListTransaction),
];
