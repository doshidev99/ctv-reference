import { makeConstantCreator, makeActionCreator } from "../../utils/reduxUtils";

export const AuthTypes = makeConstantCreator(
  "LOGIN",
  "LOGIN_AUTH_FAIL",
  "LOGIN_AUTH_SUCCESS",
  "LOGOUT",
  "GET_CURRENT_USER",
);

// Login
export const loginAction = params => makeActionCreator(AuthTypes.LOGIN, { params });
export const loginSuccessAction = data => makeActionCreator(AuthTypes.LOGIN_AUTH_SUCCESS, { data });
export const loginFailureAction = error => makeActionCreator(AuthTypes.LOGIN_AUTH_FAIL, { error });

// Logout
export const logout = () => makeActionCreator(AuthTypes.LOGOUT);
// User
export const getCurentUser = () => makeActionCreator(AuthTypes.GET_CURRENT_USER);
