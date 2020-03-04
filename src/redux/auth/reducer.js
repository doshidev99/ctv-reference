import { makeReducerCreator } from '../../utils/reduxUtils';
import { AuthTypes } from './actions';

// Setup inintial state for app
export const initialState = {
  isAuthenticated: !!localStorage.getItem('sessionToken'),
  // isAuthenticated:true,
  data: {
    fullName: localStorage.getItem('fullName') || '',
    id: localStorage.getItem('id'),
  },
  roles: '',
  loginError: false,
  loginSuccess: false,
};
// End setup

const loginSuccess = state => ({
  ...state,
  isAuthenticated: true,
  loginError: false,
  loginSuccess: true,
});

const loginFail = (state, {error}) => ({
  ...state,
  isAuthenticated: false,
  loginError: error,
  loginSuccess: false,
});

const logout = () => ({
  ...initialState,
  isAuthenticated: false,
});

export const auth = makeReducerCreator(initialState, {
  [AuthTypes.LOGIN_AUTH_SUCCESS]: loginSuccess,
  [AuthTypes.LOGIN_AUTH_FAIL]: loginFail,
  [AuthTypes.LOGOUT]: logout,
});
