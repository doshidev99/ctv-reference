import { makeConstantCreator, makeActionCreator } from "../../utils/reduxUtils";

export const DashboardTypes = makeConstantCreator(

  "GET_STATISTIC",
  "GET_STATISTIC_SUCCESS",
  "GET_STATISTIC_FAILURE",

  "GET_CHART_DATA",
  "GET_CHART_DATA_SUCCESS",
  "GET_CHART_DATA_FAILURE",

);




// Statistic information
export const getStatisticAction = (filterParams) =>
  makeActionCreator(DashboardTypes.GET_STATISTIC, { filterParams });
export const getStatisticSuccessAction = (data) =>
  makeActionCreator(DashboardTypes.GET_STATISTIC_SUCCESS, { ...data });
export const getStatisticFailureAction = (error) =>
  makeActionCreator(DashboardTypes.GET_STATISTIC_FAILURE, {error});


// Chart information
export const getChartAction = (filterParams) =>
  makeActionCreator(DashboardTypes.GET_CHART_DATA, {filterParams });
export const getChartSuccessAction = (resource,data) =>
  makeActionCreator(DashboardTypes.GET_CHART_DATA_SUCCESS,  { resource, data });
export const getChartFailureAction = (error) =>
  makeActionCreator(DashboardTypes.GET_CHART_DATA_FAILURE, {error});