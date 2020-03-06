import { all } from "redux-saga/effects";
import authSaga from "./auth/sagas";
import projectSaga from "./project/sagas";

export default function* root() {
  yield all([...authSaga, ...projectSaga]);
}
