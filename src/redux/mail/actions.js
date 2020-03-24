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

  "GET_UNREAD_MAIL",
  "GET_UNREAD_MAIL_SUCCESS",
  "GET_UNREAD_MAIL_FAILURE",

  "DELETE_MAIL",
  "DELETE_MAIL_SUCCESS",
  "DELETE_MAIL_FAILURE",
);

// Get list mail
export const getMailListAction = (limit, offset, filter, orderBy) =>
  makeActionCreator(MailTypes.GET_MAIL_LIST, {
    limit,
    offset,
    filter,
    orderBy,
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
export const uploadFileSuccessAction = fileUrl =>
  makeActionCreator(MailTypes.UPLOAD_FILE_SUCCESS, { fileUrl });
export const uploadFileFailureAction = error =>
  makeActionCreator(MailTypes.UPLOAD_FILE_FAILURE, { error });

// Remove file
export const removeFileAction = () => makeActionCreator(MailTypes.REMOVE_FILE);

// Send mail
export const sendMailAction = payload =>
  makeActionCreator(MailTypes.SEND_MAIL, { payload });
export const sendMailSuccessAction = () =>
  makeActionCreator(MailTypes.SEND_MAIL_SUCCESS);
export const sendMailFailureAction = error =>
  makeActionCreator(MailTypes.SEND_MAIL_FAILURE, { error });

// Get unread mail
export const getUnreadMailAction = () =>
  makeActionCreator(MailTypes.GET_UNREAD_MAIL);
export const getUnreadMailActionSuccess = total =>
  makeActionCreator(MailTypes.GET_UNREAD_MAIL_SUCCESS, { total });
export const getUnreadMailActionFailure = error =>
  makeActionCreator(MailTypes.GET_UNREAD_MAIL_FAILURE, { error });

// Delete mail
export const deleteMailAction = id =>
  makeActionCreator(MailTypes.DELETE_MAIL, { id });
export const deleteMailActionSuccess = (id) =>
  makeActionCreator(MailTypes.DELETE_MAIL_SUCCESS, {id});
export const deleteMailActionFailure = error =>
  makeActionCreator(MailTypes.DELETE_MAIL_FAILURE, { error });
