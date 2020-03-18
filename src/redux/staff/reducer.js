import { makeReducerCreator } from '../../utils/reduxUtils';
import { StaffTypes } from './actions';

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
  isShowLoading: false,
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
export const staff = makeReducerCreator(initialState, {
  [StaffTypes.LOGIN_AUTH_SUCCESS]: loginSuccess,
  [StaffTypes.LOGIN_AUTH_FAIL]: loginFail,
  [StaffTypes.LOGOUT]: logout,
  [StaffTypes.LOGIN]: loginLoading,
});
