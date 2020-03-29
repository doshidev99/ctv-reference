import { makeConstantCreator, makeActionCreator } from "../../utils/reduxUtils";

export const TrainingTypes = makeConstantCreator(
  "GET_LIST_DOCUMENT",
  "GET_LIST_DOCUMENT_SUCCESS",
  "GET_LIST_DOCUMENT_FAILURE",

  "CREATE_ONE_DOCUMENT",
  "CREATE_ONE_DOCUMENT_SUCCESS",
  "CREATE_ONE_DOCUMENT_FAILURE",

  "GET_ONE_DOCUMENT",
  "GET_ONE_DOCUMENT_SUCCESS",
  "GET_ONE_DOCUMENT_FAILURE",

  "UPDATE_ONE_DOCUMENT",
  "UPDATE_ONE_DOCUMENT_SUCCESS",
  "UPDATE_ONE_DOCUMENT_FAILURE",

  //-------------------------------------
  "GET_LIST_VIDEO",
  "GET_LIST_VIDEO_SUCCESS",
  "GET_LIST_VIDEO_FAILURE",

  "CREATE_ONE_VIDEO",
  "CREATE_ONE_VIDEO_SUCCESS",
  "CREATE_ONE_VIDEO_FAILURE",

  "GET_ONE_VIDEO",
  "GET_ONE_VIDEO_SUCCESS",
  "GET_ONE_VIDEO_FAILURE",

  "UPDATE_ONE_VIDEO",
  "UPDATE_ONE_VIDEO_SUCCESS",
  "UPDATE_ONE_VIDEO_FAILURE",

  "UPLOAD_FILE_SUCCESS",
  "UPLOAD_FILE_FAILURE",
  
  "REMOVE_FILE",

  "DELETE_ONE",
);


// Delete One
export const deleteOneAction = id =>
  makeActionCreator(TrainingTypes.DELETE_ONE, { id });

// List document
export const getListDocumentAction = (limit, offset, filter, orderBy, fields) =>
  makeActionCreator(TrainingTypes.GET_LIST_DOCUMENT, { limit, offset, filter, orderBy, fields });
export const getListDocumentSuccessAction = (data, total, limit, offset) =>
  makeActionCreator(TrainingTypes.GET_LIST_DOCUMENT_SUCCESS, {
    data,
    total,
    limit,
    offset,
  });
export const getListDocumentFailureAction = error =>
  makeActionCreator(TrainingTypes.GET_LIST_DOCUMENT_FAILURE, { error });

// Create one document
export const createOneDocumentAction = (payload) =>
  makeActionCreator(TrainingTypes.CREATE_ONE_DOCUMENT, {payload});
export const createOneDocumentSuccessAction = () =>
  makeActionCreator(TrainingTypes.CREATE_ONE_DOCUMENT_SUCCESS);
export const createOneDocumentFailureAction = error =>
  makeActionCreator(TrainingTypes.CREATE_ONE_DOCUMENT_FAILURE, { error });

// Get one document
export const getOneDocumentAction = (id) =>
  makeActionCreator(TrainingTypes.GET_ONE_DOCUMENT, {id});
export const getOneDocumentSuccessAction = (data) =>
  makeActionCreator(TrainingTypes.GET_ONE_DOCUMENT_SUCCESS, {data});
export const getOneDocumentFailureAction = error =>
  makeActionCreator(TrainingTypes.GET_ONE_DOCUMENT_FAILURE, { error }); 
  
// Edit one document
export const updateOneDocumentAction = (id, payload) =>
  makeActionCreator(TrainingTypes.UPDATE_ONE_DOCUMENT, {id, payload});
export const updateOneDocumentSuccessAction = (id, payload) =>
  makeActionCreator(TrainingTypes.UPDATE_ONE_DOCUMENT_SUCCESS, {id, payload});
export const updateOneDocumentFailureAction = error =>
  makeActionCreator(TrainingTypes.UPDATE_ONE_DOCUMENT_FAILURE, { error });


// List video
export const getListVideoAction = (limit, offset, filter, orderBy, fields) =>
  makeActionCreator(TrainingTypes.GET_LIST_VIDEO, { limit, offset, filter, orderBy, fields });
export const getListVideoSuccessAction = (data, total, limit, offset) =>
  makeActionCreator(TrainingTypes.GET_LIST_VIDEO_SUCCESS, {
    data,
    total,
    limit,
    offset,
  });
export const getListVideoFailureAction = error =>
  makeActionCreator(TrainingTypes.GET_LIST_VIDEO_FAILURE, { error });

// Create one video
export const createOneVideoAction = (payload) =>
  makeActionCreator(TrainingTypes.CREATE_ONE_VIDEO, {payload});
export const createOneVideoSuccessAction = () =>
  makeActionCreator(TrainingTypes.CREATE_ONE_VIDEO_SUCCESS);
export const createOneVideoFailureAction = error =>
  makeActionCreator(TrainingTypes.CREATE_ONE_VIDEO_FAILURE, { error });

// Get one video
export const getOneVideoAction = (id) =>
  makeActionCreator(TrainingTypes.GET_ONE_VIDEO, {id});
export const getOneVideoSuccessAction = (data) =>
  makeActionCreator(TrainingTypes.GET_ONE_VIDEO_SUCCESS, {data});
export const getOneVideoFailureAction = error =>
  makeActionCreator(TrainingTypes.GET_ONE_VIDEO_FAILURE, { error });

// Edit one video
export const updateOneVideoAction = (id, payload) =>
  makeActionCreator(TrainingTypes.UPDATE_ONE_VIDEO, {id, payload});
export const updateOneVideoSuccessAction = (id, payload) =>
  makeActionCreator(TrainingTypes.UPDATE_ONE_VIDEO_SUCCESS, {id, payload});
export const updateOneVideoFailureAction = error =>
  makeActionCreator(TrainingTypes.UPDATE_ONE_VIDEO_FAILURE, { error });

// Upload file

export const uploadFileSuccessAction = (fileUrl, mode) =>
  makeActionCreator(TrainingTypes.UPLOAD_FILE_SUCCESS, { fileUrl, mode });
export const uploadFileFailureAction = error =>
  makeActionCreator(TrainingTypes.UPLOAD_FILE_FAILURE, { error });
export const removeFileAction = () =>
  makeActionCreator(TrainingTypes.REMOVE_FILE);

  