import { makeConstantCreator, makeActionCreator } from "../../utils/reduxUtils";

export const EventTypes = makeConstantCreator(
  "GET_LIST_EVENT",
  "GET_LIST_EVENT_SUCCESS",
  "GET_LIST_EVENT_FAILURE",

  "CREATE_ONE_EVENT",
  "CREATE_ONE_EVENT_SUCCESS",
  "CREATE_ONE_EVENT_FAILURE",

  "UPDATE_ONE_EVENT",
  "UPDATE_ONE_EVENT_SUCCESS",
  "UPDATE_ONE_EVENT_FAILURE",

  "GET_ONE_EVENT",
  "GET_ONE_EVENT_SUCCESS",
  "GET_ONE_EVENT_FAILURE",

  "UPLOAD_IMAGE_SUCCESS",
  "UPLOAD_IMAGE_FAILURE",
  "REMOVE_IMAGE",

  "GET_REGISTRATIONS_BY_EVENT",
  "GET_REGISTRATIONS_BY_EVENT_SUCCESS",
  "GET_REGISTRATIONS_BY_EVENT_FAILURE",
);


// List event
export const getListEventAction = (limit, offset, filter, orderBy, fields) =>
  makeActionCreator(EventTypes.GET_LIST_EVENT, { limit, offset, filter, orderBy, fields });
export const getListEventSuccessAction = (data, total, limit, offset) =>
  makeActionCreator(EventTypes.GET_LIST_EVENT_SUCCESS, {
    data,
    total,
    limit,
    offset,
  });
export const getListEventFailureAction = error =>
  makeActionCreator(EventTypes.GET_LIST_EVENT_FAILURE, { error });

// Create one event
export const createOneEventAction = (payload) =>
  makeActionCreator(EventTypes.CREATE_ONE_EVENT, {payload});
export const createOneEventSuccessAction = () =>
  makeActionCreator(EventTypes.CREATE_ONE_EVENT_SUCCESS);
export const createOneEventFailureAction = error =>
  makeActionCreator(EventTypes.CREATE_ONE_EVENT_FAILURE, { error });

// Edit one event
export const updateOneEventAction = (id, payload) =>
  makeActionCreator(EventTypes.UPDATE_ONE_EVENT, {id, payload});
export const updateOneEventSuccessAction = (id) =>
  makeActionCreator(EventTypes.UPDATE_ONE_EVENT_SUCCESS, {id});
export const updateOneEventFailureAction = error =>
  makeActionCreator(EventTypes.UPDATE_ONE_EVENT_FAILURE, { error });

// Get one event
export const getOneEventAction = (id) =>
  makeActionCreator(EventTypes.GET_ONE_EVENT, {id});
export const getOneEventSuccessAction = (data) =>
  makeActionCreator(EventTypes.GET_ONE_EVENT_SUCCESS, {data});
export const getOneEventFailureAction = error =>
  makeActionCreator(EventTypes.GET_ONE_EVENT_FAILURE, { error });


// Upload - remove image
export const uploadImageSuccessAction = (fileUrl, mode) =>
  makeActionCreator(EventTypes.UPLOAD_IMAGE_SUCCESS, { fileUrl, mode });
export const uploadImageFailureAction = error =>
  makeActionCreator(EventTypes.UPLOAD_IMAGE_FAILURE, { error });
export const removeImageAction = link =>
  makeActionCreator(EventTypes.REMOVE_IMAGE, { link });

// Get list registration


// Get transactions by realtor
export const getRegistrationsByEventAction = (
  id,
  limit,
  offset,
  filter,
  orderBy,
  fields,
) =>
  makeActionCreator(EventTypes.GET_REGISTRATIONS_BY_EVENT, {
    id,
    limit,
    offset,
    filter,
    orderBy,
    fields,
  });
export const getRegistrationsByEventSuccessAction = (
  data,
  total,
  limit,
  offset,
) =>
  makeActionCreator(EventTypes.GET_REGISTRATIONS_BY_EVENT_SUCCESS, {
    data,
    total,
    limit,
    offset,
  });
export const getRegistrationsByEventFailureAction = error =>
  makeActionCreator(EventTypes.GET_REGISTRATIONS_BY_EVENT_FAILURE, {
    error,
  });
