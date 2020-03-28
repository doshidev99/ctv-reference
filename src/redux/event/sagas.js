import { takeEvery, put, call } from "redux-saga/effects";
import moment from "moment";
import {
  EventTypes,
  getListEventSuccessAction,
  getListEventFailureAction,
  createOneEventSuccessAction,
  createOneEventFailureAction,
  updateOneEventSuccessAction,
  updateOneEventFailureAction,
  getOneEventSuccessAction,
  getOneEventFailureAction,
  getRegistrationsByEventSuccessAction,
  getRegistrationsByEventFailureAction,
} from "./actions";
// import {data} from './tempData'
import { getEvents } from "../../api/modules/event";
import { putApi, postApi, getDataByIdApi } from "../../api/common/crud";
import { apiWrapper } from "../../utils/reduxUtils";

function* getListEvent({ limit, offset, filter, orderBy, fields }) {
  try {
    if (limit === undefined) {
      limit = 50;
    }
    if (offset === undefined) {
      offset = 0;
    }
    if (fields === undefined) {
      fields = `["id", "name"]`;
    }
    // console.log(
    //   limit, offset, filter , orderBy, fields,
    // );

    const { results, total } = yield getEvents({
      limit,
      offset,
      filter,
      orderBy,
      fields,
    });
    // console.log(results);

    const data = results.map(e => ({
      name: e.name,
      id: e.id,
      key: e.id,
      status: e.isVisible,
      happenAt: moment(e.happenAt).format("L"),
      locationDescription: e.locationDescription,
    }));
    // console.log(data);

    yield put(getListEventSuccessAction(data, total, limit, offset));
  } catch (error) {
    yield put(getListEventFailureAction(error));
  }
}

function* createOneEvent({ payload }) {
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
      "events",
      payload,
    );
    yield put(createOneEventSuccessAction());
  } catch (error) {
    yield put(createOneEventFailureAction());
  }
}

function* updateOneEvent({ id, payload }) {
  try {
    // console.log(id);
    // console.log(payload);
    payload = {
      name: payload.name,
      code: payload.code,
      isVisible: payload.status,
    };
    yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: true,
        successDescription: "Sửa thành công",
        errorDescription: "Có lỗi xảy ra",
      },
      putApi,
      "events",
      id,
      payload,
    );
    yield put(updateOneEventSuccessAction());
  } catch (error) {
    yield put(updateOneEventFailureAction());
  }
}

function* getOne({ id }) {
  try {
    const response = yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: false,
        errorDescription: "Có lỗi xảy ra",
      },
      getDataByIdApi,
      "events",
      id,
    );
    // console.log(response);

    const data = {
      id: response.id,
      name: response.name,
      content: response.name,
      locationDescription: response.locationDescription,
      happenAt: moment(response.happenAt).format("L"),
      isVisible: response.isVisible,
    };
    // console.log(data);

    yield put(getOneEventSuccessAction(data));
  } catch (error) {
    yield put(getOneEventFailureAction(error));
  }
}
function* getListRegistrationForm({
  id,
  limit,
  offset,
  filter,
  orderBy,
  fields,
}) {
  try {
    const { results, total } = yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: false,
        errorDescription: "Có lỗi xảy ra",
      },
      getDataByIdApi,
      "events",
      `${id}/registrations`,
      {
        limit,
        offset,
        filter,
        orderBy,
        fields,
      },
    );
    const data = results.map(e => ({
      id: e.id,
      key: e.key,
      fullName: e.realtor.fullName,
      email: e.realtor.email,
      phone: e.realtor.phone,
    }))
    yield put(getRegistrationsByEventSuccessAction(data, total, limit, offset))
  } catch (error) {
    yield put(getRegistrationsByEventFailureAction(error));
  }
}

export default [
  takeEvery(EventTypes.GET_LIST_EVENT, getListEvent),
  takeEvery(EventTypes.CREATE_ONE_EVENT, createOneEvent),
  takeEvery(EventTypes.UPDATE_ONE_EVENT, updateOneEvent),
  takeEvery(EventTypes.GET_ONE_EVENT, getOne),
  takeEvery(EventTypes.GET_REGISTRATIONS_BY_EVENT, getListRegistrationForm),
];
