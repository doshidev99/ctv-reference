import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { auth } from './auth/reducer';
import { property } from './property/reducer';
import { city } from './city/reducer';
import { propertyType } from './propertyType/reducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    auth,
    property,
    city,
    propertyType,
  });
