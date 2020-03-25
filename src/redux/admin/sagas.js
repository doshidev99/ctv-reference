import { takeEvery, put, call } from "redux-saga/effects";
import {
  AdminTypes,
  getListAdminSuccessAction,
  getListAdminFailureAction,
  getOneAdminInfoSuccessAction,
  getOneAdminInfoFailureAction,
  createOneAdminSuccessAction,
  createOneAdminFailureAction,
} from "./actions";
// import {data} from './tempData'
import { getListStaff, getOne, createOne } from "../../api/modules/staff";
import { apiWrapper } from "../../utils/reduxUtils";

function* getListAdmin({ limit, offset, filter, orderBy }) {
  try {
    if (limit === undefined) {
      limit = 50;
    }
    if (offset === undefined) {
      offset = 0;
    }
    const { results, total } = yield getListStaff({
      limit,
      offset,
      filter,
      orderBy,
    });
    const data = results.map(e => ({
      key: e.id,
      id: e.id,
      fullName: e.fullName,
      email: e.email,
      roleName: e.role.name,
    }));
    yield put(getListAdminSuccessAction(data, total, limit, offset));
  } catch (error) {
    yield put(getListAdminFailureAction(error));
  }
}

function* getOneAdmin({id}) {
  try {
    const response = yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: false,
        errorDescription: "Lỗi !!",
      },
      getOne,
      id,
    );
    const data = {
      id: response.id,
      fullName: response.fullName,
      email: response.email,
    }
    yield put(getOneAdminInfoSuccessAction(data))
  } catch (error) {
    yield put(getOneAdminInfoFailureAction(error))
  }

  
}

function* createOneAdmin({payload}) {
  try {
     yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: true,
        successDescription: "Thêm thành công",
        errorDescription: "Lỗi !!",
      },
      createOne,
      payload,
    );
    yield put(createOneAdminSuccessAction())
  } catch (error) {
    yield put(createOneAdminFailureAction(error))
  }

}



export default [
  takeEvery(AdminTypes.GET_LIST_ADMIN, getListAdmin),
  takeEvery(AdminTypes.GET_ONE_ADMIN_INFO, getOneAdmin),
  takeEvery(AdminTypes.CREATE_ADMIN, createOneAdmin),
];
