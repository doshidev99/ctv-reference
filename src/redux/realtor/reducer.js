import { makeReducerCreator } from "../../utils/reduxUtils";
import { RealtorTypes } from "./actions";


// Setup inintial state for realtors
export const initialState = {
  realtors: [],
  offset: 0, // offset = (page - 1) * limit;
  limit: 10,
  total: null,
  loading: false,
  listRealtorSuccess: undefined,
  listRealtorFailure: undefined,
};
// End setup

// LIST REALTOR
const getListRealtor = state => ({
  ...state,
  loading: true,
});

const getListRealtorSuccess = (state, { data, total, limit, offset }) => ({
  ...state,
  realtors: data,
  limit, 
  offset,
  total,
  loading: false,
  listRealtorSuccess: true,
  listRealtorFailure: false,
});

const getListRealtorFailure = state => ({
  ...state,
  loading: false,
  listRealtorSuccess: false,
  listRealtorFailure: true,
});

export const realtor = makeReducerCreator(initialState, {
  [RealtorTypes.GET_LIST_REALTOR]: getListRealtor,
  [RealtorTypes.GET_LIST_REALTOR_SUCCESS]: getListRealtorSuccess,
  [RealtorTypes.GET_LIST_REALTOR_FAILURE]: getListRealtorFailure,
})