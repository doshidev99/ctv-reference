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
  loadingPage: false,
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
  loadingPage: true,
})
const getOneRealtorSuccess = (state,{data} )=> ({
  ...state,
  currentRealtor: data,
  loadingPage: false,
})
const getOneRealtorFailure = state => ({
  ...state,  
  loadingPage: false,
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

// Admin request realtor resend digital contract
const requestResend = state => ({
  ...state,
  loading: true,
})
const requestResendSuccess = (state,{data} )=> ({
  ...state,
  loading: false,
  currentRealtor: data,
})
const requestResendFailure = state => ({
  ...state,  
  loading: false,
})

// Admin request realtor resend identity info
const requestResendIdentity = state => ({
  ...state,
  loading: true,
})
const requestResendIdentitySuccess = (state,{data} )=> ({
  ...state,
  loading: false,
  currentRealtor: data,
})
const requestResendIdentityFailure = state => ({
  ...state,  
  loading: false,
})

// Admin confirm digital contract
const confirmDigitalContract = state => ({
  ...state,
  loading: true,
})
const confirmDigitalContractSuccess = ( state, { data })=> ({
  ...state,
  loading: false,
  currentRealtor: data,
})
const confirmDigitalContractFailure = state => ({
  ...state,  
  loading: false,
})

// Admin confirm identity card picture
const confirmIdentity = state => ({
  ...state,
  loading: true,
})
const confirmIdentitySuccess = ( state, { data })=> ({
  ...state,
  loading: false,
  currentRealtor: data,
})
const confirmIdentityFailure = state => ({
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

  [RealtorTypes.REQUEST_RESEND]: requestResend,
  [RealtorTypes.REQUEST_RESEND_SUCCESS]: requestResendSuccess,
  [RealtorTypes.REQUEST_RESEND_FAILURE]: requestResendFailure,

  [RealtorTypes.REQUEST_RESEND_IDENTITY]: requestResendIdentity,
  [RealtorTypes.REQUEST_RESEND_IDENTITY_SUCCESS]: requestResendIdentitySuccess,
  [RealtorTypes.REQUEST_RESEND_IDENTITY_FAILURE]: requestResendIdentityFailure,
  
  [RealtorTypes.CONFIRM_CONTRACT]: confirmDigitalContract,
  [RealtorTypes.CONFIRM_CONTRACT_SUCCESS]: confirmDigitalContractSuccess,
  [RealtorTypes.CONFIRM_CONTRACT_FAILURE]: confirmDigitalContractFailure,

  [RealtorTypes.CONFIRM_IDENTITY]: confirmIdentity,
  [RealtorTypes.CONFIRM_IDENTITY_SUCCESS]: confirmIdentitySuccess,
  [RealtorTypes.CONFIRM_IDENTITY_FAILURE]: confirmIdentityFailure,
})
