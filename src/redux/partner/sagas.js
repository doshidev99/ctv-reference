import { takeEvery, put, call } from "redux-saga/effects";
import {
  PartnerTypes,
  getListPartnerSuccessAction,
  getListPartnerFailureAction,
  getOnePartnerInfoSuccessAction,
  getOnePartnerInfoFailureAction,
  createOnePartnerSuccessAction,
  createOnePartnerFailureAction,
} from "./actions";
// import {data} from './tempData'
import { getListStaff, getOne, createOne } from "../../api/modules/partner";
import { apiWrapper } from "../../utils/reduxUtils";

function* getListPartner({ limit, offset, filter, orderBy }) {
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
      phone: e.phone,
    }));
    yield put(getListPartnerSuccessAction(data, total, limit, offset));
  } catch (error) {
    yield put(getListPartnerFailureAction(error));
  }
}

function* getOnePartner({ id }) {
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
    yield put(getOnePartnerInfoSuccessAction(data))
  } catch (error) {
    yield put(getOnePartnerInfoFailureAction(error))
  }


}

function* createOnePartner({ payload }) {
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
    yield put(createOnePartnerSuccessAction())
  } catch (error) {
    yield put(createOnePartnerFailureAction(error))
  }

}



export default [
  takeEvery(PartnerTypes.GET_LIST_PARTNER, getListPartner),
  takeEvery(PartnerTypes.GET_ONE_PARTNER_INFO, getOnePartner),
  takeEvery(PartnerTypes.CREATE_PARTNER, createOnePartner),
];
