import { all } from "redux-saga/effects";
import authSaga from "./auth/sagas";
import propertySaga from "./property/sagas";
import transactionSaga from "./transaction/sagas";

export default function* root() {
  yield all([...authSaga, ...propertySaga, ...transactionSaga]);
}
