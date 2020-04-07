import { makeReducerCreator } from "../../utils/reduxUtils";
import { TrainingTypes } from "./actions";

// Setup inintial state for document
export const initialState = {
  documents: [],
  videos: [],
  offset: 0, // offset = (page - 1) * limit;
  limit: 10,
  totalDocument: null,
  totalVideo: null,

  currentDocument: {},
  currentVideo: {},

  loading: false,
  loadingVideo: false,
  loadingDocument: false,
  listDocumentSuccess: undefined,
  listDocumentFailure: undefined,

  createDocumentSuccess: undefined,
  createDocumentFailure: undefined,

  updateDocumentSuccess: undefined,
  updateDocumentFailure: undefined,
  //--------------------------------------
  listVideoSuccess: undefined,
  listVideoFailure: undefined,

  createVideoSuccess: undefined,
  createVideoFailure: undefined,

  updateVideoSuccess: undefined,
  updateVideoFailure: undefined,
  
  fileUrl: undefined,
};
// End setup

// LIST DOCUMENT
const getListDocument = state => ({
  ...state,
  loadingDocument: true,
});

const getListDocumentSuccess = (state, { data, total, limit, offset }) => ({
  ...state,
  documents: data,
  limit,
  offset,
  totalDocument: total,
  loadingDocument: false,
  listDocumentSuccess: true,
  listDocumentFailure: false,
});

const getListDocumentFailure = state => ({
  ...state,
  loadingDocument: false,
  listDocumentSuccess: false,
  listDocumentFailure: true,
});

// ---------------------------------------
const createOneDocumentSuccess = state => {
  return {
    ...state,
    loadingDocument: false,
    createDocumentFailure: false,
    createDocumentSuccess: true,
  };
};

const createOneDocumentFailure = state => ({
  ...state,
  loadingDocument: false,
  createDocumentFailure: false,
  createDocumentSuccess: true,
});
// ---------------------------------------
const getOneDocumentSuccess = (state, {data}) => {
  return {
    ...state,
    loadingDocument: false,
    currentDocument: data,
  };
};

const getOneDocumentFailure = state => ({
  ...state,
  loadingDocument: false,
});



// -----------------------------------------
const updateOneDocumentSuccess = (state, {id, payload}) =>
{ 
  const documentList = [...state.documents];
  payload.key = id
  const index = documentList.findIndex(e => e.id ===id);
  documentList[index] = payload;
  return {
    ...state,
    documents: documentList,
    loadingDocument: false,
    updateDocumentFailure: false,
    updateDocumentSuccess: true,
  }
} 

const updateOneDocumentFailure = state => ({
  ...state,
  loadingDocument: false,
  updateDocumentFailure: false,
  updateDocumentSuccess: true,
});
// -----------------------------------------

// LIST VIDEO
const getListVideo = state => ({
  ...state,
  loadingVideo: true,
});

const getListVideoSuccess = (state, { data, total, limit, offset }) => ({
  ...state,
  videos: data,
  limit,
  offset,
  totalVideo: total,
  loadingVideo: false,
  listVideoSuccess: true,
  listVideoFailure: false,
});

const getListVideoFailure = state => ({
  ...state,
  loadingVideo: false,
  listVideoSuccess: false,
  listVideoFailure: true,
});

// ---------------------------------------
const createOneVideoSuccess = state => {
  return {
    ...state,
    loadingVideo: false,
    createVideoFailure: false,
    createVideoSuccess: true,
  };
};

const createOneVideoFailure = state => ({
  ...state,
  loadingVideo: false,
  createVideoFailure: false,
  createVideoSuccess: true,
});
// --------------------------------------------
const getOneVideoSuccess = (state, {data}) => {
  return {
    ...state,
    loadingVideo: false,
    currentVideo: data,
  };
};

const getOneVideoFailure = state => ({
  ...state,
  loadingVideo: false,
});



// -----------------------------------------
const updateOneVideoSuccess = state => ({
  ...state,
  loadingVideo: false,
  updateVideoFailure: false,
  updateVideoSuccess: true,
});
const updateOneVideoFailure = state => ({
  ...state,
  loadingVideo: false,
  updateVideoFailure: false,
  updateVideoSuccess: true,
});
// -----------------------------------------
// UPLOAD FILE
const uploadFileSuccess = (state, { fileUrl }) => {
  return {
    ...state,
    fileUrl,
  };
};

const uploadFileFailure = state => ({
  ...state,
  loading: false,
});

const removeFile = state => ({
  ...state,
  loading: false,
  fileUrl: null,
})
// -----------------------------------------------

const deleteOneSuccess = state => {
  return {
    ...state,
    loading: false,
  }
}

const deleteOneFailure = state => ({
  ...state,
  loading: false,
})


// ---------------------------------------------------
export const training = makeReducerCreator(initialState, {
  [TrainingTypes.GET_LIST_DOCUMENT]: getListDocument,
  [TrainingTypes.GET_LIST_DOCUMENT_SUCCESS]: getListDocumentSuccess,
  [TrainingTypes.GET_LIST_DOCUMENT_FAILURE]: getListDocumentFailure,

  [TrainingTypes.CREATE_ONE_DOCUMENT_SUCCESS]: createOneDocumentSuccess,
  [TrainingTypes.CREATE_ONE_DOCUMENT_FAILURE]: createOneDocumentFailure,

  [TrainingTypes.GET_ONE_DOCUMENT_SUCCESS]: getOneDocumentSuccess,
  [TrainingTypes.GET_ONE_DOCUMENT_FAILURE]: getOneDocumentFailure,

  [TrainingTypes.UPDATE_ONE_DOCUMENT_SUCCESS]: updateOneDocumentSuccess,
  [TrainingTypes.UPDATE_ONE_DOCUMENT_FAILURE]: updateOneDocumentFailure,

  //------------------------------------------------------------------------
  [TrainingTypes.GET_LIST_VIDEO]: getListVideo,
  [TrainingTypes.GET_LIST_VIDEO_SUCCESS]: getListVideoSuccess,
  [TrainingTypes.GET_LIST_VIDEO_FAILURE]: getListVideoFailure,

  [TrainingTypes.CREATE_ONE_VIDEO_SUCCESS]: createOneVideoSuccess,
  [TrainingTypes.CREATE_ONE_VIDEO_FAILURE]: createOneVideoFailure,

  [TrainingTypes.GET_ONE_VIDEO_SUCCESS]: getOneVideoSuccess,
  [TrainingTypes.GET_ONE_VIDEO_FAILURE]: getOneVideoFailure,

  [TrainingTypes.UPDATE_ONE_VIDEO_SUCCESS]: updateOneVideoSuccess,
  [TrainingTypes.UPDATE_ONE_VIDEO_FAILURE]: updateOneVideoFailure,

  //--------------------------------------------------------------
  [TrainingTypes.UPLOAD_FILE_SUCCESS]: uploadFileSuccess,
  [TrainingTypes.UPLOAD_FILE_FAILURE]: uploadFileFailure,
  [TrainingTypes.REMOVE_FILE]: removeFile,

  //------------------------------------------------------
  [TrainingTypes.DELETE_ONE_SUCCESS]: deleteOneSuccess,
  [TrainingTypes.DELETE_ONE_FAILURE]: deleteOneFailure,
});
