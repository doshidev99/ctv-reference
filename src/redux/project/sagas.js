import { takeEvery, put } from "redux-saga/effects";
import {
  ProjectTypes,
  getListProjectSuccessAction,
  getListProjectFailureAction,
} from "./actions";
import {data} from './tempData'

function * getListProject () {
  try {
    localStorage.setItem("projects", JSON.stringify(data));
    yield put(getListProjectSuccessAction(data));
  } catch (error) {
    yield put(getListProjectFailureAction(error));
  }
}

export default [
  takeEvery(ProjectTypes.GET_LIST_PROJECT, getListProject),
];
