import { makeConstantCreator, makeActionCreator } from "../../utils/reduxUtils";

export const CityTypes = makeConstantCreator(
  "GET_LIST_CITY",
  "GET_LIST_CITY_SUCCESS",
  "GET_LIST_CITY_FAILURE",
);

export const getListCityAction = (limit, offset, filter) =>
  makeActionCreator(CityTypes.GET_LIST_CITY, { limit, offset, filter });

export const getListCitySuccessAction = (data, total, limit, offset) =>
  makeActionCreator(CityTypes.GET_LIST_CITY_SUCCESS, {
    data,
    total,
    limit,
    offset,
  });
export const getListCityFailureAction = error =>
  makeActionCreator(CityTypes.GET_LIST_CITY_FAILURE, { error });
