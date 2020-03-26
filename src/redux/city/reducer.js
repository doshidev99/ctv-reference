import { makeReducerCreator } from "../../utils/reduxUtils";
import { CityTypes } from "./actions";


// Setup inintial state for city
export const initialState = {
  cities: [],
  offset: 0, // offset = (page - 1) * limit;
  limit: 10,
  total: null,
  loading: false,
  listCitySuccess: undefined,
  listCityFailure: undefined,

  createCitySuccess: undefined,
  createCityFailure: undefined,

  updateCitySuccess: undefined,
  updateCityFailure: undefined,

};
// End setup

// LIST CITY
const getListCity = state => ({
  ...state,
  loading: true,
});

const getListCitySuccess = (state, { data, total, limit, offset }) => ({
  ...state,
  cities: data,
  limit, 
  offset,
  total,
  loading: false,
  listCitySuccess: true,
  listCityFailure: false,
});

const getListCityFailure = state => ({
  ...state,
  loading: false,
  listCitySuccess: false,
  listCityFailure: true,
});

// ---------------------------------------
const createOneCitySuccess = state => {

  return {
    ...state,
    loading:false,
    createCityFailure: false,
    createCitySuccess: true,
  }
} 

const createOneCityFailure = state => ({
  ...state,
  loading:false,
  createCityFailure: false,
  createCitySuccess: true,
})
// -----------------------------------------
const updateOneCitySuccess = state => ({
  ...state,
  loading:false,
  updateCityFailure: false,
  updateCitySuccess: true,
})
const updateOneCityFailure = state => ({
  ...state,
  loading:false,
  updateCityFailure: false,
  updateCitySuccess: true,
})
// -----------------------------------------
export const city = makeReducerCreator(initialState, {
  [CityTypes.GET_LIST_CITY]: getListCity,
  [CityTypes.GET_LIST_CITY_SUCCESS]: getListCitySuccess,
  [CityTypes.GET_LIST_CITY_FAILURE]: getListCityFailure,

  [CityTypes.CREATE_ONE_CITY_SUCCESS]: createOneCitySuccess,
  [CityTypes.CREATE_ONE_CITY_FAILURE]: createOneCityFailure,

  [CityTypes.UPDATE_ONE_CITY_SUCCESS]: updateOneCitySuccess,
  [CityTypes.UPDATE_ONE_CITY_FAILURE]: updateOneCityFailure,

})