import {
  takeEvery,
  put,
} from "redux-saga/effects";
import {
  PropertyTypes,
  getListPropertySuccessAction,
  getListPropertyFailureAction,

  // uploadFileSuccessAction,
  // uploadFileFailureAction,
} from "./actions";
// import {data} from './tempData'
import { getProperties } from "../../api/modules/property";

function* getListProperty({ limit, offset, filter }) {
  try {
    if (limit === undefined) {
      limit = 5;
    }
    if (offset === undefined) {
      offset = 0
    }
    if (filter) {
      // eslint-disable-next-line no-console
      console.log(filter); // Đang fix api
    }
    const {results, total} = yield getProperties({ limit, offset });
    const data = results.map(e=> {
      return {
        key: e.id,
        name: e.name,
        city: e.cityName,
        type: e.typeName,
        date: e.createdAt,
      }
    })
    
    yield put(getListPropertySuccessAction(data, total, limit, offset));
  } catch (error) {
    yield put(getListPropertyFailureAction(error));
  }
}

export default [takeEvery(PropertyTypes.GET_LIST_PROPERTY, getListProperty)];
