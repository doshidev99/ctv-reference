import { makeReducerCreator } from "../../utils/reduxUtils";
import { PropertyTypes } from "./actions";

// Setup inintial state for app
export const initialState = {
  propertys: [],
  loading: false,
  listPropertySuccess: undefined,
  listPropertyFailure: undefined,
};
// End setup

const getListProperty = state => ({
  ...state,
  loading: true,
});

const getListPropertySuccess = (state, { data }) => ({
  ...state,
  propertys: data,
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

export const property = makeReducerCreator(initialState, {
  [PropertyTypes.GET_LIST_PROPERTY]: getListProperty,
  [PropertyTypes.GET_LIST_PROPERTY_SUCCESS]: getListPropertySuccess,
  [PropertyTypes.GET_LIST_PROPERTY_FAILURE]: getListPropertyFailure,
});
