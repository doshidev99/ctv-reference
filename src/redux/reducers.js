import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { staff } from "./staff/reducer";
import { property } from "./property/reducer";
import { city } from "./city/reducer";
import { propertyType } from "./propertyType/reducer";
import { transaction } from "./transaction/reducer";
import { mail } from "./mail/reducer";
import { realtor } from "./realtor/reducer";
import { role } from "./role/reducer";
import { admin } from "./admin/reducer";
import { partner } from "./partner/reducer";
import { event } from "./event/reducer";
import { training } from "./training/reducer";
import rest from './rest/reducer';
import restFilter from './restFilter/reducer';
import modal from './modal/reducer';
import { loading } from './loading/reducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    staff,
    property,
    city,
    propertyType,
    transaction,
    mail,
    realtor,
    role,
    admin,
    partner,
    event,
    training,
    rest,
    restFilter,
    modal,
    loading,
  });
