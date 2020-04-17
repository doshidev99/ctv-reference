import { makeReducerCreator } from "../../utils/reduxUtils";
import { ServiceTypes } from "./actions";


// Setup inintial state for service
export const initialState = {
  services: [],
  offset: 0, // offset = (page - 1) * limit;
  limit: 10,
  total: null,
  currentService: {},
  loading: false,
  listServiceSuccess: undefined,
  listServiceFailure: undefined,

  createServiceSuccess: undefined,
  createServiceFailure: undefined,

  updateServiceSuccess: undefined,
  updateServiceFailure: undefined,

};
// End setup

// LIST SERVICE
const getListService = state => ({
  ...state,
  loading: true,
});

const getListServiceSuccess = (state, { data, total, limit, offset }) => ({
  ...state,
  services: data,
  limit, 
  offset,
  total,
  loading: false,
  listServiceSuccess: true,
  listServiceFailure: false,
});

const getListServiceFailure = state => ({
  ...state,
  loading: false,
  listServiceSuccess: false,
  listServiceFailure: true,
});

// ---------------------------------------
const createOneServiceSuccess = state => {

  return {
    ...state,
    loading:false,
    createServiceFailure: false,
    createServiceSuccess: true,
  }
} 

const createOneServiceFailure = state => ({
  ...state,
  loading:false,
  createServiceFailure: false,
  createServiceSuccess: true,
})
// ---------------------------------------
const getOneServiceSuccess = (state, {data}) => {
  return {
    ...state,
    loading: false,
    currentService: data,
  };
};

const getOneServiceFailure = state => ({
  ...state,
  loading: false,
});
// -----------------------------------------
const updateOneServiceSuccess = state => ({
  ...state,
  loading:false,
  updateServiceFailure: false,
  updateServiceSuccess: true,
})
const updateOneServiceFailure = state => ({
  ...state,
  loading:false,
  updateServiceFailure: false,
  updateServiceSuccess: true,
})
// -----------------------------------------------

const deleteOneSuccess = state => {
  return {
    ...state,
  }
}

const deleteOneFailure = state => ({
  ...state,
  loading: false,
})
// -----------------------------------------
export const service = makeReducerCreator(initialState, {
  [ServiceTypes.GET_LIST_SERVICE]: getListService,
  [ServiceTypes.GET_LIST_SERVICE_SUCCESS]: getListServiceSuccess,
  [ServiceTypes.GET_LIST_SERVICE_FAILURE]: getListServiceFailure,

  [ServiceTypes.CREATE_ONE_SERVICE_SUCCESS]: createOneServiceSuccess,
  [ServiceTypes.CREATE_ONE_SERVICE_FAILURE]: createOneServiceFailure,

  [ServiceTypes.GET_ONE_SERVICE_SUCCESS]: getOneServiceSuccess,
  [ServiceTypes.GET_ONE_SERVICE_FAILURE]: getOneServiceFailure,

  [ServiceTypes.UPDATE_ONE_SERVICE_SUCCESS]: updateOneServiceSuccess,
  [ServiceTypes.UPDATE_ONE_SERVICE_FAILURE]: updateOneServiceFailure,

  [ServiceTypes.DELETE_ONE_SUCCESS]: deleteOneSuccess,
  [ServiceTypes.DELETE_ONE_FAILURE]: deleteOneFailure,

})