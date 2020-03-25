import { makeConstantCreator, makeActionCreator } from "../../utils/reduxUtils";

export const AdminTypes = makeConstantCreator(
  "GET_LIST_ADMIN",
  "GET_LIST_ADMIN_SUCCESS",
  "GET_LIST_ADMIN_FAILURE",

  "GET_ONE_ADMIN_INFO",
  "GET_ONE_ADMIN_INFO_SUCCESS",
  "GET_ONE_ADMIN_INFO_FAILURE",

  "CREATE_ADMIN",
  "CREATE_ADMIN_SUCCESS",
  "CREATE_ADMIN_FAILURE",
);

// Get list admin
export const getListAdminAction = (limit, offset, filter, orderBy, fields) =>
  makeActionCreator(AdminTypes.GET_LIST_ADMIN, {
    limit,
    offset,
    filter,
    orderBy,
    fields,
  });

export const getListAdminSuccessAction = (data, total, limit, offset) =>
  makeActionCreator(AdminTypes.GET_LIST_ADMIN_SUCCESS, {
    data,
    total,
    limit,
    offset,
  });
export const getListAdminFailureAction = error =>
  makeActionCreator(AdminTypes.GET_LIST_ADMIN_FAILURE, { error });

// Get one admin info
export const getOneAdminInfoAction = id =>
  makeActionCreator(AdminTypes.GET_ONE_ADMIN_INFO, { id });
export const getOneAdminInfoSuccessAction = data =>
  makeActionCreator(AdminTypes.GET_ONE_ADMIN_INFO_SUCCESS, { data });
export const getOneAdminInfoFailureAction = error =>
  makeActionCreator(AdminTypes.GET_ONE_ADMIN_INFO_FAILURE, { error });


// Create one admin info
export const createOneAdminAction = payload =>
  makeActionCreator(AdminTypes.CREATE_ADMIN, { payload});
export const createOneAdminSuccessAction = data =>
  makeActionCreator(AdminTypes.CREATE_ADMIN_SUCCESS, { data });
export const createOneAdminFailureAction = error =>
  makeActionCreator(AdminTypes.CREATE_ADMIN_FAILURE, { error });


