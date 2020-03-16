import { makeConstantCreator, makeActionCreator } from "../../utils/reduxUtils";

export const PropertyTypes = makeConstantCreator(
  "GET_LIST_PROPERTY",
  "GET_LIST_PROPERTY_SUCCESS",
  "GET_LIST_PROPERTY_FAILURE",

  "UPLOAD_FILE",
  "UPLOAD_FILE_SUCCESS",
  "UPLOAD_FILE_FAILURE",
);

// Get list property
export const getListPropertyAction = params => makeActionCreator(PropertyTypes.GET_LIST_PROPERTY, { params });
export const getListPropertySuccessAction = data => makeActionCreator(PropertyTypes.GET_LIST_PROPERTY_SUCCESS, { data });
export const getListPropertyFailureAction = error => makeActionCreator(PropertyTypes.GET_LIST_PROPERTY_FAILURE, { error });


// Get list property
export const uploadFileAction = params => makeActionCreator(PropertyTypes.UPLOAD_FILE, { params });
export const uploadFileSuccessAction = (fileUrl, mode) => makeActionCreator(PropertyTypes.UPLOAD_FILE_SUCCESS, { fileUrl, mode });
export const uploadFileFailureAction = error => makeActionCreator(PropertyTypes.UPLOAD_FILE_FAILURE, { error });


