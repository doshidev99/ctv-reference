import { all } from "redux-saga/effects";
import staffSaga from "./staff/sagas";
import propertySaga from "./property/sagas";
import transactionSaga from "./transaction/sagas";
import citySaga from "./city/sagas";
import propertyTypeSaga from "./propertyType/sagas";
import mailSaga from "./mail/sagas";
import realtorSaga from "./realtor/sagas";
import roleSaga from "./role/sagas";
import adminSaga from "./admin/sagas";
import partnerSaga from "./partner/sagas";
import eventSaga from "./event/sagas";
import trainingSaga from "./training/sagas";
import restSaga from './rest/sagas';
import restFilterSaga from './restFilter/sagas';

export default function* root() {
  yield all([
    ...staffSaga,
    ...propertySaga,
    ...transactionSaga,
    ...citySaga,
    ...propertyTypeSaga,
    ...mailSaga,
    ...realtorSaga,
    ...roleSaga,
    ...adminSaga,
    ...partnerSaga,
    ...eventSaga,
    ...trainingSaga,
    ...restSaga,
    ...restFilterSaga,
  ]);
}
