import { takeEvery, put, call } from "redux-saga/effects";
import moment from "moment";
import {
  RealtorTypes,
  getListRealtorSuccessAction,
  getListRealtorFailureAction,
  getOneRealtorSuccessAction,
  getOneRealtorFailureAction,
  getTransactionsByRealtorSuccessAction,
  getTransactionsByRealtorFailureAction,
  requestResendFailureAction,
  requestResendSuccessAction,
  confirmDigitalContractSuccessAction,
  confirmDigitalContractFailureAction,
} from "./actions";
import { apiWrapper } from "../../utils/reduxUtils";
import {
  getRealtors,
  getOneRealtor,
  getTransactionsByRealtor,
  requestResend,
  confirmDigitalContract,
} from "../../api/modules/realtor";

const TRANSACTION_STATUS = {
  "0": "Đang chờ xử lý",
  "1": "Đang chờ xác nhận",
  "2": "Đã xác nhận",
  "3": "Đang chi trả",
  "4": "Hoàn thành",
  "5": "Bị hủy",
}

function* getListRealtor({ limit, offset, filter, orderBy, fields }) {
  try {
    if (limit === undefined) {
      limit = 5;
    }
    if (offset === undefined) {
      offset = 0;
    }

    const { results, total } = yield getRealtors({
      limit,
      offset,
      filter,
      orderBy,
      fields,
    });
    const data = results.map(e => ({
      id: e.id,
      key: e.id,
      email: e.email,
      fullName: e.fullName,
      phoneNumber: e.phone,
    }));

    yield put(getListRealtorSuccessAction(data, total, limit, offset));
  } catch (error) {
    yield put(getListRealtorFailureAction(error));
  }
}

function* getOneRealtorInfo({ id }) {
  try {
    const result = yield getOneRealtor(id);
    const data = {
      id: result.id,
      fullName: result.fullName,
      phone: result.phone,
      address: result.address,
      birthday: moment(result.birthday).format("L"),
      digitalContract: result.digitalContract,
      digitalContractStatus: result.digitalContractStatus,
    };

    yield put(getOneRealtorSuccessAction(data));
  } catch (error) {
    yield put(getOneRealtorFailureAction(error));
  }
}

function* getTransactionsByRealtorId({ id, limit, offset, filter, orderBy }) {
  try {
    const { results, total } = yield getTransactionsByRealtor(id, {
      limit,
      offset,
      filter,
      orderBy,
    });
    if (limit === undefined) {
      limit = 5;
    }
    if (offset === undefined) {
      offset = 0;
    }
    const data = []
    results.forEach(e => {
      const info = {
        id: e.id,
        key: e.id,
        code: e.code,
        status: TRANSACTION_STATUS[e.status],
        propertyName: e.property.name,
        commission: e.commissionAmount,
        customerName: e.customerName,
      }
      e.sections.forEach(sec => {
        data.push({
          ...info,
          productCode: sec.code,
        })

      })
    })
    yield put(
      getTransactionsByRealtorSuccessAction(data, total, limit, offset),
    );
  } catch (error) {
    yield put(getTransactionsByRealtorFailureAction(error));
  }
}

function* updateContractMessage({id, status, payload}){
  try {
    const response = yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: false,
        errorDescription: "Lỗi !!",
      },
      requestResend,
      id,
      status,
      payload,
    );
    yield put(requestResendSuccessAction(response))
  } catch (error) {
    yield put(requestResendFailureAction(error));
  }
}

function* confirmContract({id, status}){
  try {
    const response = yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: false,
        errorDescription: "Lỗi !!",
      },
      confirmDigitalContract,
      id,
      status,
    );
    yield put(confirmDigitalContractSuccessAction(response));
    
  } catch (error) {
    yield put(confirmDigitalContractFailureAction(error));
  }
}

export default [
  takeEvery(RealtorTypes.GET_LIST_REALTOR, getListRealtor),
  takeEvery(RealtorTypes.GET_ONE_REALTOR, getOneRealtorInfo),
  takeEvery(
    RealtorTypes.GET_TRANSACTIONS_BY_REALTOR,
    getTransactionsByRealtorId,
  ),
  takeEvery(RealtorTypes.REQUEST_RESEND, updateContractMessage),
  takeEvery(RealtorTypes.CONFIRM_CONTRACT, confirmContract),
];
