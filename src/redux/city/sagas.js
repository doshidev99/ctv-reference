import { takeEvery, put, call } from "redux-saga/effects";
import {
  CityTypes,
  getListCitySuccessAction,
  getListCityFailureAction,

  createOneCitySuccessAction,
  createOneCityFailureAction,

  updateOneCitySuccessAction,
  updateOneCityFailureAction,
} from "./actions";
// import {data} from './tempData'
import { getCities } from "../../api/modules/city";
import { putApi, postApi } from "../../api/common/crud";
import { apiWrapper } from "../../utils/reduxUtils";

function* getListCity({ limit, offset, filter , orderBy, fields }) {
  try {
    if (limit === undefined) {
      limit = 50;
    }
    if (offset === undefined) {
      offset = 0
    }
    if (fields === undefined) {
     fields = `["id", "name"]`
    }
    const {results, total} = yield getCities({ limit, offset, filter , orderBy, fields  });
    const data = results.map(e => ({
      name: e.name,
      id: e.id,
      key:e.id,
      status: e.isVisible,
      code: e.code,
    }))
    yield put(getListCitySuccessAction(data, total, limit, offset));
  } catch (error) {
    yield put(getListCityFailureAction(error));
  }
}

function* createOneCity({ payload}) {
  try {
    yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: true,
        successDescription: "Thêm thành công",
        errorDescription: "Có lỗi xảy ra",
      },
      postApi,
      "cities",
      payload,
    );
    yield put (createOneCitySuccessAction());
    
  } catch (error) {
    yield put (createOneCityFailureAction());
  }
}

function* updateOneCity({ id, payload }) {
  try {
    payload = {
      name: payload.name,
      code: payload.code,
      isVisible: payload.status,
    }
    yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: true,
        successDescription: "Sửa thành công",
        errorDescription: "Có lỗi xảy ra",
      },
      putApi,
      "cities",
      id,
      payload,
    );
    yield put (updateOneCitySuccessAction());
    
  } catch (error) {
    yield put (updateOneCityFailureAction());
  }
}

export default [
  takeEvery(CityTypes.GET_LIST_CITY, getListCity),
  takeEvery(CityTypes.CREATE_ONE_CITY, createOneCity),
  takeEvery(CityTypes.UPDATE_ONE_CITY, updateOneCity),

];
