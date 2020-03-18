import { takeEvery, put, call } from "redux-saga/effects";
import {
  AuthTypes,
  loginSuccessAction,
  loginFailureAction,
} from "./actions";
import { staffLoginApi } from "../../api/modules/staff";
import { apiWrapper } from "../../utils/reduxUtils";


function* loginSaga({ params }) {
  try {

    // const {username, password} = params;
    // let response=null
    // if(username === 'admin' && password === '123456') {
    //   response = {
    //     user: {
    //       id: 1,
    //       username: 'Admin',
    //       fullName: 'Nguyen Van A',
    //       role: 'Super Admin',
    //     },
    //     token: "this is token",
    //   }
    // }
    const response = yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: false,
      },
      staffLoginApi,
      params,
    );
   
    if (response.token) {
      localStorage.setItem("sessionToken", response.token);
      localStorage.setItem("fullName", response.fullName)
      localStorage.setItem("id", response.id)
      yield put(loginSuccessAction(response));
    } else {
      yield put(loginFailureAction(response));
    }
  } catch (error) {
    yield put(loginFailureAction(error));
  }
}

function logoutSaga() {
  if (localStorage.getItem("sessionToken")) {
    localStorage.clear();
  }
}
export default [
  takeEvery(AuthTypes.LOGIN, loginSaga),
  takeEvery(AuthTypes.LOGOUT, logoutSaga),
];
