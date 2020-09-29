import { takeEvery, put } from "redux-saga/effects";
import {
  RoleTypes,
  getListRoleSuccessAction,
  getListRoleFailureAction,
  createOneRoleSuccessAction,
  createOneRoleFailureAction,
  updateOneRoleSuccessAction,
  updateOneRoleFailureAction,
} from "./actions";
// import {data} from './tempData'
import { getRoles } from "../../api/modules/role";

function* getListRole({ limit, offset }) {
  try {
    if (limit === undefined) {
      limit = 50;
    }
    if (offset === undefined) {
      offset = 0
    }
    const fields = `["id", "name"]`
    const {results, total} = yield getRoles({ limit, offset, fields });
    yield put(getListRoleSuccessAction(results, total, limit, offset));
  } catch (error) {
    yield put(getListRoleFailureAction(error));
  }
}

function* createOneRole({ payload}) {
  try {
    // eslint-disable-next-line no-console
    yield put (createOneRoleSuccessAction());
    
  } catch (error) {
    yield put (createOneRoleFailureAction());
  }
}

function* updateOneRole({ id, payload }) {
  try {
    yield put (updateOneRoleSuccessAction());
    
  } catch (error) {
    yield put (updateOneRoleFailureAction());
  }
}

export default [
  takeEvery(RoleTypes.GET_LIST_ROLE, getListRole),
  takeEvery(RoleTypes.CREATE_ONE_ROLE, createOneRole),
  takeEvery(RoleTypes.UPDATE_ONE_ROLE, updateOneRole),

];
