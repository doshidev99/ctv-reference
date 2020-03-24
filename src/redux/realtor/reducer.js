import { makeReducerCreator } from "../../utils/reduxUtils";
import { RealtorTypes } from "./actions";


// Setup inintial state for realtors
export const initialState = {
  realtors: [],
  currentRealtor: {},
  transactions: [],
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


// GET ONE REALTOR
const getOneRealtor = state => ({
  ...state,
  loading: true,
})
const getOneRealtorSuccess = (state,{data} )=> ({
  ...state,
  currentRealtor: data,
  loading: false,
})
const getOneRealtorFailure = state => ({
  ...state,  
  loading: false,
})

// GET TRANSACTIONS BY REALTOR
const getTransactions = state => ({
  ...state,
  loading: true,
})
const getTransactionsSuccess = (state,{data, total, limit, offset} )=> ({
  ...state,
  transactions: data,
  total, limit, offset,
  loading: false,
})
const getTransactionsFailure = state => ({
  ...state,  
  loading: false,
})

export const realtor = makeReducerCreator(initialState, {
  [RealtorTypes.GET_LIST_REALTOR]: getListRealtor,
  [RealtorTypes.GET_LIST_REALTOR_SUCCESS]: getListRealtorSuccess,
  [RealtorTypes.GET_LIST_REALTOR_FAILURE]: getListRealtorFailure,

  [RealtorTypes.GET_ONE_REALTOR]: getOneRealtor,
  [RealtorTypes.GET_ONE_REALTOR_SUCCESS]: getOneRealtorSuccess,
  [RealtorTypes.GET_ONE_REALTOR_FAILURE]: getOneRealtorFailure,

  [RealtorTypes.GET_TRANSACTIONS_BY_REALTOR]: getTransactions,
  [RealtorTypes.GET_TRANSACTIONS_BY_REALTOR_SUCCESS]: getTransactionsSuccess,
  [RealtorTypes.GET_TRANSACTIONS_BY_REALTOR_FAILURE]: getTransactionsFailure,
})
