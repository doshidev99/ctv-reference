import { takeEvery, put, call } from "redux-saga/effects";
import moment from 'moment'
import {
  TransactionTypes,
  getDetailTransactionSuccessAction,
  getDetailTransactionFailureAction,
  getTablePaymentSuccessAction,
  getTablePaymentFailureAction,
  getListTransactionSuccessAction,
  getListTransactionFailureAction,
  confirmOrderSuccessAction,
  confirmOrderFailureAction,
  resendRequestSuccessAction,
  resendRequestFailureAction,
  cancelTransactionSuccessAction,
  cancelTransactionFailureAction,
} from "./actions";
import {
  getDetailTransactionApi,
  getTablePaymentApi,
  listTransactionApi,
  confirmOrderApi,
  resendRequestApi,
  cancelTransApi,
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
    const data = results.map(e => {
      return {
        key: e.id,
        date: moment(e.createdAt).format('DD/MM/YYYY'),
        amount: e.amount,
        realtorReceived: e.realtorReceived === true ? 'Đã rút': 'Chưa rút',
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

function* confirmOder ({id}) {
  try {
    const { status, standingOrder} = yield confirmOrderApi(id);
    yield put(confirmOrderSuccessAction(status, standingOrder))
  } catch (error) {
    yield put(confirmOrderFailureAction(error));
  }
}

function* resendRequest ({id}) {
  try {
    const { status } = yield resendRequestApi(id);
    yield put(resendRequestSuccessAction(status))
  } catch (error) {
    yield put(resendRequestFailureAction(error));
  }
}

function* cancelTransaction ({id}) {
  try {
    const { status } = yield cancelTransApi(id);
    yield put(cancelTransactionSuccessAction(status))
  } catch (error) {
    yield put(cancelTransactionFailureAction(error));
  }
}


export default [
  takeEvery(TransactionTypes.GET_DETAIL_TRANSACTION, getDetailSaga),
  takeEvery(TransactionTypes.GET_TABLE_PAYMENT, getTableSaga),
  takeEvery(TransactionTypes.GET_LIST_TRANSACTION, getListTransaction),
  takeEvery(TransactionTypes.CONFIRM_ORDER, confirmOder),
  takeEvery(TransactionTypes.RESEND_REQUEST, resendRequest),
  takeEvery(TransactionTypes.CANCEL_TRANSACTION, cancelTransaction),
];
