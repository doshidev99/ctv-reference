import { takeEvery, put, call } from "redux-saga/effects";
import moment from "moment";
import {
  PropertyTypes,
  getListPropertySuccessAction,
  getListPropertyFailureAction,
  deletePropertyFailureAction,
  submitCreatePropertyFormFailureAtion,

  // uploadFileSuccessAction,
  // uploadFileFailureAction,
} from "./actions";
// import {data} from './tempData'
import { getProperties, deleteOne, createOneProperty } from "../../api/modules/property";
import { apiWrapper } from "../../utils/reduxUtils";

function* getListProperty({ limit, offset, filter }) {
  try {
    if (limit === undefined) {
      limit = 5;
    }
    if (offset === undefined) {
      offset = 0;
    }
    
    const { results, total } = yield getProperties({ limit, offset, filter });

    const data = results.map(e => {
      return {
        key: e.id,
        name: e.name,
        city: e.cityName,
        type: e.typeName,
        date: moment(e.createdAt).format("L"),
      };
    });

    yield put(getListPropertySuccessAction(data, total, limit, offset));
  } catch (error) {
    yield put(getListPropertyFailureAction(error));
  }
}

function* deleteProperty({ id }) {
  try {
    yield call(
      apiWrapper,
      {
        isShowProgress: true,
        isShowSucceedNoti: true,
        successDescription: "Xóa thành công",
      },
      deleteOne,
      id,
    );
  } catch (error) {
    yield put(deletePropertyFailureAction(error));
  }
}

function* createProperty({ payload }) {
  try {
    const body =JSON.parse(JSON.stringify(payload))
    body.legalRecords.forEach(e => {
      delete e.id
    });
    body.sitePlans.forEach(e => {
      delete e.id
    });
    body.sections.forEach(e => {
      delete e.key
    });
    const newLegalRecords = body.legalRecords.filter(value => Object.keys(value).length !== 0);
    const newSitePlans = body.sitePlans.filter(value => Object.keys(value).length !== 1);
    body.legalRecords = newLegalRecords;
    body.sitePlans = newSitePlans;

    // console.log(body.legalRecords === payload.legalRecords);
    // console.log(body);
    
    yield call(
      apiWrapper,
      {
        isShowProgress: true,
        isShowSucceedNoti: true,
        successDescription: "Thêm thành công",
        errorDescription: "Có lỗi xảy ra",
      },
      createOneProperty,
      body,
    );
  } catch (error) {
    // console.log(error);
    yield put(submitCreatePropertyFormFailureAtion(error));
  }
}


export default [
  takeEvery(PropertyTypes.GET_LIST_PROPERTY, getListProperty),
  takeEvery(PropertyTypes.DELETE_PROPERTY, deleteProperty),
  takeEvery(PropertyTypes.SUBMIT_CREATE_PROPERTY_FORM, createProperty),
];
