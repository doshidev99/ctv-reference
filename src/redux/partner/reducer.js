import { makeReducerCreator } from "../../utils/reduxUtils";
import { PartnerTypes } from "./actions";


// Setup inintial state for partner
export const initialState = {
  partners: [],
  currentUser: null,
  offset: 0, // offset = (page - 1) * limit;
  limit: 10,
  total: null,
  loading: false,
  listPartnerSuccess: undefined,
  listPartnerFailure: undefined,
  createLoading: false,
};
// End setup

// LIST PARTNER
const getListPartner = state => ({
  ...state,
  loading: true,
});

const getListPartnerSuccess = (state, { data, total, limit, offset }) => ({
  ...state,
  partners: data,
  limit,
  offset,
  total,
  loading: false,
  listPartnerSuccess: true,
  listPartnerFailure: false,
});

const getListPartnerFailure = state => ({
  ...state,
  loading: false,
  listPartnerSuccess: false,
  listPartnerFailure: true,
});

// GET ONE PARTNER INFO

const getOnePartnerInfo = state => ({
  ...state,
  currentUser: null,
})

const getOnePartnerInfoSuccess = (state, { data }) => ({
  ...state,
  currentUser: data,
})
const getOnePartnerInfoFailure = (state) => ({
  ...state,
})

// create partner info
const createOnePartner = state => ({
  ...state,
  createLoading: true,
})
const createOnePartnerSuccess = (state) => ({
  ...state,
  createLoading: false,
})
const createOnePartnerFailure = state => ({
  ...state,
  createLoading: false,
})
export const partner = makeReducerCreator(initialState, {
  [PartnerTypes.GET_LIST_PARTNER]: getListPartner,
  [PartnerTypes.GET_LIST_PARTNER_SUCCESS]: getListPartnerSuccess,
  [PartnerTypes.GET_LIST_PARTNER_FAILURE]: getListPartnerFailure,

  [PartnerTypes.GET_ONE_PARTNER_INFO]: getOnePartnerInfo,
  [PartnerTypes.GET_ONE_PARTNER_INFO_SUCCESS]: getOnePartnerInfoSuccess,
  [PartnerTypes.GET_ONE_PARTNER_INFO_FAILURE]: getOnePartnerInfoFailure,


  [PartnerTypes.CREATE_PARTNER]: createOnePartner,
  [PartnerTypes.CREATE_PARTNER_SUCCESS]: createOnePartnerSuccess,
  [PartnerTypes.CREATE_PARTNER_FAILURE]: createOnePartnerFailure,
})
