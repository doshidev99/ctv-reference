import { takeEvery, put, call } from "redux-saga/effects";
import {
  DashboardTypes,
  getChartSuccessAction,
  getChartFailureAction,
  getStatisticFailureAction,
  getStatisticSuccessAction,
} from "./actions";
import { getAllApi } from "../../api/common/crud";
import { apiWrapper } from "../../utils/reduxUtils";

function* getStatisticInfo() {
  try {
    const response = yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: false,
        errorDescription: "Có lỗi xảy ra",
      },
      getAllApi,
      "statistics",
    );
    yield put(getStatisticSuccessAction(response));
  } catch (error) {
    yield put(getStatisticFailureAction(error))
  }
}
function* getChartData({ filterParams }) {
  try {
    const { resource, filter } = filterParams;
    const response = yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: false,
        errorDescription: "Có lỗi xảy ra",
      },
      getAllApi,
      `statistics/${resource}`,
      filter,
    );
    yield put(getChartSuccessAction(resource, response))
  } catch (error) {
    yield put(getChartFailureAction(error))
  }
}

export default [
  takeEvery(DashboardTypes.GET_STATISTIC, getStatisticInfo),
  takeEvery(DashboardTypes.GET_CHART_DATA, getChartData),
];
