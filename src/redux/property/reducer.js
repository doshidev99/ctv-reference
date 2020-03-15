import { makeReducerCreator } from "../../utils/reduxUtils";
import { PropertyTypes } from "./actions";

// Setup inintial state for app
export const initialState = {
  properties: [],
  loading: false,
  listPropertySuccess: undefined,
  listPropertyFailure: undefined,
  currentProperty: {},
  mode: undefined,
  fileUrl: undefined,
};
// End setup

const getListProperty = state => ({
  ...state,
  loading: true,
});

const getListPropertySuccess = (state, { data }) => ({
  ...state,
  properties: data,
  loading: false,
  listPropertySuccess: true,
  listPropertyFailure: false,
});

const getListPropertyFailure = state => ({
  ...state,
  loading: false,
  listPropertySuccess: false,
  listPropertyFailure: true,
});

const uploadFileSuccess = (state, {fileUrl}) => {
  const property = state.currentProperty;
  const legacyInfo = []
  if(property.legacyInfo) {
    property.legacyInfo.push(fileUrl)
  } 
  else {
    legacyInfo.push(fileUrl)
    property.legacyInfo = legacyInfo
  }
  return ({
    ...state,
    currentProperty: property,
    fileUrl,
  })
} 

const uploadFileFailure = (state) => ({
  ...state,
  loading: false,

});

export const property = makeReducerCreator(initialState, {
  [PropertyTypes.GET_LIST_PROPERTY]: getListProperty,
  [PropertyTypes.GET_LIST_PROPERTY_SUCCESS]: getListPropertySuccess,
  [PropertyTypes.GET_LIST_PROPERTY_FAILURE]: getListPropertyFailure,

  [PropertyTypes.UPLOAD_FILE_SUCCESS]: uploadFileSuccess,
  [PropertyTypes.UPLOAD_FILE_FAILURE]: uploadFileFailure,
});
