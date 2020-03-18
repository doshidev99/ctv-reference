import { takeEvery, put, call } from "redux-saga/effects";
import {
  TransactionTypes,
  getListTransactionSuccessAction,
  getListTransactionFailureAction,

} from "./actions";

import { listTransactionApi } from "../../api/modules/transaction"
import { apiWrapper } from "../../utils/reduxUtils";
// import {data} from './tempData'

function* getListTransaction () {
  try {
    const response = yield call(
      apiWrapper,
      {},
      listTransactionApi,
    );
    // console.log(response.results);

    if (response.results){
      yield put(getListTransactionSuccessAction(response.results));
    }
  } catch (error) {
    yield put(getListTransactionFailureAction(error));
  }
}

// function* getListTransaction () {
//   try {
//     localStorage.setItem("transactions", JSON.stringify(data));
//     console.log(data);

//     yield put(getListTransactionSuccessAction(data));
//   } catch (error) {
//     yield put(getListTransactionFailureAction(error));
//   }
// }

export default [
  takeEvery(TransactionTypes.GET_LIST_TRANSACTION, getListTransaction),
];
