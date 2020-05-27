import { makeConstantCreator, makeActionCreator } from "../../../utils/reduxUtils";

export const DashboardTypes = makeConstantCreator(

  "GET_EXCEL",
  "GET_EXCEL_SUCCESS",
  "GET_EXCEL_FAILURE",

);

// Statistic information
export const getExcelAction = () =>
  makeActionCreator(DashboardTypes.GET_EXCEL);
export const getExcelSuccessAction = (data) =>
  makeActionCreator(DashboardTypes.GET_EXCEL_SUCCESS, { ...data });
export const getExcelFailureAction = (error) =>
  makeActionCreator(DashboardTypes.GET_EXCEL_FAILURE, {error});
