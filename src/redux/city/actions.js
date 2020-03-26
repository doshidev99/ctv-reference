import { makeConstantCreator, makeActionCreator } from "../../utils/reduxUtils";

export const CityTypes = makeConstantCreator(
  "GET_LIST_CITY",
  "GET_LIST_CITY_SUCCESS",
  "GET_LIST_CITY_FAILURE",

  "CREATE_ONE_CITY",
  "CREATE_ONE_CITY_SUCCESS",
  "CREATE_ONE_CITY_FAILURE",

  "UPDATE_ONE_CITY",
  "UPDATE_ONE_CITY_SUCCESS",
  "UPDATE_ONE_CITY_FAILURE",
);

// List city
export const getListCityAction = (limit, offset, filter, orderBy, fields) =>
  makeActionCreator(CityTypes.GET_LIST_CITY, { limit, offset, filter, orderBy, fields });
export const getListCitySuccessAction = (data, total, limit, offset) =>
  makeActionCreator(CityTypes.GET_LIST_CITY_SUCCESS, {
    data,
    total,
    limit,
    offset,
  });
export const getListCityFailureAction = error =>
  makeActionCreator(CityTypes.GET_LIST_CITY_FAILURE, { error });

// Create one city
export const createOneCityAction = (payload) =>
  makeActionCreator(CityTypes.CREATE_ONE_CITY, {payload});
export const createOneCitySuccessAction = () =>
  makeActionCreator(CityTypes.CREATE_ONE_CITY_SUCCESS);
export const createOneCityFailureAction = error =>
  makeActionCreator(CityTypes.CREATE_ONE_CITY_FAILURE, { error });

// Edit one city
export const updateOneCityAction = (id, payload) =>
  makeActionCreator(CityTypes.UPDATE_ONE_CITY, {id, payload});
export const updateOneCitySuccessAction = (id) =>
  makeActionCreator(CityTypes.UPDATE_ONE_CITY_SUCCESS, {id});
export const updateOneCityFailureAction = error =>
  makeActionCreator(CityTypes.UPDATE_ONE_CITY_FAILURE, { error });


