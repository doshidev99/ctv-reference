import { takeEvery, put, call } from "redux-saga/effects";
import {
  ServiceTypes,
  getListServiceSuccessAction,
  getListServiceFailureAction,

  createOneServiceSuccessAction,
  createOneServiceFailureAction,

  getOneServiceFailureAction,
  getOneServiceSuccessAction,

  updateOneServiceSuccessAction,
  updateOneServiceFailureAction,

  deleteOneSuccessAction,
  deleteOneFailureAction,
} from "./actions";
import { getServices } from "../../api/modules/service";
import { putApi, postApi, getDataByIdApi, delApi } from "../../api/common/crud";
import { apiWrapper } from "../../utils/reduxUtils";

function* getListService({ limit, offset, filter , orderBy, fields }) {
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
    const {results, total} = yield getServices({ limit, offset, filter , orderBy, fields  });
    const data = results.map(e => ({
      name: e.name,
      id: e.id,
      key:e.id,
    }))
    yield put(getListServiceSuccessAction(data, total, limit, offset));
  } catch (error) {
    yield put(getListServiceFailureAction(error));
  }
}

function* createOneService({ payload}) {
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
      "services",
      payload,
    );
    yield put (createOneServiceSuccessAction());
    
  } catch (error) {
    yield put (createOneServiceFailureAction());
  }
}

function* getOneService({id}) {
  try {
    const response = yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: false,
        errorDescription: "Có lỗi xảy ra",
      },
      getDataByIdApi,
      "services",
      id,
    );
    const data = {
      id: response.id,
      name: response.name,
      description: response.description,
    }
    
    yield put(getOneServiceSuccessAction(data))
  } catch (error) {
    yield put(getOneServiceFailureAction(error))
  }
}

function* updateOneService({ id, payload }) {
  try {
    payload = {
      name: payload.name,
      description: payload.description,
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
      "services",
      id,
      payload,
    );
    yield put (updateOneServiceSuccessAction());
    
  } catch (error) {
    yield put (updateOneServiceFailureAction());
  }
}

function* deleteOne({id}) {
  try {
    yield call(
      apiWrapper,
      {
        isShowProgress: true,
        isShowSucceedNoti: true,
        successDescription: "Xóa thành công",
        errorDescription: "Có lỗi xảy ra",
      },
      delApi,
      "services",
      id,
    );
    yield put(deleteOneSuccessAction())
  } catch (error) {
    yield put(deleteOneFailureAction(error))
  }
}

export default [
  takeEvery(ServiceTypes.GET_LIST_SERVICE, getListService),
  takeEvery(ServiceTypes.CREATE_ONE_SERVICE, createOneService),
  takeEvery(ServiceTypes.GET_ONE_SERVICE, getOneService),
  takeEvery(ServiceTypes.UPDATE_ONE_SERVICE, updateOneService),
  takeEvery(ServiceTypes.DELETE_ONE, deleteOne),
];
