import { takeEvery, put } from "redux-saga/effects";
import {
  PropertyTypeTypes,
  getListPropertyTypeSuccessAction,
  getListPropertyTypeFailureAction,
} from "./actions";
// import {data} from './tempData'
import { getPropertyTypes } from "../../api/modules/property";

function* getListPropertyType({ limit, offset }) {
  try {
    if (limit === undefined) {
      limit = 5;
    }
    if (offset === undefined) {
      offset = 0
    }
    const fields = `["id", "name"]`
    const {results, total} = yield getPropertyTypes({ limit, offset, fields });
    
    yield put(getListPropertyTypeSuccessAction(results, total, limit, offset));
  } catch (error) {
    yield put(getListPropertyTypeFailureAction(error));
  }
}

export default [takeEvery(PropertyTypeTypes.GET_LIST_PROPERTY_TYPE, getListPropertyType)];
