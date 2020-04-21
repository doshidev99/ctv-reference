import { makeReducerCreator } from "../../utils/reduxUtils";
import { MailTypes } from "./actions";
import { mongoObjectId } from "../../utils/textProcessor";

// Setup inintial state for property types
export const initialState = {
  mails: [],
  offset: 0, // offset = (page - 1) * limit;
  limit: 10,
  total: null,
  loading: false,
  listMailLoading: false,
  listMailSuccess: undefined,
  listMailFailure: undefined,
  currentMail: null,
  getOneMailSuccess: undefined,
  getOneMailFailure: undefined,
  isCompose: false,
  isComposeLarge: false,
  fileUrl: null,
  files: [],
  commonError: undefined,
  sendMailLoading: false,
  received: 0,
  sent: 0,
  viewer: 'me',
};
// End setup

// LIST MAILS
const getMailList = (state) => ({
  ...state,
  listMailLoading: true,
});

const getMailListSuccess = (state, { data, total, limit, offset }) => ({
  ...state,
  mails: data,
  limit,
  offset,
  total,
  listMailLoading: false,
  listMailSuccess: true,
  listMailFailure: false,
});

const getMailListFailure = (state) => ({
  ...state,
  listMailLoading: false,
  listMailSuccess: false,
  listMailFailure: true,
});

// GET ONE MAIL
const getOneMail = (state) => ({
  ...state,
  loading: true,
  isCompose: false,
  isComposeLarge: false,
});

const getOneMailSuccess = (state, { data }) => ({
  ...state,
  loading: false,
  currentMail: data,
  getOneMailSuccess: true,
  getOneMailFailure: false,
  isCompose: false,
  isComposeLarge: false,
});

const getOneMailFailure = (state) => ({
  ...state,
  loading: false,
  getOneMailSuccess: false,
  getOneMailFailure: true,
  isCompose: false,
  isComposeLarge: false,
});

// MARK AS READ
const markOneMailReadSuccess = (state, { id }) => {
  const mailList = [...state.mails];
  const index = mailList.findIndex((e) => e.id === id);
  mailList[index].isRead = true;
  return {
    ...state,
    mails: mailList,
    commonError: false,
  };
};

const markOneMailReadFailure = (state) => ({
  ...state,
  commonError: true,
});

// CHANGE STATUS TO COMPOSE
const composeMail = (state) => ({
  ...state,
  isCompose: true,
});
const composeLargeMail = (state) => ({
  ...state,
  isComposeLarge: true,
  currentMail: null,
});
const uncomposeMail = (state) => ({
  ...state,
  isCompose: false,
  isComposeLarge: false,
});

// UPLOAD FILE
const uploadFileSuccess = (state, { file }) => {
  const fileList = [...state.files];
  file.id = mongoObjectId();
  fileList.push(file);
  return {
    ...state,
    files: fileList,
    fileUrl: file.link,
    loading: false,
  };
};
const uploadFileFailure = (state) => ({
  ...state,
  loading: false,
});
const removeFile = (state, { id }) => {
  const fileList = [...state.files];
  const files = fileList.filter((e) => e.id !== id);
  
  return {
    ...state,
    files,
    fileUrl: null,
  };
};

// Send mail
const sendMail = (state) => ({
  ...state,
  sendMailLoading: true,
});
const sendMailSuccess = (state) => ({
  ...state,
  files: [],
  fileUrl: null,
  sendMailLoading: false,
  commonError: false,
});
const sendMailFailure = (state) => ({
  ...state,
  sendMailLoading: false,
  commonError: true,
});

// Get received and sent mail
const getReceivedMailSuccess = (state, { received, sent=0 }) => ({
  ...state,
  received, 
  sent,
  commonError: false,
});
const getReceivedMailFailure = (state) => ({
  ...state,
  received: 0,
  commonError: true,
});

// Delete mail
const deleteMailSuccess = (state, { id }) => {
  const mailList = [...state.mails];
  const index = mailList.findIndex((e) => e.id === id);
  if (index !== -1) {
    mailList.splice(index, 1);
  }
  return {
    ...state,
    mails: mailList,
    currentMail: null,
    commonError: false,
  };
};
const deleteMailFailure = (state) => ({
  ...state,
  commonError: true,
});



// Set viewer (to change view of one mail)

const setViewer = (state, {viewer}) => ({
  ...state,
  viewer,
  currentMail: null,
})

export const mail = makeReducerCreator(initialState, {
  [MailTypes.GET_MAIL_LIST]: getMailList,
  [MailTypes.GET_MAIL_LIST_SUCCESS]: getMailListSuccess,
  [MailTypes.GET_MAIL_LIST_FAILURE]: getMailListFailure,

  [MailTypes.GET_ONE_MAIL]: getOneMail,
  [MailTypes.GET_ONE_MAIL_SUCCESS]: getOneMailSuccess,
  [MailTypes.GET_ONE_MAIL_FAILURE]: getOneMailFailure,

  [MailTypes.MARK_ONE_MAIL_READ_SUCCESS]: markOneMailReadSuccess,
  [MailTypes.MARK_ONE_MAIL_READ_FAILURE]: markOneMailReadFailure,

  [MailTypes.COMPOSE_MAIL]: composeMail,
  [MailTypes.COMPOSE_LARGE_MAIL]: composeLargeMail,
  [MailTypes.UNCOMPOSE_MAIL]: uncomposeMail,

  [MailTypes.UPLOAD_ATTACHMENT_FILE_SUCCESS]: uploadFileSuccess,
  [MailTypes.UPLOAD_ATTACHMENT_FILE_FAILURE]: uploadFileFailure,

  [MailTypes.REMOVE_FILE]: removeFile,

  [MailTypes.SEND_MAIL]: sendMail,
  [MailTypes.SEND_MAIL_SUCCESS]: sendMailSuccess,
  [MailTypes.SEND_MAIL_FAILURE]: sendMailFailure,

  [MailTypes.GET_RECEIVED_MAIL_SUCCESS]: getReceivedMailSuccess,
  [MailTypes.GET_RECEIVED_MAIL_FAILURE]: getReceivedMailFailure,

  [MailTypes.DELETE_MAIL_SUCCESS]: deleteMailSuccess,
  [MailTypes.DELETE_MAIL_FAILURE]: deleteMailFailure,

  [MailTypes.SET_VIEWER]: setViewer,



});
