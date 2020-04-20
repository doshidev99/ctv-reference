import { makeConstantCreator, makeActionCreator } from "../../utils/reduxUtils";

export const MailTypes = makeConstantCreator(
  "GET_MAIL_LIST",
  "GET_MAIL_LIST_SUCCESS",
  "GET_MAIL_LIST_FAILURE",

  "GET_ONE_MAIL",
  "GET_ONE_MAIL_SUCCESS",
  "GET_ONE_MAIL_FAILURE",

  "MARK_ONE_MAIL_READ",
  "MARK_ONE_MAIL_READ_SUCCESS",
  "MARK_ONE_MAIL_READ_FAILURE",

  "COMPOSE_MAIL",
  "COMPOSE_LARGE_MAIL",
  "UNCOMPOSE_MAIL",

  "UPLOAD_FILE_SUCCESS",
  "UPLOAD_FILE_FAILURE",

  "REMOVE_FILE",

  "SEND_MAIL",
  "SEND_MAIL_SUCCESS",
  "SEND_MAIL_FAILURE",

  "GET_RECEIVED_MAIL",
  "GET_RECEIVED_MAIL_SUCCESS",
  "GET_RECEIVED_MAIL_FAILURE",

  "DELETE_MAIL",
  "DELETE_MAIL_SUCCESS",
  "DELETE_MAIL_FAILURE",


  "SET_VIEWER",
);

// Get list mail
export const getMailListAction = (filterParams) =>
  makeActionCreator(MailTypes.GET_MAIL_LIST, {
    ...filterParams,
  });

export const getMailListSuccessAction = (data, total, limit, offset) =>
  makeActionCreator(MailTypes.GET_MAIL_LIST_SUCCESS, {
    data,
    total,
    limit,
    offset,
  });
export const getMailListFailureAction = error =>
  makeActionCreator(MailTypes.GET_MAIL_LIST_FAILURE, {
    error,
  });

// Get one mail
export const getOneMailAction = id =>
  makeActionCreator(MailTypes.GET_ONE_MAIL, {
    id,
  });

export const getOneMailSuccessAction = data =>
  makeActionCreator(MailTypes.GET_ONE_MAIL_SUCCESS, {
    data,
  });
export const getOneMailFailureAction = error =>
  makeActionCreator(MailTypes.GET_ONE_MAIL_FAILURE, {
    error,
  });

// Mark as read
export const markOneMailReadAction = id =>
  makeActionCreator(MailTypes.MARK_ONE_MAIL_READ, {
    id,
  });

export const markOneMailReadSuccessAction = id =>
  makeActionCreator(MailTypes.MARK_ONE_MAIL_READ_SUCCESS, {
    id,
  });
export const markOneMailReadFailureAction = error =>
  makeActionCreator(MailTypes.MARK_ONE_MAIL_READ_FAILURE, {
    error,
  });

// Change to compose
export const composeMailAction = () =>
  makeActionCreator(MailTypes.COMPOSE_MAIL);
export const composeLargeMailAction = () =>
  makeActionCreator(MailTypes.COMPOSE_LARGE_MAIL);

// Change to uncompose
export const unComposeMailAction = () =>
  makeActionCreator(MailTypes.UNCOMPOSE_MAIL);

// Upload file
export const uploadFileSuccessAction = file =>
  makeActionCreator(MailTypes.UPLOAD_FILE_SUCCESS, { file });
export const uploadFileFailureAction = error =>
  makeActionCreator(MailTypes.UPLOAD_FILE_FAILURE, { error });

// Remove file
export const removeFileAction = (id) => makeActionCreator(MailTypes.REMOVE_FILE, {id});

// Send mail
export const sendMailAction = payload =>
  makeActionCreator(MailTypes.SEND_MAIL, { payload });
export const sendMailSuccessAction = () =>
  makeActionCreator(MailTypes.SEND_MAIL_SUCCESS);
export const sendMailFailureAction = error =>
  makeActionCreator(MailTypes.SEND_MAIL_FAILURE, { error });

// Get received mail
export const getReceivedMailAction = () =>
  makeActionCreator(MailTypes.GET_RECEIVED_MAIL);
export const getReceivedMailActionSuccess = ({sent, received}) =>
  makeActionCreator(MailTypes.GET_RECEIVED_MAIL_SUCCESS, { sent, received });
export const getReceivedMailActionFailure = error =>
  makeActionCreator(MailTypes.GET_RECEIVED_MAIL_FAILURE, { error });

// Delete mail
export const deleteMailAction = id =>
  makeActionCreator(MailTypes.DELETE_MAIL, { id });
export const deleteMailActionSuccess = (id) =>
  makeActionCreator(MailTypes.DELETE_MAIL_SUCCESS, {id});
export const deleteMailActionFailure = error =>
  makeActionCreator(MailTypes.DELETE_MAIL_FAILURE, { error });

export const setViewerAction = viewer =>
  makeActionCreator(MailTypes.SET_VIEWER, { viewer });

