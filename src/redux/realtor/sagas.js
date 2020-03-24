import { takeEvery, put } from "redux-saga/effects";
import {
  RealtorTypes,
  getListRealtorSuccessAction,
  getListRealtorFailureAction,
} from "./actions";
// import {data} from './tempData'
import { getRealtors } from "../../api/modules/realtor";

function* getListRealtor({ limit, offset, filter, orderBy, fields }) {
  try {
    if (limit === undefined) {
      limit = 5;
    }
    if (offset === undefined) {
      offset = 0;
    }
    
    const { results, total } = yield getRealtors({ limit, offset, filter, orderBy, fields });
    const data = results.map(e => ({
      id: e.id,
      key: e.id,
      email: e.email,
      fullName: e.fullName,
      phoneNumber: e.phone,
    }))

    

    yield put(getListRealtorSuccessAction(data, total, limit, offset));
  } catch (error) {
    yield put(getListRealtorFailureAction(error));
  }
}

export default [takeEvery(RealtorTypes.GET_LIST_REALTOR, getListRealtor)];
