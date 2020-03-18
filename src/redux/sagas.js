import { all } from "redux-saga/effects";
import authSaga from "./auth/sagas";
import propertySaga from "./property/sagas";
import citySaga from "./city/sagas";
import propertyTypeSaga from "./propertyType/sagas";

export default function* root() {
  yield all([...authSaga, ...propertySaga, ...citySaga, ...propertyTypeSaga]);
}
