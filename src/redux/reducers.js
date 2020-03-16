import {
  combineReducers,
} from 'redux';
import {
  connectRouter,
} from 'connected-react-router';
import {
  auth,
} from './auth/reducer';
import {
  property,
} from './property/reducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    auth,
    property,
  });
