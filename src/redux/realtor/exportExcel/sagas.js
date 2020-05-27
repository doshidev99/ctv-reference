import { takeEvery, put, call } from "redux-saga/effects";
import {
  DashboardTypes,
  getExcelSuccessAction,
  getExcelFailureAction,
} from "./actions";
import { exportExcel } from "../../../api/modules/realtor";
import { apiWrapper } from "../../../utils/reduxUtils";

function* getLinkExcel() {
  try {
    const response = yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: false,
        errorDescription: "Có lỗi xảy ra",
      },
      exportExcel,
      // "realtors/export",
      // data,
    );
    yield put(getExcelSuccessAction(response));
  } catch (error) {
    yield put(getExcelFailureAction(error))
  }
}

export default [
  takeEvery(DashboardTypes.GET_EXCEL, getLinkExcel),
];
