import { takeEvery, put, call } from "redux-saga/effects";
import moment from "moment";
import { object } from "prop-types";
import { notification } from "antd";
import I18n from "i18next";
// eslint-disable-next-line import/no-cycle
import { history } from "../store";
import {
  PropertyTypes,
  getListPropertySuccessAction,
  getListPropertyFailureAction,
  deletePropertyFailureAction,
  submitCreatePropertyFormFailureAtion,
  submitCreatePropertyFormSuccessAction,
  getPaymentMethodSuccessAction,
  getPaymentMethodFailureAction,
  getDiscountGroupSuccessAction,
  getDiscountGroupFailureAction,

  getOnePropertySuccessAction,
  getProductTableSuccessAction,
  getOnePropertyAction,
  // uploadFileSuccessAction,
  // uploadFileFailureAction,
} from "./actions";
// import {data} from './tempData'
import {
  getProperties,
  deleteOne,
  createOneProperty,
  getListPaymentMethod,
  getListDiscountGroup,
} from "../../api/modules/property";

import { getDataByIdApi, getAllApi, putApi } from "../../api/common/crud";
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
    body.medias.forEach((e) => {
      delete e.id;
    });

    body.legalRecords &&
      body.legalRecords.forEach((e) => {
        delete e.id;
      });
    body.sitePlans &&
      body.sitePlans.forEach((e) => {
        delete e.id;
      });

    body.sections &&
      body.sections.forEach((e) => {
        delete e.key;
      });

    body.discounts &&
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
      (value) => Object.keys(value).length >= 3,
    );
    const newSitePlans = body.sitePlans.filter(
      (value) => Object.keys(value).length !== 1,
    );

    const newSalesPolicies = body.salesPolicies.filter(
      (value) => Object.keys(value).length >= 3,
    );

    const newPaymentProgress = body.paymentProgress.filter(
      (value) => Object.keys(value).length >= 3,
    );
    body.legalRecords = newLegalRecords;
    body.sitePlans = newSitePlans;
    body.discounts = newDiscounts;
    body.salesPolicies = newSalesPolicies;
    body.paymentProgress = newPaymentProgress;

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
    setTimeout(history.push(`/properties`), 3000);
  } catch (error) {

    yield put(submitCreatePropertyFormFailureAtion(error));
  }
}

function* getOneProperty({ id }) {
  try {
    const paymentMethods = yield call(
      apiWrapper,
      {
        isShowProgress: true,
        isShowSucceedNoti: false,
        errorDescription: "Có lỗi xảy ra",
      },
      getDataByIdApi,
      "properties",
      `${Number(id)}/payment-methods?limit=50`,
    );
    // console.log(paymentMethods);
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

    response.paymentMethodIds = paymentMethods.results.map((e) => e.id);

    yield put(getOnePropertySuccessAction(response));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}
function* updateProperty({ id, payload }) {
  try {
    const body = JSON.parse(JSON.stringify(payload));
    body.medias.forEach((e) => {
      if (typeof e.id !== typeof Number) {
        delete e.id;
      }
    });
    body.legalRecords.forEach((e) => {
      if (e.readOnly) {
        delete e.readOnly;
      }
      delete e.id;
    });
    body.sitePlans &&
      body.sitePlans.forEach((e) => {
        if (e.readOnly) {
          delete e.readOnly;
        }
        delete e.id;
      });

    body.sections &&
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

    body.salesPolicies &&
      body.salesPolicies.forEach((e) => {
        if (e.readOnly) {
          delete e.readOnly;
        }
        delete e.id;
      });
    body.paymentProgress &&
      body.paymentProgress.forEach((e) => {
        if (e.readOnly) {
          delete e.readOnly;
        }
        delete e.id;
      });

    const newDiscounts = body.discounts.filter(
      (value) => Object.keys(value).length >= 6,
    );
    const newLegalRecords = body.legalRecords.filter(
      (value) => Object.keys(value).length >= 3,
    );
    const newSitePlans = body.sitePlans.filter(
      (value) => Object.keys(value).length !== 1,
    );

    const newSalesPolicies = body.salesPolicies.filter(
      (value) => Object.keys(value).length >= 3,
    );

    const newPaymentProgress = body.paymentProgress.filter(
      (value) => Object.keys(value).length >= 3,
    );
    body.legalRecords = newLegalRecords;
    body.sitePlans = newSitePlans;
    body.discounts = newDiscounts;
    body.salesPolicies = newSalesPolicies;
    body.paymentProgress = newPaymentProgress;

    const response = yield call(
      apiWrapper,
      {
        isShowProgress: true,
        isShowSucceedNoti: true,
        successDescription: "Cập nhật thành công",
        // errorDescription: "Có lỗi xảy ra",
      },
      putApi,
      "properties",
      id,
      body,
    );
    put(getOnePropertyAction(response.id));
  } catch (error) {
    notification.error({
      message: I18n.t("error.title"),
      description: "Có lỗi xảy ra, vui lòng tải lại trang",
    });
    throw error;
  }
}

function* getPaymentMethod({ id }) {
  try {
    const { results } = yield getListPaymentMethod(id);
    const data = results.map((e) => {
      return {
        id: e.id,
        name: e.name,
        isVisible: e.isVisible,
        date: moment(e.createdAt).format("L"),
      };
    });
    yield put(getPaymentMethodSuccessAction(data));
  } catch (error) {
    yield put(getPaymentMethodFailureAction(error));
  }
}

function* getDiscountGroup({ id }) {
  try {
    const { results } = yield getListDiscountGroup(id);
    const data = results.map((e) => {
      return {
        id: e.id,
        name: e.name,
        isVisible: e.isVisible,
        discounts: e.discounts,
      };
    });
    yield put(getDiscountGroupSuccessAction(data));
  } catch (error) {
    yield put(getDiscountGroupFailureAction(error));
  }
}

function* getProductTable({ id, filterParams }) {
  try {
    const limit = filterParams.limit || 10;
    const { offset } = filterParams;
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
    yield put(getProductTableSuccessAction(response));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}
export default [
  takeEvery(PropertyTypes.GET_LIST_PROPERTY, getListProperty),
  takeEvery(PropertyTypes.DELETE_PROPERTY, deleteProperty),
  takeEvery(PropertyTypes.SUBMIT_CREATE_PROPERTY_FORM, createProperty),
  takeEvery(PropertyTypes.GET_PAYMENT_METHOD, getPaymentMethod),
  takeEvery(PropertyTypes.GET_DISCOUNT_GROUP, getDiscountGroup),

  takeEvery(PropertyTypes.GET_ONE_PROPERTY, getOneProperty),
  takeEvery(PropertyTypes.RETRIEVE_PRODUCT_TABLE, getProductTable),
  takeEvery(PropertyTypes.SUBMIT_EDIT_ONE_PROPERTY, updateProperty),
];
