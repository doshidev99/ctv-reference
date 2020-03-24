import { takeEvery, put } from "redux-saga/effects";
import {
  TransactionTypes,
  getListTransactionSuccessAction,
  getListTransactionFailureAction,

} from "./actions";
import { getTransaction } from "../../api/modules/transaction"

function* getListTransaction ({ limit, offset, filter }) {
  try {
    if (limit === undefined) {
      limit = 10;
    }
    if (offset === undefined) {
      offset = 0;
    }
    // let filter = {
    //   status: 0
    // }
    // console.log();

    filter = JSON.stringify(filter)
    const {results, total} = yield getTransaction({ limit, offset, filter });
    const data = results;
    // console.log(data,total);

    yield put(getListTransactionSuccessAction(data, total, limit, offset));
  } catch (error) {
    yield put(getListTransactionFailureAction(error));
  }
}

export default [
  takeEvery(TransactionTypes.GET_LIST_TRANSACTION, getListTransaction),
];
