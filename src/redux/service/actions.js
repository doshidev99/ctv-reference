import { makeConstantCreator, makeActionCreator } from "../../utils/reduxUtils";

export const ServiceTypes = makeConstantCreator(
  "GET_LIST_SERVICE",
  "GET_LIST_SERVICE_SUCCESS",
  "GET_LIST_SERVICE_FAILURE",

  "CREATE_ONE_SERVICE",
  "CREATE_ONE_SERVICE_SUCCESS",
  "CREATE_ONE_SERVICE_FAILURE",

  "GET_ONE_SERVICE",
  "GET_ONE_SERVICE_SUCCESS",
  "GET_ONE_SERVICE_FAILURE",

  "UPDATE_ONE_SERVICE",
  "UPDATE_ONE_SERVICE_SUCCESS",
  "UPDATE_ONE_SERVICE_FAILURE",

  "DELETE_ONE",
  "DELETE_ONE_SUCCESS",
  "DELETE_ONE_FAILURE",
);

// List service
export const getListServiceAction = (limit, offset, filter, orderBy, fields) =>
  makeActionCreator(ServiceTypes.GET_LIST_SERVICE, { limit, offset, filter, orderBy, fields });
export const getListServiceSuccessAction = (data, total, limit, offset) =>
  makeActionCreator(ServiceTypes.GET_LIST_SERVICE_SUCCESS, {
    data,
    total,
    limit,
    offset,
  });
export const getListServiceFailureAction = error =>
  makeActionCreator(ServiceTypes.GET_LIST_SERVICE_FAILURE, { error });

// Create one service
export const createOneServiceAction = (payload) =>
  makeActionCreator(ServiceTypes.CREATE_ONE_SERVICE, {payload});
export const createOneServiceSuccessAction = () =>
  makeActionCreator(ServiceTypes.CREATE_ONE_SERVICE_SUCCESS);
export const createOneServiceFailureAction = error =>
  makeActionCreator(ServiceTypes.CREATE_ONE_SERVICE_FAILURE, { error });

// Get one document
export const getOneServiceAction = (id) =>
  makeActionCreator(ServiceTypes.GET_ONE_SERVICE, {id});
export const getOneServiceSuccessAction = (data) =>
  makeActionCreator(ServiceTypes.GET_ONE_SERVICE_SUCCESS, {data});
export const getOneServiceFailureAction = error =>
  makeActionCreator(ServiceTypes.GET_ONE_SERVICE_FAILURE, { error }); 

// Edit one service
export const updateOneServiceAction = (id, payload) =>
  makeActionCreator(ServiceTypes.UPDATE_ONE_SERVICE, {id, payload});
export const updateOneServiceSuccessAction = (id) =>
  makeActionCreator(ServiceTypes.UPDATE_ONE_SERVICE_SUCCESS, {id});
export const updateOneServiceFailureAction = error =>
  makeActionCreator(ServiceTypes.UPDATE_ONE_SERVICE_FAILURE, { error });

// Delete One
export const deleteOneAction = id =>
  makeActionCreator(ServiceTypes.DELETE_ONE, { id });
export const deleteOneSuccessAction = id =>
  makeActionCreator(ServiceTypes.DELETE_ONE_SUCCESS, { id });
export const deleteOneFailureAction = error =>
  makeActionCreator(ServiceTypes.DELETE_ONE_FAILURE, { error });


