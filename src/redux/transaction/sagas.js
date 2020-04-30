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
  confirmOrderImageFailureAction,
  confirmOrderImageSuccessAction,
  confirmOrderFailureAction,
  resendRequestSuccessAction,
  resendRequestFailureAction,
  cancelTransactionSuccessAction,
  cancelTransactionFailureAction,
  confirmTransactionSuccessAction,
  confirmTransactionFailureAction,
  addPaymentSuccessAction,
  addPaymentFailureAction,
  // changeTypeSuccessAction,
  changeTypeFailureAction,
  changeTypeSuccessAction,
  submitUpdateFormSuccessAction,
  submitUpdateFormFailureAction,
} from "./actions";
import {
  getDetailTransactionApi,
  getTablePaymentApi,
  getTransaction,
  confirmOrderApi,
  confirmOrderImageApi,
  resendRequestApi,
  cancelTransApi,
  confirmTransactionApi,
  addPaymentApi,
  createRewardApi,
  changeTypeApi,
  updateTransactionApi,
} from "../../api/modules/transaction/index";
import * as sagas from '../rest/sagas';
import { apiWrapper } from '../../utils/reduxUtils';

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
        date: moment(e.createdAt).format('DD/MM/YYYY hh:mm:ss'),
        amount: e.amount,
        // paymentType: e.type === 1 ? 'Thanh toán' : 'Tạm ứng',
        realtorReceived: e.realtorReceived === true ? 'Đã rút': 'Chưa rút',
      }
    })
    yield put(getTablePaymentSuccessAction(data,total))
  } catch (error) {
    yield put(getTablePaymentFailureAction(error))
  }
}

function* getListTransaction ({ limit, offset, filter }) {
  try {
    if (limit === undefined) {
      limit = 10;
    }
    if (offset === undefined) {
      offset = 0;
    }

    filter = JSON.stringify(filter)
    const {results, total} = yield getTransaction({ limit, offset, filter });
    // const data = results;
    // // console.log(data,total);

    yield put(getListTransactionSuccessAction(results, total, limit, offset));
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

function* confirmOderImage ({id, imageUrl}) {
  try {
    const { status, standingOrder } = yield confirmOrderImageApi({id, imageUrl});
    if( status && standingOrder) {
      yield put(confirmOrderImageSuccessAction(status, standingOrder))
    }
  } catch (error) {
    yield put(confirmOrderImageFailureAction(error));
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

function* confirmTransaction({id, payload}) {
  try {
    const { bonus } = payload;
    yield createRewardApi(id, bonus);
    const { status } = yield confirmTransactionApi(id, payload);
    yield put(confirmTransactionSuccessAction( status))
  } catch (error) {
    yield put(confirmTransactionFailureAction(error));
  }
}

function* addPayment({id, payload}) {
  try {
    // const response = yield call(
    //   apiWrapper,
    //   {
    //     isShowLoading: true,
    //     isShowSucceedNoti: true,
    //     successDescription: "Thêm thành công",
    //     errorDescription: "Lỗi !!",
    //   },
    //   addPaymentApi,
    //   id,
    //   payload,
    // );
    
    const resource = "transaction-payments"
    // yield sagas.retrieveList(resource)
    // const detail = yield getDetailTransactionApi(id);
    const data = {
      transactionId: id,
      amount: payload.amount,
      type: 1,
    }    
    yield sagas.createRecord({resource, data})
    yield put(addPaymentSuccessAction())
  } catch (error) {
    yield put(addPaymentFailureAction(error))
    console.log(error);
    
    
  }
}

function* changeType ({id}) {
  try {
    const { status } = yield changeTypeApi(id);
    yield put(changeTypeSuccessAction(status))
  } catch (error) {
    yield put(changeTypeFailureAction(error));
  }
}

function* updateDetailTrans ({id, payload}) {
  try {
    payload.rewards.map((e) => delete e.id)
    const response = yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: true,
        successDescription: "Cập nhật thành công",
        errorDescription: "Lỗi !!",
      },
      updateTransactionApi,
      id,
      payload,
    );
    yield put(submitUpdateFormSuccessAction(response))
    yield getDetailSaga({id})
  } catch (error) {
    yield put(submitUpdateFormFailureAction(error));
  }
}
export default [
  takeEvery(TransactionTypes.GET_DETAIL_TRANSACTION, getDetailSaga),
  takeEvery(TransactionTypes.GET_TABLE_PAYMENT, getTableSaga),
  takeEvery(TransactionTypes.GET_LIST_TRANSACTION, getListTransaction),
  takeEvery(TransactionTypes.CONFIRM_ORDER, confirmOder),
  takeEvery(TransactionTypes.CONFIRM_ORDER_IMAGE, confirmOderImage),
  takeEvery(TransactionTypes.RESEND_REQUEST, resendRequest),
  takeEvery(TransactionTypes.CANCEL_TRANSACTION, cancelTransaction),
  takeEvery(TransactionTypes.CONFIRM_TRANSACTION, confirmTransaction),
  takeEvery(TransactionTypes.ADD_PAYMENT, addPayment),
  takeEvery(TransactionTypes.CHANGE_TYPE, changeType),
  takeEvery(TransactionTypes.SUBMIT_UPDATE_TRANSACTION, updateDetailTrans),
];
