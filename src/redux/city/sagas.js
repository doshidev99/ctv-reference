import { takeEvery, put } from "redux-saga/effects";
import {
  CityTypes,
  getListCitySuccessAction,
  getListCityFailureAction,
} from "./actions";
// import {data} from './tempData'
import { getCities } from "../../api/modules/city";

function* getListCity({ limit, offset }) {
  try {
    if (limit === undefined) {
      limit = 50;
    }
    if (offset === undefined) {
      offset = 0
    }
    const fields = `["id", "name"]`
    const {results, total} = yield getCities({ limit, offset, fields });
    yield put(getListCitySuccessAction(results, total, limit, offset));
  } catch (error) {
    yield put(getListCityFailureAction(error));
  }
}

export default [takeEvery(CityTypes.GET_LIST_CITY, getListCity)];
