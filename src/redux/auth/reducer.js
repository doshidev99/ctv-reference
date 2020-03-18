import { makeReducerCreator } from '../../utils/reduxUtils';
import { AuthTypes } from './actions';

// Setup inintial state for app
export const initialState = {
  isAuthenticated: !!localStorage.getItem('sessionToken'),
  data: {
    fullName: localStorage.getItem('fullName') || '',
    id: localStorage.getItem('id'),
  },
  roles: '',
  isShowLoading: false,
  loginError: false,
  loginSuccess: false,
};
// End setup

const loginSuccess = state => ({
  ...state,
  isShowLoading: false,
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

const loginLoading = (state) => ({
  ...state,
  isShowLoading: true,
})
export const auth = makeReducerCreator(initialState, {
  [AuthTypes.LOGIN_AUTH_SUCCESS]: loginSuccess,
  [AuthTypes.LOGIN_AUTH_FAIL]: loginFail,
  [AuthTypes.LOGOUT]: logout,
  [AuthTypes.LOGIN]: loginLoading,
});
