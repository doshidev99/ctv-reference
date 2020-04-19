import { takeEvery, put, call } from "redux-saga/effects";
import moment from "moment";
import { object } from "prop-types";
import {
  PropertyTypes,
  getListPropertySuccessAction,
  getListPropertyFailureAction,
  deletePropertyFailureAction,
  submitCreatePropertyFormFailureAtion,
  submitCreatePropertyFormSuccessAction,
  getOnePropertySuccessAction,
  getProductTableSuccessAction,
  // uploadFileSuccessAction,
  // uploadFileFailureAction,
} from "./actions";
// import {data} from './tempData'
import {
  getProperties,
  deleteOne,
  createOneProperty,
} from "../../api/modules/property";

import { getDataByIdApi, getAllApi } from "../../api/common/crud";
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
    const data = results.map((e) => {
      return {
        key: e.id,
        name: e.name,
        city: e.city.name,
        type: e.type.name,
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
const clean = (obj) => {
  Object.keys(obj).forEach(
    (key) => (obj[key] == null || object[key] === "") && delete obj[key],
  );
};
function* createProperty({ payload }) {
  try {
    const body = JSON.parse(JSON.stringify(payload));
    body.legalRecords.forEach((e) => {
      delete e.id;
    });
    body.sitePlans.forEach((e) => {
      delete e.id;
    });

    body.sections.forEach((e) => {
      delete e.key;
    });

    body.discounts.forEach((e) => {
      delete e.id;
      clean(e);
      if (e.time && e.time.length === 2) {
        const { time } = e;
        [e.beganAt, e.endedAt] = time;
        delete e.time;
      } else {
        e.beganAt = null;
        e.endedAt = null;
        delete e.time;
      }
    });

    body.paymentMethods.forEach((e) => {
      delete e.id;
      e.discounts.forEach((sube) => {
        delete sube.id;
        sube.groupId = 1;
        clean(sube);
        if (sube.time && sube.time.length === 2) {
          const { time } = sube;
          [sube.beganAt, sube.endedAt] = time;
          delete e.time;
        } else {
          sube.beganAt = null;
          sube.endedAt = null;
          delete sube.time;
        }
      });
      const newDiscounts = [...e.discounts].filter(
        (value) => Object.keys(value).length >= 6,
      );
      e.discounts = newDiscounts;
    });

    body.salesPolicies.forEach((e) => {
      delete e.id;
    });
    body.paymentProgress.forEach((e) => {
      delete e.id;
    });

    const newDiscounts = body.discounts.filter(
      (value) => Object.keys(value).length >= 6,
    );
    const newLegalRecords = body.legalRecords.filter(
      (value) => Object.keys(value).length !== 0,
    );
    const newSitePlans = body.sitePlans.filter(
      (value) => Object.keys(value).length !== 1,
    );

    body.legalRecords = newLegalRecords;
    body.sitePlans = newSitePlans;
    body.discounts = newDiscounts;
    
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
    yield put(submitCreatePropertyFormSuccessAction());
  } catch (error) {
    yield put(submitCreatePropertyFormFailureAtion(error));
  }
}

function* getOneProperty({ id }) {
  try {
    const response = yield call(
      apiWrapper,
      {
        isShowProgress: true,
        isShowSucceedNoti: false,
        errorDescription: "Có lỗi xảy ra",
      },
      getDataByIdApi,
      "properties",
      Number(id),
    );
    yield put(getOnePropertySuccessAction(response))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}


function * getProductTable({id, filterParams}) {
  try {
    const limit = filterParams.limit || 10;
    const { offset } = filterParams
    const response = yield call(
      apiWrapper,
      {
        isShowProgress: true,
        isShowSucceedNoti: false,
        errorDescription: "Có lỗi xảy ra",
      },
      getAllApi,
      `properties/${id}/sections`,
      filterParams,
    );
    response.limit = limit;
    response.offset = offset;
    yield put(getProductTableSuccessAction(response))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}
export default [
  takeEvery(PropertyTypes.GET_LIST_PROPERTY, getListProperty),
  takeEvery(PropertyTypes.DELETE_PROPERTY, deleteProperty),
  takeEvery(PropertyTypes.SUBMIT_CREATE_PROPERTY_FORM, createProperty),

  takeEvery(PropertyTypes.GET_ONE_PROPERTY, getOneProperty),
  takeEvery(PropertyTypes.RETRIEVE_PRODUCT_TABLE, getProductTable),
];
