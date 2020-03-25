import { all } from "redux-saga/effects";
import staffSaga from "./staff/sagas";
import propertySaga from "./property/sagas";
import citySaga from "./city/sagas";
import propertyTypeSaga from "./propertyType/sagas";
import transactionSaga from "./transaction/sagas";
import mailSaga from "./mail/sagas";
import realtorSaga from "./realtor/sagas";
import adminSaga from "./admin/sagas";

export default function* root() {
  yield all([
    ...staffSaga,
    ...propertySaga,
    ...transactionSaga,
    ...citySaga,
    ...propertyTypeSaga,
    ...mailSaga,
    ...realtorSaga,
    ...adminSaga,
  ]);
}
