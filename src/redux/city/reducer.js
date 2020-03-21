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

export const city = makeReducerCreator(initialState, {
  [CityTypes.GET_LIST_CITY]: getListCity,
  [CityTypes.GET_LIST_CITY_SUCCESS]: getListCitySuccess,
  [CityTypes.GET_LIST_CITY_FAILURE]: getListCityFailure,
})