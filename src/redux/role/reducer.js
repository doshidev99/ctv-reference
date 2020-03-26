import { makeReducerCreator } from "../../utils/reduxUtils";
import { RoleTypes } from "./actions";


// Setup inintial state for role
export const initialState = {
  roles: [],
  offset: 0, // offset = (page - 1) * limit;
  limit: 10,
  total: null,
  loading: false,
  listRoleSuccess: undefined,
  listRoleFailure: undefined,

  createRoleSuccess: undefined,
  createRoleFailure: undefined,

  updateRoleSuccess: undefined,
  updateRoleFailure: undefined,

};
// End setup

// LIST ROLE
const getListRole = state => ({
  ...state,
  loading: true,
});

const getListRoleSuccess = (state, { data, total, limit, offset }) => ({
  ...state,
  roles: data,
  limit, 
  offset,
  total,
  loading: false,
  listRoleSuccess: true,
  listRoleFailure: false,
});

const getListRoleFailure = state => ({
  ...state,
  loading: false,
  listRoleSuccess: false,
  listRoleFailure: true,
});

// ---------------------------------------
const createOneRoleSuccess = state => ({
  ...state,
  loading:false,
  createRoleFailure: false,
  createRoleSuccess: true,
})
const createOneRoleFailure = state => ({
  ...state,
  loading:false,
  createRoleFailure: false,
  createRoleSuccess: true,
})
// -----------------------------------------
const updateOneRoleSuccess = state => ({
  ...state,
  loading:false,
  updateRoleFailure: false,
  updateRoleSuccess: true,
})
const updateOneRoleFailure = state => ({
  ...state,
  loading:false,
  updateRoleFailure: false,
  updateRoleSuccess: true,
})
// -----------------------------------------
export const role = makeReducerCreator(initialState, {
  [RoleTypes.GET_LIST_ROLE]: getListRole,
  [RoleTypes.GET_LIST_ROLE_SUCCESS]: getListRoleSuccess,
  [RoleTypes.GET_LIST_ROLE_FAILURE]: getListRoleFailure,

  [RoleTypes.CREATE_ONE_ROLE_SUCCESS]: createOneRoleSuccess,
  [RoleTypes.CREATE_ONE_ROLE_FAILURE]: createOneRoleFailure,

  [RoleTypes.UPDATE_ONE_ROLE_SUCCESS]: updateOneRoleSuccess,
  [RoleTypes.UPDATE_ONE_ROLE_FAILURE]: updateOneRoleFailure,

})