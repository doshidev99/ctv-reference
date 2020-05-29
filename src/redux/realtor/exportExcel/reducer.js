import { makeReducerCreator } from "../../../utils/reduxUtils";
import { DashboardTypes } from "./actions";

// Setup inintial state for city
export const initialState = {
  location: null,
  loading: null,
};

// GET STATISTIC
const getExcel = (state) => ({
  ...state,
  loading: true,
});
const getExcelSuccess = (state,response) => ({
  ...state,
  loading: false,
  location: response.Location,
});
const getExcelFailure = (state) => ({
  ...state,
  loading: false,
});

export const exportExcel = makeReducerCreator(initialState, {
  [DashboardTypes.GET_EXCEL]: getExcel,
  [DashboardTypes.GET_EXCEL_SUCCESS]: getExcelSuccess,
  [DashboardTypes.GET_EXCEL_FAILURE]: getExcelFailure,
});
