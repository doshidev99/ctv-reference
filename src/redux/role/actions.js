import { makeConstantCreator, makeActionCreator } from "../../utils/reduxUtils";

export const RoleTypes = makeConstantCreator(
  "GET_LIST_ROLE",
  "GET_LIST_ROLE_SUCCESS",
  "GET_LIST_ROLE_FAILURE",

  "CREATE_ONE_ROLE",
  "CREATE_ONE_ROLE_SUCCESS",
  "CREATE_ONE_ROLE_FAILURE",

  "UPDATE_ONE_ROLE",
  "UPDATE_ONE_ROLE_SUCCESS",
  "UPDATE_ONE_ROLE_FAILURE",
);

// List role
export const getListRoleAction = (limit, offset, filter) =>
  makeActionCreator(RoleTypes.GET_LIST_ROLE, { limit, offset, filter });
export const getListRoleSuccessAction = (data, total, limit, offset) =>
  makeActionCreator(RoleTypes.GET_LIST_ROLE_SUCCESS, {
    data,
    total,
    limit,
    offset,
  });
export const getListRoleFailureAction = error =>
  makeActionCreator(RoleTypes.GET_LIST_ROLE_FAILURE, { error });

// Create one role
export const createOneRoleAction = (payload) =>
  makeActionCreator(RoleTypes.CREATE_ONE_ROLE, {payload});
export const createOneRoleSuccessAction = () =>
  makeActionCreator(RoleTypes.CREATE_ONE_ROLE_SUCCESS);
export const createOneRoleFailureAction = error =>
  makeActionCreator(RoleTypes.CREATE_ONE_ROLE_FAILURE, { error });

// Edit one role
export const updateOneRoleAction = (id, payload) =>
  makeActionCreator(RoleTypes.UPDATE_ONE_ROLE, {id, payload});
export const updateOneRoleSuccessAction = () =>
  makeActionCreator(RoleTypes.UPDATE_ONE_ROLE_SUCCESS);
export const updateOneRoleFailureAction = error =>
  makeActionCreator(RoleTypes.UPDATE_ONE_ROLE_FAILURE, { error });


