import { takeEvery, put, call } from "redux-saga/effects";
import {
  PropertyTypeTypes,
  getListPropertyTypeSuccessAction,
  getListPropertyTypeFailureAction,

  createOnePropertyTypeSuccessAction,
  createOnePropertyTypeFailureAction,

  updateOnePropertyTypeSuccessAction,
  updateOnePropertyTypeFailureAction,
} from "./actions";
// import {data} from './tempData'
import { getPropertyTypes } from "../../api/modules/property";
import { putApi, postApi } from "../../api/common/crud";
import { apiWrapper } from "../../utils/reduxUtils";

function* getListPropertyType({ limit, offset, filter , orderBy, fields }) {
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
    const {results, total} = yield getPropertyTypes({ limit, offset, filter , orderBy, fields  });
    const data = results.map(e => ({
      name: e.name,
      id: e.id,
      key:e.id,
      status: e.isVisible,
    }))
    yield put(getListPropertyTypeSuccessAction(data, total, limit, offset));
  } catch (error) {
    yield put(getListPropertyTypeFailureAction(error));
  }
}

function* createOnePropertyType({ payload}) {
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
      "property-types",
      payload,
    );
    yield put (createOnePropertyTypeSuccessAction());
    
  } catch (error) {
    yield put (createOnePropertyTypeFailureAction());
  }
}

function* updateOnePropertyType({ id, payload }) {
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
      "property-types",
      id,
      payload,
    );
    yield put (updateOnePropertyTypeSuccessAction());
    
  } catch (error) {
    yield put (updateOnePropertyTypeFailureAction());
  }
}

export default [
  takeEvery(PropertyTypeTypes.GET_LIST_PROPERTY_TYPE, getListPropertyType),
  takeEvery(PropertyTypeTypes.CREATE_ONE_PROPERTY_TYPE, createOnePropertyType),
  takeEvery(PropertyTypeTypes.UPDATE_ONE_PROPERTY_TYPE, updateOnePropertyType),

];
