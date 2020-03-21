import { takeEvery, put, call } from "redux-saga/effects";
import {
  TransactionTypes,
  getDetailTransactionSuccessAction,
  getDetailTransactionFailureAction,
  getTablePaymentSuccessAction,
  getTablePaymentFailureAction,
  getListTransactionSuccessAction,
  getListTransactionFailureAction,
} from "./actions";
import {
  getDetailTransactionApi,
  getTablePaymentApi,
  listTransactionApi,
} from "../../api/modules/transaction/index";
import { apiWrapper } from "../../utils/reduxUtils";

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
  takeEvery(TransactionTypes.GET_DETAIL_TRANSACTION, getDetailSaga),
  takeEvery(TransactionTypes.GET_TABLE_PAYMENT, getTableSaga),
  takeEvery(TransactionTypes.GET_LIST_TRANSACTION, getListTransaction),
];
