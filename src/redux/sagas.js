import { all } from "redux-saga/effects";
import staffSaga from "./staff/sagas";
import propertySaga from "./property/sagas";

export default function* root() {
  yield all([...staffSaga, ...propertySaga]);
}
