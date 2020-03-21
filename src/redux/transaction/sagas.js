import { takeEvery, put } from "redux-saga/effects";
import {
  TransactionTypes,
  getDetailTransactionSuccessAction,
  getDetailTransactionFailureAction,
  getTablePaymentSuccessAction,
  getTablePaymentFailureAction,
} from "./actions";
import {
  getDetailTransactionApi,
  getTablePaymentApi,
} from "../../api/modules/transaction/index";

function* getDetailSaga({ id }) {
  try {
    const response = yield getDetailTransactionApi(id);
    
    if(response && response !== {}){
      yield put(getDetailTransactionSuccessAction(response))
    } else {
      yield put(getDetailTransactionFailureAction(response))
    }
  } catch (error) {
    yield put(getDetailTransactionFailureAction(error))
  }
}

function* getTableSaga({ id }) {
  try {
    const {results, total} = yield getTablePaymentApi({ id });
    const data = results.map((e,i) => {
      return {
        phase: i+1,
        key: e.id,
        amount: e.amount,
        available: e.isAvailable,
        withdraw: e.realtorReceived,
      }
    })
    yield put(getTablePaymentSuccessAction(data,total))
  } catch (error) {
    yield put(getTablePaymentFailureAction(error))
  }
}

export default [
  takeEvery(TransactionTypes.GET_DETAIL_TRANSACTION, getDetailSaga),
  takeEvery(TransactionTypes.GET_TABLE_PAYMENT, getTableSaga),
]