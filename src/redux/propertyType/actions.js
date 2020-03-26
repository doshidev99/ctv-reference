import { makeConstantCreator, makeActionCreator } from "../../utils/reduxUtils";

export const PropertyTypeTypes = makeConstantCreator(
  "GET_LIST_PROPERTY_TYPE",
  "GET_LIST_PROPERTY_TYPE_SUCCESS",
  "GET_LIST_PROPERTY_TYPE_FAILURE",

  "CREATE_ONE_PROPERTY_TYPE",
  "CREATE_ONE_PROPERTY_TYPE_SUCCESS",
  "CREATE_ONE_PROPERTY_TYPE_FAILURE",

  "UPDATE_ONE_PROPERTY_TYPE",
  "UPDATE_ONE_PROPERTY_TYPE_SUCCESS",
  "UPDATE_ONE_PROPERTY_TYPE_FAILURE",
);

// List role
export const getListPropertyTypeAction = (limit, offset, filter, orderBy, fields) =>
  makeActionCreator(PropertyTypeTypes.GET_LIST_PROPERTY_TYPE, { limit, offset, filter, orderBy, fields });
export const getListPropertyTypeSuccessAction = (data, total, limit, offset) =>
  makeActionCreator(PropertyTypeTypes.GET_LIST_PROPERTY_TYPE_SUCCESS, {
    data,
    total,
    limit,
    offset,
  });
export const getListPropertyTypeFailureAction = error =>
  makeActionCreator(PropertyTypeTypes.GET_LIST_PROPERTY_TYPE_FAILURE, { error });

// Create one role
export const createOnePropertyTypeAction = (payload) =>
  makeActionCreator(PropertyTypeTypes.CREATE_ONE_PROPERTY_TYPE, {payload});
export const createOnePropertyTypeSuccessAction = () =>
  makeActionCreator(PropertyTypeTypes.CREATE_ONE_PROPERTY_TYPE_SUCCESS);
export const createOnePropertyTypeFailureAction = error =>
  makeActionCreator(PropertyTypeTypes.CREATE_ONE_PROPERTY_TYPE_FAILURE, { error });

// Edit one role
export const updateOnePropertyTypeAction = (id, payload) =>
  makeActionCreator(PropertyTypeTypes.UPDATE_ONE_PROPERTY_TYPE, {id, payload});
export const updateOnePropertyTypeSuccessAction = (id) =>
  makeActionCreator(PropertyTypeTypes.UPDATE_ONE_PROPERTY_TYPE_SUCCESS, {id});
export const updateOnePropertyTypeFailureAction = error =>
  makeActionCreator(PropertyTypeTypes.UPDATE_ONE_PROPERTY_TYPE_FAILURE, { error });


