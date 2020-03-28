import { makeReducerCreator } from "../../utils/reduxUtils";
import { AdminTypes } from "./actions";


// Setup inintial state for admin
export const initialState = {
  admins: [],
  currentUser: null,
  offset: 0, // offset = (page - 1) * limit;
  limit: 10,
  total: null,
  loading: false,
  listAdminSuccess: undefined,
  listAdminFailure: undefined,
  createLoading: false,
};
// End setup

// LIST ADMIN
const getListAdmin = state => ({
  ...state,
  loading: true,
});

const getListAdminSuccess = (state, { data, total, limit, offset }) => ({
  ...state,
  admins: data,
  limit, 
  offset,
  total,
  loading: false,
  listAdminSuccess: true,
  listAdminFailure: false,
});

const getListAdminFailure = state => ({
  ...state,
  loading: false,
  listAdminSuccess: false,
  listAdminFailure: true,
});

// GET ONE ADMIN INFO

const getOneAdminInfo = state => ({
  ...state,
  currentUser: null,
})

const getOneAdminInfoSuccess = (state, {data}) => ({
  ...state,
  currentUser: data,
})
const getOneAdminInfoFailure = (state) => ({
  ...state,
})

// create admin info
const createOneAdmin = state => ({
  ...state,
  createLoading: true,
})
const createOneAdminSuccess = (state) => ({
  ...state,
  createLoading: false,
})
const createOneAdminFailure= state => ({
  ...state,
  createLoading: false,
})
export const admin = makeReducerCreator(initialState, {
  [AdminTypes.GET_LIST_ADMIN]: getListAdmin,
  [AdminTypes.GET_LIST_ADMIN_SUCCESS]: getListAdminSuccess,
  [AdminTypes.GET_LIST_ADMIN_FAILURE]: getListAdminFailure,

  [AdminTypes.GET_ONE_ADMIN_INFO]: getOneAdminInfo,
  [AdminTypes.GET_ONE_ADMIN_INFO_SUCCESS]: getOneAdminInfoSuccess,
  [AdminTypes.GET_ONE_ADMIN_INFO_FAILURE]: getOneAdminInfoFailure,


  [AdminTypes.CREATE_ADMIN]: createOneAdmin,
  [AdminTypes.CREATE_ADMIN_SUCCESS]: createOneAdminSuccess,
  [AdminTypes.CREATE_ADMIN_FAILURE]: createOneAdminFailure,
})

