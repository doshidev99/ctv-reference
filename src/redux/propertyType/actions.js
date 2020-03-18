import { makeConstantCreator, makeActionCreator } from "../../utils/reduxUtils";

export const PropertyTypeTypes = makeConstantCreator(
  "GET_LIST_PROPERTY_TYPE",
  "GET_LIST_PROPERTY_TYPE_SUCCESS",
  "GET_LIST_PROPERTY_TYPE_FAILURE",
);

export const getListPropertyTypeAction = (limit, offset, filter) =>
  makeActionCreator(PropertyTypeTypes.GET_LIST_PROPERTY_TYPE, {
    limit,
    offset,
    filter,
  });

export const getListPropertyTypeSuccessAction = (data, total, limit, offset) =>
  makeActionCreator(PropertyTypeTypes.GET_LIST_PROPERTY_TYPE_SUCCESS, {
    data,
    total,
    limit,
    offset,
  });
export const getListPropertyTypeFailureAction = error =>
  makeActionCreator(PropertyTypeTypes.GET_LIST_PROPERTY_TYPE_FAILURE, {
    error,
  });
