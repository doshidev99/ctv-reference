import { makeConstantCreator, makeActionCreator } from "../../utils/reduxUtils";

export const StaffTypes = makeConstantCreator(
  "LOGIN",
  "LOGIN_AUTH_FAIL",
  "LOGIN_AUTH_SUCCESS",
  "LOGOUT",
  "GET_CURRENT_USER",
);

// Login
export const loginAction = params => makeActionCreator(StaffTypes.LOGIN, { params });
export const loginSuccessAction = data => makeActionCreator(StaffTypes.LOGIN_AUTH_SUCCESS, { data });
export const loginFailureAction = error => makeActionCreator(StaffTypes.LOGIN_AUTH_FAIL, { error });

// Logout
export const logout = () => makeActionCreator(StaffTypes.LOGOUT);
// User
export const getCurentUser = () => makeActionCreator(StaffTypes.GET_CURRENT_USER);
