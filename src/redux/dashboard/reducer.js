import { makeReducerCreator } from "../../utils/reduxUtils";
import { DashboardTypes } from "./actions";

// Setup inintial state for city
export const initialState = {
  statisticLoading: null,
  chartDataLoading: null,
};

// GET STATISTIC
const getStatistic = (state) => ({
  ...state,
  statisticLoading: true,
});
const getStatisticSuccess = (
  state,
  { properties, commissionAmount, transactions, realtors },
) => ({
  ...state,
  statistic: {
    properties,
    commissionAmount,
    transactions,
    realtors,
  },
  statisticLoading: false,
});
const getStatisticFailure = (state) => ({
  ...state,
  statisticLoading: false,
});

// GET CHART DATA
const getChartData = (state) => ({
  ...state,
  chartDataLoading: true,
});
const getChartDataSuccess = (state, {resource, data}) => ({
  ...state,
  [resource]: [...data],
  chartDataLoading: false,
});
const getChartDataFailure = (state) => ({
  ...state,
  chartDataLoading: false,
});

export const dashboard = makeReducerCreator(initialState, {
  [DashboardTypes.GET_STATISTIC]: getStatistic,
  [DashboardTypes.GET_STATISTIC_SUCCESS]: getStatisticSuccess,
  [DashboardTypes.GET_STATISTIC_FAILURE]: getStatisticFailure,
  [DashboardTypes.GET_CHART_DATA]: getChartData,
  [DashboardTypes.GET_CHART_DATA_SUCCESS]: getChartDataSuccess,
  [DashboardTypes.GET_CHART_DATA_FAILURE]: getChartDataFailure,
});
