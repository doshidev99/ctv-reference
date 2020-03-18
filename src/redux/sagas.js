import { all } from "redux-saga/effects";
import staffSaga from "./staff/sagas";
import propertySaga from "./property/sagas";
import citySaga from "./city/sagas";
import propertyTypeSaga from "./propertyType/sagas";

export default function* root() {
  yield all([...staffSaga, ...propertySaga, ...citySaga, ...propertyTypeSaga]);
}
