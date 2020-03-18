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
import {
  data,
} from './tempData';
import {
  getProperties,
} from '../../api/modules/property/index';

function* getListProperty () {
  try {
    const response = yield getProperties();
    if (response.results) {
      yield put(getListPropertySuccessAction(data));
    } else {
      yield put(getListPropertyFailureAction(data));
    }

  } catch (error) {
    yield put(getListPropertyFailureAction(error));
  }
}


export default [
  takeEvery(PropertyTypes.GET_LIST_PROPERTY, getListProperty),
];
