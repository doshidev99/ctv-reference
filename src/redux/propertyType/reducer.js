import { makeReducerCreator } from "../../utils/reduxUtils";
import { PropertyTypeTypes } from "./actions";


// Setup inintial state for propertyType
export const initialState = {
  propertyTypes: [],
  offset: 0, // offset = (page - 1) * limit;
  limit: 10,
  total: null,
  loading: false,
  listPropertyTypeSuccess: undefined,
  listPropertyTypeFailure: undefined,

  createPropertyTypeSuccess: undefined,
  createPropertyTypeFailure: undefined,

  updatePropertyTypeSuccess: undefined,
  updatePropertyTypeFailure: undefined,

};
// End setup

// LIST PROPERTY_TYPE
const getListPropertyType = state => ({
  ...state,
  loading: true,
});

const getListPropertyTypeSuccess = (state, { data, total, limit, offset }) => ({
  ...state,
  propertyTypes: data,
  limit, 
  offset,
  total,
  loading: false,
  listPropertyTypeSuccess: true,
  listPropertyTypeFailure: false,
});

const getListPropertyTypeFailure = state => ({
  ...state,
  loading: false,
  listPropertyTypeSuccess: false,
  listPropertyTypeFailure: true,
});

// ---------------------------------------
const createOnePropertyTypeSuccess = state => {

  return {
    ...state,
    loading:false,
    createPropertyTypeFailure: false,
    createPropertyTypeSuccess: true,
  }
} 

const createOnePropertyTypeFailure = state => ({
  ...state,
  loading:false,
  createPropertyTypeFailure: false,
  createPropertyTypeSuccess: true,
})
// -----------------------------------------
const updateOnePropertyTypeSuccess = state => ({
  ...state,
  loading:false,
  updatePropertyTypeFailure: false,
  updatePropertyTypeSuccess: true,
})
const updateOnePropertyTypeFailure = state => ({
  ...state,
  loading:false,
  updatePropertyTypeFailure: false,
  updatePropertyTypeSuccess: true,
})
// -----------------------------------------
export const propertyType = makeReducerCreator(initialState, {
  [PropertyTypeTypes.GET_LIST_PROPERTY_TYPE]: getListPropertyType,
  [PropertyTypeTypes.GET_LIST_PROPERTY_TYPE_SUCCESS]: getListPropertyTypeSuccess,
  [PropertyTypeTypes.GET_LIST_PROPERTY_TYPE_FAILURE]: getListPropertyTypeFailure,

  [PropertyTypeTypes.CREATE_ONE_PROPERTY_TYPE_SUCCESS]: createOnePropertyTypeSuccess,
  [PropertyTypeTypes.CREATE_ONE_PROPERTY_TYPE_FAILURE]: createOnePropertyTypeFailure,

  [PropertyTypeTypes.UPDATE_ONE_PROPERTY_TYPE_SUCCESS]: updateOnePropertyTypeSuccess,
  [PropertyTypeTypes.UPDATE_ONE_PROPERTY_TYPE_FAILURE]: updateOnePropertyTypeFailure,

})