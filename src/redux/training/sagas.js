import { takeEvery, put, call } from "redux-saga/effects";
import {
  TrainingTypes,
  getListDocumentSuccessAction,
  getListDocumentFailureAction,
  createOneDocumentSuccessAction,
  createOneDocumentFailureAction,
  updateOneDocumentSuccessAction,
  updateOneDocumentFailureAction,
  getOneDocumentFailureAction,
  getOneDocumentSuccessAction,
  //-------------------------------
  getListVideoSuccessAction,
  getListVideoFailureAction,
  createOneVideoSuccessAction,
  createOneVideoFailureAction,
  updateOneVideoSuccessAction,
  updateOneVideoFailureAction,
  getOneVideoSuccessAction, 
  getOneVideoFailureAction,

  uploadFileSuccessAction,
} from "./actions";
// import {data} from './tempData'
import { patchApi, postApi, getAllApi, getDataByIdApi, delApi } from "../../api/common/crud";
import { apiWrapper } from "../../utils/reduxUtils";

function* getListDocument({ limit, offset, filter, orderBy, fields }) {
  try {
    if (limit === undefined) {
      limit = 50;
    }
    if (offset === undefined) {
      offset = 0;
    }
    if (fields === undefined) {
      fields = `["id"]`;
    }
    filter = JSON.parse(filter)
    if(filter === null) {
      filter = {}
    }
    filter.type = 2;
    filter = JSON.stringify(filter);
    const {results, total} = yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: false,
        errorDescription: "Có lỗi xảy ra",
      },
      getAllApi,
      "trainings",
      {
        limit, offset, filter, orderBy, fields,
      },
    )
    const data = results.map(e => ({
      title: e.title,
      id: e.id,
      key:e.id,
      status: e.isVisible,
    }))
    yield put(getListDocumentSuccessAction(data, total, limit, offset));
  } catch (error) {
    yield put(getListDocumentFailureAction(error));
  }
}

function* createOneDocument({ payload }) {
  try {
    payload.type = 2
    yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: true,
        successDescription: "Thêm thành công",
        errorDescription: "Có lỗi xảy ra",
      },
      postApi,
      "trainings",
      payload,
    );
    yield put(createOneDocumentSuccessAction());
  } catch (error) {
    yield put(createOneDocumentFailureAction());
  }
}

function* getOneDocument({id}) {
  try {
    const response = yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: false,
        errorDescription: "Có lỗi xảy ra",
      },
      getDataByIdApi,
      "trainings",
      id,
    );
    const data = {
      id: response.id,
      title: response.title,
      description: response.description,
      link: response.link,
      status: response.isVisible,
    }
    yield put(getOneDocumentSuccessAction(data))
    yield put(uploadFileSuccessAction(response.link))
  } catch (error) {
    yield put(getOneDocumentFailureAction(error))
  }
}

function* updateOneDocument({ id, payload }) {
  try {
    if(payload.status !== undefined) {
      payload.isVisible = payload.status;
      delete payload.status;
    }
    if(payload.id !== undefined) {
      delete payload.id;
    }
    payload.type = 2
    const response = yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: true,
        successDescription: "Sửa thành công",
        errorDescription: "Có lỗi xảy ra",
      },
      patchApi,
      "trainings",
      id,
      payload,
    );
    const data = {
      title: response.title,
      id: response.id,
      key:response.id,
      status: response.isVisible,
    }
    yield put(updateOneDocumentSuccessAction(id, data));
  } catch (error) {
    yield put(updateOneDocumentFailureAction());
  }
}


//-------------------------------------------------------------------------

function* getListVideo({ limit, offset, filter, orderBy, fields }) {
  try {
    if (limit === undefined) {
      limit = 50;
    }
    if (offset === undefined) {
      offset = 0;
    }
    if (fields === undefined) {
      fields = `["id"]`;
    }
    filter = JSON.parse(filter)
    if(filter === null) {
      filter = {}
    }
    filter.type=1;
    filter = JSON.stringify(filter);
    const {results, total} = yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: false,
        errorDescription: "Có lỗi xảy ra",
      },
      getAllApi,
      "trainings",
      {
        limit, offset, filter, orderBy, fields,
      },
    )
    const data = results.map(e => ({
      title: e.title,
      id: e.id,
      key:e.id,
      status: e.isVisible,
    }))
    yield put(getListVideoSuccessAction(data, total, limit, offset));
  } catch (error) {
    yield put(getListVideoFailureAction(error));
  }
}

function* createOneVideo({ payload }) {
  try {
    payload.type = 1
    yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: true,
        successDescription: "Thêm thành công",
        errorDescription: "Có lỗi xảy ra",
      },
      postApi,
      "trainings",
      payload,
    );
    yield put(createOneVideoSuccessAction());
  } catch (error) {
    yield put(createOneVideoFailureAction());
  }
}

function* getOneVideo({id}) {
  try {
    const response = yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: false,
        errorDescription: "Có lỗi xảy ra",
      },
      getDataByIdApi,
      "trainings",
      id,
    );
    const data = {
      id: response.id,
      title: response.title,
      description: response.description,
      link: response.link,
      status: response.isVisible,
    }
    yield put(getOneVideoSuccessAction(data))
    yield put(uploadFileSuccessAction(response.link))
  } catch (error) {
    yield put(getOneVideoFailureAction(error))
  }
}

function* updateOneVideo({ id, payload }) {
  try {
    if(payload.status !== undefined) {
      payload.isVisible = payload.status;
      delete payload.status;
    }
    if(payload.id !== undefined) {
      delete payload.id;
    }
    payload.type = 1
    const response = yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: true,
        successDescription: "Sửa thành công",
        errorDescription: "Có lỗi xảy ra",
      },
      patchApi,
      "trainings",
      id,
      payload,
    );
    const data = {
      title: response.title,
      id: response.id,
      key:response.id,
      status: response.isVisible,
    }
    yield put(updateOneVideoSuccessAction(id, data));
  } catch (error) {
    yield put(updateOneVideoFailureAction());
  }
}

// -------------------------------------------------------------------

function* deleteOneTrainingStuff({id}) {
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
      "trainings",
      id,
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
}
export default [
  takeEvery(TrainingTypes.DELETE_ONE, deleteOneTrainingStuff),
  //-------------------------------------------------------
  takeEvery(TrainingTypes.GET_LIST_DOCUMENT, getListDocument),
  takeEvery(TrainingTypes.CREATE_ONE_DOCUMENT, createOneDocument),
  takeEvery(TrainingTypes.GET_ONE_DOCUMENT, getOneDocument),
  takeEvery(TrainingTypes.UPDATE_ONE_DOCUMENT, updateOneDocument),
  //--------------------------------------------------------------
  takeEvery(TrainingTypes.GET_LIST_VIDEO, getListVideo),
  takeEvery(TrainingTypes.CREATE_ONE_VIDEO, createOneVideo),
  takeEvery(TrainingTypes.GET_ONE_VIDEO, getOneVideo),
  takeEvery(TrainingTypes.UPDATE_ONE_VIDEO, updateOneVideo),
];
